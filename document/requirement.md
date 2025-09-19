
# 需求背景
我是一个测试工程师，日常会用线上的思维脑图工具编写测试用例，现在希望借助ai编写用例。但是通用的ai可能不熟悉这种格式，计划写一个小工具将ai生成的文本用和这种数据结构进行无损互换。

# 需求描述
编写一个工具，能够将规定结构的markdown文本转换为该思维脑图app的json数据结构格式，反之亦然。

## 应用场景

鉴于易用性，请考虑将工具打包成单个html文件。

- 通过剪切板输入和输出json

- 通过剪切板和文件输入和输出md 

注意：剪切板内的json会带有以下前缀字符串 [0xef, 0xbf, 0xbf, 0xef, 0xbb, 0xbf];，输出时要带着这个前缀，输入时自动处理这个前缀。

## 脑图的markdown格式

### 模块标题
- 使用二至三级标题表示，分别对应一级模块和二级模块

### 分类标题
- 使用四至五级标题表示：`#### 功能分类名称`

### 用例标题
- 使用六级标题表示：`###### 测试用例标题`
- 标题应清晰描述测试场景

### 可见元数据（直接显示在标题下方）
- 优先级: 使用字母表示 (S/A/B/C/D)
- 用例类型: 使用文本表示 (客户端/服务端/后台/前端，多个用逗号分隔)
- 自动化: 可选，如"自动化暂未实现"
- 标签: 可选，如"iOS,Android"（多个用逗号分隔）

### 隐藏元数据（放在HTML注释中）
- id:
- expandState:
- moduleType:
- moduleId:
- case:
- aiCaseFlag

### 前置条件
- 使用加粗标题：`**前置条件**`
- 使用无序列表表示多个条件
- 每个条件以短横线开头

### 测试步骤
- 使用加粗标题：`**测试步骤**`
- 使用表格格式，左列为操作步骤，右列为预期结果
- 表格格式：
```md
| 操作步骤 | 预期结果 |
|----------|----------|
| [步骤1] | [结果1] |
| [步骤2] | [结果2] |
```

## 脑图的json格式
The data from `target.json` represents a hierarchical structure, typical of a mind map or tree-like data. It is a JSON array containing a single root object. Each node in this structure has a `data` object and a `children` array.

__Node Structure:__ Each node is an object with the following top-level keys:

- `data`: An object containing the node's specific attributes.
- `children`: An array of child nodes, recursively following the same structure. If a node has no children, this array is empty.

__`data` Object Fields:__ The `data` object within each node contains various attributes:

| 字段名         | 数据类型            | 是否可选 | 示例值                                                      | 含义说明                             | 对人类用户可见性 |
| ----------- | --------------- | ---- | -------------------------------------------------------- | -------------------------------- | -------- |
| id          | string          | 可选   | "0"、"dc8ve94bfqw0"                                       | 思维脑图App生成的节点唯一标识                 | 隐藏       |
| text        | string          | 必填   | "短信拉起app"、"通用中心后管"                                       | 节点主要内容或标签                        | 可见       |
| expandState | string          | 可选   | "expand"                                                 | 节点展开/折叠状态                        | 隐藏       |
| aiCaseFlag  | boolean         | 可选   | false                                                    | 暂时无需处理的标志                        | 隐藏       |
| moduleType  | number          | 可选   | 1、2                                                      | 模块分级：1=一级模块，2=二级模块               | 隐藏       |
| moduleName  | string          | 可选   | "通用中心后管"、"营销后管"、"新增接口"、"客户端"                             | 模块名称（已含在text中）                   | 可见（已展示）  |
| moduleId    | number          | 可选   | 57204                                                    | 模块唯一编号                           | 隐藏       |
| priority    | number          | 可选   | 1、2、3、4                                                  | 优先级：1=S，2=A，3=B，4=C，5=D          | 可见       |
| stepTag     | number          | 可选   | 1、2、3、4                                                  | 步骤标记：1=测试用例，2=前置条件，3=操作步骤，4=预期结果 | 可见（已展示）  |
| starTag     | number          | 可选   | 1                                                        | 自动化标记：1=自动化暂未实现                  | 可见（需转名称） |
| caseTag     | array\[obj]     | 可选   | \[{"id":1388,"name":"iOS"},{"id":1389,"name":"Android"}] | 标签数组，展示name而非id                  | 可见（需转名称） |
| owningSide  | array\[numbers] | 可选   | \[0]、\[1]、\[2]、\[1,2]                                    | 用例类型：0=客户端，1=服务端，2=后台，3=前端  | 可见（需转名称） |
| case        | array\[numbers] | 可选   | \[17789211]                                              | 思维脑图App生成的用例编号数组                 | 隐藏       |


This recursive structure allows for detailed representation of complex, multi-level information, making it suitable for mind mapping applications where ideas and tasks are organized hierarchically.

## 数据映射

有几个字段的数据是需要映射，不要硬编码到代码中，应用配置文件确定。例如：

- priority 字段的映射: 优先级 S/A/B/C/D 到 1/2/3/4/5 的映射

- owningSide 字段的映射: 对应用例类型 0=客户端，1=服务端，2=后台，3=前端。
- starTag 字段对应 自动化
- caseTag 字段对应 标签
- module类字段 moduleName：moduleType：moduleId，在md中只显示模块标题

## 规则补充

### md2json

- **默认值处理**: 对于 JSON 中的可选字段（如 `expandState`, `aiCaseFlag`,`id`,`starTag`），在从 Markdown 转换回 JSON 时，如果源 Markdown 中没有对应注释，应该不出现该字段。
- **数据映射查找不到**：应记录警告, 跳过该字段继续往下解析。
- **未定义的格式**:忽略并跳过。

### json2md

同上

- 当输入的 JSON 结构不符合预期（如缺少必需的 `data` 或 `text` 字段）时，工具应抛出清晰的错误，并中止转换过程。

## 转换示例

```json
￿﻿[{"data":{"id":"e0e9ba83-dc21-4ccc-9ca5-bab935ac182c","text":"客户端边界场景 - 安卓设备未安装App，点击短链跳转浏览器","priority":4,"stepTag":1,"owningSide":[0],"case":[17789236],"aiCaseFlag":false,"caseTag":[{"id":1388,"name":"iOS"},{"id":1389,"name":"Android"}]},"children":[{"data":{"id":"ca53f57e-18d1-407d-93cd-40f92fc4ea61","text":"1. 安卓设备\n2. 未安装App\n3. 短信中包含有效短链（例如https://c.opdwz.cn/oppstore/ZaomjJx3kO）","stepTag":2,"aiCaseFlag":false},"children":[]},{"data":{"id":"70e18ac8-a4e9-4029-8d8a-fd7c50414277","text":"1. 在短信应用中点击短链","stepTag":3,"aiCaseFlag":false},"children":[{"data":{"id":"3423041f-ff67-4eb8-954f-acae068424f9","text":"1. 跳转浏览器打开H5页面（对应长链内容）\n2. 不会尝试唤醒App","stepTag":4,"aiCaseFlag":false},"children":[]}]}]}]
```
=== transform ===

```md
###### 客户端边界场景 - 安卓设备未安装App，点击短链跳转浏览器
<!-- id: e0e9ba83-dc21-4ccc-9ca5-bab935ac182c -->
<!-- case: [17789236] -->
<!-- aiCaseFlag: false -->
优先级: C  
用例类型: 客户端  
标签: iOS, Android  

**前置条件**
- 安卓设备
- 未安装App
- 短信中包含有效短链（例如https://c.opdwz.cn/oppstore/ZaomjJx3kO）

**测试步骤**

| 操作步骤 | 预期结果 |
|----------|----------|
| 在短信应用中点击短链 | 跳转浏览器打开H5页面（对应长链内容）<br>不会尝试唤醒App |
```

# 性能要求

无性能要求
