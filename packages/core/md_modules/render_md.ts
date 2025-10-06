import type {
  MindMap,
  MindMapNode,
  ModuleNode,
  CaseNode,
  GenericNode,
} from "../types/mindmap_types";
import { CONFIG } from "../config";

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
  return mindMap
    .map((node) => {
      // Determine the initial level based on node type
      let initialLevel = 2; // Default for modules
      if (node.type === "case") {
        initialLevel = 6; // Cases are always level 6
      } else if (node.type === "generic") {
        // For generic nodes, we might need to infer level from title or add a level property
        // For now, let's assume generic nodes at the root are also level 2, or handle based on title prefix
        // This might need refinement if generic nodes can have arbitrary starting levels at the root.
        // For the current test, it's a CaseNode, so this is the primary fix.
        initialLevel = 2;
      }
      return renderNode(node, initialLevel);
    })
    .join("");
}
