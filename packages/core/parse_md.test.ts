import { describe, it, expect } from "vitest";
import { parseMd } from "./parse_md";
import type { CaseNode } from "./mindmap_types";

describe("parseMd", () => {
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
