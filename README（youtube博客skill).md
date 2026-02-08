# AI精选 - YouTube内容抓取与自动化工作流

[![GitHub](https://img.shields.io/badge/GitHub-zxc9802/aijingxuan-blue?logo=github)](https://github.com/zxc9802/aijingxuan)

一套完整的YouTube视频内容自动化处理系统，支持从YouTube频道抓取最新视频、AI转录、智能改写，并自动同步到飞书多维表格和博客网站。

## ✨ 核心功能

- 🎬 **YouTube视频抓取** - 批量扫描订阅频道，自动发现并下载新视频
- 📝 **智能转录** - 支持多种转录服务（YouTube Transcript API、BibiGPT、AssemblyAI）
- 🤖 **AI内容改写** - 使用OpenAI/Gemini对转录内容进行智能改写
- 📊 **飞书同步** - 自动将内容归档到飞书多维表格
- 🌐 **博客网站** - 支持部署到Vercel的现代化博客展示

## 📁 项目结构

```
├── src/                    # 核心源代码
│   ├── main.py            # 主工作流入口
│   ├── yt.py              # YouTube数据抓取
│   ├── transcript.py      # 视频转录服务
│   ├── feishu.py          # 飞书API对接
│   ├── config.py          # 配置加载
│   └── state.py           # 状态管理
├── scripts/               # 辅助脚本
│   └── rewrite.js         # AI改写调用
├── configs/               # 配置文件
│   ├── sources.yaml       # 订阅源与API配置
│   ├── state.yaml         # 处理状态记录
│   └── rewrite-prompt.md  # 改写提示词模板
├── blog/                  # Flask博客应用
│   ├── app.py             # Flask主应用
│   └── templates/         # HTML模板
├── youtube-website/       # Next.js博客网站
│   ├── app/               # Next.js App Router
│   └── tailwind.config.ts # Tailwind配置
├── outputs/               # 输出目录
├── skills/                # Claude技能配置
└── .agent/workflows/      # 工作流定义
```

## 🚀 快速开始

### 环境要求

- Python 3.8+
- Node.js 18+（内置`fetch`支持）
- Git

### 安装依赖

```bash
# Python依赖
pip install -r requirements.txt

# Next.js网站依赖（可选）
cd youtube-website && npm install
```

### 配置

编辑 `configs/sources.yaml` 文件：

```yaml
api:
  transcript:
    provider: youtube_transcript_api  # 或 bibigpt, assemblyai
  ai:
    base_url: https://api.openai.com/v1
    api_key: YOUR_API_KEY
    model: gpt-4
  feishu:
    app_id: YOUR_FEISHU_APP_ID
    app_secret: YOUR_FEISHU_APP_SECRET
    app_token: YOUR_APP_TOKEN
    table_id: YOUR_TABLE_ID

sources:
  youtube_channels:
    - UCxxxxxx  # 频道ID列表
```

## 📖 使用方式

### 批量模式

扫描所有订阅频道，列出新内容并确认后处理：

```bash
python src/main.py batch --limit 10
```

### URL模式

直接处理指定视频URL：

```bash
python src/main.py url --urls https://youtube.com/watch?v=xxxx https://youtu.be/yyyy
```

### 一键执行

Windows用户可使用批处理脚本：

```powershell
.\zidongtiqu.bat
# 或
.\zidongtiqu.ps1
```

## 📤 输出结构

每个处理的视频会生成独立文件夹，包含：

```
outputs/video-title/
├── metadata.md      # 视频元数据
├── transcript.md    # 转录文本
├── rewritten.md     # AI改写内容
└── cover.jpg        # 视频封面
```

## 🔧 技术栈

| 组件 | 技术 |
|------|------|
| 核心脚本 | Python 3 |
| AI改写 | Node.js + OpenAI/Gemini API |
| 博客展示 | Flask / Next.js + Tailwind |
| 数据存储 | 飞书多维表格 |
| 部署平台 | Vercel |

## 📋 AssemblyAI使用说明

如果使用`assemblyai`转录服务，需要额外安装：

```bash
pip install -U yt-dlp
# 确保ffmpeg已安装并在PATH中
```

## 🔗 相关链接

- [飞书开发者平台](https://open.feishu.cn/)
- [YouTube Data API](https://developers.google.com/youtube/v3)
- [AssemblyAI](https://www.assemblyai.com/)
- [OpenAI API](https://platform.openai.com/)

## 📄 许可证

MIT License

---

Made with ❤️ by [zxc9802](https://github.com/zxc9802)
