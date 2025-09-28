import type { CaseNode } from "../types/mindmap_types";
import type { RawJsonNode } from "../types/jsonNode_types";

export function jsonToCaseNode(rawNode: RawJsonNode): CaseNode {
  const caseNode: CaseNode = {
    type: "case",
    title: rawNode.data.text,
    priority: rawNode.data.priority || 3, // Default priority
    owningSide: rawNode.data.owningSide || [],
    case: rawNode.data.case || [],
    aiCaseFlag: rawNode.data.aiCaseFlag,
    caseTag: rawNode.data.caseTag || [],
    precondition: [],
    steps: [],
    starTag: rawNode.data.starTag,
  };

  // Process children for preconditions and steps
  if (rawNode.children) {
    rawNode.children.forEach((child) => {
      if (child.data.stepTag === 2) {
        caseNode.precondition.push(...child.data.text.split('\n'));
      } else if (child.data.stepTag === 3) {
        const action = child.data.text;
        let expectText = '';
        if (child.children && child.children.length > 0) {
          // Assuming the first child with stepTag 4 is the expectation
          const expectChild = child.children.find((grandchild) => grandchild.data.stepTag === 4);
          if (expectChild) {
            expectText = expectChild.data.text;
          }
        }
        caseNode.steps.push({ action, expect: expectText });
      }
    });
  }

  return caseNode;
}

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