import { describe, it, expect } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import ChipNavigationBar from "./ChipNavigationBar";

describe("ChipNavigationBar", () => {
  it("renders without crashing", () => {
    const { container } = render(<ChipNavigationBar />);
    expect(container).toBeTruthy();
  });

  it("renders All chip as default active", () => {
    const { getByText } = render(<ChipNavigationBar />);
    const allChip = getByText("All");
    expect(allChip).toBeInTheDocument();
    expect(allChip).toHaveAttribute("aria-pressed", "true");
  });

  it("highlights clicked chip", () => {
    const { getByText } = render(<ChipNavigationBar />);
    const emailChip = getByText("Email");
    fireEvent.click(emailChip);
    expect(emailChip).toHaveAttribute("aria-pressed", "true");
  });
});
