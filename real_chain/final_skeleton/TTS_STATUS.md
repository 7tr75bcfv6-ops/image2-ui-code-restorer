# TTS 状态记录

## 已完成

- 已安装 HyperFrames TTS 所需 Python 依赖到 Codex 隔离运行时：
  - `kokoro-onnx`
  - `soundfile`
  - `onnxruntime`
  - `phonemizer-fork`
- 已确认 HyperFrames 有中文声音：
  - `zf_xiaobei`

## 未完成

中文 voice data 下载两次超时，因此没有生成可用临时口播音频。

错误信息：

```text
Speech synthesis failed: connect ETIMEDOUT 20.205.243.166:443
```

## 重试命令

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

## 剪辑影响

不影响当前视频工程继续推进。当前已有：

- 60 秒骨架视频
- SRT 字幕
- 口播脚本
- 口播时间轴 JSON
- 真人音色克隆替换说明

