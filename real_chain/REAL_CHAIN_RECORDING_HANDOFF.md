# 真实链路录屏交接说明

这份说明用于接上你手动录制的 Screen Studio 素材。当前包里已经有真实 AI 生图原型、带 `image2-ui-code-restorer` 技能还原结果、不调用技能的对照结果，以及可用于临时剪辑的流程视频。

## 你现在要录的核心原型图

- 原型图：`real_chain/assets/image2_real_prototype.png`
- 尺寸：`1672 x 941`
- 画面主题：中文 SaaS 仪表盘，标题为 `AI工作流自动化控制台`
- 用途：作为 Image2 生成图、还原输入图、封面局部放大图、对比画面左侧参考图

## 已经由 Codex 完成的真实链路素材

- `real_chain/assets/image2_real_prototype.png`
- `real_chain/analysis/image2_real_prototype_analysis.json`
- `real_chain/with_skill_restoration/index.html`
- `real_chain/with_skill_restoration/run_log.md`
- `real_chain/no_skill_restoration/index.html`
- `real_chain/no_skill_restoration/run_log.md`
- `real_chain/screenshots/with_skill_restoration.png`
- `real_chain/screenshots/no_skill_restoration.png`
- `real_chain/recordings/skill_restoration_process_real_chain.mp4`
- `real_chain/recordings/no_skill_restoration_process_real_chain.mp4`

说明：`recordings/` 里的两段视频是 Codex 根据真实链路素材生成的流程说明片，可以作为剪辑占位或 B-roll。你要补录的 Screen Studio 素材会更真实，更适合首发版本。

## 请你补录并放回的文件名

把录好的视频放到：

`real_chain/user_recordings/`

建议文件名如下：

- `01_image2_prompt_to_prototype_screenstudio.mp4`
- `02_with_skill_codex_restore_screenstudio_fast.mp4`
- `03_no_skill_codex_restore_screenstudio_fast.mp4`
- `04_talking_head_raw.mp4`
- `05_talking_head_clean_cut.mp4`

其中 `04` 或 `05` 是你真人出镜讲解素材；如果你只录一条，优先用 `04_talking_head_raw.mp4`。

## 推荐录屏节奏

`01_image2_prompt_to_prototype_screenstudio.mp4`

- 录制内容：展示生图提示词、等待生成、出现原型图。
- 原始录制建议：30 到 90 秒。
- 剪辑后建议：5 到 8 秒。
- 加速建议：等待过程 600% 到 1200%，生成结果停留 1 秒。

`02_with_skill_codex_restore_screenstudio_fast.mp4`

- 录制内容：展示把 `image2_real_prototype.png` 交给 Codex，触发 `image2-ui-code-restorer`，分析尺寸/配色/模块，生成代码，打开结果页。
- 原始录制建议：2 到 6 分钟。
- 剪辑后建议：12 到 18 秒。
- 加速建议：命令/代码滚动 800% 到 1600%，关键截图对比处恢复 100%。

`03_no_skill_codex_restore_screenstudio_fast.mp4`

- 录制内容：展示不调用技能，只让 Codex 根据图直接还原，保留开始和最终结果。
- 原始录制建议：1 到 4 分钟。
- 剪辑后建议：5 到 7 秒。
- 加速建议：中间过程直接跳切或 1600% 加速。

`04_talking_head_raw.mp4`

- 录制内容：你本人看镜头讲解，也可以无声录，后面用 AI 声音/克隆声音对齐。
- 原始录制建议：60 到 90 秒。
- 剪辑后建议：穿插 3 到 5 个短镜头，每个 1 到 4 秒。

## 竖屏和横屏裁切注意

- 先录屏幕素材时优先录 `16:9`，后续裁切成 `9:16`。
- 鼠标移动要慢一点，方便后期加速后仍能看懂。
- 带技能版本的关键画面必须保留：输入图、技能名、分析步骤、生成代码、最终页面。
- 不带技能版本只保留开始和结尾，观众只需要看到差异。

## 交给 HyperFrames / HeyGen 的素材顺序

1. 真人出镜钩子
2. 原型图大图
3. 带技能流程录屏
4. 带技能最终还原页
5. 不带技能流程开始/结尾
6. 左右对比画面
7. GitHub/教程/私信 CTA

## 最终验收标准

- 60 秒内能看懂：图片输入、技能还原、普通还原对比、怎么拿教程。
- 抖音版首屏 2 秒内出现结果对比。
- B 站版保留更多流程细节，但不要超过 90 秒。
- 结尾必须出现关键词：`评论 教程`、`私信领取完整流程`、`GitHub 示例已放出`。

