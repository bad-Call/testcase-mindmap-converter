import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    setupFiles: ["vitest-canvas-mock", "./vitest.setup.ts"],
    environment: "jsdom",
  },
});
