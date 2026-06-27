import { create } from "zustand";

export interface SkillTreeNode {
  id: string;
  label: string;
  tier: number;
  completed: boolean;
  prerequisites: string[];
}

export interface Quest {
  id: string;
  label: string;
  description: string;
  completed: boolean;
  skillNodeId: string;
}

interface SkillTreeState {
  currentTier: number;
  nodes: SkillTreeNode[];
  quests: Quest[];
}

interface SkillTreeActions {
  setCurrentTier: (tier: number) => void;
  setNodes: (nodes: SkillTreeNode[]) => void;
  setQuests: (quests: Quest[]) => void;
}

const useSkillTreeStore = create<SkillTreeState & SkillTreeActions>((set) => ({
  currentTier: 1,
  nodes: [],
  quests: [],

  // Skeleton — full implementation in Story 5.1
  setCurrentTier: (currentTier) => set({ currentTier }),
  setNodes: (nodes) => set({ nodes }),
  setQuests: (quests) => set({ quests }),
}));

export default useSkillTreeStore;
