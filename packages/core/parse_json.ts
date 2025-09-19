import type { MindMapNode } from "./mindmap_types";
import { jsonToDomain, RawNode } from "./json_transformer";

export function parseJson(json: RawNode[]): MindMapNode[] {
  return json.map(jsonToDomain);
}
