import { describe, it, expect, beforeEach } from "vitest";
import usePromptStore from "./usePromptStore";

describe("usePromptStore", () => {
  beforeEach(() => {
    usePromptStore.setState(usePromptStore.getInitialState());
  });

  it("initializes with empty input", () => {
    expect(usePromptStore.getState().input).toBe("");
  });

  it("initializes with null output", () => {
    expect(usePromptStore.getState().output).toBeNull();
  });

  it("initializes with isRefining false", () => {
    expect(usePromptStore.getState().isRefining).toBe(false);
  });

  it("setInput updates input", () => {
    usePromptStore.getState().setInput("test prompt");
    expect(usePromptStore.getState().input).toBe("test prompt");
  });

  it("reset clears state", () => {
    usePromptStore.getState().setInput("test");
    usePromptStore.getState().reset();
    expect(usePromptStore.getState().input).toBe("");
  });
});
