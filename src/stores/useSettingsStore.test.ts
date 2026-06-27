import { describe, it, expect, beforeEach } from "vitest";
import useSettingsStore from "./useSettingsStore";

describe("useSettingsStore", () => {
  beforeEach(() => {
    useSettingsStore.setState(useSettingsStore.getInitialState());
  });

  it("initializes with hasApiKey false", () => {
    expect(useSettingsStore.getState().hasApiKey).toBe(false);
  });

  it("initializes with system preferred language", () => {
    expect(useSettingsStore.getState().preferredLanguage).toBe("system");
  });

  it("initializes with hintThreshold 5", () => {
    expect(useSettingsStore.getState().hintThreshold).toBe(5);
  });

  it("setHasApiKey updates hasApiKey", () => {
    useSettingsStore.getState().setHasApiKey(true);
    expect(useSettingsStore.getState().hasApiKey).toBe(true);
  });
});
