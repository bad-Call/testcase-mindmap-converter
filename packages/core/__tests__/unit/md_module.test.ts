import { describe, it, expect } from "vitest";
import { parseModule } from "../../md/md_module";
import { CONFIG } from "../../config";

describe("parseModule", () => {
  it("should parse a level 2 module heading correctly", () => {
    const line = "## First Level Module";
    const result = parseModule(line);
    expect(result.type).toBe("module");
    expect(result.title).toBe("First Level Module");
    expect(result.moduleType).toBe(CONFIG.moduleTypeMap["##"]);
  });

  it("should parse a level 3 module heading correctly", () => {
    const line = "### Second Level Module";
    const result = parseModule(line);
    expect(result.type).toBe("module");
    expect(result.title).toBe("Second Level Module");
    expect(result.moduleType).toBe(CONFIG.moduleTypeMap["###"]);
  });

  it("should return an empty object for a non-module heading", () => {
    const line = "# Not a Module";
    const result = parseModule(line);
    expect(result).toEqual({});
  });

  it("should return an empty object for a line that is not a heading", () => {
    const line = "Just some text";
    const result = parseModule(line);
    expect(result).toEqual({});
  });
});
