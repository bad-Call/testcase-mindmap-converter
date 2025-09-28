import { describe, it, expect } from "vitest";
import { parseCase } from "../../md/md_case";
import { CONFIG } from "../../config";

describe("parseCase", () => {
  it("should parse a full case node correctly with metadata, preconditions, and steps", () => {
    const mdContent = [
      "###### Test Case Title",
      "- Priority: S",
      "- Precondition:",
      "  - First precondition",
      "  - Second precondition",
      "- Steps:",
      "| Action | Expected Result |",
      "|---|---|",
      "| Do something | Something happens |",
      "| Do another thing | Another thing happens |",
    ];
    const result = parseCase(mdContent, 1);

    expect(result.type).toBe("case");
    expect(result.title).toBe("Test Case Title");
    expect(result.priority).toBe(CONFIG.priorityMap.S);
    expect(result.precondition).toEqual([
      "First precondition",
      "Second precondition",
    ]);
    expect(result.steps).toEqual([
      { action: "Do something", expect: "Something happens" },
      { action: "Do another thing", expect: "Another thing happens" },
    ]);
  });

  it("should parse a case node with only a title", () => {
    const mdContent = ["###### Simple Case"];
    const result = parseCase(mdContent, 1);

    expect(result.type).toBe("case");
    expect(result.title).toBe("Simple Case");
    expect(result.priority).toBe(CONFIG.defaults.priority); // Default priority
    expect(result.precondition).toEqual([]);
    expect(result.steps).toEqual([]);
  });

  it("should handle missing sections gracefully", () => {
    const mdContent = [
      "###### Case with missing steps",
      "- Priority: A",
      "- Precondition:",
      "  - Only precondition",
    ];
    const result = parseCase(mdContent, 1);

    expect(result.type).toBe("case");
    expect(result.title).toBe("Case with missing steps");
    expect(result.priority).toBe(CONFIG.priorityMap.A);
    expect(result.precondition).toEqual(["Only precondition"]);
    expect(result.steps).toEqual([]);
  });
});
