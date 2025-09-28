import { describe, it, expect } from "vitest";
import { parseSteps } from "../../md/md_case_steps";
import { ParseError } from "../../errors";

describe("parseSteps", () => {
  it("should parse a markdown table of steps correctly", () => {
    const lines = [
      "| Action | Expected Result |",
      "|---|---|",
      "| Do something | Something happens |",
      "| Do another thing | Another thing happens |",
    ];
    const result = parseSteps(lines, 1);
    expect(result).toEqual([
      { action: "Do something", expect: "Something happens" },
      { action: "Do another thing", expect: "Another thing happens" },
    ]);
  });

  it("should throw ParseError for invalid step format", () => {
    const lines = ["| Action | Expected Result |", "|---|---|", "Invalid line"];
    expect(() => parseSteps(lines, 1)).toThrow(
      new ParseError("Invalid step format", 3)
    );
  });

  it("should return an empty array if no steps are found (excluding header)", () => {
    const lines = ["| Action | Expected Result |", "|---|---|"];
    const result = parseSteps(lines, 1);
    expect(result).toEqual([]);
  });
});
