import { describe, it, expect, vi } from "vitest";
import { readClipboard, writeClipboard } from "./clipboard";

describe("clipboard", () => {
  describe("readClipboard", () => {
    it("should read text from clipboard and strip BOM", async () => {
      // Mock navigator.clipboard.readText
      vi.spyOn(navigator.clipboard, "readText").mockResolvedValueOnce(
        "\ufeffTest content"
      );
      const result = await readClipboard();
      expect(result).toBe("Test content");
    });

    it("should read text from clipboard without BOM", async () => {
      vi.spyOn(navigator.clipboard, "readText").mockResolvedValueOnce(
        "Test content"
      );
      const result = await readClipboard();
      expect(result).toBe("Test content");
    });
  });

  describe("writeClipboard", () => {
    it("should write text to clipboard with BOM", async () => {
      const writeTextSpy = vi
        .spyOn(navigator.clipboard, "writeText")
        .mockResolvedValueOnce(undefined);
      await writeClipboard("Test content");
      expect(writeTextSpy).toHaveBeenCalledWith("\ufeffTest content");
    });
  });
});
