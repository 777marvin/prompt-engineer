import { describe, it, expect, beforeEach } from "vitest";
import useAppStore from "./useAppStore";

describe("useAppStore", () => {
  beforeEach(() => {
    useAppStore.setState(useAppStore.getInitialState());
  });

  it("initializes with fast-refine view", () => {
    const state = useAppStore.getState();
    expect(state.currentView).toBe("fast-refine");
  });

  it("initializes with system theme", () => {
    const state = useAppStore.getState();
    expect(state.theme).toBe("system");
  });

  it("initializes with english language", () => {
    const state = useAppStore.getState();
    expect(state.language).toBe("en");
  });

  it("initializes as online", () => {
    const state = useAppStore.getState();
    expect(state.connectivityStatus).toBe("online");
  });

  it("setView updates currentView", () => {
    useAppStore.getState().setView("skill-tree");
    expect(useAppStore.getState().currentView).toBe("skill-tree");
  });

  it("setTheme updates theme", () => {
    useAppStore.getState().setTheme("dark");
    expect(useAppStore.getState().theme).toBe("dark");
  });

  it("dismissHint adds to dismissedHints", () => {
    useAppStore.getState().dismissHint("test-hint");
    expect(useAppStore.getState().dismissedHints).toContain("test-hint");
  });
});
