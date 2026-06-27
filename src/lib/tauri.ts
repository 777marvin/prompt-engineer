import { invoke } from "@tauri-apps/api/core";
import type { RefineResult } from "../stores/usePromptStore";

/**
 * Typed Tauri invoke wrapper.
 * All invoke() calls MUST be:
 * - Wrapped in try/catch
 * - Typed with <T> generic
 * - Centralized here (not scattered across components)
 */

export async function fastRefine(input: string): Promise<RefineResult> {
  return invoke<RefineResult>("fast_refine", { input });
}

export async function detectDomain(input: string): Promise<string> {
  return invoke<string>("detect_domain", { input });
}

export async function getModelStatus(): Promise<{
  status: string;
  downloadedBytes: number;
  totalBytes: number;
  error: string | null;
}> {
  return invoke<{
    status: string;
    downloadedBytes: number;
    totalBytes: number;
    error: string | null;
  }>("get_model_status");
}

export async function retryModelDownload(): Promise<void> {
  return invoke<void>("retry_model_download");
}
