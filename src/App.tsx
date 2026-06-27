import { AnimatePresence, useReducedMotion } from "framer-motion";
import useAppStore from "./stores/useAppStore";
import useModelStore from "./stores/useModelStore";
import FastRefineView from "./components/FastRefineView";
import { useModelDownload } from "./hooks/useModelDownload";
import ProgressIndicator from "./components/progress/ProgressIndicator";
import { retryModelDownload } from "./lib/tauri";

function App() {
  const currentView = useAppStore((s) => s.currentView);
  const modelStatus = useModelStore((s) => s.status);
  const downloadedBytes = useModelStore((s) => s.downloadedBytes);
  const totalBytes = useModelStore((s) => s.totalBytes);
  const error = useModelStore((s) => s.error);

  // Set up model download lifecycle
  useModelDownload();

  const prefersReducedMotion = useReducedMotion();

  const value =
    totalBytes > 0
      ? Math.round((downloadedBytes / totalBytes) * 100)
      : 0;

  const handleRetry = async () => {
    try {
      await retryModelDownload();
    } catch (e) {
      console.error("Retry failed", e);
    }
  };

  const presenceProps = prefersReducedMotion
    ? { mode: "wait" as const }
    : { mode: "wait" as const };

  return (
    <>
      <ProgressIndicator
        value={value}
        status={modelStatus}
        error={error ?? undefined}
        onRetry={handleRetry}
      />
      <AnimatePresence {...presenceProps}>
        {currentView === "fast-refine" && <FastRefineView />}
        {/* Future views will be added here:
            currentView === 'skill-tree' && <SkillTreeVisualization />
            currentView === 'master-mode' && <MasterModeDialog />
            currentView === 'adapter-preview' && <AdapterPreview />
        */}
      </AnimatePresence>
    </>
  );
}

export default App;
