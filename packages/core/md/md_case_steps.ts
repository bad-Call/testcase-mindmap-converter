import { CONFIG } from "../config";
import type { CaseNode } from "../mindmap_types";
import { ParseError } from "../errors";

export function parseSteps(
  lines: string[],
  startLine: number
): CaseNode["steps"] {
  const steps: CaseNode["steps"] = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes("---")) continue; // Skip header separator

    const match = line.match(CONFIG.patterns.tableRow);
    if (match) {
      const [, action, expect] = match;
      steps.push({ action: action.trim(), expect: expect.trim() });
    } else {
      throw new ParseError("Invalid step format", startLine + i);
    }
  }
  return steps;
}
