import { useEffect } from "react";
import {
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import { listen } from "@tauri-apps/api/event";
import useAppStore from "./stores/useAppStore";
import useModelStore from "./stores/useModelStore";
import FastRefineView from "./components/FastRefineView";

interface LlmProgressPayload {
  downloadedBytes: number;
  totalBytes: number;
}

function App() {
  const currentView = useAppStore((s) => s.currentView);

  // Set up Tauri event listeners for model download lifecycle
  useEffect(() => {
    const unlistenProgress = listen<LlmProgressPayload>(
      "llm_progress",
      (event) => {
        useModelStore
          .getState()
          .setProgress(event.payload.downloadedBytes, event.payload.totalBytes);
      },
    );

    const unlistenReady = listen("model_ready", () => {
      useModelStore.getState().setStatus("ready");
    });

    const unlistenError = listen<{ message: string }>(
      "model_error",
      (event) => {
        useModelStore.getState().setError(event.payload.message);
        useModelStore.getState().setStatus("error");
      },
    );

    return () => {
      unlistenProgress.then((fn) => fn());
      unlistenReady.then((fn) => fn());
      unlistenError.then((fn) => fn());
    };
  }, []);

  const prefersReducedMotion = useReducedMotion();

  const presenceProps = prefersReducedMotion
    ? { mode: "wait" as const }
    : { mode: "wait" as const };

  return (
    <AnimatePresence {...presenceProps}>
      {currentView === "fast-refine" && <FastRefineView />}
      {/* Future views will be added here:
          currentView === 'skill-tree' && <SkillTreeVisualization />
          currentView === 'master-mode' && <MasterModeDialog />
          currentView === 'adapter-preview' && <AdapterPreview />
      */}
    </AnimatePresence>
  );
}

export default App;
