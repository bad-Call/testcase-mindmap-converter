import type { MindMap, CaseNode, GenericNode } from "./mindmap_types";
import { buildTree } from "./md/md_state_machine";

export function parseMd(mdContent: string): MindMap {
  const lines = mdContent.trim().split("\n");
  const nodes = buildTree(lines);

  // For now, we assume a single root or a collection of roots.
  // The MindMap structure can be refined later if a strict single root is required.
  return {
    root: {
      type: "generic",
      title: "root",
      children: nodes as (CaseNode | GenericNode)[],
    },
  };
}
