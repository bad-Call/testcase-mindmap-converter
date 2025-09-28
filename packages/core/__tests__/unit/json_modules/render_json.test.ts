import { describe, it, expect } from "vitest";
import { renderJson } from "../../../json_modules/render_json";
import type { CaseNode, ModuleNode } from "../../../types/mindmap_types";

describe("renderJson", () => {
  it("should render a CaseNode back to JSON with stepTag", () => {
    const caseNode: CaseNode = {
      type: "case",
      title: "Test Case",
      priority: 1,
      owningSide: [],
      case: [],
      caseTag: [],
      precondition: ["Precondition 1"],
      steps: [{ action: "Action 1", expect: "Expect 1" }],
    };

    const expectedJson = [
      {
        data: {
          text: "Test Case",
          stepTag: 1,
          priority: 1,
          owningSide: [],
          case: [],
          caseTag: [],
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

    const result = renderJson([caseNode]);
    expect(result).toEqual(expectedJson);
  });

  it("should render a ModuleNode and its children back to JSON", () => {
    const moduleNode: ModuleNode = {
      type: "module",
      title: "Test Module",
      moduleType: 1,
      children: [
        {
          type: "case",
          title: "Sub Case",
          priority: 2,
          owningSide: [],
          case: [],
          caseTag: [],
          precondition: [],
          steps: [],
        },
      ],
    };

    const expectedJson = [
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

    const result = renderJson([moduleNode]);
    expect(result).toEqual(expectedJson);
  });
});
