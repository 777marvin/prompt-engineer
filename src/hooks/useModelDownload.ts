import { useEffect } from "react";
import { listen } from "@tauri-apps/api/event";
import useModelStore from "../stores/useModelStore";
import { getModelStatus } from "../lib/tauri";

interface LlmProgressPayload {
  downloadedBytes: number;
  totalBytes: number;
}

export function useModelDownload() {
  useEffect(() => {
    // Check current status on mount
    getModelStatus()
      .then((status) => {
        if (status.status === "ready") {
          useModelStore.getState().setStatus("ready");
        } else if (status.status === "downloading") {
          useModelStore.getState().setStatus("downloading");
          useModelStore
            .getState()
            .setProgress(
              status.downloadedBytes ?? 0,
              status.totalBytes ?? 0,
            );
        } else if (status.status === "error") {
          useModelStore.getState().setError(status.error);
          useModelStore.getState().setStatus("error");
        }
      })
      .catch(() => {
        // silently fail, model might not be ready yet
      });

    const unlistenProgress = listen<LlmProgressPayload>(
      "llm_progress",
      (event) => {
        useModelStore
          .getState()
          .setProgress(event.payload.downloadedBytes, event.payload.totalBytes);
        useModelStore.getState().setStatus("downloading");
      },
    );

    const unlistenReady = listen("model_ready", () => {
      const state = useModelStore.getState();
      useModelStore.getState().setStatus("ready");
      useModelStore.getState().setProgress(state.totalBytes, state.totalBytes);
    });

    const unlistenError = listen<{ error: string }>("model_error", (event) => {
      useModelStore.getState().setError(event.payload.error);
      useModelStore.getState().setStatus("error");
    });

    return () => {
      unlistenProgress.then((fn) => fn());
      unlistenReady.then((fn) => fn());
      unlistenError.then((fn) => fn());
    };
  }, []);
}
