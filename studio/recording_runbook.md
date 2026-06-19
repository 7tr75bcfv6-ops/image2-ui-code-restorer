# 录制与工作流执行清单（含两段测试视频）

## 1) 技能路径（你可以直接复制给自己）

- 技能源码：`/Users/rk/.codex/skills/image2-ui-code-restorer`
- 分析脚本：`/Users/rk/.codex/skills/image2-ui-code-restorer/scripts/analyze_references.py`
- GitHub 上线说明模板：本目录 `github-upload` 相关文件

## 2) 两段测试视频（必须先拍）

### 测试段 A（有插件）— 60 秒主素材组
- `assets/source/recordings/04_restorer_start*.mp4`
- `assets/source/recordings/05_restorer_preview*.mp4`
- 核心：从导入图片到生成代码再到预览的全过程

### 测试段 B（无插件对比）— 同素材无插件流程
- `assets/source/recordings/06_manual_compare*.mp4`
- 仅保留“开头-操作起点”和“末尾-结果完成”，中间内容允许跳过（时间码补齐）

## 3) Screen Studio 录制执行动作（目标模式）

1. 新建项目：`i2ucr-ep01`
2. 预录场景顺序：
   - 片头钩子（5s）
   - 痛点阐述（8s）
   - Image2 生图（10.5s）
   - 插件启动（10.2s）
   - 生成结果（8.4s）
   - 无插件对比（8.6s）
   - CTA（11s）
3. 录制统一规范：
   - 1080p 以上输出，后期可裁切 16:9 / 9:16
   - 声音轨单独录制，先用系统音 + 麦克风同步
   - 视频轨 `track:0`，字幕文本放在 HyperFrames 侧边文本轨
4. 完成后导出两段 `mp4`
   - `ep01_clip_raw_full.mp4`
   - `ep01_clip_manual_raw.mp4`

## 4) Image2 还原演示步骤（你可同步边录边讲）

1. 在 Image2 输出图（`1920x1080`）
2. 把参考图放入 `image2-ui-code-restorer`
3. 用参数：`fast / pixel-accurate / fine`
4. 点开始还原（等待完成）
5. 导出前端代码
6. 本地启动预览（若为独立 HTML，用本地服务打开）
7. 与手工版切到同分辨率对比

## 5) 无插件对比段补拍

- 先手工搭建到 40% 左右，再中间加速到 70% 之后停留在完成态
- 剪辑时建议 6x 加速，控制总片长
- 对比片段建议添加左下角文字 `无插件`，右下角文字 `image2-ui-code-restorer`

## 6) AI 口播克隆与最终替换流程（目标）

1. 先用 AI 口播跑第一版（见 `audio/tts_voice_script_60s.json`）
2. 录制“真人口播样本”（45s-75s）
3. 建立克隆音色（HeyGen 或你使用的配音系统）
4. 用同一文本重生成 AI 口播
5. 对照真人停顿/重音，重新导出最终版本
6. 在 HyperFrames 里替换音频文件：
   - 原始 AI 口播：`narration_ai_v1.wav`
   - 克隆替换：`narration_ai_voice_v2.wav`
   - 真人校正后：`narration_final.wav`

## 7) 完工验收（每条都要过）

- 60 秒内完整信息点齐全（痛点-演示-对比-引导）
- 抖音封面支持 9:16，B站支持 16:9
- 关注动作与评论口令统一（`教程`）
- 文本、音频、字幕 0:56 前后出现一次 CTA 强提示
