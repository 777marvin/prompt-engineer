import { useState } from "react";

const CHIPS = ["All", "Email", "Question", "Creative", "Compare"] as const;

function ChipNavigationBar() {
  const [activeChip, setActiveChip] = useState<string>("All");

  return (
    <nav className="flex gap-2 px-4 py-3 overflow-x-auto" aria-label="Domain filters">
      {CHIPS.map((chip) => (
        <button
          key={chip}
          type="button"
          onClick={() => setActiveChip(chip)}
          className={`px-4 py-1.5 text-sm font-medium rounded-full whitespace-nowrap transition-colors duration-[var(--duration-fast)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-primary)] ${
            activeChip === chip
              ? "bg-[var(--color-accent-primary)] text-white"
              : "bg-[var(--color-surface-secondary)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border-subtle)]"
          }`}
          aria-pressed={activeChip === chip}
        >
          {chip}
        </button>
      ))}
    </nav>
  );
}

export default ChipNavigationBar;
