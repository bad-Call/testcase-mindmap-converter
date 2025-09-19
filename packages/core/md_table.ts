type Step = { action: string; expect: string };

export function parseMdTable(tableString: string): Step[] {
  const steps: Step[] = [];
  const lines = tableString.trim().split("\n");

  for (const line of lines) {
    const trimmedLine = line.trim();
    if (trimmedLine.startsWith("|")) {
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
  return steps;
}

export function renderMdTable(steps: Step[]): string {
  const header = `| Action | Expected Result |`;
  const separator = `|---|---|`;
  const rows = steps.map((step) => `| ${step.action} | ${step.expect} |`);

  return [header, separator, ...rows].join("\n");
}
