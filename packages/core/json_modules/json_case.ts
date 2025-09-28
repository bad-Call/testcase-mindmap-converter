import type { CaseNode } from "../types/mindmap_types";
import type { RawJsonNode } from "../types/rawJson_types";
import { CONFIG } from "../config";

function mapCaseDataFields(node: CaseNode) {
  return {
    id: node.id,
    text: node.title,
    priority: node.priority,
    owningSide: node.owningSide,
    case: node.case,
    aiCaseFlag: node.aiCaseFlag,
    caseTag: node.caseTag,
    ...(node.starTag !== undefined && { starTag: node.starTag }), // Only include starTag if it's not undefined
  };
}

function buildChildrenFromScratch(node: CaseNode): RawJsonNode[] {
  const children: RawJsonNode[] = [];

  // Add preconditions as children with stepTag 'precondition'
  if (node.precondition && node.precondition.length > 0) {
    children.push({
      data: {
        text: node.precondition.join("\n"),
        stepTag: CONFIG.stepTagMap.precondition,
        aiCaseFlag: false,
      },
      children: [],
    });
  }

  // Add steps as children with stepTag 'action' and their expectations as nested children with stepTag 'expect'
  if (node.steps && node.steps.length > 0) {
    node.steps.forEach((step) => {
      const stepChildren: RawJsonNode[] = [];
      if (step.expect) {
        stepChildren.push({
          data: {
            text: step.expect,
            stepTag: CONFIG.stepTagMap.expect,
            aiCaseFlag: false,
          },
          children: [],
        });
      }
      children.push({
        data: {
          text: step.action,
          stepTag: CONFIG.stepTagMap.action,
          aiCaseFlag: false,
        },
        children: stepChildren,
      });
    });
  }
  return children;
}

export function jsonToCaseNode(raw: RawJsonNode): CaseNode {
  // 1. 深拷贝备份（保留所有未来字段）
  const rawChildren = JSON.parse(JSON.stringify(raw.children)) as RawJsonNode[];

  // 2. 照旧拍平业务字段
  const precondition: string[] = [];
  const steps: Array<{ action: string; expect: string }> = [];

  raw.children.forEach((c) => {
    const tag = c.data.stepTag;
    if (tag === CONFIG.stepTagMap.precondition)
      precondition.push(...c.data.text.split("\n"));
    if (tag === CONFIG.stepTagMap.action && c.children && c.children[0]) {
      steps.push({
        action: c.data.text,
        expect: c.children[0].data.text,
      });
    }
  });

  return {
    type: "case",
    title: raw.data.text,
    id: raw.data.id,
    priority: raw.data.priority,
    owningSide: raw.data.owningSide,
    case: raw.data.case,
    caseTag: raw.data.caseTag,
    aiCaseFlag: raw.data.aiCaseFlag,
    starTag: raw.data.starTag,
    precondition,
    steps,
    rawChildren, // ← 原样带回去
  };
}

export function caseNodeToJson(node: CaseNode): RawJsonNode {
  // 存在备份直接返回，零拼装
  if (node.rawChildren) {
    return {
      data: {
        ...mapCaseDataFields(node), // id/priority/owingSide 等
        stepTag: CONFIG.stepTagMap.case,
      },
      children: node.rawChildren, // 字节级一致
    };
  }

  // 无备份（纯 Markdown 输入）→ 退回到老逻辑
  return {
    data: { ...mapCaseDataFields(node), stepTag: CONFIG.stepTagMap.case },
    children: buildChildrenFromScratch(node), // 原有拼装代码
  };
}
