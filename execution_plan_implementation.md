# Implementation Execution Plan v1 (已按“目标模式”落地)

## 目标
把 `image2-ui-code-restorer` 系列内容一次性从“口播+素材+配音+上架”跑通：
1) 定位并确认技能与调用入口
2) 拍两段测试素材（插件流程 / 无插件对比）
3) 生成超细分镜（抖音 + B站）
4) AI 配音先行，再切换为你的克隆音色
5) 生成 GitHub 说明文档结构与发布资产

## 你现在的真实技能位置（已确认）

- 技能主目录：`/Users/rk/.codex/skills/image2-ui-code-restorer`
- 分析脚本：`/Users/rk/.codex/skills/image2-ui-code-restorer/scripts/analyze_references.py`
- 使用说明：`/Users/rk/.codex/skills/image2-ui-code-restorer/SKILL.md`

## 执行清单（按顺序）

1. **素材准备（当天）**
   - 根据 `image2/image2_prompts_cn.md` 生成 2 张测试图
   - 按照 `image2-ui-code-restorer` 的输入规范保存到 `outputs` 中

2. **录制 2 段测试视频（当天）**
   - 段1：有插件还原全过程（Image2 输入->还原->预览）
   - 段2：无插件对照段（起点+终点+中间跳过）
   - 命名：
     - `assets/source/recordings/05_restorer_preview_*.mp4`
     - `assets/source/recordings/06_manual_compare_*.mp4`

3. **超细分镜输出（今天）**
   - 抖音：`storyboards/hyperframes_douyin_9x16.json`
   - B站：`storyboards/hyperframes_bilibili_16x9.json`
   - 每条包含：时间码、素材源、快放参数、字幕轨、音效点

4. **AI口播与配音（今天）**
   - 先用 `audio/tts_voice_script_60s.json` 生成 AI 版本
   - 再用真实录音做克隆，替换为你目标音色
   - 建议命名：`narration_v1_ai.wav` -> `narration_v2_cloned.wav`

5. **HyperFrames 合成（当天）**
   - 在 HyperFrames 中创建两套项目：
     - 抖音项目：`i2ucr-ep01-douyin`
     - B站项目：`i2ucr-ep01-bilibili`
   - 导入对应分镜与音频
   - 预览校正后导出 `final_douyin_60s.mp4`、`final_bilibili_60s.mp4`

6. **GitHub 上传（明日）**
   - 使用 `github_upload_commands.md` 上传目录：
     - `README.md`
     - `docs/*`
     - `storyboards/*`
     - `audio/*`
     - `image2/*`
     - `studio/*`

## 关键落地约束

- 两种视频必须只换素材比例（9:16 和 16:9），口播与内容逻辑不变
- 所有口播文本只允许保留 1 套 CTA 关键词：`教程`
- 无插件对比段只允许出现一次“起点-终点”镜头对照
- 无插件段必须显式标注为 `manual`，避免被误认为插件自动完成

## 输出文件映射（你可以直接提交）

- 分镜：`storyboards/hyperframes_douyin_9x16.json`
- 分镜：`storyboards/hyperframes_bilibili_16x9.json`
- 口播：`audio/tts_voice_script_60s.json`
- 录制手册：`studio/recording_runbook.md`
- Image2 提示词：`image2/image2_prompts_cn.md`

## 现在能直接执行的下一步（给你最短流程）

1. 按 `studio/recording_runbook.md` 拍 2 段原素材
2. 用 `audio/tts_voice_script_60s.json` 直接合成第一版
3. 把音频替换为你克隆后的版本
4. 用分镜 JSON 一键映射到两套项目
5. 渲染后发抖音与 B站
