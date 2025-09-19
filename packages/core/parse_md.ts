import type { CaseNode } from "./mindmap_types";
import { PRIORITY_MAPPING } from "./config";
import { parseMdTable } from "./md_table";

export function parseMd(mdContent: string): CaseNode | null {
  const lines = mdContent.trim().split("\n");

  const titleLine = lines.find((line) => line.startsWith("######"));
  const titleMatch = titleLine?.match(/^#{6}\s+(.*)/);
  if (!titleMatch) return null;

  const text = titleMatch[1].trim();
  let priority: CaseNode["priority"] = 4; // Default priority C
  const precondition: string[] = [];
  const steps: CaseNode["steps"] = [];

  let parsingState: "precondition" | "steps" | null = null;

  for (const line of lines) {
    const trimmedLine = line.trim();

    if (trimmedLine.startsWith("- Priority:")) {
      const priorityValue = trimmedLine.split(":")[1].trim();
      if (priorityValue.startsWith("P")) {
        const numericValue = parseInt(priorityValue.substring(1), 10);
        // As per test `P1` maps to `2`, so we assume Pn maps to n+1
        if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 4) {
          priority = (numericValue + 1) as CaseNode["priority"];
        }
      } else {
        const priorityKey =
          priorityValue.toUpperCase() as keyof typeof PRIORITY_MAPPING;
        if (priorityKey in PRIORITY_MAPPING) {
          priority = PRIORITY_MAPPING[priorityKey];
        }
      }
    } else if (trimmedLine.startsWith("- Precondition:")) {
      parsingState = "precondition";
    } else if (trimmedLine.startsWith("- Steps:")) {
      parsingState = "steps";
    } else if (
      parsingState === "precondition" &&
      trimmedLine.startsWith("- ")
    ) {
      precondition.push(trimmedLine.substring(2).trim());
    } else if (parsingState === "steps" && trimmedLine.startsWith("|")) {
      const parts = trimmedLine.split("|").map((s) => s.trim());
      if (
        parts.length >= 4 &&
        parts[1] !== "Action" &&
        !parts[1].startsWith("---")
      ) {
        steps.push({ action: parts[1], expect: parts[2] });
      }
    }
  }

  return {
    type: "case",
    text,
    priority,
    owningSide: [],
    case: [],
    caseTag: [],
    precondition,
    steps,
  };
}
