import { CONFIG } from "../config";
import type { CaseNode } from "../mindmap_types";

export function parseMetadata(lines: string[]): Partial<CaseNode> {
  const metadata: Partial<CaseNode> = {};

  for (const line of lines) {
    const match = line.match(CONFIG.patterns.metadata);
    if (!match) continue;

    const [, key, value] = match;
    const trimmedValue = value.trim();

    switch (key) {
      case CONFIG.metaKeywords.priority:
        const priorityKey =
          trimmedValue.toUpperCase() as keyof typeof CONFIG.priorityMap;
        if (priorityKey in CONFIG.priorityMap) {
          metadata.priority = CONFIG.priorityMap[priorityKey];
        }
        break;
      // Add other metadata parsing here in the future
    }
  }

  return metadata;
}
