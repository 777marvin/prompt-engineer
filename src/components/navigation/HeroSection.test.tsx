import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import HeroSection from "./HeroSection";

describe("HeroSection", () => {
  it("renders without crashing", () => {
    const { container } = render(<HeroSection />);
    expect(container).toBeTruthy();
  });

  it("renders welcome heading", () => {
    const { getByText } = render(<HeroSection />);
    expect(
      getByText(/where shall we explore today/i),
    ).toBeInTheDocument();
  });

  it("renders subtitle", () => {
    const { getByText } = render(<HeroSection />);
    expect(
      getByText(/your ai prompt coach/i),
    ).toBeInTheDocument();
  });
});
