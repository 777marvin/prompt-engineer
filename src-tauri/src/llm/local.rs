use crate::error::AppError;
use crate::state::AppState;
use serde::Serialize;
use std::sync::Arc;
use tauri::{AppHandle, Emitter};
use tokio::io::AsyncWriteExt;

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
