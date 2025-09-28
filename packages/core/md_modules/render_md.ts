import type {
  MindMap,
  MindMapNode,
  ModuleNode,
  CaseNode,
  GenericNode,
} from "./mindmap_types";
import { CONFIG } from "./config";

function renderNode(node: MindMapNode, level: number): string {
  let markdown = "";
  const prefix = "#".repeat(level);

  switch (node.type) {
    case "module":
      markdown += `${prefix} ${node.title}\n\n`;
      markdown += (node as ModuleNode).children
        .map((child) => renderNode(child, level + 1))
        .join("");
      break;
    case "case":
      markdown += `${prefix} ${node.title}\n`;
      // Render metadata, preconditions, and steps for the case
      // This part needs to be implemented in more detail
      break;
    case "generic":
      markdown += `${prefix} ${node.title}\n\n`;
      markdown += (node as GenericNode).children
        .map((child) => renderNode(child, level + 1))
        .join("");
      break;
  }

  return markdown;
}

export function renderMd(mindMap: MindMap): string {
  return mindMap.root.children.map((node) => renderNode(node, 2)).join("");
}
