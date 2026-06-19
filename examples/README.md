# 示例素材目录

> 建议放入你的真实演示素材，文件可替换。

建议结构：

- `examples/input/`
  - `image2_raw_01.png`：Image2 原始生成图
  - `image2_raw_02.png`：备选输入图
- `examples/output/`
  - `plugin_restore_01/`
  - `manual_compare_01/`
- `examples/cuts/`
  - `clip_hook_00.mp4`
  - `clip_compare_00.mp4`
  - `clip_cta_00.mp4`
- `examples/thumb/`
  - `douyin_cover_v1.png`
  - `bilibili_cover_v1.png`

## 命名规范

- 使用日期前缀：`2026-06-19`
- 同一素材统一后缀：`_raw`, `_plugin`, `_manual`

## 发布前检查

- `output` 与 `manual` 的分辨率一致
- `cover` 文件至少备份 2 版（对比字色/布局）
- 删除涉及隐私或外部版权信息的截图
