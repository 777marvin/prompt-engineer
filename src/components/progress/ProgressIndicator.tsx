import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ProgressIndicatorProps {
  value: number; // 0-100
  status: "idle" | "downloading" | "ready" | "error";
  error?: string;
  onRetry?: () => void;
}

// facts that rotate every 8 seconds
const TIPS = [
  "Local AI means your data never leaves your device",
  "Llama 3.2 runs entirely offline after download",
  "Your prompts are processed on your own machine",
  "No internet connection required once the model is ready",
];

function formatBytes(bytes: number): string {
  if (bytes <= 0) return "0 MB";
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(0)} MB`;
}

function ProgressIndicator({
  value,
  status,
  error,
  onRetry,
}: ProgressIndicatorProps) {
  // ---------- idle: render nothing ----------
  if (status === "idle") return null;

  // ---------- rotating tips ----------
  const [tipIndex, setTipIndex] = useState(0);
  useEffect(() => {
    if (status !== "downloading") return;
    const interval = setInterval(() => {
      setTipIndex((i) => (i + 1) % TIPS.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [status]);

  // ---------- ready: fade out after 2 s ----------
  const [showReady, setShowReady] = useState(true);
  useEffect(() => {
    if (status === "ready") {
      setShowReady(true);
      const timer = setTimeout(() => setShowReady(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      className="fixed top-0 left-0 right-0 z-50"
    >
      {/* ===== DOWNLOADING ===== */}
      {status === "downloading" && (
        <div className="bg-[var(--color-surface-secondary)] border-b border-[var(--color-border-subtle)] px-4 py-2 space-y-1">
          {/* progress bar */}
          <div className="w-full h-2 bg-[var(--color-border-subtle)] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[var(--color-accent-primary)] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${value}%` }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
              }}
            />
          </div>
          {/* percentage + bytes */}
          <div className="flex justify-between text-xs text-[var(--color-text-secondary)]">
            <span>{value}%</span>
            <span>
              {formatBytes(0)} / {formatBytes(0)} MB
            </span>
          </div>
          {/* rotating tips */}
          <AnimatePresence mode="wait">
            <motion.p
              key={tipIndex}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.3 }}
              className="text-xs text-center text-[var(--color-text-tertiary)] italic"
            >
              {TIPS[tipIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
      )}

      {/* ===== READY ===== */}
      {status === "ready" && (
        <AnimatePresence>
          {showReady && (
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="bg-[var(--color-status-success)] text-white text-center text-sm py-1"
            >
              Your AI is ready
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* ===== ERROR ===== */}
      {status === "error" && (
        <div className="bg-[var(--color-status-error)] text-white text-sm px-4 py-2 flex items-center justify-between">
          <span>{error ?? "An error occurred"}</span>
          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="ml-4 underline hover:no-underline focus-visible:outline-2 focus-visible:outline-white"
            >
              Retry
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default ProgressIndicator;
