import { describe, it, expect } from "vitest";
import { parseCase } from "../../../md_modules/md_case";
import { CONFIG } from "../../../config";

describe("parseCase", () => {
  it("should parse a full case node correctly based on example.md", () => {
    const mdContent = [
      "###### 客户端边界场景 - 安卓设备未安装App，点击短链跳转浏览器",
      "<!-- id: e0e9ba83-dc21-4ccc-9ca5-bab935ac182c -->",
      "<!-- case: [17789236] -->",
      "<!-- aiCaseFlag: false -->",
      "优先级: C",
      "用例类型: 客户端",
      "标签: iOS, Android",
      "",
      "**前置条件**",
      "- 安卓设备",
      "- 未安装App",
      "- 短信中包含有效短链（例如https://c.opdwz.cn/oppstore/ZaomjJx3kO）",
      "",
      "**测试步骤**",
      "",
      "| 操作步骤 | 预期结果 |",
      "|----------|----------|",
      "| 在短信应用中点击短链 | 跳转浏览器打开H5页面（对应长链内容）<br>不会尝试唤醒App |",
    ];
    const result = parseCase(mdContent, 1);

    expect(result.type).toBe("case");
    expect(result.title).toBe(
      "客户端边界场景 - 安卓设备未安装App，点击短链跳转浏览器"
    );
    expect(result.id).toBe("e0e9ba83-dc21-4ccc-9ca5-bab935ac182c");
    expect(result.case).toEqual([17789236]);
    expect(result.aiCaseFlag).toBe(false);
    expect(result.priority).toBe(CONFIG.priorityMap.C);
    expect(result.owningSide).toEqual(CONFIG.owningSideMap.客户端);
    expect(result.caseTag).toEqual([
      { id: CONFIG.caseTagMap.iOS, name: "iOS" },
      { id: CONFIG.caseTagMap.Android, name: "Android" },
    ]);
    expect(result.precondition).toEqual([
      "安卓设备",
      "未安装App",
      "短信中包含有效短链（例如https://c.opdwz.cn/oppstore/ZaomjJx3kO）",
    ]);
    expect(result.steps).toEqual([
      {
        action: "在短信应用中点击短链",
        expect: "跳转浏览器打开H5页面（对应长链内容）<br>不会尝试唤醒App",
      },
    ]);
  });

  it("should parse a case node with only a title", () => {
    const mdContent = ["###### Simple Case"];
    const result = parseCase(mdContent, 1);

    expect(result.type).toBe("case");
    expect(result.title).toBe("Simple Case");
    expect(result.priority).toBe(CONFIG.defaults.priority); // Default priority
    expect(result.precondition).toEqual([]);
    expect(result.steps).toEqual([]);
  });

  it("should handle missing sections gracefully", () => {
    const mdContent = [
      "###### Case with missing steps",
      "优先级: A",
      "**前置条件**",
      "- Only precondition",
    ];
    const result = parseCase(mdContent, 1);

    expect(result.type).toBe("case");
    expect(result.title).toBe("Case with missing steps");
    expect(result.priority).toBe(CONFIG.priorityMap.A);
    expect(result.precondition).toEqual(["Only precondition"]);
    expect(result.steps).toEqual([]);
  });
});
