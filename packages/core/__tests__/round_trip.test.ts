import { describe, it, expect } from "vitest";
import { parseMd } from "../parse_md";
import { renderMd } from "../render_md";
import { renderJson } from "../render_json";
import { CONFIG } from "../config";

describe("End-to-End Round Trip", () => {
  it("should parse Markdown to MindMap, then render back to equivalent Markdown", () => {
    const originalMd = `
## Module 1
### Sub-Module 1.1
###### Case 1.1.1 Title
- Priority: S
- Precondition:
  - Precond 1
  - Precond 2
- Steps:
| Action | Expected Result |
|---|---|
| Do something | Something happens |
| Do another thing | Another thing happens |
### Sub-Module 1.2
###### Case 1.2.1 Title
## Module 2
#### Generic Category
###### Case 2.1.1 Title
`;

    // 1. Parse Markdown to MindMap
    const mindMap = parseMd(originalMd);

    // 2. Render MindMap back to Markdown
    const renderedMd = renderMd(mindMap);

    // For now, a direct comparison might be tricky due to formatting differences.
    // We'll focus on structural integrity and key content.
    // A more robust comparison would involve parsing both and comparing the resulting MindMap objects.

    // For a basic check, we can assert that key elements are present.
    expect(renderedMd).toContain("## Module 1");
    expect(renderedMd).toContain("### Sub-Module 1.1");
    expect(renderedMd).toContain("###### Case 1.1.1 Title");
    expect(renderedMd).toContain("- Priority: S"); // This will need to be rendered correctly
    expect(renderedMd).toContain("- Precondition:");
    expect(renderedMd).toContain("  - Precond 1");
    expect(renderedMd).toContain("| Action | Expected Result |");
    expect(renderedMd).toContain("| Do something | Something happens |");
    expect(renderedMd).toContain("#### Generic Category");
    expect(renderedMd).toContain("###### Case 2.1.1 Title");

    // A more ideal test would be:
    // const reParsedMindMap = parseMd(renderedMd);
    // expect(reParsedMindMap).toEqual(mindMap);
  });

  it("should parse Markdown to MindMap, then render to JSON, then parse JSON back to MindMap (placeholder)", () => {
    const originalMd = `
## Module A
###### Case A.1
- Priority: B
`;
    const mindMap = parseMd(originalMd);
    const jsonOutput = renderJson(mindMap);

    // Placeholder for parsing JSON back to MindMap
    // const reParsedMindMapFromJson = parseJson(jsonOutput);
    // expect(reParsedMindMapFromJson).toEqual(mindMap);

    expect(jsonOutput).toBeDefined();
    expect(jsonOutput[0].data.text).toBe("Module A");
    expect(jsonOutput[0].children[0].data.text).toBe("Case A.1");
    expect(jsonOutput[0].children[0].data.priority).toBe(CONFIG.priorityMap.B);
  });
});
