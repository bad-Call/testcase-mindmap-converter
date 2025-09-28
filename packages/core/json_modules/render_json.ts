import type { MindMap, MindMapNode, GenericNode } from "../types/mindmap_types"; // Import GenericNode
import { moduleNodeToJson, mapBaseDataFields } from "./json_module"; // Import mapBaseDataFields
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
          data: mapBaseDataFields(node as GenericNode), // Use mapBaseDataFields for generic node
          children: renderJson(node.children as MindMap),
        };
      }
      return null; // Should not happen if MindMapNode is exhaustive
    })
    .filter(Boolean); // Filter out nulls
}
