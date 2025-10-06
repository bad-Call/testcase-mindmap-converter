import type { CaseNode } from "../types/mindmap_types";
import { CONFIG } from "../config";
import { parseMetadata } from "./md_metadata";
import { parsePrecondition } from "./md_case_precond";
import { parseSteps } from "./md_case_steps";
import { ParseError } from "../errors";

export function parseCase(lines: string[], startLine: number): CaseNode {
  const titleMatch = lines[0].match(CONFIG.patterns.heading);
  if (!titleMatch) {
    throw new ParseError("Missing title", startLine);
  }
  const title = titleMatch[2].trim();

  const caseNode: CaseNode = {
    type: "case",
    title,
    ...CONFIG.defaults,
    case: [],
    precondition: [],
    steps: [],
    id: "", // Initialize id
    aiCaseFlag: false, // Initialize aiCaseFlag
    owningSide: [], // Initialize owningSide
    caseTag: [], // Initialize caseTag
  };

  const metadataLines: string[] = [];
  const preconditionLines: string[] = [];
  const stepLines: string[] = [];

  let currentState: "metadata" | "precondition" | "steps" | null = "metadata";

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith("**前置条件**")) {
      currentState = "precondition";
      continue;
    }
    if (line.startsWith("**测试步骤**")) {
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

  Object.assign(caseNode, parseMetadata(metadataLines, startLine + 1));
  caseNode.precondition = parsePrecondition(preconditionLines);
  const stepsSectionIndex = lines.findIndex((line) =>
    line.startsWith("**测试步骤**")
  );
  const stepsStartLine =
    stepsSectionIndex !== -1 ? startLine + stepsSectionIndex + 1 : startLine;
  caseNode.steps = parseSteps(stepLines, stepsStartLine);

  return caseNode;
}
