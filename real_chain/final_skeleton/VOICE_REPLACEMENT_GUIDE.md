# 口播音频替换说明

当前工程已经具备字幕、口播脚本和时间轴。临时 AI 口播的本地 TTS 依赖已经安装到 Codex 隔离 Python 运行时，但中文 voice data 下载两次超时，所以本目录暂时不提交空音频。等网络稳定后，可以直接按下面命令重试。

## 临时 AI 口播生成命令

```bash
export PATH="/Users/rk/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin:$PATH"
npx hyperframes tts docs/ai_voice_script_60s_plain.txt \
  --voice zf_xiaobei \
  --output real_chain/final_skeleton/ai_voiceover_placeholder_zh.wav \
  --speed 1.12
ffmpeg -y \
  -i real_chain/final_skeleton/ai_voiceover_placeholder_zh.wav \
  -c:a aac \
  -b:a 160k \
  real_chain/final_skeleton/ai_voiceover_placeholder_zh.m4a
```

预期输出：

- `ai_voiceover_placeholder_zh.wav`
- `ai_voiceover_placeholder_zh.m4a`

如果你的剪辑软件支持 `m4a`，优先用 `m4a`；如果要继续做声音处理，用 `wav`。

## 真人音色克隆需要你补充

建议录制：

- 2 到 5 分钟普通中文口播
- 安静环境
- 不要开背景音乐
- 语速接近你希望视频里的语速
- 读自然一点，不用播音腔

建议文件名：

- `real_chain/user_recordings/voice_clone_sample_raw.wav`
- 或 `real_chain/user_recordings/voice_clone_sample_raw.m4a`

## 替换流程

1. 用当前骨架视频和字幕确认视频节奏。
2. 你录制真人音色样本。
3. 用 HeyGen、ElevenLabs、CapCut、剪映或其他克隆工具生成新的口播。
4. 导出文件命名为 `voiceover_cloned_60s.wav`。
5. 放入 `real_chain/user_recordings/voiceover_cloned_60s.wav`。
6. 在最终剪辑里用克隆音频替换临时音频。

## 配音节奏要求

- 总时长控制在 58 到 62 秒。
- 第 0 到 5 秒必须读出核心对比钩子。
- 第 22 到 39 秒是技能版重点，语气要更稳。
- 第 56 到 60 秒 CTA 要清楚读出“评论教程”。

## 当前状态

- 本地 TTS 依赖：已安装到 Codex 隔离 Python 运行时
- 使用声音：`zf_xiaobei`
- 输入脚本：`docs/ai_voice_script_60s_plain.txt`
- 失败原因：中文 voice data 下载两次网络超时
- 处理方式：不提交空音频，等网络稳定后重试上方命令
