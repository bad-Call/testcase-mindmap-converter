export const CONFIG = {
  priorityMap: { S: 1, A: 2, B: 3, C: 4, D: 5 } as const,

  owningSideMap: {
    客户端: [0],
    服务端: [1],
    后台: [2],
    前端: [3],
  },

  starTagMap: { 自动化暂未实现: 1 } as const,

  caseTagMap: {
    iOS: 1388,
    Android: 1389,
  },

  moduleTypeMap: {
    "##": 1,
    "###": 2,
  },

  stepTagMap: {
    case: 1,
    precondition: 2,
    action: 3,
    expect: 4,
  },

  metaKeywords: {
    priority: "优先级",
    owningSide: "用例类型",
    starTag: "自动化",
    caseTag: "标签",
  },

  defaults: {
    priority: 3,
    owningSide: [] as number[],
    starTag: undefined,
    caseTag: [] as { id: number; name: string }[],
  },

  patterns: {
    heading: /^(#{2,6})\s+(.+)$/,
    metadata: /^(\w+):\s*(.+)$/,
    listItem: /^-\s+(.+)$/,
    tableRow: /^\|\s*(.+?)\s*\|\s*(.+?)\s*\|$/,
    bomPrefix: /^\uFEFF/,
  },
} as const;
