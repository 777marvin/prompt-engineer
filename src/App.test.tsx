import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import App from "./App";
import useAppStore from "./stores/useAppStore";

// Mock Tauri event listener (used in App.tsx for model download events)
vi.mock("@tauri-apps/api/event", () => ({
  listen: vi.fn(() => Promise.resolve(() => {})),
}));

describe("App", () => {
  beforeEach(() => {
    useAppStore.setState(useAppStore.getInitialState());
  });

  it("renders without crashing", () => {
    const { container } = render(<App />);
    expect(container).toBeTruthy();
  });

  it("renders the welcome text", () => {
    const { getByText } = render(<App />);
    expect(
      getByText(/where shall we explore today/i),
    ).toBeInTheDocument();
  });
});
