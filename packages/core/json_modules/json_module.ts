import type {
  ModuleNode,
  MindMapNode,
  CaseNode,
  GenericNode,
  BaseNode, // New import
} from "../types/mindmap_types";
import type { RawJsonNode, RawJsonData } from "../types/rawJson_types"; // New import for RawJsonData
import { caseNodeToJson } from "./json_case";
import { CONFIG } from "../config";

// Helper function to map common BaseNode fields to RawJsonData
export function mapBaseDataFields(node: BaseNode): RawJsonData {
  // Exported
  const data: RawJsonData = { text: node.title }; // text is required in RawJsonData

  if (node.id !== undefined) data.id = node.id;
  if (node.expandState !== undefined) data.expandState = node.expandState;
  if (node.aiCaseFlag !== undefined) data.aiCaseFlag = node.aiCaseFlag;

  return data;
}

// Helper function for recursive conversion to JSON
function mindMapNodeToJson(node: MindMapNode): RawJsonNode {
  switch (node.type) {
    case "module":
      return moduleNodeToJson(node as ModuleNode);
    case "case":
      return caseNodeToJson(node as CaseNode);
    case "generic":
      return {
        data: mapBaseDataFields(node as GenericNode), // Use helper for generic node
        children: (node as GenericNode).children.map(mindMapNodeToJson),
      };
  }
}

export function moduleNodeToJson(node: ModuleNode): RawJsonNode {
  return {
    data: {
      ...mapBaseDataFields(node), // Include base fields
      moduleType: node.moduleType,
      ...(node.moduleId !== undefined && { moduleId: node.moduleId }),
      ...(node.moduleName !== undefined && { moduleName: node.moduleName }), // Add moduleName
    },
    children: node.children.map(mindMapNodeToJson),
  };
}

export function jsonToModuleNode(raw: RawJsonNode): ModuleNode {
  const moduleType =
    raw.data.moduleType !== undefined ? raw.data.moduleType : 0;
  return {
    type: "module",
    title: raw.data.text,
    moduleType: moduleType,
    ...(raw.data.id !== undefined && { id: raw.data.id }), // Include id
    ...(raw.data.expandState !== undefined && {
      expandState: raw.data.expandState,
    }), // Include expandState
    ...(raw.data.aiCaseFlag !== undefined && {
      aiCaseFlag: raw.data.aiCaseFlag,
    }), // Include aiCaseFlag
    ...(raw.data.moduleId !== undefined && { moduleId: raw.data.moduleId }),
    ...(raw.data.moduleName !== undefined && {
      moduleName: raw.data.moduleName,
    }), // Include moduleName
    children: [],
  };
}

export function jsonToGenericNode(raw: RawJsonNode): GenericNode {
  return {
    type: "generic",
    title: raw.data.text,
    ...(raw.data.id !== undefined && { id: raw.data.id }), // Include id
    ...(raw.data.expandState !== undefined && {
      expandState: raw.data.expandState,
    }), // Include expandState
    ...(raw.data.aiCaseFlag !== undefined && {
      aiCaseFlag: raw.data.aiCaseFlag,
    }), // Include aiCaseFlag
    children: [],
  };
}
