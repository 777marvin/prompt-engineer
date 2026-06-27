import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import FastRefineView from "./FastRefineView";
import useModelStore from "../stores/useModelStore";
import usePromptStore from "../stores/usePromptStore";
import { invoke } from "@tauri-apps/api/core";

vi.mock("@tauri-apps/api/core", () => ({
  invoke: vi.fn(),
}));

beforeEach(() => {
  useModelStore.setState({
    status: "ready",
    downloadedBytes: 0,
    totalBytes: 0,
    error: null,
  });
  usePromptStore.setState({
    input: "",
    output: null,
    isRefining: false,
    dissectorState: { role: null, task: null, format: null, context: null },
  });
});

describe("FastRefineView", () => {
  it('renders CTA button with "✨ Discover Your Prompt" when model is ready', async () => {
    await act(async () => {
      render(<FastRefineView />);
    });
    const btn = screen.getByRole("button", {
      name: /✨ Discover Your Prompt/i,
    });
    expect(btn).toBeInTheDocument();
    expect(btn).not.toBeDisabled();
  });

  it('renders "Preparing AI..." when model is downloading', async () => {
    await act(async () => {
      useModelStore.setState({
        status: "downloading",
      });
      render(<FastRefineView />);
    });
    const btn = screen.getByRole("button", { name: /Preparing AI/i });
    expect(btn).toBeInTheDocument();
    expect(btn).toBeDisabled();
  });

  it('renders "Download failed - Retry" when model has error', async () => {
    await act(async () => {
      useModelStore.setState({
        status: "error",
      });
      render(<FastRefineView />);
    });
    const btn = screen.getByRole("button", { name: /Download failed/i });
    expect(btn).toBeInTheDocument();
    expect(btn).toBeDisabled();
  });

  it("calls fastRefine when CTA clicked with non-empty input", async () => {
    vi.mocked(invoke).mockResolvedValue({
      original: "test prompt",
      refined: "**Role:** expert\n**Task:** help\n**Format:** text\n**Context:** none",
      changes: [],
    });

    await act(async () => {
      usePromptStore.setState({ input: "test prompt" });
      render(<FastRefineView />);
    });

    const btn = screen.getByRole("button", { name: /✨ Discover Your Prompt/i });
    await act(async () => {
      fireEvent.click(btn);
    });

    expect(invoke).toHaveBeenCalledWith("fast_refine", { input: "test prompt" });
  });

  it("does not call fastRefine when CTA clicked with empty input", async () => {
    await act(async () => {
      render(<FastRefineView />);
    });

    const btn = screen.getByRole("button", { name: /✨ Discover Your Prompt/i });
    await act(async () => {
      fireEvent.click(btn);
    });

    expect(invoke).not.toHaveBeenCalled();
  });

  it("displays refined output when output exists", async () => {
    const refinedText =
      "**Role:** expert\n**Task:** help\n**Format:** text\n**Context:** none";
    await act(async () => {
      usePromptStore.setState({
        output: {
          original: "test",
          refined: refinedText,
          changes: [],
        },
      });
      render(<FastRefineView />);
    });

    expect(screen.getByText(/expert/)).toBeInTheDocument();
    expect(screen.getByText(/help/)).toBeInTheDocument();
  });

  it("shows copy button when output exists", async () => {
    await act(async () => {
      usePromptStore.setState({
        output: {
          original: "test",
          refined: "some refined content",
          changes: [],
        },
      });
      render(<FastRefineView />);
    });

    const copyBtn = screen.getByText(/Copy/);
    expect(copyBtn).toBeInTheDocument();
  });

  it("copies text to clipboard on copy button click", async () => {
    const writeTextMock = vi.fn();
    Object.assign(navigator, {
      clipboard: { writeText: writeTextMock },
    });

    const refinedText = "**Role:** expert\n**Task:** help\n**Format:** text\n**Context:** none";

    await act(async () => {
      usePromptStore.setState({
        output: {
          original: "test",
          refined: refinedText,
          changes: [],
        },
      });
      render(<FastRefineView />);
    });

    const copyBtn = screen.getByText(/📋 Copy/);
    await act(async () => {
      fireEvent.click(copyBtn);
    });

    expect(writeTextMock).toHaveBeenCalledWith(refinedText);
  });
});
