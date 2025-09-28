import { describe, it, expect } from "vitest";
import { parseJson } from "../../../json_modules/parse_json";
import type { CaseNode, ModuleNode } from "../../../types/mindmap_types";

describe("parseJson", () => {
  it("should parse a single case node with stepTag correctly", () => {
    const json = [
      {
        data: {
          text: "Test Case",
          stepTag: 1,
          priority: 1,
        },
        children: [
          { data: { text: "Precondition 1", stepTag: 2 }, children: [] },
          {
            data: { text: "Action 1", stepTag: 3 },
            children: [
              { data: { text: "Expect 1", stepTag: 4 }, children: [] },
            ],
          },
        ],
      },
    ];
    const result = parseJson(json);
    expect(result).toHaveLength(1);
    const node = result[0] as CaseNode;
    expect(node.type).toBe("case");
    expect(node.title).toBe("Test Case");
    expect(node.precondition).toEqual(["Precondition 1"]);
    expect(node.steps).toEqual([{ action: "Action 1", expect: "Expect 1" }]);
  });

  it("should parse a module node correctly", () => {
    const json = [
      {
        data: { text: "Test Module", moduleType: 1 },
        children: [
          {
            data: {
              text: "Sub Case",
              stepTag: 1,
              priority: 2,
              owningSide: [],
              case: [],
              caseTag: [],
            },
            children: [],
          },
        ],
      },
    ];
    const result = parseJson(json);
    expect(result).toHaveLength(1);
    const node = result[0] as ModuleNode;
    expect(node.type).toBe("module");
    expect(node.title).toBe("Test Module");
    expect(node.children).toHaveLength(1);
    const child = node.children[0] as CaseNode;
    expect(child.type).toBe("case");
    expect(child.title).toBe("Sub Case");
  });
});
