# HyperFrames 静态对比视频工程

本目录包含两套平台视频工程：

- douyin_9x16：抖音竖屏 1080x1920，45 秒
- bilibili_16x9：B站横屏 1920x1080，64 秒

核心结论：普通还原更像重新设计，技能还原更像按原型结构复原。

渲染命令：

```bash
npx hyperframes render real_chain/hyperframes_static_comparison/douyin_9x16 --output ../renders/douyin_static_comparison_9x16.mp4 --quality standard
npx hyperframes render real_chain/hyperframes_static_comparison/bilibili_16x9 --output ../renders/bilibili_static_comparison_16x9.mp4 --quality standard
```
