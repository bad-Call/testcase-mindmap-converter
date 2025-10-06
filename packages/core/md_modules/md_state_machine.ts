import type {
  MindMapNode,
  MindMap,
  ParentNode,
  RootNode,
} from "../types/mindmap_types"; // Corrected import path
import { CONFIG } from "../config";
import { parseModule } from "./md_module";
import { parseCase } from "./md_case";
import { parseGeneric } from "./md_generic"; // 新增：处理 ####/##### 等
import { start } from "repl";

type StackFrame = {
  level: number; // 1-5
  node: ParentNode;
};

export function buildTree(lines: string[]): MindMap {
  const root: MindMap = [];
  const stack: StackFrame[] = [
    { level: 0, node: { type: "root", children: root } as RootNode },
  ];

  let buf: { startLineNum: number; lines: string[] } = {
    startLineNum: 1,
    lines: [],
  }; // 当前节点累积行
  let frame: StackFrame = stack[0]; // 正在填充的帧
  let level: number = 0;
  let lineNo: number = 1;

  function pushStack() {
    // 弹出比新层级浅的栈帧
    while (stack.length > 1 && stack[stack.length - 1].level >= level) {
      stack.pop();
    }
    frame = stack[stack.length - 1]; // Update frame after popping

    // 把之前累积的行 dispatch 给当前帧
    const node = dispatch(level)(buf.lines, buf.startLineNum);
    buf = { startLineNum: lineNo, lines: [] };

    const parent = frame.node;
    parent.children!.push(node);

    // 压栈 & 更新当前帧 (只有 ParentNode 才能压栈)
    if ("children" in node) {
      frame = { level, node: node as ParentNode };
      stack.push(frame);
    }
  }

  function pushBuf(line: string) {
    if (line.trim().length > 0) {
      if (buf.lines.length === 0) {
        buf.startLineNum = lineNo;
      }
      buf.lines.push(line);
    }
  }

  for (; lineNo <= lines.length; lineNo++) {
    const line = lines[lineNo - 1];
    const m = line.match(CONFIG.patterns.heading);
    if (!m) {
      // 非 heading → 累积
      pushBuf(line);
      continue;
    } else {
      /* -------- 遇到新 heading -------- */
      if (buf.lines.length > 0) {
        pushStack();
      }
      level = m[1].length;
      if (line.trim().length === 0) {
        continue;
      }
      pushBuf(line);
    }
  }
  // 处理最后一个 heading 后的剩余行
  if (buf.lines.length > 0) {
    pushStack();
  }
  return root;
}

/* ========= 统一 dispatch 函数 ========= */
function dispatch(
  level: number
): (lines: string[], lineNo: number) => MindMapNode {
  switch (level) {
    case 2:
    case 3:
      // 模块节点：把剩余行交给 md_module 二次解析
      return parseModule;
    case 6:
      // 用例节点：把剩余行交给 md_case 二次解析
      return parseCase;
    default:
      return parseGeneric;
  }
}
