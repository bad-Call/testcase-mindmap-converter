import { describe, it, expect } from "vitest";
import { parseJson } from "../../../json_modules/parse_json";
import { renderJson } from "../../../json_modules/render_json";
import type { MindMap } from "../../../types/mindmap_types";
import type { RawJson } from "../../../types/rawJson_types"; // Import RawJsonNode

const xmindTemplateJson: RawJson = [
  // Explicitly type the constant
  {
    data: {
      id: "0",
      text: "短信拉起app",
      expandState: "expand",
      aiCaseFlag: false,
    },
    children: [
      {
        data: {
          id: "dc8ve94bfqw0",
          text: "通用中心后管",
          moduleType: 1,
          moduleName: "通用中心后管",
          expandState: "expand",
          moduleId: 57204,
          aiCaseFlag: false,
        },
        children: [
          {
            data: {
              id: "f00bc133-c6d1-401e-b53e-caf78c114dd0",
              text: "后管新增投放链接 - 选择不同的业务部门，成功生成带对应路径的短链接",
              priority: 1,
              stepTag: 1,
              starTag: 1,
              owningSide: [2],
              case: [17789211],
              aiCaseFlag: false,
            },
            children: [
              {
                data: {
                  id: "d64d2258-d7f7-4970-a786-a922560d30d0",
                  text: "1. 用户已登录后管系统\n2. 用户有权限访问通用中心\n3. 进入通用中心 -> 编辑投放链接",
                  stepTag: 2,
                  aiCaseFlag: false,
                },
                children: [],
              },
              {
                data: {
                  id: "e20332f8-fcdb-4a0e-b1d7-6100a1e66d9b",
                  text: "1. 选择oppo商城生成短链\n2. 选择oppo会员生成短链",
                  stepTag: 3,
                  aiCaseFlag: false,
                },
                children: [
                  {
                    data: {
                      id: "c98f8faa-adfb-4e68-bfaa-e30d9bd35f95",
                      text: "1. 成功生成短链，路径带oppo商城标识\n2. 成功生成短链，路径带myoppo标识",
                      stepTag: 4,
                      aiCaseFlag: false,
                    },
                    children: [],
                  },
                ],
              },
            ],
          },
          {
            data: {
              id: "a79a2b9a-d62a-4c71-a904-b76e5e92b289",
              text: "后管新增投放链接 - 选择短链类型，投放落地页强制为自定义URL且URL类型强制为H5",
              priority: 2,
              stepTag: 1,
              owningSide: [2],
              case: [17789212],
              aiCaseFlag: false,
            },
            children: [
              {
                data: {
                  id: "db980bc6-e562-4b2e-a0b3-5808ea12d34d",
                  text: "1. 用户已登录后管系统\n2. 用户有权限访问通用中心",
                  stepTag: 2,
                  aiCaseFlag: false,
                },
                children: [],
              },
              {
                data: {
                  id: "698e2c65-5bd3-4ded-b631-f5a98279d980",
                  text: "1. 进入通用中心 -> 新增投放链接页面\n2. 选择链接类型为“短链”\n3. 检查投放落地页选项\n4. 检查URL类型选项",
                  stepTag: 3,
                  aiCaseFlag: false,
                },
                children: [
                  {
                    data: {
                      id: "71e48f13-2700-4355-bc14-64bdfb193185",
                      text: "1. 页面加载成功，显示链接类型选项\n2. 链接类型选择“短链”成功\n3. 投放落地页自动设置为“自定义URL”，且选项不可更改\n4. URL类型自动设置为“H5”，且选项不可更改",
                      stepTag: 4,
                      aiCaseFlag: false,
                    },
                    children: [],
                  },
                ],
              },
            ],
          },
          {
            data: {
              id: "de4ce295-ead3-46ee-8267-483e42562047",
              text: "后管编辑投放链接 - 从中转页改为短链类型，选项限制生效",
              priority: 3,
              stepTag: 1,
              owningSide: [2],
              case: [17789213],
              aiCaseFlag: false,
            },
            children: [
              {
                data: {
                  id: "5ff42c4c-4292-4c6d-872a-223e6f4d805c",
                  text: "1. 用户已登录后管系统\n2. 用户有权限访问通用中心\n3. 已存在一条链接类型为“中转页”的投放链接",
                  stepTag: 2,
                  aiCaseFlag: false,
                },
                children: [],
              },
              {
                data: {
                  id: "21ce22d9-0234-4dd4-8985-9087ea5329e5",
                  text: "1. 进入通用中心 -> 编辑该投放链接\n2. 将链接类型改为“短链”\n3. 检查投放落地页选项\n4. 检查URL类型选项",
                  stepTag: 3,
                  aiCaseFlag: false,
                },
                children: [
                  {
                    data: {
                      id: "b87112b0-701e-44cd-8443-1bfe64120989",
                      text: "1. 页面加载成功，显示原有配置\n2. 链接类型更改成功\n3. 投放落地页自动变为“自定义URL”，且不可更改\n4. URL类型自动变为“H5”，且不可更改",
                      stepTag: 4,
                      aiCaseFlag: false,
                    },
                    children: [],
                  },
                ],
              },
            ],
          },
          {
            data: {
              id: "1fc98c09-ed76-46b5-a4bd-6804bc5174be",
              text: "后管编辑投放链接 - 抽查历史链接的类型，都是中转页",
              priority: 3,
              stepTag: 1,
              owningSide: [2],
              case: [17789214],
              aiCaseFlag: false,
            },
            children: [
              {
                data: {
                  id: "c3d8d751-6da0-4852-bf5c-3d3fc074b5d5",
                  text: "1. 用户已登录后管系统\n2. 用户有权限访问通用中心",
                  stepTag: 2,
                  aiCaseFlag: false,
                },
                children: [],
              },
              {
                data: {
                  id: "b83a4906-3e93-48ad-bb2f-472f2faa5073",
                  text: "1. 随机抽查历史链接类型选项",
                  stepTag: 3,
                  aiCaseFlag: false,
                },
                children: [
                  {
                    data: {
                      id: "02af4400-f519-4acd-80dc-dd92a6e8c98c",
                      text: "1. 链接类型都为中转页",
                      stepTag: 4,
                      aiCaseFlag: false,
                    },
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        data: {
          id: "dc8vehwx2ps0",
          text: "营销后管",
          moduleType: 1,
          moduleName: "营销后管",
          expandState: "expand",
          moduleId: 46626,
          aiCaseFlag: false,
        },
        children: [
          {
            data: {
              id: "187ba43c-e2f5-40c9-b084-de84123ef808",
              text: "运营中心消息推送 - 渠道选择短信，点击转短链接按钮打开新窗口",
              priority: 2,
              stepTag: 1,
              owningSide: [1, 2],
              case: [17789215],
              aiCaseFlag: false,
            },
            children: [
              {
                data: {
                  id: "2350981a-8965-41de-b236-468dfcb706ab",
                  text: "1. 用户已登录后管系统\n2. 用户有权限访问运营中心",
                  stepTag: 2,
                  aiCaseFlag: false,
                },
                children: [],
              },
              {
                data: {
                  id: "3f458271-cbd0-455b-bae0-70f91a3151a1",
                  text: "1. 进入运营中心 -> 消息推送 -> 新增消息推送\n2. 选择渠道为“短信”\n3. 点击消息正文右侧的“转短链接”按钮",
                  stepTag: 3,
                  aiCaseFlag: false,
                },
                children: [
                  {
                    data: {
                      id: "0a08d85d-98dc-492b-840a-30f929d81af4",
                      text: "1. 页面加载成功，显示消息推送表单\n2. 渠道选择“短信”成功\n3. 新窗口打开通用中心的投放链接生成页面",
                      stepTag: 4,
                      aiCaseFlag: false,
                    },
                    children: [],
                  },
                ],
              },
            ],
          },
          {
            data: {
              id: "76a848f7-4517-4680-bb7a-0f9bc81a6ccd",
              text: "运营中心消息场景 - 渠道选择短信，商详模板链接自动转换为短链",
              priority: 1,
              stepTag: 1,
              starTag: 1,
              owningSide: [1, 2],
              case: [17789216],
              aiCaseFlag: false,
            },
            children: [
              {
                data: {
                  id: "d565806c-2bcf-48b2-9e46-178c4362685a",
                  text: "1. 用户已登录后管系统\n2. 用户有权限创建消息场景\n3. 消息场景使用商详模板链接（带动态参数）",
                  stepTag: 2,
                  aiCaseFlag: false,
                },
                children: [],
              },
              {
                data: {
                  id: "1b7ad8ac-6783-433b-bfbb-e28a9896cc29",
                  text: "1. 进入运营中心 -> 消息场景 -> 新增消息场景\n2. 选择渠道为“短信”\n3. 输入商详模板链接\n4. 保存消息场景\n5. 发送测试消息",
                  stepTag: 3,
                  aiCaseFlag: false,
                },
                children: [
                  {
                    data: {
                      id: "8edbdff2-5a4c-4031-8594-4915e5c84ce0",
                      text: "1. 页面加载成功，显示消息场景表单\n2. 渠道选择“短信”成功\n3. 模板链接输入成功\n4. 保存成功，无错误提示\n5. 下发的短信中链接为短链形式（如https://c.opdwz.cn/oppstore/xxx），且能够重定向成参数正确的链接",
                      stepTag: 4,
                      aiCaseFlag: false,
                    },
                    children: [],
                  },
                ],
              },
            ],
          },
          {
            data: {
              id: "b1f67821-90a5-48e0-9ebb-fbf30f5d1ec2",
              text: "运营中心消息场景 - 渠道选择短信，多条H5链接均成功转换为短链",
              priority: 3,
              stepTag: 1,
              starTag: 1,
              owningSide: [1, 2],
              case: [17789217],
              aiCaseFlag: false,
            },
            children: [
              {
                data: {
                  id: "b77ac241-956d-41e2-a440-fbb64e837e07",
                  text: "1. 用户已登录后管系统\n2. 用户有权限创建消息场景\n3. 消息场景包含多个H5链接（商详、优惠券列表、问卷链接）",
                  stepTag: 2,
                  aiCaseFlag: false,
                },
                children: [],
              },
              {
                data: {
                  id: "06cf1997-34b4-4536-928d-add18cbc2199",
                  text: '1. 进入运营中心 -> 消息场景 -> 新增消息场景\n2. 选择渠道为"短信"\n3. 输入多个H5模板链接（商详：https://store.wanyol.com/product/{productId}，优惠券：https://coupon.wanyol.com/list/{typeId}，问卷：https://survey.wanyol.com/{surveyId}）\n4. 保存消息场景\n5. 发送测试消息',
                  stepTag: 3,
                  aiCaseFlag: false,
                },
                children: [
                  {
                    data: {
                      id: "3e3591d2-aa3f-4db3-a1c0-86df4925ebea",
                      text: '1. 页面加载成功，显示消息场景表单\n2. 渠道选择"短信"成功\n3. 多个H5链接输入成功\n4. 保存成功，无错误提示\n5. 下发的短信中所有H5链接均转换为短链形式，且各自参数正确传递',
                      stepTag: 4,
                      aiCaseFlag: false,
                    },
                    children: [],
                  },
                ],
              },
            ],
          },
          {
            data: {
              id: "3f453da4-d8f4-4e3a-8b1c-baf0f9c1a2bb",
              text: "运营中心消息场景 - 渠道选择短信，DP链接不转换为短链",
              priority: 3,
              stepTag: 1,
              starTag: 1,
              owningSide: [1, 2],
              case: [17789218],
              aiCaseFlag: false,
            },
            children: [
              {
                data: {
                  id: "0ddb447a-e166-4627-8f07-14538c0c1bce",
                  text: "1. 用户已登录后管系统\n2. 用户有权限创建消息场景\n3. 消息场景使用DP链接（带动态参数）",
                  stepTag: 2,
                  aiCaseFlag: false,
                },
                children: [],
              },
              {
                data: {
                  id: "8c92f2d3-a036-4e13-9731-1475fc544a0e",
                  text: '1. 进入运营中心 -> 消息场景 -> 新增消息场景\n2. 选择渠道为"短信"\n3. 输入DP模板链接\n4. 保存消息场景\n5. 发送测试消息',
                  stepTag: 3,
                  aiCaseFlag: false,
                },
                children: [
                  {
                    data: {
                      id: "507cbf45-c753-4101-a935-523927d21a0b",
                      text: '1. 页面加载成功，显示消息场景表单\n2. 渠道选择"短信"成功\n3. DP链接输入成功\n4. 保存成功，无错误提示\n5. 下发的短信中链接保持原DP链接格式，未转换为短链',
                      stepTag: 4,
                      aiCaseFlag: false,
                    },
                    children: [],
                  },
                ],
              },
            ],
          },
          {
            data: {
              id: "cf13bfec-9e36-4e30-84b1-4aac481d8897",
              text: "运营中心消息场景 - 渠道选择短信，小程序链接不转换为短链",
              priority: 3,
              stepTag: 1,
              starTag: 1,
              owningSide: [1, 2],
              case: [17789219],
              aiCaseFlag: false,
            },
            children: [
              {
                data: {
                  id: "6ca1e80c-24b1-41a2-a0e9-30e369b2c0d0",
                  text: "1. 用户已登录后管系统\n2. 用户有权限创建消息场景\n3. 消息场景使用小程序链接（带动态参数）",
                  stepTag: 2,
                  aiCaseFlag: false,
                },
                children: [],
              },
              {
                data: {
                  id: "7e9d3aff-2a77-48ee-aa51-900e3e3d5275",
                  text: '1. 进入运营中心 -> 消息场景 -> 新增消息场景\n2. 选择渠道为"短信"\n3. 输入小程序模板链接\n4. 保存消息场景\n5. 发送测试消息',
                  stepTag: 3,
                  aiCaseFlag: false,
                },
                children: [
                  {
                    data: {
                      id: "243599da-5a48-4645-826b-164257d27a15",
                      text: '1. 页面加载成功，显示消息场景表单\n2. 渠道选择"短信"成功\n3. 小程序链接输入成功\n4. 保存成功，无错误提示\n5. 下发的短信中链接保持原小程序链接格式，未转换为短链',
                      stepTag: 4,
                      aiCaseFlag: false,
                    },
                    children: [],
                  },
                ],
              },
            ],
          },
          {
            data: {
              id: "33333e2b-bf9c-4b8f-9da9-a9bb15d176d0",
              text: "运营中心消息场景 - 短链转换开关关闭时内容不转换",
              priority: 3,
              stepTag: 1,
              owningSide: [1, 2],
              case: [17789220],
              aiCaseFlag: false,
            },
            children: [
              {
                data: {
                  id: "540b268b-57c3-4cd0-9ffa-cdc29c624df9",
                  text: "1. 用户已登录后管系统\n2. 用户有权限创建消息场景\n3. 配置中短链转换开关已关闭",
                  stepTag: 2,
                  aiCaseFlag: false,
                },
                children: [],
              },
              {
                data: {
                  id: "a9ca8a1e-066b-42e8-a392-c9d04143e7bd",
                  text: '1. 进入运营中心 -> 消息场景 -> 新增消息场景\n2. 选择渠道为"短信"\n3. 输入包含H5链接的消息内容\n4. 保存消息场景\n5. 发送测试消息',
                  stepTag: 3,
                  aiCaseFlag: false,
                },
                children: [
                  {
                    data: {
                      id: "e6c68476-d3d6-4099-ad54-e18e8b40d8a1",
                      text: '1. 页面加载成功，显示消息场景表单\n2. 渠道选择"短信"成功\n3. 消息内容输入成功\n4. 保存成功，无错误提示\n5. 下发的短信中链接保持原H5链接格式，未转换为短链',
                      stepTag: 4,
                      aiCaseFlag: false,
                    },
                    children: [],
                  },
                ],
              },
            ],
          },
          {
            data: {
              id: "7a6efa4f-0a17-4cf3-a51c-a7756d725c27",
              text: "运营中心消息场景 - 纯文本内容不进行链接转换",
              priority: 4,
              stepTag: 1,
              starTag: 1,
              owningSide: [1, 2],
              case: [17789221],
              aiCaseFlag: false,
            },
            children: [
              {
                data: {
                  id: "185bf492-c807-4abc-8dd2-19ddd369d5bf",
                  text: "1. 用户已登录后管系统\n2. 用户有权限创建消息场景\n3. 系统配置中短链转换开关已开启",
                  stepTag: 2,
                  aiCaseFlag: false,
                },
                children: [],
              },
              {
                data: {
                  id: "752533d8-d78b-4164-b9d6-df3183687245",
                  text: '1. 进入运营中心 -> 消息场景 -> 新增消息场景\n2. 选择渠道为"短信"\n3. 输入纯文本消息内容（不包含任何URL）\n4. 保存消息场景\n5. 发送测试消息',
                  stepTag: 3,
                  aiCaseFlag: false,
                },
                children: [
                  {
                    data: {
                      id: "2735f0d6-2267-4a30-80c9-628e68a7ad4b",
                      text: '1. 页面加载成功，显示消息场景表单\n2. 渠道选择"短信"成功\n3. 纯文本内容输入成功\n4. 保存成功，无错误提示\n5. 下发的短信内容与输入一致，无任何链接转换',
                      stepTag: 4,
                      aiCaseFlag: false,
                    },
                    children: [],
                  },
                ],
              },
            ],
          },
          {
            data: {
              id: "e3eebaba-081b-4de2-a872-3b8075f20e72",
              text: "运营中心消息场景 - 白名单URL不进行转换",
              priority: 4,
              stepTag: 1,
              starTag: 1,
              owningSide: [1, 2],
              case: [17789222],
              aiCaseFlag: false,
            },
            children: [
              {
                data: {
                  id: "22b0b03f-b813-461d-99f5-dd1177841b4f",
                  text: "1. 用户已登录后管系统\n2. 用户有权限创建消息场景\n3. 系统配置中短链转换开关已开启\n4. 系统已配置白名单URL前缀（如已转换过的短链域名）",
                  stepTag: 2,
                  aiCaseFlag: false,
                },
                children: [],
              },
              {
                data: {
                  id: "4d96071f-f794-4144-a90c-d051cdc68c75",
                  text: '1. 进入运营中心 -> 消息场景 -> 新增消息场景\n2. 选择渠道为"短信"\n3. 输入包含白名单URL的消息内容\n4. 保存消息场景\n5. 发送测试消息',
                  stepTag: 3,
                  aiCaseFlag: false,
                },
                children: [
                  {
                    data: {
                      id: "a09ca8e6-65f6-4090-9090-e7f2ed29ad6b",
                      text: '1. 页面加载成功，显示消息场景表单\n2. 渠道选择"短信"成功\n3. 消息内容输入成功\n4. 保存成功，无错误提示\n5. 下发的短信中白名单URL保持不变，未进行转换',
                      stepTag: 4,
                      aiCaseFlag: false,
                    },
                    children: [],
                  },
                ],
              },
            ],
          },
          {
            data: {
              id: "697fd0e0-ad96-4320-9ba3-d95360bee52a",
              text: "运营中心消息场景 - 缓存中存在长链映射直接使用缓存短链",
              priority: 4,
              stepTag: 1,
              starTag: 1,
              owningSide: [1, 2],
              case: [17789223],
              aiCaseFlag: false,
            },
            children: [
              {
                data: {
                  id: "f3e6a4d0-c09e-4350-995f-97be21365b48",
                  text: "1. 用户已登录后管系统\n2. 用户有权限创建消息场景\n3. 系统配置中短链转换开关已开启",
                  stepTag: 2,
                  aiCaseFlag: false,
                },
                children: [],
              },
              {
                data: {
                  id: "7973c621-c9f6-40e1-8167-2b5a80732479",
                  text: '1. 进入运营中心 -> 消息场景 -> 新增消息场景\n2. 选择渠道为"短信"\n3. 输入包含该长链的消息内容\n4. 保存消息场景\n5. 发送测试消息\n6. 再次发送这条消息',
                  stepTag: 3,
                  aiCaseFlag: false,
                },
                children: [
                  {
                    data: {
                      id: "dc896559-cb46-4d13-9483-5fc7b5bf0b99",
                      text: '1. 页面加载成功，显示消息场景表单\n2. 渠道选择"短信"成功\n3. 消息内容输入成功\n4. 保存成功，无错误提示\n6. 收到的两条短息的链接一样 ',
                      stepTag: 4,
                      aiCaseFlag: false,
                    },
                    children: [],
                  },
                ],
              },
            ],
          },
          {
            data: {
              id: "3a95959f-a620-453c-bc2f-29b08813fa91",
              text: "运营中心消息场景 - 短链服务不可用时转换失败",
              priority: 4,
              stepTag: 1,
              starTag: 1,
              owningSide: [1, 2],
              case: [17789224],
              aiCaseFlag: false,
            },
            children: [
              {
                data: {
                  id: "44349d7d-6edc-42fe-9db0-2c67b5e60737",
                  text: "1. 用户已登录后管系统\n2. 用户有权限创建消息场景\n3. 系统配置中短链转换开关已开启\n4. 短链生成服务不可用或返回错误",
                  stepTag: 2,
                  aiCaseFlag: false,
                },
                children: [],
              },
              {
                data: {
                  id: "bcd9a99d-229c-409c-a0ac-5ecc4bfc1f35",
                  text: '1. 进入运营中心 -> 消息场景 -> 新增消息场景\n2. 选择渠道为"短信"\n3. 输入包含H5链接的消息内容\n4. 保存消息场景\n5. 尝试发送测试消息',
                  stepTag: 3,
                  aiCaseFlag: false,
                },
                children: [
                  {
                    data: {
                      id: "7dc9e37a-1d4f-4c4f-a278-336079d78ff3",
                      text: '1. 页面加载成功，显示消息场景表单\n2. 渠道选择"短信"成功\n3. 消息内容输入成功\n4. 保存成功，无错误提示\n5. 不发短信，上报埋点（失败原因）',
                      stepTag: 4,
                      aiCaseFlag: false,
                    },
                    children: [],
                  },
                ],
              },
            ],
          },
          {
            data: {
              id: "340ee0c8-5758-4033-9730-167ecff07dfb",
              text: "运营中心消息场景 - 发短信时找不到对应的appKey用旧的短链转换兜底",
              priority: 4,
              stepTag: 1,
              starTag: 1,
              owningSide: [1, 2],
              case: [17789225],
              aiCaseFlag: false,
            },
            children: [
              {
                data: {
                  id: "5c20d402-a705-44be-844e-fe352d2f9891",
                  text: "1. 用户已登录后管系统\n2. 用户有权限创建消息场景\n3. 系统配置中短链转换开关已开启\n4. 短信拉起APP功能开关已开启\n5. 当前租户(tenantCode)未配置对应的appKey",
                  stepTag: 2,
                  aiCaseFlag: false,
                },
                children: [],
              },
              {
                data: {
                  id: "21349bad-7fdb-4f71-af32-29344369c630",
                  text: '1. 进入运营中心 -> 消息场景 -> 新增消息场景\n2. 选择渠道为"短信"\n3. 输入包含H5链接的消息内容\n4. 保存消息场景\n5. 尝试发送测试消息',
                  stepTag: 3,
                  aiCaseFlag: false,
                },
                children: [
                  {
                    data: {
                      id: "62a669f5-711d-4fbf-b8e9-3f3146f82b3e",
                      text: '1. 页面加载成功，显示消息场景表单\n2. 渠道选择"短信"成功\n3. 消息内容输入成功\n4. 保存成功，无错误提示\n5. 链接转为旧的短链',
                      stepTag: 4,
                      aiCaseFlag: false,
                    },
                    children: [],
                  },
                ],
              },
            ],
          },
          {
            data: {
              id: "6b93d818-6b8f-49f1-9014-b402a655bf4d",
              text: "运营中心消息场景 - 短信内容包含新短链（不在白名单），进行重复转换",
              priority: 4,
              stepTag: 1,
              starTag: 1,
              owningSide: [1, 2],
              case: [17789226],
              aiCaseFlag: false,
            },
            children: [
              {
                data: {
                  id: "426e1fa0-a05f-4453-90f7-ce49b1131148",
                  text: "1. 用户已登录后管系统\n2. 用户有权限创建消息场景\n3. 系统配置中短链转换开关已开启\n4. 消息内容包含新短链格式（https://c.opdwz.cn/oppstore/xxx），且不在白名单内",
                  stepTag: 2,
                  aiCaseFlag: false,
                },
                children: [],
              },
              {
                data: {
                  id: "e567dad9-da4d-4083-bed7-235bdd6474e2",
                  text: '1. 进入运营中心 -> 消息场景 -> 新增消息场景\n2. 选择渠道为"短信"\n3. 输入包含新短链的消息内容\n4. 保存消息场景\n5. 发送测试消息',
                  stepTag: 3,
                  aiCaseFlag: false,
                },
                children: [
                  {
                    data: {
                      id: "f5886453-6a46-4f10-a371-054a409f42b0",
                      text: '1. 页面加载成功，显示消息场景表单\n2. 渠道选择"短信"成功\n3. 消息内容输入成功\n4. 保存成功，无错误提示\n5. 下发的短信中新短链进行重复转换',
                      stepTag: 4,
                      aiCaseFlag: false,
                    },
                    children: [],
                  },
                ],
              },
            ],
          },
          {
            data: {
              id: "49b14aa3-2711-47ce-b78b-417abf257ea4",
              text: "运营中心消息场景 - 短信内容包含旧短链（不在白名单），进行重复转换",
              priority: 4,
              stepTag: 1,
              starTag: 1,
              owningSide: [1, 2],
              case: [17789227],
              aiCaseFlag: false,
            },
            children: [
              {
                data: {
                  id: "026111a5-fc18-49bb-b635-b3519ade259e",
                  text: "1. 用户已登录后管系统\n2. 用户有权限创建消息场景\n3. 系统配置中短链转换开关已开启\n4. 消息内容包含旧短链格式（如t.cn/xxx），且不在白名单内",
                  stepTag: 2,
                  aiCaseFlag: false,
                },
                children: [],
              },
              {
                data: {
                  id: "dc66ab46-8a52-4f1f-8585-ed8756d4791a",
                  text: '1. 进入运营中心 -> 消息场景 -> 新增消息场景\n2. 选择渠道为"短信"\n3. 输入包含旧短链的消息内容\n4. 保存消息场景\n5. 发送测试消息',
                  stepTag: 3,
                  aiCaseFlag: false,
                },
                children: [
                  {
                    data: {
                      id: "8b4502b2-4e9d-4cd9-868b-3ef05c5d3241",
                      text: '1. 页面加载成功，显示消息场景表单\n2. 渠道选择"短信"成功\n3. 消息内容输入成功\n4. 保存成功，无错误提示\n5. 下发的短信中旧短链进行重复转换',
                      stepTag: 4,
                      aiCaseFlag: false,
                    },
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        data: {
          id: "dcbckfmu1c00",
          text: "新增接口",
          moduleType: 2,
          moduleName: "新增接口",
          expandState: "expand",
          moduleId: 62318,
          aiCaseFlag: false,
        },
        children: [
          {
            data: {
              id: "6ac8b307-2236-4515-8794-0ded6549fef7",
              text: "后端短链解析接口 - 请求有效短链返回正确长链",
              priority: 1,
              stepTag: 1,
              starTag: 1,
              owningSide: [1],
              case: [17789228],
              aiCaseFlag: false,
            },
            children: [
              {
                data: {
                  id: "4a8074c9-40ce-4fd2-abcd-6362e363e467",
                  text: "1. 短链已生成且未失效",
                  stepTag: 2,
                  aiCaseFlag: false,
                },
                children: [],
              },
              {
                data: {
                  id: "cc729878-7a64-4258-9e9c-6b77852ef12f",
                  text: "1. 调用GET /third/short-link/oppstore/ZfsO7yfJo0接口",
                  stepTag: 3,
                  aiCaseFlag: false,
                },
                children: [
                  {
                    data: {
                      id: "78b34d35-cad8-4f0c-b88d-a70b03fe2793",
                      text: "1. 接口返回200状态码，data.longUrl为对应长链",
                      stepTag: 4,
                      aiCaseFlag: false,
                    },
                    children: [],
                  },
                ],
              },
            ],
          },
          {
            data: {
              id: "04da3e36-05d8-4703-87ab-ea4e0a8d0d71",
              text: "后端短链解析接口 - 请求无效短链返回错误",
              priority: 2,
              stepTag: 1,
              starTag: 1,
              owningSide: [1],
              case: [17789229],
              aiCaseFlag: false,
            },
            children: [
              {
                data: {
                  id: "92b05b80-bb4b-45f1-ab18-fdabdff81c76",
                  text: "1. 短链不存在或已过期",
                  stepTag: 2,
                  aiCaseFlag: false,
                },
                children: [],
              },
              {
                data: {
                  id: "b7349211-4c9a-4dcd-8dd7-c67d0b3898f3",
                  text: "1. 调用GET /third/short-link/oppstore/invalidSid接口",
                  stepTag: 3,
                  aiCaseFlag: false,
                },
                children: [
                  {
                    data: {
                      id: "f89ec5b1-deeb-4a63-9030-8a3fa3f98213",
                      text: "1. 接口返回空的data",
                      stepTag: 4,
                      aiCaseFlag: false,
                    },
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        data: {
          id: "cbd78190-7a43-42e4-978e-e7f4ea69a1e3",
          text: "客户端",
          moduleType: 1,
          moduleName: "客户端",
          expandState: "expand",
          moduleId: 55702,
          aiCaseFlag: false,
        },
        children: [
          {
            data: {
              id: "a234da8c-df14-4ca8-a4ae-dc4310ff081d",
              text: "客户端Android - 点击短链通过App Link无感唤醒App",
              priority: 1,
              stepTag: 1,
              owningSide: [0],
              case: [17789230],
              aiCaseFlag: false,
            },
            children: [
              {
                data: {
                  id: "2bdf57d6-e8b8-4f38-93fc-19c50c280fef",
                  text: "1. Android设备版本6.0及以上\n2. App已安装且配置了App Link（assetlinks.json正确）\n3. 短信中包含有效短链（例如https://c.opdwz.cn/oppstore/ZaomjJx3kO）",
                  stepTag: 2,
                  aiCaseFlag: false,
                },
                children: [],
              },
              {
                data: {
                  id: "ccf087f4-06d6-43f3-b57d-f2dbaa2126d6",
                  text: "1. 在短信应用中点击短链",
                  stepTag: 3,
                  aiCaseFlag: false,
                },
                children: [
                  {
                    data: {
                      id: "9890fa5f-b46c-44dd-8ea3-5778abd279af",
                      text: "1. App被唤醒并跳转到对应页面（如商详页），无浏览器弹窗",
                      stepTag: 4,
                      aiCaseFlag: false,
                    },
                    children: [],
                  },
                ],
              },
            ],
          },
          {
            data: {
              id: "74377cff-53a9-4589-b243-346b77da780d",
              text: "客户端iOS - 点击短链通过Universal Link无感唤醒App",
              priority: 1,
              stepTag: 1,
              owningSide: [0],
              case: [17789231],
              aiCaseFlag: false,
            },
            children: [
              {
                data: {
                  id: "73a30a29-947d-4e9d-bf35-8eceb9eb4214",
                  text: "1. iOS设备版本9.0及以上\n2. App已安装且配置了Universal Link（apple-app-site-association正确）\n3. 短信中包含有效短链（例如https://c.opdwz.cn/oppstore/ZaomjJx3kO）",
                  stepTag: 2,
                  aiCaseFlag: false,
                },
                children: [],
              },
              {
                data: {
                  id: "c5ab0157-73f4-4248-9871-c460f64590dc",
                  text: "1. 在短信应用中点击短链",
                  stepTag: 3,
                  aiCaseFlag: false,
                },
                children: [
                  {
                    data: {
                      id: "411a61af-56c1-4227-b88a-b2724bf2dad7",
                      text: "1. App被唤醒并跳转到对应页面（如商详页）",
                      stepTag: 4,
                      aiCaseFlag: false,
                    },
                    children: [],
                  },
                ],
              },
            ],
          },
          {
            data: {
              id: "dec61d57-ec67-4073-8006-ccac4f454730",
              text: "客户端短链解析 - 调用长链接接口报错时打开webview",
              priority: 3,
              stepTag: 1,
              owningSide: [0],
              case: [17789232],
              aiCaseFlag: false,
            },
            children: [
              {
                data: {
                  id: "5fc65716-c216-4067-a2b4-d1bfed1e45b0",
                  text: "1. 安卓/iOS设备已安装App\n2. App已配置App Link/Universal Link\n3. 短信中包含有效短链",
                  stepTag: 2,
                  aiCaseFlag: false,
                },
                children: [],
              },
              {
                data: {
                  id: "f2780d1c-96a9-4214-895c-c6fed6df4bea",
                  text: "1. 模拟后端短链解析接口返回错误（如500错误）\n2. 在短信应用中点击短链",
                  stepTag: 3,
                  aiCaseFlag: false,
                },
                children: [
                  {
                    data: {
                      id: "3029dcfa-7633-440f-910e-e8c2480e895a",
                      text: "1. App被唤醒\n2. 由于接口报错，App打开webview",
                      stepTag: 4,
                      aiCaseFlag: false,
                    },
                    children: [],
                  },
                ],
              },
            ],
          },
          {
            data: {
              id: "a6211ebc-44e6-406d-b28d-e1a02682ed74",
              text: "客户端短链解析 - 调用长链接接口超时打开webview",
              priority: 3,
              stepTag: 1,
              owningSide: [0],
              case: [17789233],
              aiCaseFlag: false,
            },
            children: [
              {
                data: {
                  id: "62936db4-f088-4b40-9302-8a3637194f14",
                  text: "1. 安卓/iOS设备已安装App\n2. App已配置App Link/Universal Link\n3. 短信中包含有效短链",
                  stepTag: 2,
                  aiCaseFlag: false,
                },
                children: [],
              },
              {
                data: {
                  id: "925a736e-5fee-4a92-83da-ee5c9d5e0c01",
                  text: "1. 模拟后端短链解析接口超时（响应时间超过设定阈值 2秒）\n2. 在短信应用中点击短链",
                  stepTag: 3,
                  aiCaseFlag: false,
                },
                children: [
                  {
                    data: {
                      id: "3383dcaf-6003-43e2-ba97-2edd81bcefbc",
                      text: "1. App被唤醒\n2. 由于接口超时，App打开webview",
                      stepTag: 4,
                      aiCaseFlag: false,
                    },
                    children: [],
                  },
                ],
              },
            ],
          },
          {
            data: {
              id: "e7e387d0-69e5-4822-b945-36ad17a2a83b",
              text: "客户端短链解析 - 从外部唤醒App后，返回行为回到首页",
              priority: 3,
              stepTag: 1,
              owningSide: [0],
              case: [17789234],
              aiCaseFlag: false,
            },
            children: [
              {
                data: {
                  id: "0ec2cb3e-102c-4548-aaf0-8df24a2b93c4",
                  text: "1. App未在后台运行（完全关闭）\n2. 短信中包含有效短链",
                  stepTag: 2,
                  aiCaseFlag: false,
                },
                children: [],
              },
              {
                data: {
                  id: "134896ec-8c1c-4fff-bbe2-1f7e6cde73c1",
                  text: "1. 在短信应用中点击短链\n2. 在App内点击返回按钮",
                  stepTag: 3,
                  aiCaseFlag: false,
                },
                children: [
                  {
                    data: {
                      id: "2a58eee0-a148-4d4c-84db-feedcca33517",
                      text: "1. App被成功唤醒并跳转到对应页面（如商详页）\n2. 点击返回按钮后，回到App首页（因为是从外部唤醒）",
                      stepTag: 4,
                      aiCaseFlag: false,
                    },
                    children: [],
                  },
                ],
              },
            ],
          },
          {
            data: {
              id: "05a71c5b-f0c8-4cde-9359-49d03ae5e30a",
              text: "客户端短链解析 - App已打开时点击短链，返回行为回到原页面",
              priority: 3,
              stepTag: 1,
              owningSide: [0],
              case: [17789235],
              aiCaseFlag: false,
            },
            children: [
              {
                data: {
                  id: "f73cca66-c546-4d80-b6cf-eaf4a2d182f7",
                  text: "1. App已在后台运行（如在浏览商品列表页）\n2. 短信中包含有效短链",
                  stepTag: 2,
                  aiCaseFlag: false,
                },
                children: [],
              },
              {
                data: {
                  id: "dc5620ca-a2c8-44e4-a38a-2e825fe05f07",
                  text: "1. 在短信应用中点击短链\n2. 在App内点击返回按钮",
                  stepTag: 3,
                  aiCaseFlag: false,
                },
                children: [
                  {
                    data: {
                      id: "f2986df2-d4a5-4267-863b-89e938052d2f",
                      text: "1. App从后台唤醒并跳转到对应页面（如商详页）\n2. 点击返回按钮后，回到之前浏览的页面（如商品列表页）",
                      stepTag: 4,
                      aiCaseFlag: false,
                    },
                    children: [],
                  },
                ],
              },
            ],
          },
          {
            data: {
              id: "e0e9ba83-dc21-4ccc-9ca5-bab935ac182c",
              text: "客户端边界场景 - 安卓设备未安装App，点击短链跳转浏览器",
              priority: 4,
              stepTag: 1,
              owningSide: [0],
              case: [17789236],
              aiCaseFlag: false,
            },
            children: [
              {
                data: {
                  id: "ca53f57e-18d1-407d-93cd-40f92fc4ea61",
                  text: "1. 安卓设备\n2. 未安装App\n3. 短信中包含有效短链（例如https://c.opdwz.cn/oppstore/ZaomjJx3kO）",
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
          },
          {
            data: {
              id: "11096ea8-c1f5-4ef1-a09b-dae250b8fb4c",
              text: "客户端边界场景 - iOS设备未安装App，点击短链跳转Safari浏览器",
              priority: 4,
              stepTag: 1,
              owningSide: [0],
              case: [17789237],
              aiCaseFlag: false,
            },
            children: [
              {
                data: {
                  id: "8589cfd8-dc5b-45ff-bc36-d51535f3df7f",
                  text: "1. iOS设备\n2. 未安装App\n3. 短信中包含有效短链（例如https://c.opdwz.cn/oppstore/ZaomjJx3kO）",
                  stepTag: 2,
                  aiCaseFlag: false,
                },
                children: [],
              },
              {
                data: {
                  id: "75c0427b-4c07-4d20-8031-de6c02ce47be",
                  text: "1. 在短信应用中点击短链",
                  stepTag: 3,
                  aiCaseFlag: false,
                },
                children: [
                  {
                    data: {
                      id: "447c8fa8-3dd2-4181-855d-8f608a754299",
                      text: "1. 跳转Safari浏览器打开H5页面（对应长链内容）\n2. 不会尝试唤醒App",
                      stepTag: 4,
                      aiCaseFlag: false,
                    },
                    children: [],
                  },
                ],
              },
            ],
          },
          {
            data: {
              id: "57540f8f-47a5-48c4-8e92-13acf8da20a7",
              text: "客户端边界场景 - 鸿蒙系统搭载新app，点击短链唤醒App",
              priority: 4,
              stepTag: 1,
              owningSide: [0],
              case: [17789238],
              aiCaseFlag: false,
            },
            children: [
              {
                data: {
                  id: "7e0a7318-203d-47d7-994d-1bae11c8bd38",
                  text: "1. 鸿蒙系统设备\n2. 已安装新版本App（支持短链跳转功能）\n3. 短信中包含有效短链（例如https://c.opdwz.cn/oppstore/ZaomjJx3kO）",
                  stepTag: 2,
                  aiCaseFlag: false,
                },
                children: [],
              },
              {
                data: {
                  id: "4cd92f9e-4d06-4129-8b55-6fb4776df3c4",
                  text: "1. 在短信应用中点击短链",
                  stepTag: 3,
                  aiCaseFlag: false,
                },
                children: [
                  {
                    data: {
                      id: "920db37c-18a8-4df2-98ae-2096fa748983",
                      text: "1. 由于鸿蒙系统兼容Android应用，能够唤醒App并跳转到对应页面\n2. 跳转行为与安卓高版本类似",
                      stepTag: 4,
                      aiCaseFlag: false,
                    },
                    children: [],
                  },
                ],
              },
            ],
          },
          {
            data: {
              id: "ff5b288c-2a8c-45da-bfeb-64101e1dc9da",
              text: "客户端边界场景 - 鸿蒙系统未安装App，点击短链跳转浏览器",
              priority: 4,
              stepTag: 1,
              owningSide: [0],
              case: [17789239],
              aiCaseFlag: false,
            },
            children: [
              {
                data: {
                  id: "8cf58ea3-c792-4a76-8f8b-39e3a561fc35",
                  text: "1. 鸿蒙系统设备\n2. 未安装App\n3. 短信中包含有效短链（例如https://c.opdwz.cn/oppstore/ZaomjJx3kO）",
                  stepTag: 2,
                  aiCaseFlag: false,
                },
                children: [],
              },
              {
                data: {
                  id: "1d0df21b-6adb-4e7b-821d-f1eade8240cf",
                  text: "1. 在短信应用中点击短链",
                  stepTag: 3,
                  aiCaseFlag: false,
                },
                children: [
                  {
                    data: {
                      id: "24f94ded-5925-4b2d-9601-bdcc5436c606",
                      text: "1. 跳转浏览器打开H5页面（对应长链内容）\n2. 不会尝试唤醒App",
                      stepTag: 4,
                      aiCaseFlag: false,
                    },
                    children: [],
                  },
                ],
              },
            ],
          },
          {
            data: {
              id: "54a7877c-71e5-44b0-84ea-5dbfdb0df99a",
              text: "客户端边界场景 - 安装旧版本App，点击新短链跳转浏览器",
              priority: 3,
              stepTag: 1,
              owningSide: [0],
              case: [17789240],
              aiCaseFlag: false,
            },
            children: [
              {
                data: {
                  id: "e107871a-ec14-4dcd-990e-e491ab129985",
                  text: "1. 安卓/iOS设备\n2. 已安装旧版本App（不支持新短链解析功能）\n3. 短信中包含新短链格式（https://c.opdwz.cn/oppstore/xxx）",
                  stepTag: 2,
                  aiCaseFlag: false,
                },
                children: [],
              },
              {
                data: {
                  id: "68efd075-6532-41aa-b7d1-f4cd2d33da5e",
                  text: "1. 在短信应用中点击新短链",
                  stepTag: 3,
                  aiCaseFlag: false,
                },
                children: [
                  {
                    data: {
                      id: "15627275-c9f1-430f-93e7-66ddaa1f31bc",
                      text: "1. 跳转浏览器打开H5页面（对应长链内容）",
                      stepTag: 4,
                      aiCaseFlag: false,
                    },
                    children: [],
                  },
                ],
              },
            ],
          },
          {
            data: {
              id: "52e56f1b-86d9-4f97-bef7-520485035f35",
              text: "客户端边界场景 - 安装新版本App但未打开过，点击新短链唤醒app跳转到对应页面",
              priority: 3,
              stepTag: 1,
              owningSide: [0],
              case: [17789241],
              aiCaseFlag: false,
            },
            children: [
              {
                data: {
                  id: "6fffd4ee-c239-4909-9b1f-43b2904ec55b",
                  text: "1. 安卓设备版本6.0及以上\n2. 已安装新版本App（支持短链跳转功能）但从未打开过\n3. 短信中包含新短链格式（https://c.opdwz.cn/oppstore/xxx）",
                  stepTag: 2,
                  aiCaseFlag: false,
                },
                children: [],
              },
              {
                data: {
                  id: "cb2d0273-7304-411e-a880-ad1fb085152c",
                  text: "1. 在短信应用中点击新短链",
                  stepTag: 3,
                  aiCaseFlag: false,
                },
                children: [
                  {
                    data: {
                      id: "bda8df06-a994-4deb-805d-718e664d8ce3",
                      text: "1. 静默唤醒app并跳转到对应页面，并弹出用户条款",
                      stepTag: 4,
                      aiCaseFlag: false,
                    },
                    children: [],
                  },
                ],
              },
            ],
          },
          {
            data: {
              id: "74d6e33c-4522-4821-a189-4cad3150a314",
              text: "客户端边界场景 - 安装新版本App，点击旧短链跳转浏览器",
              priority: 3,
              stepTag: 1,
              owningSide: [0],
              case: [17789242],
              aiCaseFlag: false,
            },
            children: [
              {
                data: {
                  id: "8f4a8fef-c412-4d1a-ada4-b1c8e8d6ea43",
                  text: "1. 安卓/iOS设备\n2. 已安装新版本App（支持短链跳转功能）\n3. 短信中包含旧短链格式（如t.cn/xxx）",
                  stepTag: 2,
                  aiCaseFlag: false,
                },
                children: [],
              },
              {
                data: {
                  id: "beb1b0fd-bafc-4ccc-b12a-648dc0e758c4",
                  text: "1. 在短信应用中点击旧短链",
                  stepTag: 3,
                  aiCaseFlag: false,
                },
                children: [
                  {
                    data: {
                      id: "d72966c3-a04e-4cfd-8db3-a2c99a5ebd2e",
                      text: "1. 跳转浏览器打开H5页面",
                      stepTag: 4,
                      aiCaseFlag: false,
                    },
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

describe("XMind Template JSON Roundtrip", () => {
  it("should parse the xmind-template.json and then render it back to an equivalent JSON structure", () => {
    // Parse the raw JSON into MindMapNodes
    const parsedMindMap: MindMap = parseJson(xmindTemplateJson);

    // Render the MindMapNodes back into a JSON structure
    const renderedJson = renderJson(parsedMindMap);

    // For a deep equality check, we might need to normalize IDs or other volatile fields
    // For now, a direct comparison will be attempted.
    // If there are expected differences (e.g., order of properties, default values),
    // a more sophisticated comparison or a canonical expected output would be needed.
    expect(renderedJson).toEqual(xmindTemplateJson);
  });
});
