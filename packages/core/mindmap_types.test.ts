import { describe, it, expect } from "vitest";
import type { MindMapNode, CaseNode, ModuleNode } from "./mindmap_types";

describe("MindMapNode type narrowing", () => {
  it("should correctly narrow a node to CaseNode", () => {
    const node: MindMapNode = {
      type: "case",
      text: "Test Case",
      priority: 1,
      owningSide: [],
      case: [],
      caseTag: [],
      precondition: [],
      steps: [],
    };

    if (node.type === "case") {
      expect(node.priority).toBe(1);
      const caseNode: CaseNode = node; // This should compile
      expect(caseNode.type).toBe("case");
    } else {
      // This block should not be reached
      expect.fail("Node should have been narrowed to CaseNode");
    }
  });

  it("should correctly narrow a node to ModuleNode", () => {
    const node: MindMapNode = {
      type: "module",
      text: "Test Module",
      moduleType: 1,
      children: [],
    };

    if (node.type === "module") {
      expect(node.moduleType).toBe(1);
      const moduleNode: ModuleNode = node; // This should compile
      expect(moduleNode.type).toBe("module");
    } else {
      // This block should not be reached
      expect.fail("Node should have been narrowed to ModuleNode");
    }
  });
});
