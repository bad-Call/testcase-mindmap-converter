import { describe, it, expect } from "vitest";
import { parseMdTable, renderMdTable } from "./md_table";

describe("md_table", () => {
  const tableArray = [
    { action: "Do something", expect: "Something happens" },
    { action: "Do another thing", expect: "Another thing happens" },
  ];

  const tableString = `| Action | Expected Result |
|---|---|
| Do something | Something happens |
| Do another thing | Another thing happens |`;

  describe("parseMdTable", () => {
    it("should parse a markdown table string into an array of objects", () => {
      const result = parseMdTable(tableString);
      expect(result).toEqual(tableArray);
    });
  });

  describe("renderMdTable", () => {
    it("should render an array of objects into a markdown table string", () => {
      const result = renderMdTable(tableArray);
      expect(result).toBe(tableString);
    });
  });
});
