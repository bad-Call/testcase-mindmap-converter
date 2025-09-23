<template>
  <div id="app">
    <h1>Mindmap Converter</h1>
    <div class="converter-section">
      <textarea
        v-model="markdownInput"
        placeholder="Enter Markdown here"
      ></textarea>
      <button @click="convertMdToJson">MD -> JSON</button>
    </div>
    <div class="converter-section">
      <textarea
        v-model="jsonOutput"
        placeholder="JSON output here"
        readonly
      ></textarea>
      <button @click="convertJsonToMd">JSON -> MD</button>
    </div>
    <div v-if="error" class="error-message">{{ error }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { parseMd } from "../core/parse_md";
import { renderJson } from "../core/render_json";
import { parseJson } from "../core/parse_json";
import { renderMd } from "../core/render_md";
import { writeClipboard } from "../adapter/clipboard";

const markdownInput = ref("");
const jsonOutput = ref("");
const error = ref("");

const convertMdToJson = () => {
  error.value = "";
  try {
    const mindmapNode = parseMd(markdownInput.value);
    if (mindmapNode) {
      jsonOutput.value = JSON.stringify(renderJson([mindmapNode]), null, 2);
      writeClipboard(jsonOutput.value);
    } else {
      error.value = "Failed to parse Markdown: No CaseNode found.";
    }
  } catch (e: any) {
    error.value = e.message;
  }
};

const convertJsonToMd = () => {
  error.value = "";
  try {
    const mindmapNodes = parseJson(JSON.parse(jsonOutput.value));
    const caseNode = mindmapNodes.find((node) => node.type === "case");
    if (caseNode && caseNode.type === "case") {
      markdownInput.value = renderMd(caseNode);
      writeClipboard(markdownInput.value);
    } else {
      error.value = "Failed to parse JSON: No CaseNode found to render.";
    }
  } catch (e: any) {
    error.value = e.message;
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.converter-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

textarea {
  width: 80%;
  height: 200px;
  margin-bottom: 10px;
  padding: 10px;
  font-size: 16px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

.error-message {
  color: red;
  margin-top: 20px;
}
</style>
