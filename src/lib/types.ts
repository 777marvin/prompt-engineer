export interface RefineResult {
  original: string;
  refined: string;
  changes: RefineChange[];
}

export interface RefineChange {
  type: "added" | "removed" | "modified";
  text: string;
  reason: string;
}

export interface AppError {
  code: AppErrorCode;
  message: string;
}

export type AppErrorCode =
  | "LLM_NOT_READY"
  | "LLM_INFERENCE_FAILED"
  | "DOWNLOAD_FAILED"
  | "API_KEY_MISSING"
  | "API_RATE_LIMITED"
  | "API_TIMEOUT"
  | "NETWORK_ERROR"
  | "INVALID_INPUT"
  | "INTERNAL_ERROR"
  | "SIDECAR_UNAVAILABLE"
  | "DATABASE_ERROR"
  | "UPDATE_FAILED";
