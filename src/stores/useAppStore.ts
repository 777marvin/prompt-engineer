import { create } from "zustand";

export type AppView =
  | "fast-refine"
  | "master-mode"
  | "skill-tree"
  | "adapter-preview";
export type ThemeMode = "light" | "dark" | "system";
export type AppLanguage = "en" | "de";
export type ConnectivityStatus = "online" | "offline";

interface AppState {
  currentView: AppView;
  theme: ThemeMode;
  language: AppLanguage;
  connectivityStatus: ConnectivityStatus;
  hasSeenDissectorIntro: boolean;
  dismissedHints: string[];
}

interface AppActions {
  setView: (view: AppView) => void;
  setTheme: (theme: ThemeMode) => void;
  setLanguage: (language: AppLanguage) => void;
  setConnectivityStatus: (status: ConnectivityStatus) => void;
  dismissHint: (hintId: string) => void;
}

const useAppStore = create<AppState & AppActions>((set) => ({
  currentView: "fast-refine",
  theme: "system",
  language: "en",
  connectivityStatus: "online",
  hasSeenDissectorIntro: false,
  dismissedHints: [],

  setView: (view) => set({ currentView: view }),
  setTheme: (theme) => set({ theme }),
  setLanguage: (language) => set({ language }),
  setConnectivityStatus: (status) => set({ connectivityStatus: status }),
  dismissHint: (hintId) =>
    set((state) => ({
      dismissedHints: [...state.dismissedHints, hintId],
    })),
}));

export default useAppStore;
