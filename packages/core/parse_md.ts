import type { CaseNode } from "./mindmap_types";
import { PRIORITY_MAPPING } from "./config";
import { parseMdTable } from "./md_table";
import { ParseError } from "./errors";

export function parseMd(mdContent: string): CaseNode | null {
  const lines = mdContent.trim().split("\n");

  const titleLineIndex = lines.findIndex((line) => line.startsWith("######"));
  if (titleLineIndex === -1) {
    throw new ParseError("Missing title", 1);
  }
  const titleLine = lines[titleLineIndex];
  const titleMatch = titleLine.match(/^#{6}\s+(.*)/);
  // This should not happen due to the findIndex check, but for type safety:
  if (!titleMatch)
    throw new ParseError("Invalid title format", titleLineIndex + 1);

  const text = titleMatch[1].trim();
  let priority: CaseNode["priority"] = 4; // Default priority C
  const precondition: string[] = [];
  let steps: CaseNode["steps"] = [];

  let parsingState: "precondition" | "steps" | null = null;
  const stepLines: string[] = [];
  let stepsStartLine = -1;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmedLine = line.trim();
    const currentLineNumber = i + 1;

    if (trimmedLine.startsWith("- Priority:")) {
      const priorityValue = trimmedLine.split(":")[1].trim();
      let foundPriority = false;
      if (priorityValue.startsWith("P")) {
        const numericValue = parseInt(priorityValue.substring(1), 10);
        if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 4) {
          priority = (numericValue + 1) as CaseNode["priority"];
          foundPriority = true;
        }
      } else {
        const priorityKey =
          priorityValue.toUpperCase() as keyof typeof PRIORITY_MAPPING;
        if (priorityKey in PRIORITY_MAPPING) {
          priority = PRIORITY_MAPPING[priorityKey];
          foundPriority = true;
        }
      }
      if (!foundPriority) {
        throw new ParseError("Invalid priority value", currentLineNumber);
      }
    } else if (trimmedLine.startsWith("- Precondition:")) {
      parsingState = "precondition";
    } else if (trimmedLine.startsWith("- Steps:")) {
      parsingState = "steps";
      stepsStartLine = currentLineNumber;
    } else if (
      parsingState === "precondition" &&
      trimmedLine.startsWith("- ")
    ) {
      precondition.push(trimmedLine.substring(2).trim());
    } else if (parsingState === "steps" && trimmedLine.startsWith("|")) {
      stepLines.push(trimmedLine);
    } else if (
      parsingState === "steps" &&
      stepLines.length > 0 &&
      !trimmedLine.startsWith("|")
    ) {
      // End of steps section
      parsingState = null;
    }
  }

  if (stepLines.length > 0) {
    steps = parseMdTable(stepLines.join("\n"), stepsStartLine);
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
