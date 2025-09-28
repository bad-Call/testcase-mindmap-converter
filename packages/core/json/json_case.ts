import type { CaseNode } from "../mindmap_types";

// This is a placeholder for the actual JSON transformation logic for CaseNode.
// The actual implementation will depend on the target JSON structure.
export function caseNodeToJson(node: CaseNode): any {
  return {
    data: {
      text: node.title,
      priority: node.priority,
    },
    children: [],
  };
}
