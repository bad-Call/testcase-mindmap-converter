import type { MindMapNode, CaseNode, ModuleNode } from "./mindmap_types";

// A temporary raw type for the input json
type RawNode = {
  data: Record<string, any>;
  children?: RawNode[];
};

export function parseJson(json: RawNode[]): MindMapNode[] {
  return json.map(transformNode);
}

function transformNode(rawNode: RawNode): MindMapNode {
  const { data, children = [] } = rawNode;

  // Module Node
  if (data.moduleType) {
    return {
      type: "module",
      text: data.text,
      moduleType: data.moduleType,
      ...data,
      children: children.map(transformNode),
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
