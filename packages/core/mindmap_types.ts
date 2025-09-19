export interface BaseNode {
  id?: string;
  text: string;
  expandState?: "collapse" | "expand";
  aiCaseFlag?: boolean;
}

export interface ModuleNode extends BaseNode {
  type: "module";
  moduleType: 1 | 2; // 1=一级模块 2=二级模块
  moduleId?: number;
  children: MindMapNode[]; // 可继续挂子模块或用例
}

export interface CaseNode extends BaseNode {
  type: "case";
  priority: 1 | 2 | 3 | 4 | 5; // S=1..D=5
  owningSide: number[]; // 0客户端 1服务端 2后台 3前端
  case: number[]; // 用例编号数组
  caseTag: { id: number; name: string }[];
  precondition: string[]; // 前置条件文本行
  steps: Array<{ action: string; expect: string }>;
  starTag?: number; // 自动化标记：1=自动化暂未实现
}

export type MindMapNode = ModuleNode | CaseNode;
