import { create } from "zustand";

export interface RefineResult {
  original: string;
  refined: string;
  changes: RefineChange[];
}

export interface RefineChange {
  type: "added" | "removed" | "modified";
  text: string;
  reason: string;
}

export interface DissectorState {
  role: string | null;
  task: string | null;
  format: string | null;
  context: string | null;
}

interface PromptState {
  input: string;
  output: RefineResult | null;
  isRefining: boolean;
  dissectorState: DissectorState;
}

interface PromptActions {
  setInput: (input: string) => void;
  setOutput: (output: RefineResult | null) => void;
  setIsRefining: (isRefining: boolean) => void;
  setDissectorState: (state: DissectorState) => void;
  reset: () => void;
}

const initialState: PromptState = {
  input: "",
  output: null,
  isRefining: false,
  dissectorState: { role: null, task: null, format: null, context: null },
};

const usePromptStore = create<PromptState & PromptActions>((set) => ({
  ...initialState,

  setInput: (input) => set({ input }),
  setOutput: (output) => set({ output }),
  setIsRefining: (isRefining) => set({ isRefining }),
  setDissectorState: (dissectorState) => set({ dissectorState }),
  reset: () => set(initialState),
}));

export default usePromptStore;
