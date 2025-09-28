import type {
  MindMapNode,
  MindMap,
  CaseNode,
  GenericNode,
} from "../types/mindmap_types";
import type { RawJsonNode } from "../types/rawJson_types";
import { jsonToCaseNode } from "./json_case";
import { jsonToModuleNode, jsonToGenericNode } from "./json_module";
import { CONFIG } from "../config";

export function parseJson(json: RawJsonNode[]): MindMapNode[] {
  return json.map((rawNode) => {
    // Determine node type based on available data
    if (rawNode.data.stepTag === CONFIG.stepTagMap.case) {
      const caseNode = jsonToCaseNode(rawNode);
      // CaseNode does not have 'children' in the MindMapNode sense.
      // Its 'rawChildren' are handled internally by jsonToCaseNode.
      return caseNode;
    } else if (rawNode.data.moduleType !== undefined) {
      const moduleNode = jsonToModuleNode(rawNode);
      if (rawNode.children && rawNode.children.length > 0) {
        moduleNode.children = parseJson(rawNode.children) as MindMap;
      }
      return moduleNode;
    } else {
      // Default to generic node if no specific type is identified
      const genericNode = jsonToGenericNode(rawNode);
      if (rawNode.children && rawNode.children.length > 0) {
        // GenericNode children are (CaseNode | GenericNode)[], so filter out ModuleNodes
        genericNode.children = parseJson(rawNode.children).filter(
          (child): child is CaseNode | GenericNode =>
            child.type === "case" || child.type === "generic"
        );
      }
      return genericNode;
    }
  });
}
