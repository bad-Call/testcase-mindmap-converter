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

| 操作步骤             | 预期结果                                                |
| -------------------- | ------------------------------------------------------- |
| 在短信应用中点击短链 | 跳转浏览器打开H5页面（对应长链内容）<br>不会尝试唤醒App |
```
