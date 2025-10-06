import { describe, it, expect } from "vitest";
import { parseMd } from "../../../md_modules/parse_md";
import type {
  CaseNode,
  ModuleNode,
  GenericNode,
  MindMapNode,
} from "../../../types/mindmap_types";
import { ParseError } from "../../../errors";
import { CONFIG } from "../../../config";

describe("parseMd", () => {
  describe("successful parsing", () => {
    it("should parse a markdown string into a complex tree with modules and cases", () => {
      const mdContent = `
## Module 1
### Sub-Module 1.1
###### Case 1.1.1
优先级: S
**前置条件**
- Precond 1
**测试步骤**
| Action | Expected Result |
|---|---|
| Step 1 | Result 1 |
### Sub-Module 1.2
###### Case 1.2.1
## Module 2
###### Case 2.1
`;

      const result = parseMd(mdContent);

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
      expect(case1_1_1.steps).toEqual([
        { action: "Step 1", expect: "Result 1" },
      ]);

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

    it("should handle generic nodes for unconfigured headings (level 4)", () => {
      const mdContent = `
## Module A
#### Category X
###### Case A.X.1
## Module B
`;

      const result = parseMd(mdContent);
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

    it("should handle generic nodes for unconfigured headings (level 5)", () => {
      const mdContent = `
## Module C
##### Sub-Category Y
###### Case C.Y.1
`;

      const result = parseMd(mdContent);
      expect(result.length).toBe(1);

      const moduleC = result[0] as ModuleNode;
      expect(moduleC.type).toBe("module");
      expect(moduleC.title).toBe("Module C");
      expect(moduleC.children.length).toBe(1);

      const subCategoryY = moduleC.children[0] as GenericNode;
      expect(subCategoryY.type).toBe("generic");
      expect(subCategoryY.title).toBe("Sub-Category Y");
      expect(subCategoryY.children.length).toBe(1);

      const caseC_Y_1 = subCategoryY.children[0] as CaseNode;
      expect(caseC_Y_1.type).toBe("case");
      expect(caseC_Y_1.title).toBe("Case C.Y.1");
    });

    it("should handle generic nodes for unconfigured headings (level 1)", () => {
      const mdContent = `
# Top Level Generic
## Module D
`;

      const result = parseMd(mdContent);
      expect(result.length).toBe(1);

      const topLevelGeneric = result[0] as GenericNode;
      expect(topLevelGeneric.type).toBe("generic");
      expect(topLevelGeneric.title).toBe("Top Level Generic");
      expect(topLevelGeneric.children.length).toBe(1);

      const moduleD = topLevelGeneric.children[0] as ModuleNode;
      expect(moduleD.type).toBe("module");
      expect(moduleD.title).toBe("Module D");
    });

    it("should handle a flat list of cases", () => {
      const mdContent = `
###### Case 1
###### Case 2
`;
      const result = parseMd(mdContent);
      expect(result.length).toBe(2);
      expect(result[0].type).toBe("case");
      expect(result[0].title).toBe("Case 1");
      expect(result[1].type).toBe("case");
      expect(result[1].title).toBe("Case 2");
    });

    it("should handle empty content", () => {
      const mdContent = "";
      const result = parseMd(mdContent);
      expect(result).toEqual([]);
    });
  });

  describe("error handling", () => {
    it("should throw ParseError if title is missing", () => {
      const mdContent = `优先级: P1
      `;
      expect(() => parseMd(mdContent)).toThrow(
        new ParseError("Invalid module format", 1) // Changed from "Missing title" to "Invalid module format"
      );
    });

    it("should throw ParseError for invalid priority", () => {
      const mdContent = `
      ###### Test Case Title
      优先级: P99
      `;
      expect(() => parseMd(mdContent)).toThrow(
        new ParseError("Invalid priority value", 2) // Line number adjusted
      );
    });

    it("should throw ParseError for incorrect table columns", () => {
      const mdContent = ` 
###### Test Case Title
**测试步骤**
| Action | Expected Result |
| --- | --- |
| Do something | 
      `;
      expect(() => parseMd(mdContent)).toThrow(
        new ParseError("Invalid step format", 5) // Line number adjusted
      );
    });
  });
});
