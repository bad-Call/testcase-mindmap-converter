/**
 * 原始 JSON 节点（来自脑图工具）
 * 与 XMind / 其他工具导出的结构保持一致
 */
export interface RawJsonNode {
  /** 节点自身数据 */
  data: RawJsonData;
  /** 子节点数组 */
  children: RawJsonNode[];
}

/**
 * 原始节点 payload
 * 所有字段均为可选，除 text 外
 */
export interface RawJsonData {
  /** 节点唯一标识（可选） */
  id?: string;
  /** 节点文本（唯一必填） */
  text: string;
  /** 展开状态 */
  expandState?: 'collapse' | 'expand';
  /** AI 用例标记 */
  aiCaseFlag?: boolean;
  /** 模块层级 1|2|3...（可选） */
  moduleType?: number;
  /** 模块唯一编号（可选） */
  moduleId?: number;
  /**模块名称（可选）*/
  moduleName?: string;
  /** 优先级 1=S 2=A ... 5=D（可选） */
  priority?: number;
  /** 步骤标记 1=用例 2=前置 3=动作 4=预期（可选） */
  stepTag?: number;
  /** 自动化标记 1=暂未实现（可选） */
  starTag?: number;
  /** 标签数组（可选） */
  caseTag?: Array<{ id: number; name: string }>;
  /** 用例类型 0=客户端 1=服务端 2=后台 3=前端（可选） */
  owningSide?: number[];
  /** 用例编号数组（可选） */
  case?: number[];
}

export type RawJson = RawJsonNode[]; // 根节点数组