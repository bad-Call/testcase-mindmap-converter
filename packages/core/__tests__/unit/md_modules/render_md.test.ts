import { describe, it, expect } from "vitest";
import { renderMd } from "./render_md";
import type { CaseNode } from "./mindmap_types";

describe("renderMd", () => {
  it("should render a CaseNode into a markdown string", () => {
    const node: CaseNode = {
      type: "case",
      text: "Test Case Title",
      priority: 2, // P1 maps to 2, which should be rendered as P1
      owningSide: [],
      case: [],
      caseTag: [],
      precondition: ["Step 1", "Step 2"],
      steps: [
        { action: "Do something", expect: "Something happens" },
        { action: "Do another thing", expect: "Another thing happens" },
      ],
    };

    const expectedMd = `###### Test Case Title
- Priority: P1
- Precondition:
  - Step 1
  - Step 2
- Steps:
  | Action | Expect |
  | --- | --- |
  | Do something | Something happens |
  | Do another thing | Another thing happens |`;

    const result = renderMd(node);
    expect(result.trim()).toBe(expectedMd.trim());
  });
});
