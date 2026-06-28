import { describe, it, expect, vi, beforeEach } from "vitest";
import { fastRefine } from "./tauri";

const { invoke } = vi.hoisted(() => ({
  invoke: vi.fn(),
}));

vi.mock("@tauri-apps/api/core", () => ({
  invoke,
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe("fastRefine", () => {
  it("invokes fast_refine command with input parameter", async () => {
    const mockResult = {
      original: "test",
      refined: "refined",
      changes: [],
    };
    invoke.mockResolvedValue(mockResult);

    const result = await fastRefine("hello world");

    expect(invoke).toHaveBeenCalledWith("fast_refine", { input: "hello world" });
    expect(result).toEqual(mockResult);
  });

  it("propagates errors from the backend", async () => {
    const appError = {
      code: "LLM_NOT_READY",
      message: "LLM not ready",
    };
    invoke.mockRejectedValue(appError);

    await expect(fastRefine("test")).rejects.toEqual(appError);
  });
});
