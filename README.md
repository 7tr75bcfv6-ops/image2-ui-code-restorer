# image2-ui-code-restorer（AI 前端还原技能）

用于把 Image2 生成的设计稿，快速还原为可直接落地的前端实现（页面结构、样式与交互骨架）。

本仓库目标：

- 帮你快速验证“AI 图片 → 可运行前端 UI”的工作流
- 提供完整演示脚本（抖音/B站都可复用）
- 给出常见问题与参数建议，降低新手首次上手门槛

## 已生成成品（本地可直接打开）

- 抖音竖版测试视频：`final_douyin_60s_ai_voice.mp4`（1080×1920，60.02s）
- B站横版测试视频：`final_bilibili_60s_ai_voice.mp4`（1920×1080，60.02s）
- AI 临时旁白：`audio/narration_ai_v1.wav`
- 抖音封面：`assets/covers/cover_douyin_9x16.png`
- B站封面：`assets/covers/cover_bilibili_16x9.png`
- Image2 风格参考图与还原对比：`assets/source/compare/`
- 技能源码镜像：`skill/image2-ui-code-restorer/`

## 仓库结构

- `README.md`：项目说明与快速使用
- `docs/tutorial_zh.md`：详细中文教程（安装、参数、排错、案例）
- `docs/video_script.md`：第一条视频（60s）脚本与 B 站扩展稿
- `docs/launch_checklist.md`：抖音/B站矩阵落地清单
- `assets/cover_prompt.md`：Image2 首页封面提示词与素材规范
- `examples/`：示例输入/输出对比素材放置目录（发布时替换你的真实作品）
- `hyperframes/`：抖音/B站两个可渲染视频工程
- `scripts/build_release_assets.mjs`：本地资产与视频工程生成脚本
- `skill/image2-ui-code-restorer/`：本次演示使用的 Codex 技能源码

## 一句话介绍（可直接放简介）

`从Image2出图到前端落地，像搭积木一样快：一键还原、结构清晰、可继续手工精修。`

## 快速开始（按你的实际环境微调）

> 说明：以下是通用流程示意。请将命令与参数名替换为你本地/插件真实入口。

1. 准备一张高质量 UI 截图（建议 1080px 以上宽度）
2. 打开 `image2-ui-code-restorer` 插件
3. 选择输入图片并开始分析
4. 等待识别结果并生成代码
5. 下载产物后本地启动预览，补齐细节

## 本地重新生成素材与视频

```bash
node scripts/build_release_assets.mjs

cd hyperframes/ep01-douyin
npx hyperframes lint
npx hyperframes inspect --samples 8
npx hyperframes render --quality draft --output ../../final_douyin_60s_ai_voice.mp4

cd ../ep01-bilibili
npx hyperframes lint
npx hyperframes inspect --samples 8
npx hyperframes render --quality draft --output ../../final_bilibili_60s_ai_voice.mp4
```

说明：当前音频是 macOS 中文系统语音生成的 AI 临时旁白；你录制本人声音样本后，将 `audio/narration_ai_v1.wav` 替换为克隆后的最终音色即可。

## 运行环境建议

- Python 3.10+ 或 Node.js 18+（取决于你的实际发行方式）
- 至少 8GB 内存，浏览器环境下建议 Chrome/Edge 最新版
- 推荐分辨率：16:9 或 9:16（便于短视频封面/对比）

## 指标目标（建议）

- 60秒片首 2 秒后留存率明显高于无价值内容
- 抖音完播率目标：`>=10%`
- B站 30s 留存率明显高于历史内容基线
- 评论区出现“教程”关键词占比：`>= 3%`

## 与本项目相关的关键文件

- `docs/tutorial_zh.md`：把这个当“固定教程页”更新
- `docs/video_script.md`：第一次发布脚本，后续只改镜头号与文案数字即可
- `assets/cover_prompt.md`：封面统一风格，减少封面改稿成本

## GitHub 发布建议（1小时内可完成）

1. 在 GitHub 建立个人仓库：`image2-ui-code-restorer`
2. 初始化并提交本目录内容
3. 在 `README.md` 固定第一条置顶教程链接
4. 建议创建 `v0.1-demo` 标签（含 30s 预览图 + 3 张对比图）

本目录已经包含技能源码、教程、封面、视频成品、HyperFrames 工程和可复现生成脚本，可以作为首发仓库直接发布。

## 参考用语（可直接用于视频结尾）

- `关注我，下期我讲“怎么避免 AI 还原后布局偏差”`
- `评论“教程”，私信我把完整参数和素材模板发你`
- `你也可以先把这套参数试一遍：先高对比度 + 快速对齐，再做精修`
