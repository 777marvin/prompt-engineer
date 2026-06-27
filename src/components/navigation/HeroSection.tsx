import { motion } from "framer-motion";

const compassIcon = (
  <svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-[var(--color-accent-secondary)]"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88" />
    <line x1="12" y1="12" x2="12" y2="12" />
  </svg>
);

function HeroSection() {
  return (
    <motion.header
      className="flex flex-col items-center text-center px-6 pt-12 pb-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.div
        className="mb-4"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
      >
        {compassIcon}
      </motion.div>
      <h1 className="text-4xl font-bold text-[var(--color-text-primary)] mb-2">
        Where shall we explore today?
      </h1>
      <p className="text-lg text-[var(--color-text-secondary)] max-w-lg">
        Your AI prompt coach — no account, no setup, just discovery
      </p>
    </motion.header>
  );
}

export default HeroSection;
