import { describe, it, expect, beforeEach } from "vitest";
import useSkillTreeStore from "./useSkillTreeStore";

describe("useSkillTreeStore", () => {
  beforeEach(() => {
    useSkillTreeStore.setState(useSkillTreeStore.getInitialState());
  });

  it("initializes with tier 1", () => {
    expect(useSkillTreeStore.getState().currentTier).toBe(1);
  });

  it("initializes with empty nodes", () => {
    expect(useSkillTreeStore.getState().nodes).toEqual([]);
  });

  it("initializes with empty quests", () => {
    expect(useSkillTreeStore.getState().quests).toEqual([]);
  });

  it("setCurrentTier updates tier", () => {
    useSkillTreeStore.getState().setCurrentTier(2);
    expect(useSkillTreeStore.getState().currentTier).toBe(2);
  });
});
