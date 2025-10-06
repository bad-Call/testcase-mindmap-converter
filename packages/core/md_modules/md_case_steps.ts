import { CONFIG } from "../config";
import type { CaseNode } from "../types/mindmap_types";
import { ParseError } from "../errors";

export function parseSteps(
  lines: string[],
  startLine: number
): CaseNode["steps"] {
  const steps: CaseNode["steps"] = [];
  let headerSkipped = false; // Flag to ensure header is skipped
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes("---")) {
      headerSkipped = true; // Mark that the separator has been found
      continue; // Skip header separator
    }
    if (!headerSkipped && line.match(CONFIG.patterns.tableRow)) {
      // This is the header row, skip it
      continue;
    }

    const match = line.match(CONFIG.patterns.tableRow);
    if (match) {
      const [, action, expect] = match;
      steps.push({ action: action.trim(), expect: expect.trim() });
    } else {
      // Only throw error if it's not an empty line and not a header/separator
      if (line.trim() !== "") {
        throw new ParseError("Invalid step format", startLine + i);
      }
    }
  }
  return steps;
}
