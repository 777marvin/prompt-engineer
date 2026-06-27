import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeroSection from "./navigation/HeroSection";
import DemoPromptBanner from "./navigation/DemoPromptBanner";
import ChipNavigationBar from "./navigation/ChipNavigationBar";
import ThemeToggle from "./navigation/ThemeToggle";
import usePromptStore from "../stores/usePromptStore";
import useModelStore from "../stores/useModelStore";
import { fastRefine } from "../lib/tauri";

function FastRefineView() {
  const [showDemo, setShowDemo] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showPlaceholderHint, setShowPlaceholderHint] = useState(false);

  const input = usePromptStore((s) => s.input);
  const setInput = usePromptStore((s) => s.setInput);
  const output = usePromptStore((s) => s.output);
  const setOutput = usePromptStore((s) => s.setOutput);
  const isRefining = usePromptStore((s) => s.isRefining);
  const setIsRefining = usePromptStore((s) => s.setIsRefining);
  const modelStatus = useModelStore((s) => s.status);
  const downloadedBytes = useModelStore((s) => s.downloadedBytes);
  const totalBytes = useModelStore((s) => s.totalBytes);
  const error = useModelStore((s) => s.error);

  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setToastMessage(null), 3000);
  }, []);

  const handleUseDemo = useCallback((text: string) => {
    setInput(text);
    setShowDemo(false);
  }, [setInput]);

  const handleRefine = useCallback(async () => {
    if (modelStatus !== "ready") return;
    if (input.trim() === "") {
      setShowPlaceholderHint(true);
      setTimeout(() => setShowPlaceholderHint(false), 600);
      return;
    }
    setIsRefining(true);
    try {
      const result = await fastRefine(input);
      setOutput(result);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      showToast(errorMessage);
    } finally {
      setIsRefining(false);
    }
  }, [modelStatus, input, setIsRefining, setOutput, showToast]);

  const handleCopy = useCallback(async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output.refined);
      showToast("✅ Copied!");
    } catch {
      showToast("Copy manually - clipboard access denied");
    }
  }, [output, showToast]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

  // Determine button text and disabled state
  const isDisabled = modelStatus !== "ready" || isRefining;
  let buttonText: string;
  switch (modelStatus) {
    case "idle":
      buttonText = "Initializing...";
      break;
    case "downloading":
      buttonText = "Preparing AI...";
      break;
    case "error":
      buttonText = "Download failed - Retry";
      break;
    case "ready":
    default:
      if (isRefining) {
        buttonText = "Refining...";
      } else {
        buttonText = "✨ Discover Your Prompt";
      }
      break;
  }

  return (
    <main
      role="main"
      className="flex flex-col min-h-screen bg-[var(--color-surface-primary)]"
    >
      <div className="flex justify-end px-6 pt-4">
        <ThemeToggle />
      </div>
      <HeroSection />
      {showDemo && input === "" && (
        <DemoPromptBanner onUseDemo={handleUseDemo} />
      )}
      <ChipNavigationBar />

      {/* Responsive grid container */}
      <div className="flex-1 flex flex-col px-4 max-w-6xl mx-auto w-full lg:grid lg:grid-cols-2 lg:gap-6 pb-8">
        {/* Left column – Input */}
        <div className="flex flex-col items-center w-full lg:items-stretch">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your prompt here or try the demo above..."
            className={`w-full min-h-[120px] p-4 font-sans text-sm bg-[var(--color-surface-elevated)] border border-Sonnen-Gold/30 rounded-2xl resize-y focus:outline-none focus:ring-2 focus:ring-Himmelblau focus:ring-offset-2 focus:border-transparent placeholder:text-[var(--color-text-tertiary)] text-[var(--color-text-primary)] transition-shadow duration-[var(--duration-fast)] ${
              showPlaceholderHint
                ? "animate-pulse placeholder-red-400"
                : ""
            }`}
            aria-label="Prompt input"
            rows={4}
          />

          <motion.button
            type="button"
            disabled={isDisabled}
            onClick={handleRefine}
            className={`mt-4 px-8 py-3 text-lg font-semibold rounded-full text-white transition-all duration-[var(--duration-natural)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-primary)] ${
              isDisabled
                ? "bg-[var(--color-text-tertiary)] cursor-not-allowed opacity-60"
                : "bg-gradient-to-r from-[var(--color-accent-secondary)] to-[var(--color-accent-tertiary)] shadow-glow hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
            }`}
            whileTap={!isDisabled ? { scale: 0.97 } : undefined}
            aria-label={buttonText}
          >
            {isRefining ? (
              <span className="inline-flex items-center gap-2">
                <svg
                  className="animate-spin h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
                Refining...
              </span>
            ) : (
              buttonText
            )}
          </motion.button>
        </div>

        {/* Right column – Output */}
        <div className="mt-6 lg:mt-0">
          {output && (
            <div className="relative bg-white rounded-2xl border-t-4 border-[var(--color-accent-primary)] shadow-md p-6">
              <div className="font-mono text-sm whitespace-pre-wrap break-words text-gray-800">
                {output.refined}
              </div>
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="border-2 border-Himmelblau rounded-lg px-4 py-2 text-sm font-medium text-Himmelblau hover:bg-Himmelblau hover:bg-opacity-10 transition-colors focus-visible:outline-2 focus-visible:outline-Himmelblau"
                >
                  📋 Copy
                </button>
              </div>
            </div>
          )}

          {/* Toast component */}
          <AnimatePresence>
            {toastMessage && (
              <motion.div
                key="toast"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                role="status"
                aria-live="polite"
                className="fixed bottom-6 right-6 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium z-50"
              >
                {toastMessage}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}

export default FastRefineView;
