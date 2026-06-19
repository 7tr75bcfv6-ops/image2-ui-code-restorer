# GitHub 发布命令（按你本机环境执行）

```bash
# 1) 进入仓库目录
cd /Users/rk/Documents/Codex/2026-06-19/ai-image2-ui-code-restorer-image2/outputs/image2-ui-code-restorer-github-kit

# 2) 初始化仓库

git init

git add .gitignore README.md DELIVERABLES.md docs assets examples storyboards audio image2 studio hyperframes scripts skill final_douyin_60s_ai_voice.mp4 final_bilibili_60s_ai_voice.mp4 execution_plan_implementation.md

git commit -m "feat: add launch video kit and image2 ui restorer demo"

# 3) 连接远程仓库（请改成你的用户名和仓库名）
git remote add origin https://github.com/<你的GitHub用户名>/image2-ui-code-restorer.git

git branch -M main
git push -u origin main

# 4) 打标签
git tag -a v0.1-demo -m "launch video, tutorial, and production-ready scaffolding"
git push origin v0.1-demo
```

建议：首次发布成功后，把 `README` 中的仓库链接、教程、脚本三者都加到个人主页固定栏。
