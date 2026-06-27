import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import DemoPromptBanner from "./DemoPromptBanner";

describe("DemoPromptBanner", () => {
  it("renders without crashing", () => {
    const { container } = render(
      <DemoPromptBanner onUseDemo={vi.fn()} />,
    );
    expect(container).toBeTruthy();
  });

  it("renders demo text", () => {
    const { getByText } = render(
      <DemoPromptBanner onUseDemo={vi.fn()} />,
    );
    expect(getByText(/complaint email/i)).toBeInTheDocument();
  });

  it("calls onUseDemo when Try this prompt is clicked", () => {
    const onUseDemo = vi.fn();
    const { getByText } = render(
      <DemoPromptBanner onUseDemo={onUseDemo} />,
    );
    fireEvent.click(getByText(/try this prompt/i));
    expect(onUseDemo).toHaveBeenCalledTimes(1);
  });

  it("disappears when Dismiss is clicked", () => {
    const { getByText, queryByText } = render(
      <DemoPromptBanner onUseDemo={vi.fn()} />,
    );
    fireEvent.click(getByText(/dismiss/i));
    expect(queryByText(/complaint email/i)).not.toBeInTheDocument();
  });
});
