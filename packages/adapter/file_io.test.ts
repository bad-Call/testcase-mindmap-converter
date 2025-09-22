import { describe, it, expect, vi } from "vitest";
import { triggerDownload, selectFile } from "./file_io";

describe("file_io", () => {
  describe("triggerDownload", () => {
    it("should create a blob, create a link, click it, and revoke the URL", () => {
      const createObjectURLSpy = vi.spyOn(URL, "createObjectURL");
      const revokeObjectURLSpy = vi.spyOn(URL, "revokeObjectURL");
      const createElementSpy = vi.spyOn(document, "createElement");

      const mockLink = {
        href: "",
        download: "",
        click: vi.fn(),
        remove: vi.fn(),
      };
      createElementSpy.mockReturnValue(mockLink as any);

      triggerDownload("test content", "test.txt", "text/plain");

      expect(createObjectURLSpy).toHaveBeenCalled();
      expect(mockLink.download).toBe("test.txt");
      expect(mockLink.href).toBeDefined();
      expect(mockLink.click).toHaveBeenCalled();
      expect(revokeObjectURLSpy).toHaveBeenCalledWith(mockLink.href);

      createObjectURLSpy.mockRestore();
      revokeObjectURLSpy.mockRestore();
      createElementSpy.mockRestore();
    });
  });

  describe("selectFile", () => {
    it("should return the content of a selected file", async () => {
      const mockFileContent = "file content";
      const mockFile = new File([mockFileContent], "test.txt", {
        type: "text/plain",
      });

      const mockFileReader = {
        onload: vi.fn(),
        readAsText: vi.fn(),
        result: mockFileContent,
      };

      vi.spyOn(window, "FileReader").mockImplementation(
        () => mockFileReader as any
      );

      const mockInput = {
        type: "file",
        accept: "",
        click: vi.fn(),
        files: [mockFile],
        remove: vi.fn(),
        style: { display: "" }, // Add style property
        addEventListener: vi.fn((event, callback) => {
          if (event === "change") {
            // Simulate file selection with a mock event object
            callback({ target: mockInput } as any);
          }
        }),
      };
      vi.spyOn(document, "createElement").mockReturnValue(mockInput as any);

      const promise = selectFile("text/plain");

      // Manually trigger the onload event for the mocked FileReader
      mockFileReader.onload({ target: { result: mockFileContent } } as any);

      const result = await promise;
      expect(result).toBe(mockFileContent);

      vi.spyOn(window, "FileReader").mockRestore();
      vi.spyOn(document, "createElement").mockRestore();
    });
  });
});
