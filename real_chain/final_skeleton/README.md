# 真实链路成片骨架

本目录由 scripts/build_final_skeleton_videos.mjs 生成。

## 输出

- final_douyin_9x16_real_chain_skeleton.mp4
- final_bilibili_16x9_real_chain_skeleton.mp4
- subtitles_60s_real_chain.srt
- voiceover_timing_60s.json

## 替换规则

脚本会优先读取 real_chain/user_recordings/ 下的真人和 Screen Studio 录屏素材。如果这些文件不存在，就使用真实链路截图和流程占位视频生成预览版。

你录完素材后，按 REAL_CHAIN_RECORDING_HANDOFF.md 的命名放入 user_recordings，再运行：

```bash
node scripts/build_final_skeleton_videos.mjs
```

## 当前媒体选择

```json
{
  "talking": null,
  "image2": null,
  "withSkill": "/Users/rk/Documents/Codex/2026-06-19/ai-image2-ui-code-restorer-image2/outputs/image2-ui-code-restorer-github-kit/real_chain/recordings/skill_restoration_process_real_chain.mp4",
  "noSkill": "/Users/rk/Documents/Codex/2026-06-19/ai-image2-ui-code-restorer-image2/outputs/image2-ui-code-restorer-github-kit/real_chain/recordings/no_skill_restoration_process_real_chain.mp4"
}
```
