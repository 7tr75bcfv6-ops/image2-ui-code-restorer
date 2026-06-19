# Image2 原型图生成提示词

## 中文主提示词

生成一张高端、真实、可用于前端还原演示的中文 SaaS 管理后台 UI 原型图。

画面主题是 `AI工作流自动化控制台`，用于展示从 AI 图片到可运行前端代码的还原流程。

布局要求：

- 16:9 横向桌面网页界面
- 左侧深绿色/黑绿色垂直侧边栏，包含 Logo、导航菜单、当前选中态、底部用量进度
- 顶部浅色导航栏，包含搜索框、通知图标、用户头像
- 主内容区是浅灰白背景
- 顶部有 4 个数据卡片，展示任务数、完成数、进行中、失败任务
- 中部有一条流程进度模块，展示 `上传图片 -> 解析结构 -> 生成代码 -> 视觉校验 -> 发布`
- 下方是任务表格，包含状态标签、进度条、时间、操作按钮
- 右侧有参数设置面板，包含风格选择、精度开关、按钮和若干选项

视觉要求：

- 中文 UI 文案清晰
- 卡片圆角、细边框、柔和阴影
- 主色使用荧光黄绿色点缀，背景克制
- 画面要像真实产品截图，不要像插画
- 不要出现真实公司 Logo
- 不要出现英文占位大段乱码
- 细节丰富但不要过度花哨

输出要求：

- 高分辨率
- 干净、明亮、科技感
- 适合作为 `image2-ui-code-restorer` 的输入参考图

## English helper prompt

Create a high-fidelity Chinese SaaS admin dashboard UI mockup for an `AI Workflow Automation Console`.

The image should look like a real desktop web app screenshot, not an illustration. Use a dark green left sidebar, light gray workspace, white cards, neon yellow-green accent color, top navigation, metric cards, workflow progress module, task table, and a right-side parameter panel. Chinese UI labels should be readable and realistic. No real company logos. High resolution, 16:9, clean product screenshot style.

