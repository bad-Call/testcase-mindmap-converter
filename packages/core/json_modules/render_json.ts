import type { MindMap, MindMapNode } from "../types/mindmap_types";
import { moduleNodeToJson } from "./json_module";
import { caseNodeToJson } from "./json_case";

export function renderJson(mindMap: MindMap): any {
  return mindMap
    .map((node: MindMapNode) => {
      if (node.type === "case") {
        return caseNodeToJson(node);
      }
      if (node.type === "module") {
        return moduleNodeToJson(node);
      }
      if (node.type === "generic") {
        return {
          data: { text: node.title },
          children: renderJson(node.children as MindMap), // Recursively render children
        };
      }
      return null; // Should not happen if MindMapNode is exhaustive
    })
    .filter(Boolean); // Filter out nulls
}
