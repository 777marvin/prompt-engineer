use crate::error::AppError;
use crate::state::AppState;
use serde::Serialize;
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
