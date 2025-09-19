import type { MindMapNode, CaseNode, ModuleNode } from "./mindmap_types";

// A temporary raw type for the json
export type RawNode = {
  data: Record<string, any>;
  children?: RawNode[];
};

export function domainToJson(node: MindMapNode): RawNode {
  if (node.type === "case") {
    return domainToCaseJson(node);
  }
  return domainToModuleJson(node);
}

function domainToCaseJson(node: CaseNode): RawNode {
  const children: RawNode[] = [];

  node.precondition.forEach((p) => {
    children.push({ data: { text: p, stepTag: 2 }, children: [] });
  });

  node.steps.forEach((step) => {
    children.push({
      data: { text: step.action, stepTag: 3 },
      children: [{ data: { text: step.expect, stepTag: 4 }, children: [] }],
    });
  });

  return {
    data: {
      text: node.text,
      stepTag: 1,
      priority: node.priority,
    },
    children,
  };
}

function domainToModuleJson(node: ModuleNode): RawNode {
  return {
    data: {
      text: node.text,
      moduleType: node.moduleType,
    },
    children: node.children.map(domainToJson),
  };
}

export function jsonToDomain(rawNode: RawNode): MindMapNode {
  const { data, children = [] } = rawNode;

  // Module Node
  if (data.moduleType) {
    return {
      type: "module",
      text: data.text,
      moduleType: data.moduleType,
      ...data,
      children: children.map(jsonToDomain),
    };
  }

  // Case Node
  const precondition: string[] = [];
  const steps: { action: string; expect: string }[] = [];

  children.forEach((child) => {
    if (child.data.stepTag === 2) {
      precondition.push(child.data.text);
    }
    if (child.data.stepTag === 3) {
      const expectNode = child.children?.[0];
      steps.push({
        action: child.data.text,
        expect: expectNode?.data.text || "",
      });
    }
  });

  return {
    type: "case",
    text: data.text,
    priority: data.priority,
    owningSide: data.owningSide,
    case: data.case,
    caseTag: data.caseTag,
    precondition,
    steps,
    ...data,
  };
}
