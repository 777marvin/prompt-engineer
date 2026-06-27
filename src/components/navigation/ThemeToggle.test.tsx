import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { render, fireEvent, waitFor } from "@testing-library/react";
import ThemeToggle from "./ThemeToggle";
import useAppStore from "../../stores/useAppStore";

describe("ThemeToggle", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.dataset.theme = "light";
    useAppStore.setState(useAppStore.getInitialState());
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("renders without crashing", () => {
    const { container } = render(<ThemeToggle />);
    expect(container).toBeTruthy();
  });

  it("toggles data-theme attribute when clicked", async () => {
    const { getByRole } = render(<ThemeToggle />);
    const button = getByRole("button");
    expect(document.documentElement.dataset.theme).toBe("light");

    fireEvent.click(button);

    await waitFor(() => {
      expect(document.documentElement.dataset.theme).toBe("dark");
    });
  });

  it("persists theme to localStorage", async () => {
    const { getByRole } = render(<ThemeToggle />);
    const button = getByRole("button");
    fireEvent.click(button);

    await waitFor(() => {
      expect(localStorage.getItem("theme")).toBe("dark");
    });
  });
});
