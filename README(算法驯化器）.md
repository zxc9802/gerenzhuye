---
name: algorithm-tamer
description: 算法驯化器 - 用 AI 智能分析并训练推荐算法。Claude 根据诊断结果动态规划训练策略。
user-invocable: true
---

# 算法驯化器 v3.0 (Algorithm Tamer)

> Claude 智能分析 + 纯AI内容驯化

---

## ⚠️ 重要规则：关键词生成与自检

### 关键词相关性自检原则

**CRITICAL：每次生成关键词列表后，必须进行自检！**

在生成配置时，Claude 必须检查每个关键词是否与目标内容类型**强相关**：

```
生成关键词 → 自检三个问题 → 删除不相关的 → 输出最终列表
```

**自检三个问题：**
1. 这个关键词是否**直接**与目标类型相关？
2. 搜索结果是否主要是目标类型内容？
3. 是否有更精准的关键词可以替代？

### 示例：AI/科技 类型

**❌ 错误：包含不相关关键词**
```json
{
  "keywords": [
    "AI", "ChatGPT", "深度学习",
    "装机", "电脑硬件",     // ❌ 与AI无关
    "前端开发", "Java",     // ❌ 纯编程，不是AI
    "云计算", "区块链"      // ❌ 泛技术，不是AI
  ]
}
```

**✅ 正确：只包含强相关关键词**
```json
{
  "keywords": [
    "AI", "ChatGPT", "Claude", "GPT",
    "深度学习", "机器学习", "神经网络",
    "AI绘画", "Stable Diffusion", "Midjourney",
    "AI Agent", "RAG", "LangChain",
    "Python AI"               // ✅ AI相关的编程
  ]
}
```

### 各类型的相关性规则

#### AI/科技 类型

### 各类型的相关性判断原则

**重要：Claude 需要根据用户输入的具体类型，智能判断相关性！**

当用户输入自定义类型时，Claude 应该：

1. **理解用户意图**：用户想要什么样的内容？
2. **分析关键词相关性**：这个关键词是否直接指向用户想要的内容？
3. **预测搜索结果**：用这个关键词搜索，主要会出什么内容？
4. **保留强相关的，删除不相关的**

#### 示例：用户输入 "AI/科技"

**Claude 的思考过程：**
- 用户想要：AI技术、人工智能相关内容
- 判断 "深度学习"：✅ 直接是AI技术，保留
- 判断 "装机教程"：❌ 搜索结果是硬件组装，不是AI，删除
- 判断 "Python编程"：❓ 需要判断 → 如果是"Python AI"则保留，纯Python则删除
- 判断 "Stable Diffusion"：✅ AI绘画工具，保留

#### 示例：用户输入 "健身"

**Claude 的思考过程：**
- 用户想要：健身训练、运动相关内容
- 判断 "健身房"：✅ 相关，保留
- 判断 "减肥食谱"：✅ 健身配套，保留
- 判断 "瑜伽"：✅ 运动方式，保留
- 判断 "体育新闻"：❌ 不是健身训练，删除
- 判断 "运动品牌"：❓ 需要判断 → 如果是"健身装备评测"则保留

#### 示例：用户输入 "摄影"

**Claude 的思考过程：**
- 用户想要：摄影技巧、相机相关内容
- 判断 "单反相机"：✅ 摄影器材，保留
- 判断 "后期修图"：✅ 摄影后期，保留
- 判断 "手机拍照"：✅ 摄影应用，保留
- 判断 "电影制作"：❌ 不是摄影，是影视制作，删除
- 判断 "视觉艺术"：❓ 需要判断 → 如果是"摄影艺术"则保留

#### 关键判断标准

**保留关键词的标准（满足其一即可）：**
1. 直接包含目标类型的核心词（如"AI绘画"包含"AI"）
2. 搜索结果主要是目标类型内容
3. 是目标类型的子领域或应用场景

**删除关键词的标准（满足其一即删除）：**
1. 是相关但不相同的大领域（如"计算机"vs"AI"）
2. 搜索结果主要是其他类型内容
3. 只是间接相关，用户不想要的内容

### 配置生成流程（强制执行）

```python
def generate_keywords_for_type(content_type):
    """生成关键词时的强制流程"""

    # Step 1: 初步生成
    keywords = generate_initial_keywords(content_type)

    # Step 2: 相关性自检（必须执行）
    filtered_keywords = []
    for kw in keywords:
        if is_strongly_related(kw, content_type):
            filtered_keywords.append(kw)
        else:
            print(f"[自检删除] {kw} 与 {content_type} 不相关")

    # Step 3: 输出最终列表
    return filtered_keywords
```

### 负面过滤器策略

**原则：只过滤真正娱乐化、低质量的内容**

```json
{
  "negative_filters": [
    "AI配音秀", "AI搞笑视频", "AI表情包", "AI玩梗",
    "虚拟主播整活", "vtuber娱乐", "AI动漫娱乐",
    "AI游戏实况", "AI娱乐直播", "AI梗图"
  ]
}
```

**不要过滤：**
- ❌ 不要过滤 AI音乐、AI翻唱（这些都是AI创作的应用）
- ❌ 不要过滤 AI杂谈、AI对话（可能是AI技术讨论）
- ❌ 不要过滤 AI配音（技术展示）

---

## 豆包API智能评分系统

### 评分流程

训练过程中，每个视频播放前都会调用豆包API进行智能评分：

```
抓取右侧推荐视频标题 → 调用豆包API评分 → 根据评分决定操作
```

### 评分标准（0-10分）

```python
DOUBAO_SCORING_PROMPT = """
请对以下视频标题与"{target_interest}"领域的相关性打分（0-10分）。

评分标准：
- 9-10分：高度相关的深度内容
- 7-8分：相关的教程或讨论
- 5-6分：部分相关
- 3-4分：略有关联
- 0-2分：完全不相关
"""
```

### 根据评分执行操作

| 评分范围 | 播放时长 | 操作 |
|----------|----------|------|
| >= 8分 | 60秒 | 收藏 + 点赞 |
| 5-8分 | 60秒 | 仅点赞 |
| < 5分 | 0秒 | 立即跳转下一个 |

### 连续低分干预机制

```python
def handle_low_score_streak():
    """连续3次评分<5分时，重新搜索关键词"""
    if low_score_streak >= 3:
        print(f"[警告] 连续{low_score_streak}次低分，重新搜索关键词...")
        redirect_keyword = random.choice(keywords)
        search_first_video(redirect_keyword)
        low_score_streak = 0  # 重置计数
```

### 豆包API配置

```python
DOUBAO_API_URL = "https://ark.cn-beijing.volces.com/api/v3/chat/completions"
DOUBAO_MODEL = "doubao-seed-1-8-251228"
```

---

## 核心理念

**Claude 是大脑，根据实际数据做决策**

不是固定死每天刷 60 个，而是：
1. Claude 先诊断分析当前状态
2. Claude 根据分析结果规划训练量
3. 每个阶段后重新分析，动态调整

---

## 工作流程

```
┌─────────────────────────────────────────────────────────────┐
│                   用户调用 /algorithm-tamer                   │
└──────────────────────────┬──────────────────────────────────┘
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  Step 1: 诊断分析                                            │
│  - Claude 运行诊断脚本，获取推荐内容                           │
│  - Claude 分析内容分布（AI/科技 X%，游戏 Y%...）               │
└──────────────────────────┬──────────────────────────────────┘
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  Step 2: Claude 智能规划                                     │
│  - 设定目标：将 AI/科技 从 X% 提升到 60%+                     │
│  - 计算差距：需要提升 (60-X)%                                 │
│  - 规划第一阶段：根据差距决定刷多少个                          │
│    • 差距大（>30%）：第一阶段 80 个                           │
│    • 差距中（15-30%）：第一阶段 60 个                         │
│    • 差距小（<15%）：第一阶段 40 个                           │
└──────────────────────────┬──────────────────────────────────┘
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  Step 3: 展示计划，等待用户确认                               │
│  "当前 AI/科技 20%，目标 60%，第一阶段建议刷 80 个"           │
│  提供选项：                                                   │
│    • 开始训练 → 执行训练                                      │
│    • 调整数量 → 询问具体数量（40/60/80/100 或自定义）         │
│    • 暂不执行 → 结束                                          │
└──────────────────────────┬──────────────────────────────────┘
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  Step 4: 执行训练                                            │
│  - Claude 运行训练脚本（刷规划的数量）                         │
│  - 完成后自动诊断                                            │
└──────────────────────────┬──────────────────────────────────┘
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  Step 5: 效果分析 + 重新规划                                  │
│  - 对比：训练前 X% → 训练后 Y%                               │
│  - 评估效果：提升了多少？                                     │
│  - 检查是否需要深度观看模式（提升<=5%）                        │
│  - 规划下一阶段：还需要刷多少？                               │
│  - 全自动模式：自动继续执行（无需确认）                        │
│  - 手动模式：等待用户确认是否继续                             │
└──────────────────────────┬──────────────────────────────────┘
```

---

## 全自动循环训练（auto_loop_train.py）

### 核心功能

**全自动训练循环**：训练 → 等待30分钟 → 诊断 → 动态调整 → 继续训练

```
┌─────────────────────────────────────────────────────────────┐
│                    全自动循环训练流程                          │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐      │
│  │  阶段训练   │ -> │ 等待30分钟  │ -> │   自动诊断   │      │
│  └─────────────┘    └─────────────┘    └─────────────┘      │
│         │                                      │             │
│         ▼                                      ▼             │
│  ┌─────────────┐                      ┌─────────────┐        │
│  │  保存进度   │                      │  分析结果   │        │
│  └─────────────┘                      └─────────────┘        │
│                                             │                 │
│         ┌───────────────────────────────────┘                 │
│         ▼                                                     │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │              动态参数调整逻辑                            │  │
│  │  • 改进 < 5% 或下降 → 视频数量+25，观看时长+30秒        │  │
│  │  • 改进 >= 5% → 保持参数不变                            │  │
│  │  • 达到 60% → 训练完成                                  │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                             │                 │
│         ┌───────────────────────────────────┘                 │
│         ▼                                                     │
│  ┌─────────────┐                                              │
│  │  继续下一阶段 │ (直到达到60%目标)                          │
│  └─────────────┘                                              │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

### 使用方法

```bash
# 直接运行全自动循环训练
python auto_loop_train.py
```

### 进度保存

训练进度保存在 `loop_progress.json`：

```json
{
  "stages_completed": [
    {
      "stage": 1,
      "videos": 60,
      "watch_time": "60-60s",
      "before_percent": 39.0,
      "after_percent": 45.3,
      "improvement": 6.3,
      "timestamp": "2026-01-24T14:00:00"
    }
  ],
  "baseline_percent": 39.0,
  "current_percent": 45.3,
  "current_videos": 60,
  "current_min_watch": 60,
  "current_max_watch": 60,
  "target_percent": 60.0
}
```

### 30分钟等待功能

每阶段训练后，等待30分钟让推荐算法生效：

```python
def wait_minutes(minutes):
    """等待指定分钟数，每分钟显示进度"""
    for i in range(minutes):
        remaining = minutes - i
        print(f"    剩余 {remaining} 分钟...")
        time.sleep(60)
```

### 动态参数调整规则

```python
def adjust_parameters(progress, last_percent, current_percent):
    """根据诊断结果动态调整参数"""
    improvement = current_percent - last_percent

    # 判断是否需要调整参数
    if improvement < 0 or improvement < 5.0:
        # 下降了或改进不足5%：增加视频数量和观看时长
        progress['current_videos'] += 25
        progress['current_min_watch'] += 30
        progress['current_max_watch'] += 30
        print(f"[动态调整] 参数已加强")
    else:
        print(f"[参数保持] 改进良好，参数不变")
```

## 阶段分析对比流程

### 自动分析算法

```python
def analyze_stage_improvement(prev_percent, current_percent):
    """分析阶段提升效果"""
    improvement = current_percent - prev_percent

    # 判断提升等级
    if improvement >= 10:
        level = "显著提升"
        next_action = "reduce_intensity"  # 降低强度
    elif improvement >= 5:
        level = "有效提升"
        next_action = "maintain"  # 保持强度
    elif improvement > 0:
        level = "轻微提升"
        next_action = "increase_intensity"  # 增强强度
    else:
        level = "无提升"
        next_action = "deep_watch_mode"  # 触发深度观看

    return {
        "improvement": improvement,
        "level": level,
        "next_action": next_action,
        "trigger_deep_mode": improvement <= 5
    }
```

### 深度观看模式逻辑

```python
def get_watch_time_config(base_time, is_deep_mode=False):
    """获取观看时长配置"""
    if is_deep_mode:
        # 深度观看模式：所有观看时长+1分钟
        return {
            "min": base_time["min"] + 60,
            "max": base_time["max"] + 60,
            "mode": "deep"
        }
    else:
        # 正常模式
        return {
            "min": base_time["min"],
            "max": base_time["max"],
            "mode": "normal"
        }
```

### 全自动模式执行流程

```python
def auto_train_loop():
    """全自动训练循环 - 直到达成60%目标"""

    goal = 60  # 目标占比
    max_stages = 20  # 最多20个阶段

    for stage in range(1, max_stages + 1):
        # 1. 诊断当前状态
        diagnosis = run_diagnosis()
        current_percent = diagnosis["avg_target_percent"]

        # 2. 检查是否达成目标
        if current_percent >= goal:
            print(f"🎉 训练完成！已达成目标 {current_percent}% >= {goal}%")
            break

        # 3. 分析上一阶段效果（除了第一阶段）
        if stage > 1:
            prev_diagnosis = load_previous_diagnosis()
            analysis = analyze_stage_improvement(
                prev_diagnosis["avg_target_percent"],
                current_percent
            )

            # 检查是否需要深度观看模式
            if analysis["trigger_deep_mode"]:
                print(f"⚠️ Stage {stage-1} 提升仅 {analysis['improvement']:.1f}%，触发深度观看模式")
                deep_mode = True
            else:
                deep_mode = False
        else:
            deep_mode = False

        # 4. 规划本阶段策略
        plan = generate_stage_plan(current_percent, goal, stage, deep_mode)

        # 5. 直接执行训练（无需用户确认）
        print(f"🚀 Stage {stage} 开始训练：{plan['videos']}个视频，观看时长{plan['watch_time']}秒")
        execute_training(plan)

        # 6. 继续下一阶段（自动循环）
        print(f"✅ Stage {stage} 完成！自动进入下一阶段...")
```

### 阶段对比报告模板

```markdown
## 📈 Stage N 效果报告

| 对比项 | AI/科技占比 | 变化 |
|--------|-------------|------|
| Stage {N-1} 后 | {prev_percent}% | - |
| Stage {N} 后 | {current_percent}% | {improvement:+.1f}% |

**效果评估**：{level}

**分析**：
- 提升幅度：{improvement:.1f}%
- 训练视频：{videos}个
- 点赞率：{like_rate:.1f}%

**下一阶段策略**：
- 视频数量：{next_videos}个
- 观看时长：{watch_time}秒
- 模式：{mode}
```

---

## 动态关键词匹配逻辑

### 支持自定义内容类型

当用户输入任何自定义内容类型时，算法驯化器能够自动生成相应的关键词和负面过滤器：

1. **用户输入处理**
   - 支持任何自定义内容类型（如："AI杂谈"、"编程教学"、"投资理财"等）
   - 自动生成相关的搜索关键词
   - 智能识别并排除无关内容

2. **关键词生成算法**
   - **基础词库扩展**：基于用户输入的核心概念，生成相关变体
   - **负面过滤**：自动识别并排除娱乐性质的内容
   - **动态配置**：实时生成 `search_keywords` 和 `negative_filters`

3. **配置示例**

对于用户输入 "AI杂谈"：

```json
{
  "target_interest": "AI杂谈",
  "keywords": [
    "AI讨论", "AI观点", "AI分析", "AI话题", "AI思考",
    "AI趋势", "AI行业", "AI发展", "AI未来", "AI伦理",
    "AI与社会", "AI与人类", "AI影响", "AI革命", "AI时代",
    "ChatGPT讨论", "Claude讨论", "大模型讨论", "AI杂谈"
  ],
  "search_keywords": [
    "AI讨论", "AI观点", "AI分析", "AI话题", "AI思考",
    "AI趋势分析", "AI行业分析", "AI未来发展"
  ],
  "negative_filters": [
    "AI教程", "AI教学", "AI课程", "AI入门", "AI基础",
    "AI配音", "AI配音秀", "AI游戏", "AI搞笑", "AI娱乐",
    "虚拟主播", "vtuber", "AI虚拟人", "AI动漫",
    "AI翻唱", "AI音乐", "AI歌曲", "Suno音乐"
  ]
}
```

4. **智能过滤机制**
   - **负面过滤词**：自动识别娱乐性质的内容并过滤
   - **非目标内容**：排除编程教程、技术实现等非讨论性质内容
   - **即时跳过**：当检测到非目标内容时立即重新搜索，不浪费时间

5. **关键词匹配策略**
   - **精准匹配**：优先选择高度相关的讨论类内容
   - **模糊排除**：通过负面过滤器排除不相关内容
   - **智能引导**：连续遇到不相关视频时自动切换关键词

---

## Claude 执行协议

### 启动时（重要）

**第一步：询问用户是继续还是重新开始**

```
欢迎使用算法驯化器！

请选择模式：

1️⃣ 继续之前的训练
   - 使用现有配置和进度
   - 继续未完成的训练计划

2️⃣ 重新开始
   - 重置所有配置
   - 重新选择平台和内容类型
```

**如果选择「继续」**：
- 加载现有的 `train_config.json`
- 读取 `train_progress.json` 显示当前进度
- 继续执行后续流程

**如果选择「重新开始」**：
1. **选择平台**
   ```
   请选择要训练的平台：

   1️⃣ B站（bilibili）
   2️⃣ 抖音
   3️⃣ 快手
   4️⃣ 小红书
   ```

2. **选择内容类型**
   ```
   请选择你想要驯化的内容类型：

   1️⃣ AI/科技（ChatGPT、Claude、大模型、编程等）
   2️⃣ 投资理财（股票、基金、财经等）
   3️⃣ 生活类（美食、旅游、宠物等）
   4️⃣ 知识类（科普、历史、文化等）
   5️⃣ 自定义（输入你想要的内容类型）
   ```

3. **选择训练模式（CRITICAL：必须执行）**
   ```
   请选择训练模式：

   1️⃣ 手动模式
      - Claude 分析诊断数据
      - Claude 提供训练建议
      - 每个阶段都需要用户确认后执行
      - 用户可以随时干预调整

   2️⃣ 全自动模式（重要：无需人工确认！）
      - Claude 自动执行完整训练流程
      - 包括：诊断 → 训练 → 分析 → 优化 → 再训练
      - 根据效果自动调整参数：
        * 每阶段视频数量（30-150个）
        * 观看时长（5-60秒）
        * 点赞/不感兴趣策略
      - 持续迭代直到达成目标（60%+）
      - 【重要】全自动模式下，Claude 自主决策，无需等待用户确认
   ```

4. **根据选择生成配置**
   - 清空 `train_progress.json`
   - 根据平台和内容类型生成 `train_config.json`
   - 将选择的模式保存到配置中（`mode: "manual"` 或 `mode: "auto"`）
   - 保存到 `diagnosis_history/baseline.json` 作为新基准

5. **根据模式执行**
   ```python
   # 伪代码
   def on_skill_start():
       # 询问用户
       choice = ask_user("继续 or 重新开始？")

       if choice == "继续":
           # 加载现有配置
           config = load_config()
           progress = load_progress()
           show_current_status()
       else:
           # 重新开始
           platform = ask_user("选择平台")
           content_type = ask_user("选择内容类型")
           config = generate_config(platform, content_type)
           reset_progress()
           save_config(config)

       # 继续后续流程
       run_diagnosis()

       # 根据模式执行
       if config["mode"] == "auto":
           # 全自动模式：无需用户确认，自动执行
           auto_train_loop(config)
       else:
           # 手动模式：需要用户确认
           analyze_and_plan()
   ```

### 全自动模式执行协议（CRITICAL）

```python
def auto_train_loop(config):
    """全自动训练循环 - 无需用户确认"""

    goal = 60  # 目标占比
    max_stages = 10  # 最多10个阶段

    for stage in range(1, max_stages + 1):
        # 1. 诊断当前状态
        diagnosis = run_diagnosis()
        current_percent = diagnosis["avg_target_percent"]

        # 2. 检查是否达成目标
        if current_percent >= goal:
            print(f"🎉 训练完成！已达成目标 {current_percent}% >= {goal}%")
            break

        # 3. 分析效果，自动调整策略
        plan = analyze_and_auto_plan(diagnosis, stage)

        # 4. 直接执行训练（无需确认）
        print(f"🚀 Stage {stage} 开始训练：{plan['videos']}个视频")
        execute_training(plan)

        # 5. 继续下一阶段
```

### 全自动模式参数调整规则

```python
def analyze_and_auto_plan(diagnosis, stage):
    """全自动模式：根据效果自动调整参数"""

    current_percent = diagnosis["avg_target_percent"]
    gap = 60 - current_percent

    # 获取上一阶段效果
    if stage > 1:
        prev_diagnosis = load_previous_diagnosis()
        improvement = current_percent - prev_diagnosis["avg_target_percent"]
    else:
        improvement = None

    # 根据提升效果动态调整
    if improvement is None:
        # 第一阶段：根据差距决定
        if gap > 30:
            videos = 80
            watch_time = [10, 20]
        elif gap > 15:
            videos = 60
            watch_time = [10, 15]
        else:
            videos = 40
            watch_time = [5, 10]

    elif improvement >= 10:
        # 效果显著：可以稍微减少量，保持观看时长
        videos = max(30, int(videos * 0.8))
        watch_time = [10, 20]

    elif improvement >= 5:
        # 效果良好：保持当前强度
        videos = videos  # 不变
        watch_time = [10, 15]

    elif improvement > 0:
        # 效果轻微：加大视频数量和观看时长
        videos = min(150, int(videos * 1.2))
        watch_time = [15, 25]

    else:
        # 效果不明显：大幅加大力度
        videos = min(150, int(videos * 1.5))
        watch_time = [20, 30]
        # 加强不感兴趣策略
        dislike_strategy = "aggressive"

    return {
        "videos": videos,
        "watch_time": watch_time,
        "like_rate": 0.8,  # 80%的目标视频点赞
        "dislike_rate": 0.9,  # 90%的非目标视频不感兴趣
    }
```

### 配置生成规则

**重要更新**：每个内容类型都需要生成专用的 `scoring_prompt`，以确保豆包API准确判断内容相关性。

```python
# 评分提示词模板（超简化版，让大模型凭直觉判断）
SCORING_PROMPTS = {
    "AI/科技": "这个视频是讲人工智能AI/科技的吗？（0-10分）\n\n标题：{title}\n\n凭直觉打分，只回复数字。",
    "投资理财": "这个视频是讲投资理财的吗？（0-10分）\n\n标题：{title}\n\n凭直觉打分，只回复数字。",
    "生活": "这个视频是讲生活类内容（美食、旅游、宠物、家居、穿搭等）的吗？（0-10分）\n\n标题：{title}\n\n凭直觉打分，只回复数字。",
    "知识": "这个视频是讲知识类内容（科普、历史、文化等）的吗？（0-10分）\n\n标题：{title}\n\n凭直觉打分，只回复数字。",
    # 其他类型通用格式
}

# 平台配置
PLATFORM_CONFIG = {
    "bilibili": {
        "url": "https://www.bilibili.com",
        "search_url": "https://search.bilibili.com/all?keyword={keyword}",
        "login_check": "SESSDATA"
    },
    "douyin": {
        "url": "https://www.douyin.com",
        "search_url": "https://www.douyin.com/search/{keyword}",
        "login_check": "sessionid"
    }
}

# 内容类型配置
CONTENT_CONFIG = {
    "AI/科技": {
        "keywords": [
            "ChatGPT教程", "Claude使用", "大模型实战",
            "Prompt工程", "ComfyUI工作流", "Stable Diffusion教程",
            "AI绘画教程", "AI Agent开发", "RAG应用"
        ],
        "negative_filters": [
            "AI杂谈", "AI对话", "AI聊天", "AI配音", "AI配音秀",
            "AI游戏", "AI搞笑", "AI娱乐", "AI玩梗",
            "虚拟主播", "vtuber", "AI虚拟人"
        ]
    },
    "投资理财": {
        "keywords": [
            "A股分析", "股票技术分析", "K线教学",
            "财报解读", "基金定投", "ETF投资"
        ],
        "negative_filters": [
            "荐股", "带单", "大师", "内幕", "涨停板"
        ]
    },
    "生活": {
        "keywords": [
            "美食教程", "旅游攻略", "宠物护理",
            "家居装修", "穿搭技巧", "生活Vlog"
        ],
        "negative_filters": [
            "带货", "广告", "推广", "营销"
        ]
    }
}

def generate_config(platform, content_type):
    """根据用户选择生成配置"""
    config = {
        "platform": platform,
        "target_interest": content_type,
        **PLATFORM_CONFIG[platform],
        **CONTENT_CONFIG[content_type],
        "videos_per_stage": 60,
        "total_stages": 7,
        "rest_interval": 20,
        "rest_duration": [3, 5]
    }

    # 添加评分提示词（匹配内容类型）
    if content_type in SCORING_PROMPTS:
        config["scoring_prompt"] = SCORING_PROMPTS[content_type]
    else:
        # 自定义类型：生成通用评分提示词
        config["scoring_prompt"] = generate_custom_prompt(content_type)

    return config

def generate_custom_prompt(content_type):
    """为自定义内容类型生成评分提示词（超简化版）"""
    return f"这个视频是讲{content_type}的吗？（0-10分）\n\n标题：{{title}}\n\n凭直觉打分，只回复数字。"
```

### 分析规划逻辑

```python
# 伪代码
def analyze_and_plan(diagnosis_data):
    # 1. 提取目标内容占比
    target_percent = diagnosis_data["categories"]["AI/科技"]["percent"]

    # 2. 设定目标（默认 60%，可调整）
    goal = 60

    # 3. 计算差距
    gap = goal - target_percent

    # 4. 根据差距规划训练量
    if gap > 30:
        stage_videos = 80
        estimated_stages = 5-7
        intensity = "高强度"
    elif gap > 15:
        stage_videos = 60
        estimated_stages = 3-5
        intensity = "中等强度"
    else:
        stage_videos = 40
        estimated_stages = 2-3
        intensity = "轻度"

    # 5. 生成计划
    return {
        "current": target_percent,
        "goal": goal,
        "gap": gap,
        "stage_videos": stage_videos,
        "intensity": intensity,
        "estimated_stages": estimated_stages
    }
```

### 效果评估逻辑

```python
# 伪代码
def evaluate_effect(before, after):
    improvement = after - before

    if improvement >= 10:
        effect = "显著提升"
        next_stage_adjust = 0.8  # 可以稍微减少下一阶段量
    elif improvement >= 5:
        effect = "有效提升"
        next_stage_adjust = 1.0  # 保持当前强度
    elif improvement > 0:
        effect = "轻微提升"
        next_stage_adjust = 1.2  # 需要加大力度
    else:
        effect = "效果不明显"
        next_stage_adjust = 1.5  # 大幅加大力度

    return effect, next_stage_adjust
```

---

## 交互示例

### 示例1：首次使用

```
用户：/algorithm-tamer

Claude：欢迎使用算法驯化器！

首先，我需要分析你当前的 B站 推荐状态。

正在诊断...

[运行 diagnose.py]

---

## 📊 诊断报告

| 内容类型 | 占比 |
|----------|------|
| 游戏 | 40% |
| AI/科技 | 20% |
| 娱乐 | 25% |
| 其他 | 15% |

**当前状态**：AI/科技 内容只占 20%

---

## 🎯 训练计划

基于分析，我制定以下计划：

| 项目 | 数值 |
|------|------|
| 目标 | AI/科技 60%+ |
| 当前差距 | 40% |
| 训练强度 | 高强度 |
| 第一阶段 | 80 个视频 |
| 预计阶段 | 5-7 个 |

**策略**：
- 遇到 AI/科技 内容：观看 + 点赞
- 遇到游戏/娱乐：快速划过 + 不感兴趣

是否开始 Stage 1 训练？
- 开始训练
- 调整数量
- 暂不执行

---
用户：调整数量

Claude：Stage 1 你想训练多少个视频？
- 40个视频（轻度训练）
- 60个视频（中等强度）
- 80个视频（高强度，推荐）
- 100个视频（超高强度）
- 其他（自定义数量）

---
用户：60个视频

Claude：好的，Stage 1 调整为 60 个视频。开始训练吗？
- 开始训练
- 暂不执行

---
用户：开始训练

Claude：开始 Stage 1 训练（60个视频）...

[运行 train_stage.py，参数 videos=60]

...训练过程...

Stage 1 完成！

正在重新诊断...

[运行 diagnose.py]

---

## 📈 效果报告

| 对比 | AI/科技 | 变化 |
|------|---------|------|
| 训练前 | 20% | - |
| 训练后 | 32% | +12% ⬆️ |

```
训练前: ████░░░░░░░░░░░░░░░░ 20%
现在:   ██████░░░░░░░░░░░░░░ 32%
目标:   ████████████░░░░░░░░ 60%
```

**效果评估**：显著提升！

---

## 📋 下一阶段计划

| 项目 | 数值 |
|------|------|
| 剩余差距 | 28% |
| 下一阶段 | 60 个视频 |
| 预计还需 | 3-4 个阶段 |

继续 Stage 2 吗？
```

### 示例2：效果不好时调整

```
Claude：Stage 2 完成！

## 效果报告

| 对比 | AI/科技 | 变化 |
|------|---------|------|
| Stage 1 后 | 32% | - |
| Stage 2 后 | 34% | +2% |

**效果评估**：提升较慢

**分析**：可能是"不感兴趣"按钮点击不够，算法还在推游戏内容

**调整策略**：
- 下一阶段增加到 100 个视频
- 加大"不感兴趣"操作力度

继续调整后的 Stage 3 吗？
```

---

## 训练脚本设计

### train_stage.py

**主要训练脚本 - 实时预评分模式 (v3.2)**

接受参数：
- `--videos N`：本阶段刷多少个视频（默认60）

```bash
# Claude 调用示例
python train_stage.py --videos 80
python train_stage.py --videos 60
```

**核心特性：实时预评分 + 收藏功能**

工作流程：
1. 搜索关键词进入第一个视频
2. 获取右侧推荐列表第一个视频
3. 调用豆包API预评分（只评这一个）
4. 点击播放该视频
5. 根据预评分执行操作：
   - 高分（>=8）：先点赞 → 等2秒 → 收藏 → 播放60秒
   - 中分（5-8）：先点赞 → 播放60秒
   - 低分（<5）：播放2秒后跳过
6. 播放完成后，再次获取右侧第一个视频
7. 循环：预评分 → 播放 → 预评分 → 播放

**预评分逻辑：**
- 豆包API实时评分：仅对右侧第一个推荐视频进行预评分
- 预评分决定当前视频的播放操作（点赞、收藏、播放时长）

**操作顺序（重要）：**
- 高分视频：进入视频 → 立即点赞 → 等2秒 → 立即收藏 → 播放60秒
- 中分视频：进入视频 → 立即点赞 → 播放60秒
- 低分视频：进入视频 → 播放2秒 → 跳过

**收藏功能（已测试验证）：**
1. 点击收藏按钮（五角星）
2. 选择默认收藏夹（第二个label）
3. 点击确定按钮

---

## 文件结构

```
algorithm-tamer/
├── SKILL.md
├── diagnose.py              # 诊断脚本
├── train_stage.py           # 训练脚本（接受 --videos 参数）
├── auto_loop_train.py       # 全自动循环训练脚本（新）
├── train_progress.json      # 当前进度
├── loop_progress.json       # 全自动循环训练进度（新）
├── diagnosis_data.json      # 最新诊断
└── diagnosis_history/
    ├── baseline.json        # 训练前基准
    ├── stage_1.json         # 第1阶段后
    └── stage_2.json         # 第2阶段后
```

---

## 核心原则

1. **启动必问** - 每次启动都问用户是继续还是重新开始
2. **模式选择必执行** - 选择内容类型后，必须询问用户选择训练模式（手动/全自动）
3. **按需配置** - 根据用户选择（平台+内容类型）动态生成配置
4. **Claude 做决策** - 训练量、策略都由 Claude 根据数据分析决定
5. **动态调整** - 每阶段后重新评估，调整下一阶段策略
6. **手动模式需确认** - 手动模式下，每个阶段前都等用户确认
7. **全自动模式无需确认** - 全自动模式下，Claude 自主决策并执行，无需等待用户确认
8. **真实数据** - 所有报告基于实际诊断数据，不编造
9. **阶段分析对比** - 每个阶段完成后必须进行效果分析，对比上一阶段数据，评估提升效果
10. **深度观看模式** - 当阶段提升<=5%时，自动触发深度观看模式（观看时长+1分钟）
11. **全自动到60%** - 在达成60%目标前，全自动模式完全自动化，无需用户任何操作
12. **30分钟等待** - 每阶段训练后等待30分钟让推荐算法生效，然后再进行诊断
13. **动态参数调整** - 当改进<5%或下降时，自动增加视频数量+25个、观看时长+30秒

---

## 更新日志

- v3.2.0 (2026-01-24)
  - **重大新增**：全自动循环训练脚本（auto_loop_train.py）
  - **30分钟等待**：每阶段训练后等待30分钟让推荐算法生效
  - **动态参数调整**：
    * 改进 < 5% 或下降 → 视频数量+25个，观看时长+30秒
    * 改进 >= 5% → 保持参数不变
  - **进度保存**：loop_progress.json 保存完整的训练历史
  - **全自动到60%**：无需用户干预，自动循环直到达到60%目标

- v3.1.0 (2026-01-18)
  - **重大新增**：训练模式选择（手动/全自动）
  - **手动模式**：每阶段需要用户确认，可随时干预
  - **全自动模式**：Claude 自动执行完整流程，自主调整参数，无需人工确认
  - 新增：全自动模式参数自适应算法
    * 根据训练效果自动调整视频数量（30-150个）
    * 根据训练效果自动调整观看时长（5-30秒）
    * 根据训练效果自动调整点赞/不感兴趣策略
  - 优化：配置文件增加 `mode` 字段（"manual" 或 "auto"）

- v3.0.0 (2026-01-17)
  - **重大改动**：AI与编程分类分离，专注于纯AI技术内容
  - 新增：`search_keywords` 配置（使用具体技术词，避免娱乐内容）
  - 新增：`negative_filters` 配置（过滤娱乐性质的AI内容）
  - 优化：分类逻辑升级，区分 AI、编程、科技三个类别
  - 优化：诊断脚本循环3次抓取，计算平均占比

- v2.1.0 (2026-01-17)
  - 核心改动：训练量不再固定，由 Claude 根据分析动态规划
  - 新增：智能规划算法（根据差距决定训练强度）
  - 新增：效果评估 + 动态调整策略
  - 优化：更清晰的分析报告
