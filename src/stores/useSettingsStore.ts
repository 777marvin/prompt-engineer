import { create } from "zustand";

interface SettingsState {
  hasApiKey: boolean;
  preferredLanguage: "system" | "en" | "de";
  hintThreshold: number;
}

interface SettingsActions {
  setHasApiKey: (hasApiKey: boolean) => void;
  setPreferredLanguage: (language: "system" | "en" | "de") => void;
  setHintThreshold: (threshold: number) => void;
}

const useSettingsStore = create<SettingsState & SettingsActions>((set) => ({
  hasApiKey: false,
  preferredLanguage: "system",
  hintThreshold: 5,

  // Skeleton — full implementation in Story 3.2
  setHasApiKey: (hasApiKey) => set({ hasApiKey }),
  setPreferredLanguage: (preferredLanguage) => set({ preferredLanguage }),
  setHintThreshold: (hintThreshold) => set({ hintThreshold }),
}));

export default useSettingsStore;
