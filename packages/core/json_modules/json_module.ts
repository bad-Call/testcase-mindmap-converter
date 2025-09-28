import type {
  ModuleNode,
  MindMapNode,
  CaseNode,
  GenericNode,
} from "../types/mindmap_types"; // Corrected import path
import type { RawJsonNode } from "../types/rawJson_types"; // New import
import { caseNodeToJson } from "./json_case";
import { CONFIG } from "../config"; // New import

// Helper function for recursive conversion to JSON
function mindMapNodeToJson(node: MindMapNode): RawJsonNode {
  switch (node.type) {
    case "module":
      return moduleNodeToJson(node as ModuleNode);
    case "case":
      return caseNodeToJson(node as CaseNode);
    case "generic":
      return {
        data: { text: node.title },
        children: (node as GenericNode).children.map(mindMapNodeToJson),
      };
  }
}

export function moduleNodeToJson(node: ModuleNode): RawJsonNode {
  return {
    data: {
      text: node.title,
      moduleType: node.moduleType, // Added moduleType
      ...(node.moduleId !== undefined && { moduleId: node.moduleId }), // Add moduleId if it exists
    },
    children: node.children.map(mindMapNodeToJson),
  };
}

export function jsonToModuleNode(raw: RawJsonNode): ModuleNode {
  // Assuming raw.data.text is the title and raw.data.moduleType is the moduleType
  // Children will need to be parsed recursively by the main parseJson function
  const moduleType =
    raw.data.moduleType !== undefined ? raw.data.moduleType : 0; // Provide a default value
  return {
    type: "module",
    title: raw.data.text,
    moduleType: moduleType,
    ...(raw.data.moduleId !== undefined && { moduleId: raw.data.moduleId }),
    children: [], // Children will be populated by the main parseJson function
  };
}

export function jsonToGenericNode(raw: RawJsonNode): GenericNode {
  return {
    type: "generic",
    title: raw.data.text,
    children: [], // Children will be populated by the main parseJson function
  };
}
