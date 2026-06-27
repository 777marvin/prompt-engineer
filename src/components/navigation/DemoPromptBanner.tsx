import { motion } from "framer-motion";
import { useState } from "react";

const DEMO_TEXT =
  "I need to write a complaint email about a late delivery but I want to stay professional";

interface DemoPromptBannerProps {
  onUseDemo: (text: string) => void;
}

function DemoPromptBanner({ onUseDemo }: DemoPromptBannerProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <motion.div
      className="mx-auto max-w-2xl px-4 mb-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <div className="relative border border-[var(--color-border-subtle)] bg-[var(--color-surface-elevated)] rounded-xl p-4 shadow-card">
        <span className="absolute -top-2 left-4 px-2 py-0.5 text-xs font-semibold text-white bg-[var(--color-accent-secondary)] rounded-full">
          Demo
        </span>
        <p className="font-mono text-sm text-[var(--color-text-primary)] pt-1 leading-relaxed">
          {DEMO_TEXT}
        </p>
        <div className="flex gap-2 mt-3">
          <button
            type="button"
            onClick={() => onUseDemo(DEMO_TEXT)}
            className="px-3 py-1.5 text-sm font-medium text-white bg-[var(--color-accent-primary)] rounded-lg hover:opacity-90 transition-opacity duration-[var(--duration-fast)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-primary)]"
            aria-label="Use demo prompt"
          >
            Try this prompt
          </button>
          <button
            type="button"
            onClick={() => setDismissed(true)}
            className="px-3 py-1.5 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors duration-[var(--duration-fast)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-primary)]"
            aria-label="Dismiss demo prompt"
          >
            Dismiss
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default DemoPromptBanner;
