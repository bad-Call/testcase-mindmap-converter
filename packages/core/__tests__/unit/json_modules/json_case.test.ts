// packages/core/json/__tests__/json_case.test.ts
import { describe, it, expect } from "vitest";
import { jsonToCaseNode as parseJsonCase } from "../../../json_modules/json_case";
import { caseNodeToJson as renderJsonCase } from "../../../json_modules/json_case";
import type { RawJsonNode } from "../../../types/rawJson_types";

const rawCaseNode: RawJsonNode = {
  data: {
    id: "e0e9ba83-dc21-4ccc-9ca5-bab935ac182c",
    text: "客户端边界场景 - 安卓设备未安装App，点击短链跳转浏览器",
    priority: 4,
    stepTag: 1,
    owningSide: [0],
    case: [17789236],
    aiCaseFlag: false,
    caseTag: [
      { id: 1388, name: "iOS" },
      { id: 1389, name: "Android" },
    ],
  },
  children: [
    {
      data: {
        id: "ca53f57e-18d1-407d-93cd-40f92fc4ea61",
        text: "1. 安卓设备\n2. 未安装App\n3. 短信中包含有效短链（例如https://c.opdwz.cn/oppstore/ZaomjJx3kO ）",
        stepTag: 2,
        aiCaseFlag: false,
      },
      children: [],
    },
    {
      data: {
        id: "70e18ac8-a4e9-4029-8d8a-fd7c50414277",
        text: "1. 在短信应用中点击短链",
        stepTag: 3,
        aiCaseFlag: false,
      },
      children: [
        {
          data: {
            id: "3423041f-ff67-4eb8-954f-acae068424f9",
            text: "1. 跳转浏览器打开H5页面（对应长链内容）\n2. 不会尝试唤醒App",
            stepTag: 4,
            aiCaseFlag: false,
          },
          children: [],
        },
      ],
    },
  ],
};

describe("json_case - 端到端用例", () => {
  it("应能把 RawJsonCase 解析成 CaseNode", () => {
    const node = parseJsonCase(rawCaseNode);

    expect(node.type).toBe("case");
    expect(node.title).toBe(
      "客户端边界场景 - 安卓设备未安装App，点击短链跳转浏览器"
    );
    expect(node.priority).toBe(4); // C 级
    expect(node.owningSide).toEqual([0]);
    expect(node.case).toEqual([17789236]);
    expect(node.aiCaseFlag).toBe(false);
    expect(node.caseTag).toEqual([
      { id: 1388, name: "iOS" },
      { id: 1389, name: "Android" },
    ]);

    // 前置条件
    expect(node.precondition).toEqual([
      "1. 安卓设备",
      "2. 未安装App",
      "3. 短信中包含有效短链（例如https://c.opdwz.cn/oppstore/ZaomjJx3kO ）",
    ]);

    // 步骤表格
    expect(node.steps).toHaveLength(1);
    expect(node.steps[0]).toEqual({
      action: "1. 在短信应用中点击短链",
      expect: "1. 跳转浏览器打开H5页面（对应长链内容）\n2. 不会尝试唤醒App",
    });
  });

  it("应能把 CaseNode 再渲染回 RawJsonNode 且 deepEqual 于原数据", () => {
    const caseNode = parseJsonCase(rawCaseNode);
    const rendered = renderJsonCase(caseNode);
    expect(rendered).toStrictEqual(rawCaseNode);
  });
});
