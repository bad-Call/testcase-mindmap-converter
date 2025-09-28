import type { CaseNode } from "../mindmap_types";
import { CONFIG } from "../config";
import { parseMetadata } from "./md_metadata";
import { parsePrecondition } from "./md_case_precond";
import { parseSteps } from "./md_case_steps";

export function parseCase(lines: string[], startLine: number): CaseNode {
  const titleMatch = lines[0].match(CONFIG.patterns.heading);
  const title = titleMatch ? titleMatch[2].trim() : "";

  const caseNode: CaseNode = {
    type: "case",
    title,
    ...CONFIG.defaults,
    case: [],
    precondition: [],
    steps: [],
  };

  const metadataLines: string[] = [];
  const preconditionLines: string[] = [];
  const stepLines: string[] = [];

  let currentState: "metadata" | "precondition" | "steps" | null = "metadata";

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith("- Precondition:")) {
      currentState = "precondition";
      continue;
    }
    if (line.startsWith("- Steps:")) {
      currentState = "steps";
      continue;
    }

    switch (currentState) {
      case "metadata":
        metadataLines.push(line);
        break;
      case "precondition":
        preconditionLines.push(line);
        break;
      case "steps":
        stepLines.push(line);
        break;
    }
  }

  Object.assign(caseNode, parseMetadata(metadataLines));
  caseNode.precondition = parsePrecondition(preconditionLines);
  caseNode.steps = parseSteps(
    stepLines,
    startLine + lines.indexOf(stepLines[0])
  );

  return caseNode;
}
