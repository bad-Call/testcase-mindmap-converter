import type { ModuleNode } from "../mindmap_types";
import { CONFIG } from "../config";

export function parseModule(line: string): Partial<ModuleNode> {
  const match = line.match(CONFIG.patterns.heading);
  if (!match) return {};

  const [, prefix, title] = match;
  const moduleType =
    CONFIG.moduleTypeMap[prefix as keyof typeof CONFIG.moduleTypeMap];

  if (!moduleType) return {};

  return {
    type: "module",
    title: title.trim(),
    moduleType,
  };
}
