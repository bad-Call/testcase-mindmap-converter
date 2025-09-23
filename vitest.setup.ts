import { vi } from "vitest";

// Mock navigator.clipboard for Vitest environment
Object.defineProperty(globalThis, "navigator", {
  value: {
    clipboard: {
      readText: vi.fn(() => Promise.resolve("")),
      writeText: vi.fn(() => Promise.resolve()),
    },
  },
  writable: true,
});

// Mock URL for createObjectURL and revokeObjectURL
Object.defineProperty(globalThis, "URL", {
  value: {
    createObjectURL: vi.fn(() => "blob:mock-url"),
    revokeObjectURL: vi.fn(),
  },
  writable: true,
});

// Mock FileReader
Object.defineProperty(globalThis, "FileReader", {
  value: vi.fn(() => ({
    readAsText: vi.fn(),
    onload: null,
    onerror: null,
  })),
  writable: true,
});
