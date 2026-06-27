import { create } from "zustand";

export type ModelStatus = "idle" | "downloading" | "ready" | "error";

interface ModelState {
  status: ModelStatus;
  downloadedBytes: number;
  totalBytes: number;
  error: string | null;
}

interface ModelActions {
  setProgress: (downloadedBytes: number, totalBytes: number) => void;
  setStatus: (status: ModelStatus) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const initialState: ModelState = {
  status: "idle",
  downloadedBytes: 0,
  totalBytes: 0,
  error: null,
};

const useModelStore = create<ModelState & ModelActions>((set) => ({
  ...initialState,

  setProgress: (downloadedBytes, totalBytes) =>
    set({ downloadedBytes, totalBytes }),
  setStatus: (status) => set({ status }),
  setError: (error) => set({ error }),
  reset: () => set(initialState),
}));

export default useModelStore;
