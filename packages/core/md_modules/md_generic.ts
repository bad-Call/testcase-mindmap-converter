import type { GenericNode } from "../types/mindmap_types";
import { CONFIG } from "../config";
import { ParseError } from "../errors";

export function parseGeneric(lines: string[], lineNo: number = 1): GenericNode {
  const match = lines[0].match(CONFIG.patterns.heading);
  if (!match) throw new ParseError("Invalid module format", lineNo);

  const [, , title] = match;

  return {
    type: "generic",
    title: title.trim(),
    children: [],
  };
}
