# 项目开发 TODO 列表

以下是一份「测试驱动（TDD）」节奏下的 coding TODO 列表。
每条任务都以「红-绿-重构」循环推进：**先写测试 → 让测试通过 → 可选重构**。(建议每次测试通过后，提交代码, 并更新TODO的进度)
列表按「纵向切片」划分，每个切片产出可直接交付的用户价值，方便随时暂停/继续。

---

### 阶段 0 - 项目骨架 & 工具链（1 d）

- [x] 0.1 初始化 monorepo（pnpm workspace + vite + ts strict）
- [x] 0.2 安装依赖：vitest、@vitest/ui、eslint、prettier、vite-plugin-singlefile
- [x] 0.3 配置 CI：GitHub Actions 跑 `pnpm lint + test + build`
- [x] 0.4 设定目录约定：`packages/core`、`packages/adapter`、`packages/ui`

---

### 阶段 1 - Core 领域模型（2 d）

- [x] 1.1 写 `mindmap_types.test.ts`
        ✅ 断言 `CaseNode` 与 `ModuleNode` 的联合类型可正常收窄
- [x] 1.2 实现 `mindmap_types.ts`（仅类型，无逻辑）
- [x] 1.3 写 `config.test.ts`
        ✅ 默认优先级映射 S/A/B/C/D → 1/2/3/4/5
- [x] 1.4 实现 `config.ts`（纯对象，同步加载）

---

### 阶段 2 - JSON ⇄ Domain 最小可运行环（2 d）

- [x] 2.1 写 `parse_json.test.ts`
        ✅ 输入带 `stepTag` 的单用例 JSON → 输出 `CaseNode`
        ✅ 输入模块节点 → 输出 `ModuleNode`
- [x] 2.2 实现 `parse_json.ts`（仅让测试通过）
- [x] 2.3 写 `render_json.test.ts`
        ✅ 把 2.2 的 `CaseNode/ModuleNode` 转回含 `stepTag` 的 JSON
- [x] 2.4 实现 `render_json.ts`
- [x] 2.5 **重构**：把 2.2 & 2.4 中公用的“拆/装”逻辑抽到 `json_transformer.ts`，测试保持不变（保证行为锁定）

---

### 阶段 3 - Markdown ⇄ Domain 最小可运行环（3 d）

- [x] 3.1 写 `parse_md.test.ts`
        ✅ 六级标题 + 优先级行 + 前置条件列表 + 步骤表格 → `CaseNode`
- [x] 3.2 实现 `parse_md.ts`（最简单字符串 split 版本）
- [x] 3.3 写 `render_md.test.ts`
        ✅ 把 3.2 的 `CaseNode` 渲染成合规 Markdown 字符串
- [x] 3.4 实现 `render_md.ts`
- [x] 3.5 **重构**：提取 `md_table.ts` 负责 `| 动作 | 预期 |` 与数组互转；测试先红后绿。

---

### 阶段 4 - 边界 & 异常（2 d）

- [x] 4.1 异常测试：缺失必填字段、表格列数不对、优先级非法
        ✅ 期望抛出 `ParseError`，行号准确
- [x] 4.2 实现异常分支 & 错误码常量
- [ ] 4.3 property-based test（可选）：用 `fast-check` 随机生成合法用例，round-trip 必须相等

---

### 阶段 5 - Adapter 层（1.5 d）

- [x] 5.1 写 `clipboard.test.ts`（Node 环境用 `vitest-canvas-mock`）
        ✅ 读：自动剥 BOM；写：自动加 BOM
- [x] 5.2 实现 `clipboard.ts`
- [x] 5.3 写 `file_io.test.ts`
        ✅ 触发下载、选择文件后得到文本内容
- [x] 5.4 实现 `file_io.ts`

---

### 阶段 6 - UI 胶水 & 集成（2 d）

- [ ] 6.1 写 `App.vue` 的单元测试（@vue/test-utils）
        ✅ 点击「MD→JSON」按钮后，mock clipboard 被调用
- [ ] 6.2 实现最简 UI：两个文本框 + 两个按钮 + 错误提示
- [ ] 6.3 端到端测试（playwright）
        ✅ 把示例 Markdown 贴进去 → 导出 JSON → 再导入 → 内容一致

---

### 阶段 7 - 打包 & 发布（0.5 d）

- [ ] 7.1 `pnpm build` 生成单 HTML
- [ ] 7.2 断言构建产物：
        ✅ 文件数 = 1 & gzip < 1 MB & 双击能打开 & 控制台无 404
- [ ] 7.3 GitHub Release 自动上传 `index.html` + sourcemap

---

### 阶段 8 - 文档 & 示例（1 d）

- [ ] 8.1 README 嵌入「直接双击打开」动画
- [ ] 8.2 提供 `example/` 目录：典型测试用例 .md 与 .json 对
- [ ] 8.3 写「贡献者指南」强调 TDD 流程：先红、后绿、再重构

---

### 阶段 9 - 可选增强（按需求排优先级）

- [ ] 9.1 黑暗模式
- [ ] 9.2 多语言
- [ ] 9.3 撤销/重做（useReducer + 快照）
- [ ] 9.4 步骤参数化语法
- [ ] 9.5 插件 API：自定义元数据字段

---

### 每日 TDD 节奏模板（贴在 README）

1. 从 TODO 列表拉一条任务
2. 写测试 → 运行 `pnpm test`（红）
3. 写最小实现 → 测试通过（绿）
4. 重构 + 跑全测试套件（保持绿）
5. commit：`feat: 描述 (#issue)` 或 `refactor: 描述`
6. push，CI 全绿后再合并

---

把以上列表建为 GitHub Project 看板，每完成一个测试文件就拖一列，进度可视化；同时 CI 强制「测试不过不可合并」，即可全程用 TDD 推进。祝 coding 愉快！
