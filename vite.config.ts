/// <reference types="vitest" />
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";
import vue from "@vitejs/plugin-vue"; // Assuming Vue will be used for UI

export default defineConfig({
  plugins: [vue(), viteSingleFile()],
  test: {
    // vitest config
    globals: true,
    environment: "jsdom",
    setupFiles: ["vitest-canvas-mock", "./vitest.setup.ts"],
    include: ["packages/**/*.test.ts"],
  },
  resolve: {
    alias: {
      "@": "/packages",
    },
  },
});
