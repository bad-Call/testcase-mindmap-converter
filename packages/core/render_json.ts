import type { MindMapNode } from "./mindmap_types";
import { domainToJson, RawNode } from "./json_transformer";

export function renderJson(nodes: MindMapNode[]): RawNode[] {
  return nodes.map(domainToJson);
}
