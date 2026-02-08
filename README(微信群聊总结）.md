---
description: 运行微信群聊自动分析工具，生成 HTML 报告并推送到 GitHub
---

# 微信群聊自动分析工作流

执行此工作流将自动分析微信群聊记录，生成精美的 HTML 报告，并推送到 GitHub。

## 前提条件

确保 Chatlog MCP 服务正在运行（端口 5030）。

## 执行步骤

### 1. 检查 Chatlog MCP 服务是否运行
```bash
curl -s http://127.0.0.1:5030/api/v1/chatroom | head -c 200
```
如果失败，请先启动 chatlog MCP 服务。

// turbo
### 2. 运行群聊分析程序
```bash
cd c:\Users\78575\Desktop\我的skills\微信群聊自动分析(反重力版）\chatlog_skill && python main.py
```

程序将会：
- 读取 `群聊清单.md` 配置文件
- 批量获取群聊记录
- 智能分析并生成 HTML 报告
- 自动推送到 GitHub 仓库

### 3. 查看生成的报告

报告会保存在 `chatlog_skill/output/YYYY-MM-DD/` 目录下。

## 可选参数

如需自定义配置，可以使用以下参数：

```bash
python main.py -c 群聊清单.md -o ./output --api http://127.0.0.1:5030
```

- `-c`: 配置文件路径
- `-o`: 输出目录
- `--api`: Chatlog MCP API 地址
- `--no-github-push`: 禁用 GitHub 推送

## 手动上传报告到 GitHub

如需手动上传报告到 GitHub 仓库，必须完成以下**两个步骤**：

### 步骤 1: 复制报告文件

> [!IMPORTANT]
> 报告文件必须放在 `data/` 文件夹**根目录**下，命名格式为 `YYYY-MM-DD.html`，**不要**创建日期子文件夹！

```powershell
# 正确示例：复制到 data/2026-02-07.html
Copy-Item 'C:\...\output\2026-02-07\报告名.html' 'C:\Users\78575\Desktop\微信群聊网站1\data\2026-02-07.html'

# 错误示例：不要创建子文件夹
# data/2026-02-07/报告名.html  ← 这是错误的！
```

### 步骤 2: 更新 reports.json 索引

> [!CAUTION]
> **必须更新 `reports.json` 文件**，否则网站不会显示新报告！

在 `C:\Users\78575\Desktop\微信群聊网站1\reports.json` 文件末尾添加新报告的记录：

```json
{
  "date": "YYYY-MM-DD",
  "originalPath": "output\\YYYY-MM-DD\\报告文件名.html",
  "filename": "报告文件名.html",
  "relativeUrl": "data/YYYY-MM-DD.html"
}
```

### 步骤 3: 提交并推送

```powershell
cd C:\Users\78575\Desktop\微信群聊网站1
git add data/YYYY-MM-DD.html reports.json
git commit -m "添加 YYYY-MM-DD 群聊分析报告"
git pull --rebase  # 如有冲突先拉取
git push
```

## 关键配置路径

| 配置项 | 路径 |
|-------|------|
| GitHub 仓库本地路径 | `C:\Users\78575\Desktop\微信群聊网站1` |
| 报告存放目录 | `data/` |
| 报告索引文件 | `reports.json` |
| 网站域名 | `abc.qyaijingxuan.top` |
