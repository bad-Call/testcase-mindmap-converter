import { describe, it, expect } from "vitest";
import { buildTree } from "../../md/md_state_machine";
import { CONFIG } from "../../config";
import type { ModuleNode, CaseNode, GenericNode } from "../../mindmap_types";

describe("buildTree", () => {
  it("should build a tree with modules and cases", () => {
    const mdContent = [
      "## Module 1",
      "### Sub-Module 1.1",
      "###### Case 1.1.1",
      "- Priority: S",
      "- Precondition:",
      "  - Precond 1",
      "- Steps:",
      "| Action | Expected Result |",
      "|---|---|",
      "| Step 1 | Result 1 |",
      "### Sub-Module 1.2",
      "###### Case 1.2.1",
      "## Module 2",
      "###### Case 2.1",
    ];

    const result = buildTree(mdContent);

    expect(result.length).toBe(2);
    expect(result[0].type).toBe("module");
    expect(result[0].title).toBe("Module 1");
    expect((result[0] as ModuleNode).moduleType).toBe(
      CONFIG.moduleTypeMap["##"]
    );
    expect((result[0] as ModuleNode).children.length).toBe(2);

    const subModule1_1 = (result[0] as ModuleNode).children[0] as ModuleNode;
    expect(subModule1_1.type).toBe("module");
    expect(subModule1_1.title).toBe("Sub-Module 1.1");
    expect(subModule1_1.moduleType).toBe(CONFIG.moduleTypeMap["###"]);
    expect(subModule1_1.children.length).toBe(1);

    const case1_1_1 = subModule1_1.children[0] as CaseNode;
    expect(case1_1_1.type).toBe("case");
    expect(case1_1_1.title).toBe("Case 1.1.1");
    expect(case1_1_1.priority).toBe(CONFIG.priorityMap.S);
    expect(case1_1_1.precondition).toEqual(["Precond 1"]);
    expect(case1_1_1.steps).toEqual([{ action: "Step 1", expect: "Result 1" }]);

    const subModule1_2 = (result[0] as ModuleNode).children[1] as ModuleNode;
    expect(subModule1_2.type).toBe("module");
    expect(subModule1_2.title).toBe("Sub-Module 1.2");
    expect(subModule1_2.children.length).toBe(1);

    const case1_2_1 = subModule1_2.children[0] as CaseNode;
    expect(case1_2_1.type).toBe("case");
    expect(case1_2_1.title).toBe("Case 1.2.1");

    const module2 = result[1] as ModuleNode;
    expect(module2.type).toBe("module");
    expect(module2.title).toBe("Module 2");
    expect(module2.children.length).toBe(1);

    const case2_1 = module2.children[0] as CaseNode;
    expect(case2_1.type).toBe("case");
    expect(case2_1.title).toBe("Case 2.1");
  });

  it("should handle generic nodes for unconfigured headings", () => {
    const mdContent = [
      "## Module A",
      "#### Category X", // This should be a generic node
      "###### Case A.X.1",
      "## Module B",
    ];

    const result = buildTree(mdContent);
    expect(result.length).toBe(2);

    const moduleA = result[0] as ModuleNode;
    expect(moduleA.type).toBe("module");
    expect(moduleA.title).toBe("Module A");
    expect(moduleA.children.length).toBe(1);

    const categoryX = moduleA.children[0] as GenericNode;
    expect(categoryX.type).toBe("generic");
    expect(categoryX.title).toBe("Category X");
    expect(categoryX.children.length).toBe(1);

    const caseA_X_1 = categoryX.children[0] as CaseNode;
    expect(caseA_X_1.type).toBe("case");
    expect(caseA_X_1.title).toBe("Case A.X.1");

    const moduleB = result[1] as ModuleNode;
    expect(moduleB.type).toBe("module");
    expect(moduleB.title).toBe("Module B");
  });

  it("should handle a flat list of cases", () => {
    const mdContent = ["###### Case 1", "###### Case 2"];
    const result = buildTree(mdContent);
    expect(result.length).toBe(2);
    expect(result[0].type).toBe("case");
    expect(result[0].title).toBe("Case 1");
    expect(result[1].type).toBe("case");
    expect(result[1].title).toBe("Case 2");
  });

  it("should handle empty content", () => {
    const mdContent: string[] = [];
    const result = buildTree(mdContent);
    expect(result).toEqual([]);
  });
});
