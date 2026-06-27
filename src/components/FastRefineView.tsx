import { useState } from "react";
import { motion } from "framer-motion";
import HeroSection from "./navigation/HeroSection";
import DemoPromptBanner from "./navigation/DemoPromptBanner";
import ChipNavigationBar from "./navigation/ChipNavigationBar";
import ThemeToggle from "./navigation/ThemeToggle";
import usePromptStore from "../stores/usePromptStore";
import useModelStore from "../stores/useModelStore";

function FastRefineView() {
  const [showDemo, setShowDemo] = useState(true);
  const input = usePromptStore((s) => s.input);
  const setInput = usePromptStore((s) => s.setInput);
  const modelStatus = useModelStore((s) => s.status);

  const handleUseDemo = (text: string) => {
    setInput(text);
    setShowDemo(false);
  };

  const isDisabled = modelStatus !== "ready";

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
      <div className="flex-1 flex flex-col items-center px-4 max-w-2xl mx-auto w-full">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your prompt here or try the demo above..."
          className="w-full min-h-[120px] p-4 font-mono text-sm bg-[var(--color-surface-elevated)] border border-[var(--color-border-subtle)] rounded-xl resize-y focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-primary)] focus:border-transparent placeholder:text-[var(--color-text-tertiary)] text-[var(--color-text-primary)] transition-shadow duration-[var(--duration-fast)]"
          aria-label="Prompt input"
          rows={4}
        />
        <motion.button
          type="button"
          disabled={isDisabled || input.trim() === ""}
          className={`mt-4 px-8 py-3 text-lg font-semibold rounded-full text-white transition-all duration-[var(--duration-natural)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-primary)] ${
            isDisabled || input.trim() === ""
              ? "bg-[var(--color-text-tertiary)] cursor-not-allowed opacity-60"
              : "bg-gradient-to-r from-[var(--color-accent-secondary)] to-[var(--color-accent-tertiary)] shadow-glow hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
          }`}
          whileHover={
            !isDisabled && input.trim() !== ""
              ? { scale: 1.02 }
              : undefined
          }
          whileTap={
            !isDisabled && input.trim() !== "" ? { scale: 0.98 } : undefined
          }
          aria-label="Discover your prompt"
        >
          {isDisabled ? "Preparing AI..." : "✦ Discover Your Prompt"}
        </motion.button>
      </div>
    </main>
  );
}

export default FastRefineView;
