import { describe, it, expect } from "vitest";
import { parseMetadata } from "../../../md_modules/md_metadata";
import { CONFIG } from "../../../config";

describe("parseMetadata", () => {
  it("should parse priority metadata correctly", () => {
    const lines = [`优先级: S`];
    const result = parseMetadata(lines, 1);
    expect(result.priority).toBe(CONFIG.priorityMap.S);
  });

  it("should return an empty object if no metadata is found", () => {
    const lines = [`Some random text`];
    const result = parseMetadata(lines, 1);
    expect(result).toEqual({});
  });

  it("should handle invalid priority values gracefully", () => {
    const lines = [`Priority: Z`];
    const result = parseMetadata(lines, 1);
    expect(result.priority).toBeUndefined();
  });

  // Add more tests for other metadata types as they are implemented
});
