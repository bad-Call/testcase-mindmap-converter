import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import App from "./App.vue";
import * as clipboard from "../adapter/clipboard";
import * as parseMd from "../core/parse_md";
import * as renderJson from "../core/render_json";
import * as renderMd from "../core/render_md";
import * as parseJson from "../core/parse_json";

describe("App.vue", () => {
  it("should call writeClipboard when MD -> JSON button is clicked", async () => {
    const mockWriteClipboard = vi
      .spyOn(clipboard, "writeClipboard")
      .mockImplementation(() => Promise.resolve());
    const mockParseMd = vi.spyOn(parseMd, "parseMd").mockReturnValue({
      root: {
        type: "generic",
        title: "root",
        children: [
          {
            type: "case",
            title: "Test Case",
            priority: 1,
            owningSide: [],
            case: [],
            caseTag: [],
            precondition: [],
            steps: [],
          },
        ],
      },
    });
    const mockRenderJson = vi.spyOn(renderJson, "renderJson").mockReturnValue([
      {
        data: {
          title: "Test Case",
          stepTag: 1,
          priority: 1,
        },
        children: [],
      },
    ]);

    const wrapper = mount(App);

    const markdownInput = wrapper.find(
      'textarea[placeholder="Enter Markdown here"]'
    );
    await markdownInput.setValue("###### Test Case");

    const mdToJsonButton = wrapper.findAll("button")[0];
    await mdToJsonButton.trigger("click");

    expect(mockParseMd).toHaveBeenCalledWith("###### Test Case");
    expect(mockRenderJson).toHaveBeenCalledWith([
      expect.objectContaining({ type: "case" }),
    ]);
    expect(mockWriteClipboard).toHaveBeenCalledWith(expect.any(String));

    mockWriteClipboard.mockRestore();
    mockParseMd.mockRestore();
    mockRenderJson.mockRestore();
  });

  it("should call writeClipboard when JSON -> MD button is clicked", async () => {
    const mockWriteClipboard = vi
      .spyOn(clipboard, "writeClipboard")
      .mockImplementation(() => Promise.resolve());
    const mockParseJson = vi.spyOn(parseJson, "parseJson").mockReturnValue([
      {
        type: "case",
        title: "Test Case",
        priority: 1,
        owningSide: [],
        case: [],
        caseTag: [],
        precondition: [],
        steps: [],
      },
    ]);
    const mockRenderMd = vi
      .spyOn(renderMd, "renderMd")
      .mockReturnValue("## Test Case\n- Priority: P0");

    const wrapper = mount(App);

    const jsonInput = wrapper.find('textarea[placeholder="JSON output here"]');
    await jsonInput.setValue(
      JSON.stringify([
        {
          type: "case",
          title: "Test Case",
          priority: 1,
          owningSide: [],
          case: [],
          caseTag: [],
          precondition: [],
          steps: [],
        },
      ])
    );

    const jsonToMdButton = wrapper.findAll("button")[1];
    await jsonToMdButton.trigger("click");

    expect(mockParseJson).toHaveBeenCalledWith(expect.any(Object));
    expect(mockRenderMd).toHaveBeenCalledWith(
      expect.objectContaining({ type: "case" })
    );
    expect(mockWriteClipboard).toHaveBeenCalledWith(expect.any(String));

    mockWriteClipboard.mockRestore();
    mockParseJson.mockRestore();
    mockRenderMd.mockRestore();
  });
});
