import { describe, it, expect } from "vitest";
import { parsePrecondition } from "../../md/md_case_precond";

describe("parsePrecondition", () => {
  it("should parse a list of preconditions correctly", () => {
    const lines = [
      "- First precondition",
      "- Second precondition",
      "  - Nested item (should be ignored by this parser)",
    ];
    const result = parsePrecondition(lines);
    expect(result).toEqual(["First precondition", "Second precondition"]);
  });

  it("should return an empty array if no preconditions are found", () => {
    const lines = ["Some random text", "Another line"];
    const result = parsePrecondition(lines);
    expect(result).toEqual([]);
  });

  it("should handle empty lines within preconditions", () => {
    const lines = ["- Precondition 1", "", "- Precondition 2"];
    const result = parsePrecondition(lines);
    expect(result).toEqual(["Precondition 1", "Precondition 2"]);
  });
});
