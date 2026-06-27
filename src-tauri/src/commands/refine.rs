use crate::error::AppError;
use crate::state::AppState;
use serde::{Deserialize, Serialize};
use std::sync::Arc;
use tauri::{AppHandle, State};

#[derive(Debug, Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct ModelStatusResponse {
    pub status: String,
    pub downloaded_bytes: u64,
    pub total_bytes: u64,
    pub error: Option<String>,
}

#[tauri::command]
pub async fn get_model_status(
    state: State<'_, Arc<AppState>>,
) -> Result<ModelStatusResponse, AppError> {
    let status = state.llm.status.lock().unwrap().clone();
    let status_str = match status {
        crate::state::ModelStatus::Idle => "idle",
        crate::state::ModelStatus::Downloading => "downloading",
        crate::state::ModelStatus::Ready => "ready",
        crate::state::ModelStatus::Error => "error",
    };
    let downloaded_bytes = state.llm.downloaded_bytes.load(std::sync::atomic::Ordering::SeqCst);
    let total_bytes = state.llm.total_bytes.load(std::sync::atomic::Ordering::SeqCst);
    let error = state.llm.error_message.lock().unwrap().clone();
    Ok(ModelStatusResponse {
        status: status_str.to_string(),
        downloaded_bytes,
        total_bytes,
        error,
    })
}

#[tauri::command]
pub async fn retry_model_download(
    app_handle: AppHandle,
    state: State<'_, Arc<AppState>>,
) -> Result<(), AppError> {
    let state_clone = state.inner().clone();
    crate::llm::local::retry_download(app_handle, state_clone);
    Ok(())
}

// ---------- Fast Refine types ----------
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct RefineResult {
    pub original: String,
    pub refined: String,
    pub changes: Vec<RefineChange>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct RefineChange {
    #[serde(rename = "type")]
    pub change_type: String,
    pub text: String,
    pub reason: String,
}

#[tauri::command]
#[serde(rename_all = "snake_case")]
pub async fn fast_refine(
    input: String,
    state: State<'_, Arc<AppState>>,
) -> Result<RefineResult, AppError> {
    if !state.router.is_ready() {
        return Err(AppError::LlmNotReady);
    }
    let model_path = state.llm.model_file_path();
    let raw_output = crate::llm::local::run_inference(&model_path, &input)?;
    let result = crate::llm::local::parse_llm_output(&raw_output, &input);
    Ok(result)
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::state::{AppState, ModelStatus};
    use std::path::PathBuf;
    use std::sync::Arc;

    fn make_state() -> Arc<AppState> {
        Arc::new(AppState::new(PathBuf::from("/tmp/test-refine")))
    }

    fn build_status_response(state: &AppState) -> ModelStatusResponse {
        let status = state.llm.status.lock().unwrap().clone();
        let status_str = match status {
            ModelStatus::Idle => "idle",
            ModelStatus::Downloading => "downloading",
            ModelStatus::Ready => "ready",
            ModelStatus::Error => "error",
        };
        ModelStatusResponse {
            status: status_str.to_string(),
            downloaded_bytes: state.llm.downloaded_bytes.load(std::sync::atomic::Ordering::SeqCst),
            total_bytes: state.llm.total_bytes.load(std::sync::atomic::Ordering::SeqCst),
            error: state.llm.error_message.lock().unwrap().clone(),
        }
    }

    #[test]
    fn test_get_model_status_idle() {
        let state = make_state();
        let response = build_status_response(&state);
        assert_eq!(response.status, "idle");
        assert_eq!(response.downloaded_bytes, 0);
        assert_eq!(response.total_bytes, 0);
        assert!(response.error.is_none());
    }

    #[test]
    fn test_get_model_status_with_error() {
        let state = make_state();
        {
            let mut err = state.llm.error_message.lock().unwrap();
            *err = Some("download failed".to_string());
        }
        state.set_status(ModelStatus::Error);

        let response = build_status_response(&state);
        assert_eq!(response.status, "error");
        assert_eq!(response.error, Some("download failed".to_string()));
    }

    #[test]
    fn test_model_status_response_serialization() {
        let response = ModelStatusResponse {
            status: "downloading".to_string(),
            downloaded_bytes: 1024,
            total_bytes: 2048,
            error: Some("network error".to_string()),
        };
        let json = serde_json::to_string(&response).unwrap();
        assert!(json.contains("downloading"));
        assert!(json.contains("1024"));
        assert!(json.contains("2048"));
        assert!(json.contains("network error"));
    }

    #[test]
    fn test_model_status_response_all_states() {
        for (status_str, expected) in [
            ("idle", "idle"),
            ("downloading", "downloading"),
            ("ready", "ready"),
            ("error", "error"),
        ] {
            let response = ModelStatusResponse {
                status: status_str.to_string(),
                downloaded_bytes: 0,
                total_bytes: 0,
                error: None,
            };
            assert_eq!(response.status, expected);
        }
    }

    #[test]
    fn test_refine_result_serde() {
        let change = RefineChange {
            change_type: "modified".into(),
            text: "test text".into(),
            reason: "test reason".into(),
        };
        let result = RefineResult {
            original: "orig".into(),
            refined: "refined".into(),
            changes: vec![change],
        };
        let json = serde_json::to_string(&result).unwrap();
        assert!(json.contains("original"));
        assert!(json.contains("refined"));
        assert!(json.contains("modified"));
    }

    #[test]
    fn test_refine_change_type_field() {
        let change = RefineChange {
            change_type: "added".into(),
            text: "text".into(),
            reason: "reason".into(),
        };
        let json = serde_json::to_string(&change).unwrap();
        // The field is serialized as "type"
        assert!(json.contains("\"type\":\"added\""));
    }
}
