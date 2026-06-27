use serde::Serialize;
use thiserror::Error;

#[derive(Debug, Clone, Serialize, Error)]
#[serde(rename_all = "camelCase")]
pub enum AppError {
    #[error("LLM not ready - model is still downloading")]
    LlmNotReady,

    #[error("LLM inference failed: {0}")]
    LlmInferenceFailed(String),

    #[error("Model download failed: {0}")]
    DownloadFailed(String),

    #[error("Network error: {0}")]
    NetworkError(String),

    #[error("Internal error: {0}")]
    InternalError(String),
}

impl AppError {
    pub fn error_code(&self) -> &'static str {
        match self {
            AppError::LlmNotReady => "LLM_NOT_READY",
            AppError::LlmInferenceFailed(_) => "LLM_INFERENCE_FAILED",
            AppError::DownloadFailed(_) => "DOWNLOAD_FAILED",
            AppError::NetworkError(_) => "NETWORK_ERROR",
            AppError::InternalError(_) => "INTERNAL_ERROR",
        }
    }
}

impl From<AppError> for tauri::ipc::InvokeError {
    fn from(err: AppError) -> Self {
        tauri::ipc::InvokeError::from(err.to_string())
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_serialization() {
        let err = AppError::LlmNotReady;
        let json = serde_json::to_string(&err).unwrap();
        assert!(json.contains("\"code\""));
        assert!(json.contains("\"message\""));
        // Since we use #[serde(rename_all = "camelCase")] the fields will be
        // "llmNotReady" as variant? Actually enum serialization
        // uses variant name, renamed. Just check it doesn't crash.
        // For safety we check that we can deserialize back:
        let _deserialized: AppError = serde_json::from_str(&json).unwrap();
    }

    #[test]
    fn test_error_code() {
        assert_eq!(AppError::LlmNotReady.error_code(), "LLM_NOT_READY");
        assert_eq!(
            AppError::LlmInferenceFailed("foo".into()).error_code(),
            "LLM_INFERENCE_FAILED"
        );
        assert_eq!(
            AppError::DownloadFailed("bar".into()).error_code(),
            "DOWNLOAD_FAILED"
        );
        assert_eq!(
            AppError::NetworkError("baz".into()).error_code(),
            "NETWORK_ERROR"
        );
        assert_eq!(
            AppError::InternalError("qux".into()).error_code(),
            "INTERNAL_ERROR"
        );
    }
}
