import { describe, it, expect, beforeEach } from "vitest";
import useModelStore from "./useModelStore";

describe("useModelStore", () => {
  beforeEach(() => {
    useModelStore.setState(useModelStore.getInitialState());
  });

  it("initializes with idle status", () => {
    expect(useModelStore.getState().status).toBe("idle");
  });

  it("initializes with zero bytes", () => {
    const state = useModelStore.getState();
    expect(state.downloadedBytes).toBe(0);
    expect(state.totalBytes).toBe(0);
  });

  it("setProgress updates byte counts", () => {
    useModelStore.getState().setProgress(500, 1000);
    const state = useModelStore.getState();
    expect(state.downloadedBytes).toBe(500);
    expect(state.totalBytes).toBe(1000);
  });

  it("setStatus updates status", () => {
    useModelStore.getState().setStatus("ready");
    expect(useModelStore.getState().status).toBe("ready");
  });

  it("setError updates error", () => {
    useModelStore.getState().setError("something went wrong");
    expect(useModelStore.getState().error).toBe("something went wrong");
  });

  it("reset clears state", () => {
    useModelStore.getState().setStatus("downloading");
    useModelStore.getState().reset();
    expect(useModelStore.getState().status).toBe("idle");
  });
});
