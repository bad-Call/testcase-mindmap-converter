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
| owningSide  | array\[numbers] | 可选   | \[0]、\[1]、\[2]、\[1,2]                                    | 负责方：0=客户端，1=服务端，2=后台，3=前端    | 可见（需转名称） |
| case        | array\[numbers] | 可选   | \[17789211]                                              | 思维脑图App生成的用例编号数组                 | 隐藏       |


This recursive structure allows for detailed representation of complex, multi-level information, making it suitable for mind mapping applications where ideas and tasks are organized hierarchically.
