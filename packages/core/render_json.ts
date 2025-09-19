import type { MindMapNode, CaseNode, ModuleNode } from "./mindmap_types";

// A temporary raw type for the output json
type RawNode = {
  data: Record<string, any>;
  children?: RawNode[];
};

function renderCaseNode(node: CaseNode): RawNode {
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

function renderModuleNode(node: ModuleNode): RawNode {
  return {
    data: {
      text: node.text,
      moduleType: node.moduleType,
    },
    children: node.children.map(renderNode),
  };
}

function renderNode(node: MindMapNode): RawNode {
  if (node.type === "case") {
    return renderCaseNode(node);
  }
  return renderModuleNode(node);
}

export function renderJson(nodes: MindMapNode[]): RawNode[] {
  return nodes.map(renderNode);
}
