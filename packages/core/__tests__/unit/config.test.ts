import { describe, it, expect } from "vitest";
import { PRIORITY_MAPPING } from "./config";

describe("default config", () => {
  it("should map priorities correctly", () => {
    expect(PRIORITY_MAPPING.S).toBe(1);
    expect(PRIORITY_MAPPING.A).toBe(2);
    expect(PRIORITY_MAPPING.B).toBe(3);
    expect(PRIORITY_MAPPING.C).toBe(4);
    expect(PRIORITY_MAPPING.D).toBe(5);
  });
});
