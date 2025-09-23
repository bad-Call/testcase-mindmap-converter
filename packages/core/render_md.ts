import type { CaseNode } from "./mindmap_types";
import { renderMdTable } from "./md_table";

export function renderMd(node: CaseNode): string {
  const title = `###### ${node.text}`;

  // Convert numeric priority back to P-style string (e.g., 2 -> P1)
  const priority = `- Priority: P${node.priority - 1}`;

  const preconditionItems = node.precondition.map((p) => `  - ${p}`);
  const precondition = `- Precondition:\n${preconditionItems.join("\n")}`;

  const table = renderMdTable(node.steps)
    .split("\n")
    .map((line) => `  ${line}`)
    .join("\n");
  const steps = `- Steps:\n${table}`;

  const parts = [title, priority];
  if (node.precondition.length > 0) {
    parts.push(precondition);
  }
  if (node.steps.length > 0) {
    parts.push(steps);
  }

  return parts.join("\n");
}
