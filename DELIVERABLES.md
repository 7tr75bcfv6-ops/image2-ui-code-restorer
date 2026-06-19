# Deliverables Manifest

## Videos

- `final_douyin_60s_ai_voice.mp4`
  - Format: 9:16
  - Resolution: 1080x1920
  - Duration: 60.02s
  - Voice: AI temporary Chinese narration
- `final_bilibili_60s_ai_voice.mp4`
  - Format: 16:9
  - Resolution: 1920x1080
  - Duration: 60.02s
  - Voice: AI temporary Chinese narration

## Visual Assets

- `assets/covers/cover_douyin_9x16.png`
- `assets/covers/cover_bilibili_16x9.png`
- `assets/source/compare/reference_ui.png`
- `assets/source/compare/restored_ui.png`
- `assets/source/compare/manual_ui.png`
- `assets/source/compare/before_after_card.png`
- `assets/source/compare/before_after_panel.png`

## Runnable Demos

- `examples/image2_reference_ui.html`
- `examples/restored_plugin_ui.html`
- `examples/manual_no_plugin_ui.html`
- `hyperframes/ep01-douyin/index.html`
- `hyperframes/ep01-bilibili/index.html`
- `skill/image2-ui-code-restorer/SKILL.md`

## Validation Evidence

- HyperFrames lint: both projects passed with 0 errors.
- HyperFrames inspect: both projects passed with 0 layout issues.
- FFprobe verification:
  - Douyin video: 1080x1920, 30fps, 60.021029s
  - Bilibili video: 1920x1080, 30fps, 60.021029s
- Image analysis output:
  - `examples/analysis/reference_and_restored_analysis.json`

## Known Remaining Human Inputs

- Real personal portrait footage is not included because no camera footage was available in this environment.
- Real voice clone is not included because no user voice sample was provided yet.
- Current AI narration uses macOS `Tingting` as the first-pass placeholder voice.
