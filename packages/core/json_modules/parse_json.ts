import type { MindMapNode } from "../types/mindmap_types";
import { jsonToCaseNode, RawNode } from "./json_case"; // Corrected import path and function name

export function parseJson(json: RawNode[]): MindMapNode[] {
  // This will need to be updated to handle different node types (ModuleNode, GenericNode)
  // For now, it will only parse CaseNodes using jsonToCaseNode.
  // A more robust solution would involve a factory or a more generic transformer.
  return json.map(jsonToCaseNode);
}
