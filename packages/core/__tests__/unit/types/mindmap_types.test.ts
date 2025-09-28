import { describe, it, expect } from "vitest";
import type { MindMapNode, CaseNode, ModuleNode, GenericNode, MindMap } from "../../../types/mindmap_types";

describe("MindMapNode type narrowing", () => {
  it("should correctly narrow a node to CaseNode", () => {
    const node: MindMapNode = {
      type: "case",
      title: "Test Case",
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
      title: "Test Module",
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

  it("should correctly narrow a node to GenericNode", () => {
    const node: MindMapNode = {
      type: "generic",
      title: "Generic Node",
      children: [],
    };

    if (node.type === "generic") {
      expect(node.title).toBe("Generic Node");
      expect(node.children).toEqual([]);
      const genericNode: GenericNode = node; // This should compile
      expect(genericNode.type).toBe("generic");
    } else {
      expect.fail("Node should have been narrowed to GenericNode");
    }
  });

  it("should correctly type an array of MindMapNodes as MindMap['root']", () => {
    const mindMap: MindMap = [
      {
        type: "module",
        title: "Test Module",
        moduleType: 1,
        children: [],
      },
      {
        type: "case",
        title: "Test Case",
        priority: 1,
        owningSide: [],
        case: [],
        caseTag: [],
        precondition: [],
        steps: [],
      },
    ];

    expect(mindMap.length).toBe(2);
    expect(mindMap[0].type).toBe("module");
    expect(mindMap[1].type).toBe("case");
  });
   it('should accept empty array as MindMap', () => {
    const emptyMindMap: MindMap = [];
    expect(emptyMindMap).toEqual([]);
  });
});
