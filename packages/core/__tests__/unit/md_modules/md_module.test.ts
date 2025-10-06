import { describe, it, expect } from "vitest";
import { parseModule } from "../../../md_modules/md_module";
import { CONFIG } from "../../../config";
import { ParseError } from "../../../errors";

describe("parseModule", () => {
  it("should parse a level 2 module heading correctly", () => {
    const lines = ["## First Level Module"];
    const result = parseModule(lines);
    expect(result.type).toBe("module");
    expect(result.title).toBe("First Level Module");
    expect(result.moduleType).toBe(CONFIG.moduleTypeMap["##"]);
    expect(result.children).toEqual([]);
  });

  it("should parse a level 3 module heading correctly", () => {
    const lines = ["### Second Level Module"];
    const result = parseModule(lines);
    expect(result.type).toBe("module");
    expect(result.title).toBe("Second Level Module");
    expect(result.moduleType).toBe(CONFIG.moduleTypeMap["###"]);
    expect(result.children).toEqual([]);
  });

  it("should throw a ParseError for a non-module heading", () => {
    const lines = ["# Not a Module"];
    expect(() => parseModule(lines)).toThrow(
      new ParseError("Invalid module format", 1)
    );
  });

  it("should throw a ParseError for a line that is not a heading", () => {
    const lines = ["Just some text"];
    expect(() => parseModule(lines)).toThrow(
      new ParseError("Invalid module format", 1)
    );
  });
});
