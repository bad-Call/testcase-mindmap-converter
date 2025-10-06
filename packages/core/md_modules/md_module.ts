import type { ModuleNode } from "../types/mindmap_types";
import { CONFIG } from "../config";
import { ParseError } from "../errors";

export function parseModule(lines: string[], lineNo: number = 1): ModuleNode {
  const match = lines[0].match(CONFIG.patterns.heading);
  if (!match) throw new ParseError("Invalid module format", lineNo);

  const [, prefix, title] = match;
  const moduleType =
    CONFIG.moduleTypeMap[prefix as keyof typeof CONFIG.moduleTypeMap];

  if (!moduleType) throw new ParseError("Invalid module format", lineNo);

  return {
    type: "module",
    title: title.trim(),
    moduleType,
    children: [],
  };
}
