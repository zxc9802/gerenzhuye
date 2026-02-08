# 🎯 微信公众号 AI 写作助手

一套基于 AI Agent 的公众号内容全流程自动化工具，包含选题策划、深度访谈、文章写作、一键发布到草稿箱等功能。

## ✨ 核心功能

| 功能 | 触发命令 | 说明 |
|------|----------|------|
| 🔍 AI 选题猎手 | `/xuanti` | 从多个科技网站抓取热点，生成结构化选题报告 |
| ✍️ 文章写作 | `/xiezuo` | 基于选题报告，交互式讨论写法后生成带配图的文章 |
| 🎤 商业访谈 | `/shangyefangtan` | 多轮深度访谈挖掘故事，自动生成公众号文章 |
| 📤 自动发布 | `/zidongshangchuan` | 将文章一键发布到微信公众号草稿箱 |

## 📂 项目结构

```
├── .agent/workflows/           # 工作流定义
│   ├── xuanti.md              # 选题工作流
│   ├── xiezuo.md              # 写作工作流
│   ├── shangyefangtan.md      # 访谈工作流
│   └── zidongshangchuan.md    # 发布工作流
├── skills/                    # 核心技能模块
│   ├── ai-topic-hunter/       # AI 选题猎手
│   ├── elite-business-interviewer/  # 商业访谈记者（带发布）
│   ├── shangyefangtan/        # 商业访谈
│   └── wechat-publish/        # 微信发布工具
├── articles/                  # 生成的文章
├── topics/                    # 选题报告
└── 商业访谈/                   # 访谈文章
```

## 🛠️ 技能模块详解

### 1. AI 选题猎手 (`ai-topic-hunter`)

从量子位、36氪、机器之心等主流科技媒体抓取热点，生成包含以下内容的选题报告：
- 热点速览与趋势洞察
- 选题评分（时效性/相关性/新颖性/可传播性/可写性）
- Top 3-5 推荐选题（含标题备选、大纲、素材建议）

### 2. 商业访谈记者 (`shangyefangtan` / `elite-business-interviewer`)

扮演顶级商业访谈记者：
- 通过动态多轮对话挖掘故事素材
- AI 自主判断素材饱满度
- 一次性输出约 2000 字公众号文章
- 自动生成 1-2 张配图

### 3. 微信发布工具 (`wechat-publish`)

将 Markdown 文章发布到微信公众号：
- 支持 4 种精美主题风格（简约专业/优雅文艺/活力橙/暗黑极客）
- AI 生成封面图
- 自动上传图片到云端
- Markdown 转 HTML（内联 CSS、链接转脚注）
- 一键发布到草稿箱

## 🚀 快速开始

### 1. 安装依赖

```bash
cd skills/wechat-publish
npm install
```

### 2. 配置云服务

编辑 `skills/wechat-publish/cos-config.js` 配置腾讯云 COS：

```javascript
module.exports = {
    secretId: 'YOUR_SECRET_ID',
    secretKey: 'YOUR_SECRET_KEY',
    bucket: 'YOUR_BUCKET',
    region: 'YOUR_REGION'
};
```

### 3. 使用工作流

支持 Claude Desktop 或其他 AI Agent 环境：

```
/xuanti          # 生成选题报告
/xiezuo          # 根据选题写文章
/shangyefangtan  # 商业访谈
/zidongshangchuan # 发布到公众号
```

## 📋 使用流程

### 方式一：热点文章

```mermaid
graph LR
    A[/xuanti] --> B[选题报告]
    B --> C[/xiezuo]
    C --> D[选择选题]
    D --> E[讨论写法]
    E --> F[生成文章]
    F --> G[/zidongshangchuan]
    G --> H[发布到草稿箱]
```

### 方式二：商业访谈

```mermaid
graph LR
    A[/shangyefangtan] --> B[多轮访谈]
    B --> C[自动写作]
    C --> D[生成配图]
    D --> E[/zidongshangchuan]
    E --> F[发布到草稿箱]
```

## 🎨 主题风格

| 编号 | 名称 | 主色调 | 适用场景 |
|------|------|--------|----------|
| 1 | 简约专业 | 蓝色 #1a73e8 | 技术文章 |
| 2 | 优雅文艺 | 墨绿 #2d5a27 | 散文随笔 |
| 3 | 活力橙 | 橙色 #ff6b35 | 营销活动 |
| 4 | 暗黑极客 | 青色 #61dafb | 程序员向 |

## 📦 依赖说明

- `marked` - Markdown 解析
- `juice` - CSS 内联
- `highlight.js` - 代码高亮
- `cos-nodejs-sdk-v5` - 腾讯云 COS SDK
- `qiniu` - 七牛云 SDK（备选）

## ⚠️ 注意事项

1. 需要 Claude Desktop 或支持 Skills 的 AI Agent 环境
2. 图片上传需配置腾讯云 COS 或七牛云
3. 微信发布 API 需要正确的 API Key
4. 文章发布后在草稿箱，需手动前往公众号后台发布

## 📄 License

MIT
