import { CONFIG } from "../config";

export function parsePrecondition(lines: string[]): string[] {
  const precondition: string[] = [];
  for (const line of lines) {
    const match = line.match(CONFIG.patterns.listItem);
    if (match) {
      precondition.push(match[1].trim());
    }
  }
  return precondition;
}
