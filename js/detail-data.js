window.DETAIL_DATA = {
  "web-realstate": {
    category: "网站代表作品",
    title: "RealState AI 售房网站",
    tagline: "房产文案大师：让每套房子都会讲故事",
    status: "V1.0 MVP · 已确认",
    source: "来源：Prd(售房网站）.md",
    repoUrl: "https://github.com/zxc9802/shoufang.git",
    siteUrl: "https://realstate-ai.zeabur.app/",
    summary:
      "面向房产中介、房东与销售，用 AI 视觉分析房源照片/户型图，输出多平台营销文案与场景效果图，显著提升房源发布效率。",
    positioning:
      "在该项目中我采用 Vibe Coding 的标准链路：功能规划 → UI 规划 → 版本规划 → 架构蓝图 → PRD 生成，再进行快速开发落地。",
    modules: [
      "图片上传与房源基础信息输入（户型/面积/价格/亮点标签）",
      "AI 视觉分析：采光、材质、空间特征识别",
      "卖点挖掘：自动生成核心卖点与销售话术",
      "多平台文案：贝壳版 / 小红书版 / 朋友圈版",
      "户型图分析 + 软装建议 + 风格化改造剧本",
      "积分体系与卡密兑换机制"
    ],
    flow: [
      "上传房源照片或户型图并填写核心参数",
      "触发 AI 视觉理解和结构化特征提取",
      "按平台风格生成可直接发布的营销文案",
      "输出 AI 场景效果图与可复制内容",
      "通过积分系统完成闭环使用与复购"
    ],
    stack: [
      "前端：Next.js 14 + Zustand",
      "后端：Node.js + Express",
      "数据库：Supabase（Auth + Storage + PostgreSQL）",
      "模型：Gemini Vision / Gemini Pro / 生图降级链路",
      "交付产出：MVP 架构蓝图、业务规则、数据契约"
    ]
  },
  "web-xhs": {
    category: "网站代表作品",
    title: "小红书文生图网站",
    tagline: "长文一键转小红书分段文案 + 每段配图",
    status: "MVP 方案 C · 已确认",
    source: "来源：Prd（小红书文生图网站）.md",
    repoUrl: "https://github.com/zxc9802/xiaohongshu.git",
    siteUrl: "https://xiaohongshu.qyaijingxuan.top/",
    summary:
      "解决创作者把长文改写成小红书内容的高成本问题，实现自动改写、拆段、分段配图与一键打包下载。",
    positioning:
      "项目强调工程化业务规则：固定流程编排、失败段重试、内容审核回路、游客限频，保证可用性与稳定性。",
    modules: [
      "原文输入与改写语气模板",
      "自动舒适阅读拆段机制",
      "每段 3:4 图片生成（模板模式 / 自由提示词）",
      "文本审核 + 图片审核",
      "段级失败重试，不重跑整任务",
      "结果页：一键复制全文 + 单图/打包下载"
    ],
    flow: [
      "用户粘贴原文并选择文案风格",
      "系统完成改写与分段",
      "逐段生成配图并执行审核",
      "针对失败段执行局部重试",
      "输出可发布图文素材包"
    ],
    stack: [
      "核心能力：文案改写、结构化分段、图像生成编排",
      "数据契约：RewriteRequest / ImageGenerateRequest / PublishBundle",
      "运营规则：游客限频、防滥用与失败容错机制",
      "产品价值：把发布前准备时间压缩到分钟级"
    ]
  },
  "web-dream": {
    category: "网站代表作品",
    title: "梦境聊天馆",
    tagline: "神秘传送门风格的 AI 解梦交互产品",
    status: "V1.0 MVP · 开发完成",
    source: "来源：Prd（梦境解析馆）.md",
    specialNote:
      "此项目为微信小程序，因小程序规定的类目限制，暂时无法上线并分享，但项目本身可以完整跑通。",
    repoUrl: "https://github.com/zxc9802/mengjing.git",
    siteUrl: null,
    summary:
      "用户通过沉浸式入口与 AI 占卜师进行多轮对话，系统自动生成结构化解梦报告、人格标签与艺术配图。",
    positioning:
      "以“仪式感 + 沉浸感”为设计核心，兼顾语音体验、对话深挖、内容安全和结果可分享性。",
    modules: [
      "梦境热线：触发式语音对话入口",
      "AI 占卜师人设与多轮追问策略",
      "智能结束判断（主动结束 / 超时 / 用户挂断）",
      "解梦报告生成：摘要、象征分析、寄语",
      "AI 艺术配图与长图合成下载",
      "社交分享与后续梦境档案扩展能力"
    ],
    flow: [
      "用户触发水晶球入口进入对话",
      "AI 通过追问收集高价值梦境信息",
      "系统判断信息完整度并结束会话",
      "生成解梦报告 + 艺术图 + 人格标签",
      "结果导出或分享"
    ],
    stack: [
      "交互端：微信小程序语音链路",
      "服务端：云函数 + 云存储 + 数据库",
      "AI 服务：RTC 语音 + LLM + 生图模型",
      "数据结构：DreamSession / DreamReport"
    ]
  },

  "web-couple": {
    category: "网站代表作品",
    title: "甜蜜时光情侣空间",
    tagline: "情侣生活记录 + AI 生图 + 语音识别",
    status: "需求文档版",
    source: "来源：prd（情侣空间）.md",
    repoUrl: "https://github.com/zxc9802/qinglvkongjian.git",
    siteUrl: "https://app-7spbvzhhmz29.appmiaoda.com",
    summary:
      "面向情侣的生活记录产品，聚合日记、图片、语音、邀请与回忆权限管理，并加入 AI 生图增强表达。",
    positioning:
      "产品强调“长期记录 + 双人协作 + 情感表达”，既有社交互动，也有安全与权限控制。",
    modules: [
      "日记记录与批量图片上传",
      "AI 生图：文本转图、模板、风格、编辑",
      "语音识别：录音、转写、播放、管理",
      "时间轴回忆浏览与分类整理",
      "邀请机制与回忆可见性权限",
      "管理员账号与密码锁后台机制"
    ],
    flow: [
      "创建/上传回忆内容（图文或语音）",
      "系统自动转写、分类并生成时间轴",
      "情侣双方进行邀请与互动留言",
      "按权限管理回忆与留言可见性",
      "通过 AI 生图增强回忆内容呈现"
    ],
    stack: [
      "业务核心：双人协作模型与内容权限",
      "AI 能力：生图 + 语音转文字",
      "设计方向：玫瑰金与粉色温馨卡片风"
    ]
  },
  "skill-remotion": {
    category: "Skill 代表作品",
    title: "Remotion 视频创作",
    tagline: "基于 React 的程序化视频生产体系",
    status: "技能库项目",
    source: "来源：README(romotion视频）.md",
    repoUrl: "https://github.com/zxc9802/remotion.git",
    siteUrl: null,
    summary:
      "通过 Remotion + React 构建自动化视频产线，覆盖多模板风格、TTS 配音、音画同步、3D 动效与批量渲染。",
    positioning:
      "适合需要规模化生产内容的视频场景，强调模板化复用和脚本化生成。",
    modules: [
      "多种视频模板（漫画/科技/简约/3D）",
      "TTS 语音合成与字幕时间轴",
      "音画同步与场景衔接",
      "数据可视化动画组件",
      "Three.js / React Three Fiber 3D 渲染",
      "脚本化渲染输出"
    ],
    flow: [
      "确定视频风格与脚本",
      "生成配音并解析时长与节奏点",
      "按时间轴编排场景与转场",
      "渲染导出最终视频文件"
    ],
    stack: [
      "Remotion + React 18 + TypeScript",
      "@remotion/three / @remotion/transitions",
      "FFmpeg 渲染支持，适配自动化流程"
    ]
  },
  "skill-wechatlog": {
    category: "Skill 代表作品",
    title: "微信群聊智能分析",
    tagline: "自动抓取、分析并生成 HTML 报告",
    status: "自动化工作流",
    source: "来源：README(微信群聊总结）.md",
    repoUrl: "https://github.com/zxc9802/weixinqunliao.git",
    siteUrl: "https://abc.qyaijingxuan.top/",
    summary:
      "连接 Chatlog MCP，批量处理群聊记录并输出可视化报告，支持自动推送到 GitHub 与网站归档发布。",
    positioning:
      "这是标准的“数据采集 - AI 分析 - 报告发布”流水线，强调日常运营中的稳定执行。",
    modules: [
      "Chatlog MCP 连接与可用性检查",
      "群聊列表读取与批量拉取记录",
      "AI 分析并生成 HTML 报告",
      "按日期输出与索引管理",
      "GitHub 自动推送或手动发布流程"
    ],
    flow: [
      "检查 MCP 服务状态",
      "执行分析脚本并拉取会话数据",
      "生成报告与结构化索引",
      "推送仓库并站点更新"
    ],
    stack: [
      "Python 主流程 + MCP API",
      "HTML 报告输出 + GitHub Pages 部署",
      "支持 CLI 参数化运行"
    ]
  },
  "skill-weibo": {
    category: "Skill 代表作品",
    title: "微博热搜创意猎手",
    tagline: "从热点事件中提炼可执行产品灵感",
    status: "AI Skill",
    source: "来源：README(微博创意）.md",
    repoUrl: "https://github.com/zxc9802/weibochuangyi.git",
    siteUrl: null,
    summary:
      "自动抓取微博热搜 Top10，结合背景检索与评分体系，输出产品机会报告和优先级建议。",
    positioning:
      "围绕“热点到产品机会”的短链路设计，适用于快速头脑风暴与新方向筛选。",
    modules: [
      "实时热搜抓取",
      "热点背景与痛点深挖",
      "创意评分（有趣度 + 有用度）",
      "优秀/良好/普通等级分层",
      "响应式 HTML 报告生成"
    ],
    flow: [
      "抓取热搜榜单",
      "逐条分析事件脉络与用户痛点",
      "输出产品创意与量化评分",
      "生成可视化报告供决策"
    ],
    stack: [
      "Claude Code Skill 编排",
      "微博热搜 API + WebSearch",
      "HTML 报告产出"
    ]
  },
  "skill-youtube": {
    category: "Skill 代表作品",
    title: "YouTube 内容自动化",
    tagline: "抓取、转录、改写、同步的内容流水线",
    status: "自动化系统",
    source: "来源：README（youtube博客skill).md",
    repoUrl: "https://github.com/zxc9802/aijingxuan",
    siteUrl: null,
    summary:
      "从 YouTube 频道批量发现新视频，自动完成转录与 AI 改写，并同步到飞书与博客站点。",
    positioning:
      "面向内容团队的自动化生产系统，减少重复人工并保持多平台分发节奏。",
    modules: [
      "频道扫描与新视频发现",
      "多种转录服务适配",
      "AI 改写生成可发布文本",
      "飞书多维表格归档",
      "Flask/Next.js 博客展示"
    ],
    flow: [
      "扫描频道或导入视频 URL",
      "抓取元数据并完成转录",
      "调用模型改写内容",
      "同步飞书并落地博客展示"
    ],
    stack: [
      "Python 工作流 + Node 改写脚本",
      "OpenAI/Gemini + Feishu API",
      "Flask / Next.js 双展示端"
    ]
  },
  "skill-wechat-article": {
    category: "Skill 代表作品",
    title: "微信公众号 AI 写作",
    tagline: "选题、访谈、写作、发布全流程自动化",
    status: "AI Agent 工具链",
    source: "来源：README（自动生成WX公众号文章）.md",
    repoUrl: "https://github.com/zxc9802/shangyefangtan.git",
    siteUrl: null,
    summary:
      "围绕公众号运营搭建完整内容生产流程，从热点选题到文章发布草稿箱都可在同一工作流完成。",
    positioning:
      "核心价值是把高频内容生产流程标准化、自动化，同时保留主题风格和配图能力。",
    modules: [
      "AI 选题猎手（热点抓取与评分）",
      "文章写作工作流（讨论写法 + 正文生成）",
      "商业访谈模式（多轮挖掘到成文）",
      "Markdown 转 HTML + 主题样式",
      "公众号草稿箱发布与封面生成"
    ],
    flow: [
      "先做选题并输出结构化报告",
      "进入写作或访谈路径",
      "生成正文与配图内容",
      "自动排版后发布到草稿箱"
    ],
    stack: [
      "AI Agent 工作流 + Skills 模块化",
      "Node 工具链（marked/juice/highlight.js）",
      "COS/七牛图床与公众号发布接口"
    ]
  },
  "skill-algorithm-tamer": {
    category: "Skill 代表作品",
    title: "算法驯化器 (Algorithm Tamer)",
    tagline: "用 AI 做推荐算法训练诊断与动态策略规划",
    status: "v3.0 Skill",
    source: "来源：README(算法驯化器）.md",
    repoUrl: "https://github.com/zxc9802/suanfaxunhua.git",
    siteUrl: null,
    summary:
      "这是一个以 Claude 为决策中枢的训练系统：先诊断当前推荐状态，再动态规划训练量与关键词策略，并结合评分反馈持续迭代。",
    positioning:
      "项目不是固定刷量，而是强调“数据驱动的训练调度”，通过关键词相关性自检和实时评分闭环提升推荐内容质量。",
    modules: [
      "关键词生成与强相关性自检机制",
      "负面过滤器策略（过滤低质量娱乐内容）",
      "豆包 API 智能评分（0-10 分）",
      "基于评分的动作执行（收藏/点赞/跳过）",
      "连续低分干预机制（重搜关键词）",
      "Claude 动态规划训练阶段与训练量"
    ],
    flow: [
      "生成候选关键词并执行相关性自检",
      "抓取推荐视频标题并调用豆包 API 评分",
      "按评分阈值执行观看/互动/跳过策略",
      "若连续低分则触发关键词重定向",
      "阶段结束后由 Claude 重新诊断并调整计划"
    ],
    stack: [
      "核心模型：Claude 决策 + 豆包评分模型",
      "策略机制：关键词过滤 + 反馈驱动调优",
      "工程特点：可执行规则化流程与自动干预",
      "应用价值：提升推荐流内容质量与训练效率"
    ]
  }
};
