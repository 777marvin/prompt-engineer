import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useModelDownload } from "./useModelDownload";
import useModelStore from "../stores/useModelStore";

// Mock @tauri-apps/api/event
vi.mock("@tauri-apps/api/event", () => ({
  listen: vi.fn(),
}));

// Mock the tauri lib
vi.mock("../lib/tauri", () => ({
  getModelStatus: vi.fn(),
  retryModelDownload: vi.fn(),
}));

import { listen } from "@tauri-apps/api/event";
import { getModelStatus } from "../lib/tauri";

describe("useModelDownload", () => {
  const mockUnlisten = vi.fn();
  const mockListen = listen as ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
    useModelStore.setState(useModelStore.getInitialState());

    // Default: return an unresolved promise for listen (simulates waiting)
    mockListen.mockReturnValue(
      Promise.resolve(mockUnlisten) as unknown as ReturnType<typeof listen>,
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("calls getModelStatus on mount", () => {
    (getModelStatus as ReturnType<typeof vi.fn>).mockResolvedValue({
      status: "idle",
    });

    renderHook(() => useModelDownload());

    expect(getModelStatus).toHaveBeenCalledTimes(1);
  });

  it("sets status to ready when model is already ready", async () => {
    (getModelStatus as ReturnType<typeof vi.fn>).mockResolvedValue({
      status: "ready",
    });

    renderHook(() => useModelDownload());

    // Wait for the promise to resolve
    await vi.waitFor(() => {
      expect(useModelStore.getState().status).toBe("ready");
    });
  });

  it("sets status to downloading and restores progress", async () => {
    (getModelStatus as ReturnType<typeof vi.fn>).mockResolvedValue({
      status: "downloading",
      downloadedBytes: 500,
      totalBytes: 1000,
    });

    renderHook(() => useModelDownload());

    await vi.waitFor(() => {
      const state = useModelStore.getState();
      expect(state.status).toBe("downloading");
      expect(state.downloadedBytes).toBe(500);
      expect(state.totalBytes).toBe(1000);
    });
  });

  it("registers three event listeners on mount", () => {
    (getModelStatus as ReturnType<typeof vi.fn>).mockResolvedValue({
      status: "idle",
    });

    renderHook(() => useModelDownload());

    expect(mockListen).toHaveBeenCalledWith(
      "llm_progress",
      expect.any(Function),
    );
    expect(mockListen).toHaveBeenCalledWith(
      "model_ready",
      expect.any(Function),
    );
    expect(mockListen).toHaveBeenCalledWith(
      "model_error",
      expect.any(Function),
    );
  });

  it("returns cleanup function that unlistens all listeners", async () => {
    (getModelStatus as ReturnType<typeof vi.fn>).mockResolvedValue({
      status: "idle",
    });

    const { unmount } = renderHook(() => useModelDownload());

    unmount();

    // Wait for microtasks (Promise.then callbacks) to flush
    await vi.waitFor(() => {
      expect(mockUnlisten).toHaveBeenCalledTimes(3);
    });
  });

  it("handles getModelStatus rejection gracefully", async () => {
    (getModelStatus as ReturnType<typeof vi.fn>).mockRejectedValue(
      new Error("backend unavailable"),
    );

    // Should not throw
    expect(() => renderHook(() => useModelDownload())).not.toThrow();

    // Status should remain idle
    expect(useModelStore.getState().status).toBe("idle");
  });
});
