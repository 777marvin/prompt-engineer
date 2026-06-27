use crate::llm::router::LlmRouter;
use serde::Serialize;
use std::path::PathBuf;
use std::sync::atomic::AtomicU64;
use std::sync::Mutex;

#[derive(Debug, Clone, Serialize, PartialEq)]
#[serde(rename_all = "camelCase")]
pub enum ModelStatus {
    Idle,
    Downloading,
    Ready,
    Error,
}

pub struct LlmState {
    pub model_path: Mutex<Option<PathBuf>>,
    pub status: Mutex<ModelStatus>,
    pub downloaded_bytes: AtomicU64,
    pub total_bytes: AtomicU64,
    pub error_message: Mutex<Option<String>>,
}

impl LlmState {
    fn new(app_data_dir: PathBuf) -> Self {
        let path = app_data_dir.join("models").join("llama-3.2-1b-instruct-q4_k_m.gguf");
        Self {
            model_path: Mutex::new(Some(path)),
            status: Mutex::new(ModelStatus::Idle),
            downloaded_bytes: AtomicU64::new(0),
            total_bytes: AtomicU64::new(0),
            error_message: Mutex::new(None),
        }
    }

    pub fn model_file_path(&self) -> PathBuf {
        self.model_path
            .lock()
            .unwrap()
            .clone()
            .unwrap_or_else(|| PathBuf::from(""))
    }
}

pub struct AppState {
    pub llm: LlmState,
    pub router: LlmRouter,
}

impl AppState {
    pub fn new(app_data_dir: PathBuf) -> Self {
        Self {
            llm: LlmState::new(app_data_dir),
            router: LlmRouter::new(),
        }
    }

    pub fn set_status(&self, status: ModelStatus) {
        let mut guard = self.llm.status.lock().unwrap();
        *guard = status;
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_default_init() {
        let dir = PathBuf::from("/tmp/test_default_init");
        let state = AppState::new(dir.clone());
        let status = state.llm.status.lock().unwrap().clone();
        assert_eq!(status, ModelStatus::Idle);
        drop(status);
        // model_path should be Some
        let path = state.llm.model_path.lock().unwrap().clone();
        assert!(path.is_some());
    }

    #[test]
    fn test_model_path_resolution() {
        let dir = PathBuf::from("/tmp/test_model_path_resolution");
        let state = AppState::new(dir.clone());
        let expected = dir
            .join("models")
            .join("llama-3.2-1b-instruct-q4_k_m.gguf");
        assert_eq!(state.llm.model_file_path(), expected);
    }
}
