use crate::commands::refine::{RefineChange, RefineResult};
use crate::error::AppError;
use crate::state::AppState;
use serde::Serialize;
use std::path::Path;
use std::sync::Arc;
use std::time::Instant;
use tauri::{AppHandle, Emitter};
use tokio::io::AsyncWriteExt;
use encoding_rs;

const MODEL_URL: &str = "https://huggingface.co/bartowski/Llama-3.2-1B-Instruct-GGUF/resolve/main/Llama-3.2-1B-Instruct-Q4_K_M.gguf";

#[derive(Debug, Clone, Serialize)]
#[serde(rename_all = "camelCase")]
struct LlmProgressPayload {
    downloaded_bytes: u64,
    total_bytes: u64,
}

#[derive(Debug, Clone, Serialize)]
#[serde(rename_all = "camelCase")]
struct LlmErrorPayload {
    error: String,
}

pub async fn check_model_cache(state: &AppState) -> bool {
    let path = state.llm.model_file_path();
    tokio::fs::try_exists(&path).await.unwrap_or(false)
}

async fn download_model(app_handle: AppHandle, state: Arc<AppState>) -> Result<(), AppError> {
    let path = state.llm.model_file_path();
    if let Some(parent) = path.parent() {
        tokio::fs::create_dir_all(parent)
            .await
            .map_err(|e| AppError::InternalError(format!("failed to create model dir: {}", e)))?;
    }

    let client = reqwest::Client::new();
    let mut response = client
        .get(MODEL_URL)
        .send()
        .await
        .map_err(|e| AppError::NetworkError(format!("request failed: {}", e)))?;

    let total = response.content_length().unwrap_or(0);
    state.llm.total_bytes.store(total, std::sync::atomic::Ordering::SeqCst);
    state.llm
        .downloaded_bytes
        .store(0, std::sync::atomic::Ordering::SeqCst);

    let mut file = tokio::fs::File::create(&path)
        .await
        .map_err(|e| AppError::DownloadFailed(format!("file create: {}", e)))?;

    let mut downloaded: u64 = 0;
    while let Some(chunk) = response
        .chunk()
        .await
        .map_err(|e| AppError::DownloadFailed(format!("stream error: {}", e)))?
    {
        let chunk_len = chunk.len() as u64;
        downloaded += chunk_len;
        state
            .llm
            .downloaded_bytes
            .store(downloaded, std::sync::atomic::Ordering::SeqCst);
        app_handle
            .emit(
                "llm_progress",
                LlmProgressPayload {
                    downloaded_bytes: downloaded,
                    total_bytes: total,
                },
            )
            .ok();
        file.write_all(&chunk)
            .await
            .map_err(|e| AppError::DownloadFailed(format!("write error: {}", e)))?;
    }

    // success
    state.set_status(crate::state::ModelStatus::Ready);
    state.router.set_ready(true);
    app_handle.emit("model_ready", ()).ok();
    Ok(())
}

pub fn start_download(app_handle: AppHandle, state: Arc<AppState>) {
    state.set_status(crate::state::ModelStatus::Downloading);
    tauri::async_runtime::spawn(async move {
        if let Err(e) = download_model(app_handle.clone(), state.clone()).await {
            let mut error_guard = state.llm.error_message.lock().unwrap();
            *error_guard = Some(e.to_string());
            state.set_status(crate::state::ModelStatus::Error);
            app_handle
                .emit(
                    "model_error",
                    LlmErrorPayload {
                        error: e.to_string(),
                    },
                )
                .ok();
        }
    });
}

pub fn retry_download(app_handle: AppHandle, state: Arc<AppState>) {
    // Reset
    state.llm.downloaded_bytes.store(0, std::sync::atomic::Ordering::SeqCst);
    state.llm.total_bytes.store(0, std::sync::atomic::Ordering::SeqCst);
    {
        let mut error_guard = state.llm.error_message.lock().unwrap();
        *error_guard = None;
    }
    start_download(app_handle, state);
}

/// Prompt engineering template for Fast Refine.
/// Instructs the LLM to restructure raw user input into Role/Task/Format/Context components.
/// Uses Llama 3.2 chat format with system and user messages.
const PROMPT_TEMPLATE: &str = "<|begin_of_text|><|start_header_id|>system<|end_header_id|>

You are a prompt engineering assistant. Your task is to restructure the user's raw input into a well-formed prompt with four clear components:

1. **Role**: Assign an appropriate expert persona for this task
2. **Task**: Extract and clearly state the core action or question
3. **Format**: Specify the desired output structure
4. **Context**: Add relevant background, constraints, or tone guidance

Output ONLY valid JSON with these exact keys: \"role\", \"task\", \"format\", \"context\"
Do NOT include any other text, markdown, or explanation.

Example 1:
Input: \"write an email to my boss about missing deadline\"
Output: {\"role\": \"professional corporate email writer\", \"task\": \"draft an apology email to the manager regarding a missed deadline\", \"format\": \"formal business email with subject line, salutation, body, and closing\", \"context\": \"tone should be apologetic but professional, offering a revised timeline and taking responsibility\"}

Example 2:
Input: \"explain quantum computing to a 10 year old\"
Output: {\"role\": \"patient and creative science teacher for children\", \"task\": \"explain the concept of quantum computing in simple terms\", \"format\": \"engaging explanation with analogies and simple language, 3-4 paragraphs\", \"context\": \"audience is a 10-year-old child with no prior physics knowledge, use fun analogies like spinning coins and magic books\"}

<|eot_id|><|start_header_id|>user<|end_header_id|>

{user_input}<|eot_id|><|start_header_id|>assistant<|end_header_id|>";

use llama_cpp_2::context::params::LlamaContextParams;
use llama_cpp_2::llama_backend::LlamaBackend;
use llama_cpp_2::llama_batch::LlamaBatch;
use llama_cpp_2::model::params::LlamaModelParams;
use llama_cpp_2::model::{AddBos, LlamaModel};
use llama_cpp_2::sampling::LlamaSampler;
use std::sync::OnceLock;

fn get_backend() -> &'static LlamaBackend {
    static BACKEND: OnceLock<LlamaBackend> = OnceLock::new();
    BACKEND.get_or_init(|| {
        LlamaBackend::init().expect("Failed to initialize llama backend")
    })
}

pub fn run_inference(model_path: &Path, user_input: &str) -> Result<String, AppError> {
    let start = Instant::now();

    let backend = get_backend();

    // Load model
    let model = LlamaModel::load_from_file(
        backend,
        model_path,
        &LlamaModelParams::default(),
    ).map_err(|e| AppError::LlmInferenceFailed(format!("model load failed: {}", e)))?;

    // Create context
    let mut ctx = model.new_context(
        backend,
        LlamaContextParams::default()
            .with_n_ctx(std::num::NonZero::new(2048))
            .with_n_batch(512),
    ).map_err(|e| AppError::LlmInferenceFailed(format!("context creation failed: {}", e)))?;

    // Format prompt using PROMPT_TEMPLATE
    let prompt = PROMPT_TEMPLATE.replace("{user_input}", user_input);

    // Tokenize using model.str_to_token
    let tokens = model.str_to_token(&prompt, AddBos::Always)
        .map_err(|e| AppError::LlmInferenceFailed(format!("tokenization failed: {}", e)))?;

    let n_tokens = tokens.len();
    let n_predict = 512;

    // Create batch and add tokens (LlamaBatch::new does NOT return Result)
    let mut batch = LlamaBatch::new(n_tokens, 1);

    for (i, token) in tokens.iter().enumerate() {
        batch.add(*token, i as i32, &[0], i == n_tokens - 1)
            .map_err(|e| AppError::LlmInferenceFailed(format!("batch add failed: {}", e)))?;
    }

    // Decode initial batch
    ctx.decode(&mut batch)
        .map_err(|e| AppError::LlmInferenceFailed(format!("initial decode failed: {}", e)))?;

    let mut output_tokens = Vec::new();
    let mut n_cur = n_tokens;

    while n_cur - n_tokens < n_predict {
        let mut sampler = LlamaSampler::greedy();
        let new_token_id = sampler.sample(&ctx, (n_cur - 1) as i32);

        if new_token_id == ctx.model.token_eos() {
            break;
        }

        output_tokens.push(new_token_id);

        // LlamaBatch::new does NOT return Result
        let mut next_batch = LlamaBatch::new(1, 1);
        next_batch.add(new_token_id, n_cur as i32, &[0], true)
            .map_err(|e| AppError::LlmInferenceFailed(format!("batch add failed: {}", e)))?;

        ctx.decode(&mut next_batch)
            .map_err(|e| AppError::LlmInferenceFailed(format!("decode failed: {}", e)))?;

        n_cur += 1;
    }

    // Detokenize using model.token_to_piece for each token
    let mut output = String::new();
    let mut decoder = encoding_rs::UTF_8.new_decoder();
    for token in &output_tokens {
        let piece = model.token_to_piece(*token, &mut decoder, false, None)
            .map_err(|e| AppError::LlmInferenceFailed(format!("detokenization failed: {}", e)))?;
        output.push_str(&piece);
    }

    let elapsed = start.elapsed();
    println!("[FastRefine] Inference completed in {:?}", elapsed);

    Ok(output)
}

pub fn parse_llm_output(raw_output: &str, original_input: &str) -> RefineResult {
    // Try to parse as JSON first
    if let Ok(parsed) = serde_json::from_str::<serde_json::Value>(raw_output.trim()) {
        let role = parsed.get("role").and_then(|v| v.as_str()).unwrap_or("");
        let task = parsed.get("task").and_then(|v| v.as_str()).unwrap_or("");
        let format = parsed.get("format").and_then(|v| v.as_str()).unwrap_or("");
        let context = parsed.get("context").and_then(|v| v.as_str()).unwrap_or("");

        let refined = format!(
            "**Role:** {}\n\n**Task:** {}\n\n**Format:** {}\n\n**Context:** {}",
            role, task, format, context
        );

        let changes = vec![RefineChange {
            change_type: "modified".to_string(),
            text: refined.clone(),
            reason: "Restructured raw input into Role/Task/Format/Context components".to_string(),
        }];

        return RefineResult {
            original: original_input.to_string(),
            refined,
            changes,
        };
    }

    // Fallback: wrap raw input with basic structure
    let refined = format!(
        "**Task:** {}\n\n**Context:** (no additional context detected)",
        original_input
    );
    let refined_clone = refined.clone();
    RefineResult {
        original: original_input.to_string(),
        refined,
        changes: vec![RefineChange {
            change_type: "modified".to_string(),
            text: refined_clone,
            reason: "Applied basic structure (LLM output was not parseable)".to_string(),
        }],
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_parse_llm_output_valid_json() {
        let input = "write an email";
        let json_output =
            r#"{"role":"test role","task":"test task","format":"test format","context":"test context"}"#;
        let result = parse_llm_output(json_output, input);
        assert_eq!(result.original, input);
        assert!(result.refined.contains("**Role:**"));
        assert!(result.refined.contains("test role"));
        assert_eq!(result.changes.len(), 1);
    }

    #[test]
    fn test_parse_llm_output_fallback() {
        let input = "simple input";
        let fallback_output = "non-json text";
        let result = parse_llm_output(fallback_output, input);
        assert_eq!(result.original, input);
        assert!(result.refined.contains("**Task:**"));
        assert_eq!(result.changes.len(), 1);
    }
}
