import { describe, it, expect, vi } from "vitest";
import { act, render, screen, fireEvent } from "@testing-library/react";
import ProgressIndicator from "./ProgressIndicator";

// mock framer-motion (no animation needed in test)
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...rest }: any) => <div {...rest}>{children}</div>,
    p: ({ children, ...rest }: any) => <p {...rest}>{children}</p>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe("ProgressIndicator", () => {
  it("renders nothing when status is idle", () => {
    const { container } = render(
      <ProgressIndicator value={0} status="idle" />,
    );
    expect(container.firstChild).toBeNull();
  });

  it("shows progress bar when downloading", () => {
    render(<ProgressIndicator value={42} status="downloading" />);
    const bar = screen.getByRole("progressbar");
    expect(bar).toBeInTheDocument();
    expect(bar).toHaveAttribute("aria-valuenow", "42");
    expect(bar).toHaveAttribute("aria-valuemin", "0");
    expect(bar).toHaveAttribute("aria-valuemax", "100");
  });

  it('shows "Your AI is ready" when ready', () => {
    render(<ProgressIndicator value={100} status="ready" />);
    expect(screen.getByText("Your AI is ready")).toBeInTheDocument();
  });

  it("shows error message and retry button when error", () => {
    const onRetry = vi.fn();
    render(
      <ProgressIndicator
        value={0}
        status="error"
        error="Something went wrong"
        onRetry={onRetry}
      />,
    );
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Retry"));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it("fades out ready message after 2 seconds", () => {
    vi.useFakeTimers();
    render(<ProgressIndicator value={100} status="ready" />);
    expect(screen.getByText("Your AI is ready")).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    // after 2 seconds the component should have unmounted the message
    expect(screen.queryByText("Your AI is ready")).not.toBeInTheDocument();
    vi.useRealTimers();
  });
});
