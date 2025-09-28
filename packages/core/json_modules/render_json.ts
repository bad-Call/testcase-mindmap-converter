import type { MindMap } from "./mindmap_types";
import { moduleNodeToJson } from "./json/json_module";
import { caseNodeToJson } from "./json/json_case";

export function renderJson(mindMap: MindMap): any {
  // This assumes the root is a generic node, which is how parseMd is structured.
  if (mindMap.root.type === "generic") {
    return mindMap.root.children.map((node) => {
      if (node.type === "case") {
        return caseNodeToJson(node);
      }
      if (node.type === "generic") {
        // Handle nested generic nodes if necessary
        return { data: { text: node.title }, children: [] };
      }
    });
  }
  return [];
}
