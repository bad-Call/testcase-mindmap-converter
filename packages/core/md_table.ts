import { ParseError } from "./errors";

type Step = { action: string; expect: string };

export function parseMdTable(
  tableString: string,
  startingLineNumber: number
): Step[] {
  const steps: Step[] = [];
  const lines = tableString.trim().split("\n");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const currentLineNumber = startingLineNumber + i;
    const trimmedLine = line.trim();

    if (trimmedLine.startsWith("|")) {
      const parts = trimmedLine.split("|").map((s) => s.trim());
      // Valid row should be like `| content | content |` which results in 4 parts
      if (
        parts.length !== 4 &&
        !parts[1].startsWith("---") &&
        parts[1] !== "Action"
      ) {
        throw new ParseError("Invalid table format", currentLineNumber);
      }

      if (parts[1] !== "Action" && !parts[1].startsWith("---")) {
        steps.push({ action: parts[1], expect: parts[2] });
      }
    }
  }
  return steps;
}

export function renderMdTable(steps: Step[]): string {
  const header = `| Action | Expected Result |`;
  const separator = `|---|---|`;
  const rows = steps.map((step) => `| ${step.action} | ${step.expect} |`);

  return [header, separator, ...rows].join("\n");
}
