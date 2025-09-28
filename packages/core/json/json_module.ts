import type {
  ModuleNode,
  MindMapNode,
  CaseNode,
  GenericNode,
} from "../mindmap_types";
import { caseNodeToJson } from "./json_case";

function mindMapNodeToJson(node: MindMapNode): any {
  switch (node.type) {
    case "module":
      return moduleNodeToJson(node as ModuleNode);
    case "case":
      return caseNodeToJson(node as CaseNode);
    case "generic":
      // You might want to handle generic nodes differently
      return {
        data: { text: node.title },
        children: (node as GenericNode).children.map(mindMapNodeToJson),
      };
  }
}

export function moduleNodeToJson(node: ModuleNode): any {
  return {
    data: {
      text: node.title,
    },
    children: node.children.map(mindMapNodeToJson),
  };
}
