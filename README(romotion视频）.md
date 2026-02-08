# 🎬 Remotion Video Skills

基于 [Remotion](https://www.remotion.dev/) 框架的视频创作技能库，使用 React 进行程序化视频生成。

## ✨ 功能特性

- 🎨 **多种视频风格模板** - 漫画风格、科技风格、简约专业、3D 动态
- 🎙️ **TTS 语音合成** - 集成 MarsWave TTS API 生成配音
- � **音画同步** - 根据字幕时间点精确控制场景切换
- � **丰富动画效果** - 支持 Spring 动画、缓动曲线、转场效果
- � **数据可视化** - 图表和数据动态展示
- 🧊 **3D 渲染** - 集成 Three.js 和 React Three Fiber

## 📁 项目结构

```
├── src/                    # 视频组件源码
│   ├── Root.tsx           # 根组件，注册所有 Composition
│   ├── AINews/            # AI 新闻视频模板
│   ├── ClaudeCodePodcast/ # 播客风格视频
│   ├── SkillIntro/        # 技能介绍模板
│   ├── ThreeComponents/   # 3D 组件库
│   └── ZeroDefects*/      # 零缺陷培训系列
├── scripts/               # 自动化脚本
│   ├── generate-voice*.js # TTS 语音生成
│   ├── generate-images*.js# AI 图片生成
│   └── build-with-images.ts
├── public/                # 静态资源
│   └── audio/            # 配音音频文件
└── out/                   # 渲染输出
```

## 🚀 快速开始

### 环境要求

- Node.js >= 18
- FFmpeg（用于视频渲染）

### 安装

```bash
npm install
```

### 启动预览

```bash
npm start
```

### 渲染视频

```bash
npm run build
```

## 🎬 视频制作工作流

### 1. 确定视频风格

| 风格 | 特点 |
|------|------|
| **漫画风格** | 网点背景、速度线、爆炸框、对话气泡 |
| **科技风格** | 深色渐变、霓虹光效、粒子动画 |
| **简约专业** | 白色背景、清晰排版、商务风格 |
| **3D 动态** | Three.js 3D 场景、摄像机动画 |

### 2. 先生成配音，再制作视频

```
生成配音音频 → 获取音频时长/字幕 → 设计场景 → 实现音画同步
```

### 3. 场景无缝衔接

```typescript
// 场景 duration = 下一场景开始时间 - 当前场景开始时间
const sceneFrames = {
  scene1: { from: 0, duration: Math.round(nextSceneStartTime * FPS) },
  scene2: { from: Math.round(scene2StartTime * FPS), duration: ... },
};
```

## � 技能规则文档

| 分类 | 文档 |
|------|------|
| **动画** | `animations.md`, `timing.md`, `text-animations.md` |
| **资源** | `assets.md`, `images.md`, `videos.md`, `audio.md`, `fonts.md` |
| **3D** | `3d.md`（Three.js / React Three Fiber） |
| **字幕** | `subtitles.md`, `measuring-text.md` |
| **序列** | `sequencing.md`, `transitions.md`, `trimming.md` |
| **配置** | `compositions.md`, `parameters.md`, `calculate-metadata.md` |
| **TTS** | `marswave-tts.md` |
| **其他** | `charts.md`, `maps.md`, `lottie.md`, `gifs.md` |

详细文档位于 `.claude/skills/remotion/rules/` 目录。

## 🛠️ 技术栈

- [Remotion](https://www.remotion.dev/) - React 视频渲染框架
- [React 18](https://react.dev/) - UI 组件库
- [TypeScript](https://www.typescriptlang.org/) - 类型安全
- [@remotion/three](https://www.remotion.dev/docs/three) - 3D 支持
- [@remotion/transitions](https://www.remotion.dev/docs/transitions) - 转场
- [Zod](https://zod.dev/) - Schema 参数验证

## 📝 License

MIT

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！
