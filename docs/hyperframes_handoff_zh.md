# HyperFrames / HeyGen 剪辑交接说明

## 当前可用素材

- 竖屏骨架：`real_chain/final_skeleton/final_douyin_9x16_real_chain_skeleton.mp4`
- 横屏骨架：`real_chain/final_skeleton/final_bilibili_16x9_real_chain_skeleton.mp4`
- 字幕：`real_chain/final_skeleton/subtitles_60s_real_chain.srt`
- 时间轴：`real_chain/final_skeleton/voiceover_timing_60s.json`
- 原型图：`real_chain/assets/image2_real_prototype.png`
- 技能版结果：`real_chain/screenshots/with_skill_restoration.png`
- 普通版结果：`real_chain/screenshots/no_skill_restoration.png`

## 推荐剪辑流程

1. 先导入骨架视频。
2. 导入 `subtitles_60s_real_chain.srt`。
3. 导入临时 AI 口播，确认字幕节奏。
4. 你补录 Screen Studio 后，按文件名替换对应片段。
5. 你补录真人出镜后，替换开头钩子、结尾 CTA 或画中画。
6. 你完成音色克隆后，替换临时 AI 口播。

## HyperFrames 中的轨道建议

- Track 0：主画面视频
- Track 1：真人画中画
- Track 2：字幕
- Track 3：重点词高亮
- Track 4：箭头、框选、对比标签
- Track 5：口播音频
- Track 6：轻背景音乐

## HeyGen 中的处理建议

- 用真人讲解素材做 Avatar 或 talking head 片段。
- 不建议整条都用数字人，容易降低真实感。
- 开头 0 到 5 秒用真人或真人头像，后面以录屏为主。
- 声音先用临时 AI 口播卡节奏，等真人音色样本完成后再替换。

## 最终导出建议

抖音：

- 分辨率：`1080 x 1920`
- 时长：`60s`
- 字幕：大、底部偏上、安全区内
- 封面：突出“图片变前端”

B站：

- 分辨率：`1920 x 1080`
- 时长：`60s` 或 `90s`
- 字幕：底部，不遮挡代码和截图
- 封面：突出“真实链路演示”

