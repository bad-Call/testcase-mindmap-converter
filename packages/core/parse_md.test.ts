import { describe, it, expect } from "vitest";
import { parseMd } from "./parse_md";
import type { CaseNode } from "./mindmap_types";
import { ParseError } from "./errors";

describe("parseMd", () => {
  describe("successful parsing", () => {
    it("should parse a markdown string into a CaseNode", () => {
      const mdContent = `
###### Test Case Title
- Priority: P1
- Precondition:
  - Step 1
  - Step 2
- Steps:
| Action | Expected Result |
|---|---|
| Do something | Something happens |
| Do another thing | Another thing happens |
`;

      const expectedNode: CaseNode = {
        type: "case",
        text: "Test Case Title",
        priority: 2, // P1 maps to 2 in default config
        owningSide: [],
        case: [],
        caseTag: [],
        precondition: ["Step 1", "Step 2"],
        steps: [
          { action: "Do something", expect: "Something happens" },
          { action: "Do another thing", expect: "Another thing happens" },
        ],
      };

      const result = parseMd(mdContent);
      expect(result).toEqual(expectedNode);
    });
  });

  describe("error handling", () => {
    it("should throw ParseError if title is missing", () => {
      const mdContent = `
- Priority: P1
      `;
      expect(() => parseMd(mdContent)).toThrow(
        new ParseError("Missing title", 1)
      );
    });

    it("should throw ParseError for invalid priority", () => {
      const mdContent = `
###### Test Case Title
- Priority: P99
      `;
      expect(() => parseMd(mdContent)).toThrow(
        new ParseError("Invalid priority value", 2)
      );
    });

    it("should throw ParseError for incorrect table columns", () => {
      const mdContent = `
###### Test Case Title
- Steps:
| Action |
|---|
| Do something |
      `;
      expect(() => parseMd(mdContent)).toThrow(
        new ParseError("Invalid table format", 4)
      );
    });
  });
});
