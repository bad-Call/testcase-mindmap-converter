import { CONFIG } from "../config";
import type { CaseNode } from "../types/mindmap_types";
import { ParseError } from "../errors";

export function parseMetadata(
  lines: string[],
  startLine: number
): Partial<CaseNode> {
  const metadata: Partial<CaseNode> = {};

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    let key: string | undefined;
    let value: string | undefined;

    const commentedMatch = line.match(CONFIG.patterns.commentedMetadata);
    if (commentedMatch) {
      key = commentedMatch[1].trim();
      value = commentedMatch[2].trim();
    } else {
      const metadataMatch = line.match(CONFIG.patterns.metadata);
      if (metadataMatch) {
        key = metadataMatch[1].trim();
        value = metadataMatch[2].trim();
      }
    }

    if (key && value) {
      switch (key) {
        case "id":
          metadata.id = value;
          break;
        case "case":
          try {
            metadata.case = JSON.parse(value);
          } catch (e) {
            throw new ParseError(
              `Invalid JSON for case: ${value}`,
              startLine + i
            );
          }
          break;
        case "aiCaseFlag":
          metadata.aiCaseFlag = value === "true";
          break;
        case CONFIG.metaKeywords.priority:
          const priorityKey =
            value.toUpperCase() as keyof typeof CONFIG.priorityMap;
          if (priorityKey in CONFIG.priorityMap) {
            metadata.priority = CONFIG.priorityMap[priorityKey];
          } else {
            throw new ParseError("Invalid priority value", startLine + i);
          }
          break;
        case CONFIG.metaKeywords.owningSide: // Special handling for owningSide
          const owningSideKey = value as keyof typeof CONFIG.owningSideMap;
          if (owningSideKey in CONFIG.owningSideMap) {
            metadata.owningSide = Array.from(
              CONFIG.owningSideMap[owningSideKey]
            );
          }
          break;
        case CONFIG.metaKeywords.caseTag:
          metadata.caseTag = value.split(",").map((tagName) => {
            const trimmedTagName =
              tagName.trim() as keyof typeof CONFIG.caseTagMap;
            if (trimmedTagName in CONFIG.caseTagMap) {
              return {
                id: CONFIG.caseTagMap[trimmedTagName],
                name: trimmedTagName,
              };
            }
            throw new ParseError(`Invalid tag name: ${tagName}`, startLine + i);
          });
          break;
      }
    }
  }

  return metadata;
}
