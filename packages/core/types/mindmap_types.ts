import type { RawJsonNode } from "./rawJson_types";

export interface BaseNode {
  title: string;
  id?: string;
  expandState?: "collapse" | "expand";
  aiCaseFlag?: boolean;
}

export interface GenericNode extends BaseNode {
  type: "generic";
  children: MindMapNode[];
}

export interface RootNode extends BaseNode {
  type: "root";
  children: MindMapNode[];
}

export interface ModuleNode extends BaseNode {
  type: "module";
  moduleType: number;
  moduleId?: number;
  moduleName?: string; // Added moduleName
  children: MindMapNode[];
}

export interface CaseNode extends BaseNode {
  type: "case";
  priority?: number;
  owningSide?: number[];
  case?: number[];
  caseTag?: { id: number; name: string }[];
  precondition: string[];
  steps: Array<{ action: string; expect: string }>;
  starTag?: number;
  rawChildren?: RawJsonNode[]; // Add rawChildren to CaseNode
}

export type MindMapNode = ModuleNode | CaseNode | GenericNode;

export type MindMap = MindMapNode[];

export type ParentNode = RootNode | ModuleNode | GenericNode;
