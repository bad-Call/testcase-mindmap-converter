import type {
  MindMapNode,
  ModuleNode,
  CaseNode,
  GenericNode,
} from "../mindmap_types";
import { CONFIG } from "../config";
import { parseModule } from "./md_module";
import { parseCase } from "./md_case";

export function buildTree(lines: string[]): MindMapNode[] {
  const rootNodes: MindMapNode[] = [];
  const nodeStack: (
    | ModuleNode
    | GenericNode
    | { type: "root"; children: MindMapNode[] }
  )[] = [{ type: "root", children: rootNodes }];
  let caseLines: string[] = [];
  let caseStartLine = -1;

  function commitCase() {
    if (caseLines.length > 0) {
      const caseNode = parseCase(caseLines, caseStartLine);
      const parent = nodeStack[nodeStack.length - 1];
      parent.children.push(caseNode);
      caseLines = [];
      caseStartLine = -1;
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const headingMatch = line.match(CONFIG.patterns.heading);

    if (headingMatch) {
      commitCase();
      const prefix = headingMatch[1];
      const moduleType =
        CONFIG.moduleTypeMap[prefix as keyof typeof CONFIG.moduleTypeMap];

      if (moduleType) {
        const moduleNode = parseModule(line) as ModuleNode;
        moduleNode.children = [];

        while (
          nodeStack.length > 1 &&
          (nodeStack[nodeStack.length - 1] as ModuleNode).moduleType >=
            moduleNode.moduleType
        ) {
          nodeStack.pop();
        }

        const parent = nodeStack[nodeStack.length - 1];
        if (parent.type === "module") {
          (parent as ModuleNode).children.push(moduleNode);
        } else if (parent.type === "root") {
          parent.children.push(moduleNode);
        }
        nodeStack.push(moduleNode);
      } else {
        // Generic node for other headings
        const genericNode: GenericNode = {
          type: "generic",
          title: headingMatch[2].trim(),
          children: [],
        };
        const parent = nodeStack[nodeStack.length - 1];
        if (parent.type !== "root") {
          (parent as ModuleNode | GenericNode).children.push(genericNode);
        } else {
          parent.children.push(genericNode);
        }
        nodeStack.push(genericNode);
      }
    } else {
      if (caseLines.length === 0) {
        caseStartLine = i + 1;
      }
      caseLines.push(line);
    }
  }

  commitCase();
  return (nodeStack[0] as { type: "root"; children: MindMapNode[] }).children;
}
