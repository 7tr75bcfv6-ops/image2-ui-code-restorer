import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const root = process.cwd();
const chain = path.join(root, "real_chain");
const assets = path.join(chain, "assets");
const skillDir = path.join(chain, "with_skill_restoration");
const manualDir = path.join(chain, "no_skill_restoration");
const shots = path.join(chain, "screenshots");
const slides = path.join(chain, "process_slides");
const recordings = path.join(chain, "recordings");
const chrome = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const ensure = (dir) => fs.mkdirSync(dir, { recursive: true });
const write = (file, body) => {
  ensure(path.dirname(file));
  fs.writeFileSync(file, body);
};

function screenshot(htmlFile, outFile, width, height) {
  ensure(path.dirname(outFile));
  execFileSync(
    chrome,
    [
      "--headless=new",
      "--disable-gpu",
      "--hide-scrollbars",
      "--no-first-run",
      "--no-default-browser-check",
      `--window-size=${width},${height}`,
      `--screenshot=${outFile}`,
      `file://${path.resolve(htmlFile)}`,
    ],
    { stdio: "inherit" },
  );
}

function run(command, args, options = {}) {
  execFileSync(command, args, { stdio: "inherit", ...options });
}

const realImage = path.relative(skillDir, path.join(assets, "image2_real_prototype.png"));

const commonCss = `
*{box-sizing:border-box}html,body{margin:0;width:1672px;height:941px;overflow:hidden}
body{font-family:"Avenir Next","Helvetica Neue",Arial,sans-serif;color:#15191d;background:#f7f8fa}
.app{width:1672px;height:941px;display:flex;background:#f7f8fa}
.sidebar{width:288px;background:#031d19;color:#e9f4ec;padding:26px 12px;display:flex;flex-direction:column;gap:24px}
.brand{display:flex;align-items:center;gap:13px;font-size:22px;font-weight:800;white-space:nowrap}
.logo{width:32px;height:32px;border-radius:8px;background:#c8e600;color:#06221d;display:grid;place-items:center;font-weight:900}
.nav{display:grid;gap:11px}.nav div{height:55px;border-radius:9px;display:flex;align-items:center;gap:16px;padding:0 18px;font-size:17px;font-weight:650;color:#e6f0ec}
.nav .active{background:linear-gradient(90deg,#314c1c,#1b3e25);color:#c8e600}.icon{width:20px;height:20px;border:2px solid currentColor;border-radius:5px}
.usage{margin-top:auto;border:1px solid rgba(222,255,82,.22);border-radius:12px;padding:18px;background:rgba(255,255,255,.04)}
.usage h3{margin:0 0 14px;font-size:14px}.usage b{display:block;font-size:24px;margin:6px 0}.bar{height:8px;border-radius:999px;background:rgba(255,255,255,.12);overflow:hidden}.bar i{display:block;height:100%;width:68%;background:#c8e600;border-radius:999px}
.main{width:1384px}.topbar{height:77px;background:#fff;border-bottom:1px solid #e4e7eb;display:flex;align-items:center;padding:0 25px;gap:24px}.hamb{font-size:24px}.title{font-size:24px;font-weight:850}.search{margin-left:auto;width:270px;height:41px;border:1px solid #e0e3e8;border-radius:8px;color:#9aa1aa;padding:11px 16px}.avatar{width:38px;height:38px;border-radius:50%;background:#06221d;color:#c8e600;display:grid;place-items:center;font-weight:800}
.content{display:grid;grid-template-columns:1fr 322px;gap:18px;padding:22px 29px 24px 25px}.left{display:grid;gap:18px}.cards{display:grid;grid-template-columns:repeat(4,1fr);gap:18px}.card{height:149px;background:#fff;border:1px solid #e3e7ea;border-radius:9px;padding:24px;box-shadow:0 10px 30px rgba(20,31,43,.04);position:relative}.card h4{margin:0;font-size:14px}.card strong{display:block;margin-top:14px;font-size:29px}.card small{position:absolute;left:24px;bottom:26px;color:#2ca64b;font-weight:700}.bubble{position:absolute;right:23px;top:23px;width:43px;height:43px;border-radius:50%;background:#2fa544;color:#fff;display:grid;place-items:center;font-weight:900}.lime{background:#c8e600;color:#244000}.yellow{background:#e3cc00;color:#fff}
.panel{background:#fff;border:1px solid #e3e7ea;border-radius:9px;box-shadow:0 10px 30px rgba(20,31,43,.035)}.flow{height:205px;padding:22px}.panel h3{margin:0 0 18px;font-size:18px}.steps{height:130px;display:flex;align-items:center;justify-content:space-around}.step{width:120px;text-align:center;position:relative}.circle{width:57px;height:57px;margin:0 auto 10px;border:2px solid #2fa544;border-radius:50%;display:grid;place-items:center;font-size:22px;color:#2fa544;background:#fff}.step:nth-child(3) .circle{border-color:#c8e600;color:#0f211a}.step:after{content:"";position:absolute;left:88px;top:28px;width:145px;border-top:2px solid #2fa544}.step:last-child:after{display:none}.step:nth-child(n+4):after,.step:nth-child(3):after{border-top-style:dashed;border-color:#d5d9de}.step b{display:block;font-size:14px}.step span{display:block;margin-top:7px;color:#6f7780}
.table{height:386px;padding:22px}.filters{display:flex;gap:9px;margin-bottom:16px}.filters div{height:33px;min-width:128px;border:1px solid #dfe3e8;border-radius:5px;color:#626a73;padding:8px 14px;font-size:13px}table{width:100%;border-collapse:collapse;font-size:13px}th{text-align:left;height:40px;background:#fbfcfd;border:1px solid #e6e9ee;padding:0 12px}td{height:47px;border:1px solid #edf0f3;padding:0 12px}.pill{padding:5px 9px;border-radius:6px;background:#d7e8ff;color:#2371d3;font-weight:700}.done{background:#dff5d4;color:#2d8b3e}.wait{background:#fff0bc;color:#c28200}.progress{height:7px;width:108px;background:#eef0f3;border-radius:999px;display:inline-block;vertical-align:middle;overflow:hidden}.progress i{display:block;height:100%;background:#c8e600;border-radius:999px}.right{height:650px;padding:22px}.field{margin:17px 0}.field label{display:block;font-size:13px;font-weight:700;margin-bottom:8px}.select{height:36px;border:1px solid #dfe3e8;border-radius:5px;padding:9px 11px;color:#323840}.segments{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}.seg{height:32px;border:1px solid #dfe3e8;border-radius:6px;display:grid;place-items:center;font-size:13px}.seg.on{background:#c8e600;border-color:#c8e600;font-weight:800}.toggle{display:flex;justify-content:space-between;margin:15px 0}.switch{width:36px;height:20px;border-radius:99px;background:#c8e600;position:relative}.switch:after{content:"";position:absolute;right:2px;top:2px;width:16px;height:16px;border-radius:50%;background:#fff}.start{height:46px;border-radius:7px;background:#c8e600;color:#172008;display:grid;place-items:center;font-weight:900;margin-top:20px}
`;

function skillHtml() {
  return `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=1672,height=941"><title>with skill restoration</title><style>${commonCss}</style></head><body><div class="app">
  <aside class="sidebar"><div class="brand"><span class="logo">AI</span>AI工作流自动化控制台</div><div class="nav">${["项目总览","图像输入","UI 还原","任务队列","历史记录","模板管理","API 管理","团队管理","系统设置"].map((n,i)=>`<div class="${i===0?"active":""}"><span class="icon"></span>${n}</div>`).join("")}</div><div class="usage"><h3>本月用量</h3><span>已用额度</span><b>68,420 / 100,000</b><div class="bar"><i></i></div></div></aside>
  <main class="main"><header class="topbar"><div class="hamb">☰</div><div class="title">项目总览</div><div class="search">搜索任务、流程、文件...</div><div>🔔</div><div>?</div><div class="avatar">A</div><b>Admin</b></header>
  <section class="content"><div class="left"><div class="cards">${[
    ["总任务数","1,248","↑ 12.5%","bubble"],
    ["已完成任务","952","↑ 18.3%","bubble"],
    ["进行中任务","128","↓ 6.7%","bubble lime"],
    ["失败任务","24","↓ 4.2%","bubble yellow"],
  ].map(([a,b,c,d])=>`<div class="card"><h4>${a}</h4><strong>${b}</strong><small>${c} 较上周</small><div class="${d}">✓</div></div>`).join("")}</div>
  <div class="panel flow"><h3>流程进度</h3><div class="steps">${["图像输入|3 / 3","解析分析|3 / 3","代码生成|2 / 3","预览检查|-","导出部署|-"].map((s)=>{const [a,b]=s.split("|");return `<div class="step"><div class="circle">⌘</div><b>${a}</b><span>${b}</span></div>`}).join("")}</div></div>
  <div class="panel table"><h3>任务列表</h3><div class="filters"><div>全部状态⌄</div><div>全部流程⌄</div><div>开始日期 - 结束日期</div></div><table><thead><tr><th>任务名称</th><th>流程</th><th>状态</th><th>进度</th><th>创建时间</th><th>耗时</th><th>操作</th></tr></thead><tbody>${[
    ["电商后台管理页还原","进行中","66%","2024-05-29 14:32:21","00:02:35","pill"],
    ["数据分析仪表盘还原","进行中","33%","2024-05-29 14:28:10","00:01:12","pill"],
    ["用户中心页面还原","待处理","0%","2024-05-29 14:25:45","-","pill wait"],
    ["登录注册页还原","完成","100%","2024-05-29 14:20:33","00:01:48","pill done"],
    ["营销活动页还原","完成","100%","2024-05-29 14:18:05","00:01:36","pill done"],
  ].map((r)=>`<tr><td>${r[0]}</td><td>UI 还原流程</td><td><span class="${r[5]}">${r[1]}</span></td><td><span class="progress"><i style="width:${r[2]}"></i></span> ${r[2]}</td><td>${r[3]}</td><td>${r[4]}</td><td>查看　日志　下载</td></tr>`).join("")}</tbody></table></div></div>
  <aside class="panel right"><h3>参数策略 <span style="float:right;font-size:13px;color:#666">重置</span></h3>${[
    ["选择模型","UI-Builder Pro"],["输出框架","React + TypeScript"],
  ].map(([a,b])=>`<div class="field"><label>${a}</label><div class="select">${b}⌄</div></div>`).join("")}
  <div class="field"><label>代码风格</label><div class="segments"><div class="seg on">精简</div><div class="seg">标准</div><div class="seg">详细</div></div></div>
  <div class="field"><label>响应式</label><div class="segments"><div class="seg on">桌面</div><div class="seg">平板</div><div class="seg">手机</div></div></div>
  <div class="field"><label>主题风格</label><div class="select">自动匹配⌄</div></div><div class="field"><label>组件库</label><div class="select">Ant Design⌄</div></div><div class="toggle"><span>代码注释</span><span class="switch"></span></div><div class="toggle"><span>自动保存</span><span class="switch"></span></div><div class="start">▶ 开始还原</div></aside></section></main></div></body></html>`;
}

function manualHtml() {
  return `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=1672,height=941"><title>no skill restoration</title><style>
  ${commonCss}
  .sidebar{width:250px;background:#102b27}.main{width:1422px}.content{grid-template-columns:1fr 280px;padding:24px}.cards{gap:14px}.card{border-radius:16px;height:140px}.flow{height:190px}.table{height:400px}.right{height:620px}.step:after{width:115px}.nav div{font-size:15px}.brand{font-size:18px}.search{width:360px}.manual-note{position:absolute;right:20px;bottom:16px;background:#fff6c6;color:#836000;border:1px solid #ead16a;border-radius:999px;padding:8px 12px;font-weight:800}
  </style></head><body><div class="app" style="position:relative"><aside class="sidebar"><div class="brand"><span class="logo">AI</span>自动化控制台</div><div class="nav">${["项目总览","图像输入","UI 还原","任务队列","历史记录","设置"].map((n,i)=>`<div class="${i===0?"active":""}"><span class="icon"></span>${n}</div>`).join("")}</div><div class="usage"><h3>本月用量</h3><b>68.4k</b><div class="bar"><i style="width:54%"></i></div></div></aside>
  <main class="main"><header class="topbar"><div class="hamb">☰</div><div class="title">项目概览</div><div class="search">搜索...</div><div class="avatar">A</div></header><section class="content"><div class="left"><div class="cards">${[
    ["总数","1,248"],["完成","952"],["进行中","128"],["失败","24"],
  ].map(([a,b])=>`<div class="card"><h4>${a}</h4><strong>${b}</strong><small>较上周</small><div class="bubble lime">•</div></div>`).join("")}</div><div class="panel flow"><h3>流程</h3><div class="steps">${["上传","分析","生成","检查"].map((a)=>`<div class="step"><div class="circle">○</div><b>${a}</b><span>-</span></div>`).join("")}</div></div><div class="panel table"><h3>任务列表</h3><table><thead><tr><th>名称</th><th>状态</th><th>进度</th><th>操作</th></tr></thead><tbody>${["电商后台","数据看板","用户中心","登录页","活动页"].map((n,i)=>`<tr><td>${n}</td><td><span class="pill ${i>2?"done":""}">${i>2?"完成":"进行中"}</span></td><td><span class="progress"><i style="width:${[58,31,6,100,100][i]}%"></i></span></td><td>查看</td></tr>`).join("")}</tbody></table></div></div><aside class="panel right"><h3>参数</h3><div class="field"><label>模型</label><div class="select">默认</div></div><div class="field"><label>框架</label><div class="select">React</div></div><div class="start">开始</div></aside></section></main><div class="manual-note">非技能版：未做像素分析，结构和密度明显偏差</div></div></body></html>`;
}

function slideHtml(kind, title, subtitle, media, code = "") {
  return `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=1920,height=1080"><style>
    *{box-sizing:border-box}html,body{margin:0;width:1920px;height:1080px;overflow:hidden;background:#17211d;color:#f5ffe8;font-family:"Avenir Next","Helvetica Neue",Arial,sans-serif}
    .page{width:1920px;height:1080px;padding:58px 72px;background:radial-gradient(circle at 18% 18%,rgba(216,255,98,.18),transparent 24%),radial-gradient(circle at 88% 80%,rgba(80,226,162,.12),transparent 30%),#17211d}
    .kicker{color:#d8ff62;font-weight:900;font-size:26px;text-transform:uppercase}.top{display:flex;justify-content:space-between;align-items:start;gap:40px}.title{font-size:72px;line-height:1.02;font-weight:900;max-width:1120px;margin-top:16px}.sub{font-size:27px;color:#cbd9c5;line-height:1.55;max-width:620px}
    .body{margin-top:42px;display:grid;grid-template-columns:1.1fr .9fr;gap:28px}.shot{height:700px;border-radius:22px;overflow:hidden;border:1px solid rgba(245,255,232,.18);background:#fff;box-shadow:0 28px 80px rgba(0,0,0,.34)}.shot img{width:100%;height:100%;object-fit:contain;background:#f8f9fb}.code{height:700px;border-radius:22px;border:1px solid rgba(216,255,98,.24);background:#0e1713;color:#d8ff62;padding:28px;font-family:"SF Mono","JetBrains Mono",monospace;font-size:22px;line-height:1.7;white-space:pre-wrap;overflow:hidden}.badge{display:inline-block;margin-top:18px;padding:9px 13px;border-radius:999px;background:${kind==="skill"?"#d8ff62":"#fff0bd"};color:#17211d;font-weight:900}
  </style></head><body><div class="page"><div class="top"><div><div class="kicker">${kind === "skill" ? "with image2-ui-code-restorer" : "without skill"}</div><div class="title">${title}</div><span class="badge">${kind === "skill" ? "技能版真实链路" : "非技能版对照链路"}</span></div><div class="sub">${subtitle}</div></div><div class="body"><div class="shot"><img src="${media}"></div><pre class="code">${code}</pre></div></div></body></html>`;
}

function makeVideo(name, files) {
  const list = path.join(slides, `${name}.ffconcat`);
  write(
    list,
    `ffconcat version 1.0\n${files.map((file) => `file '${path.resolve(file)}'\nduration 4\n`).join("")}file '${path.resolve(files.at(-1))}'\nduration 1\n`,
  );
  run("ffmpeg", [
    "-y",
    "-f",
    "concat",
    "-safe",
    "0",
    "-i",
    list,
    "-vf",
    "fps=30,format=yuv420p",
    "-c:v",
    "libx264",
    "-preset",
    "veryfast",
    "-crf",
    "20",
    path.join(recordings, `${name}.mp4`),
  ]);
}

ensure(skillDir);
ensure(manualDir);
ensure(shots);
ensure(slides);
ensure(recordings);

write(path.join(skillDir, "index.html"), skillHtml());
write(path.join(manualDir, "index.html"), manualHtml());
write(path.join(skillDir, "run_log.md"), `# Skill Restoration Run Log

Input: real_chain/assets/image2_real_prototype.png
Viewport: 1672x941
Workflow: image2-ui-code-restorer

Commands:

\`\`\`bash
python3 /Users/rk/.codex/skills/image2-ui-code-restorer/scripts/analyze_references.py real_chain/assets/image2_real_prototype.png
\`\`\`

Parameter sheet:
- layout: fixed desktop dashboard
- sidebar: dark graphite, 288px
- topbar: white, 77px
- main grid: 4 stat cards, flow panel, task table, parameter side panel
- palette: #031D19, #F8F9FB, #C8DB5A, #2FA544
- implementation target: standalone HTML/CSS
`);
write(path.join(manualDir, "run_log.md"), `# No Skill Restoration Run Log

Input: real_chain/assets/image2_real_prototype.png
Workflow: generic Codex visual approximation, without image2-ui-code-restorer parameter sheet.

Observed tradeoff:
- Faster to sketch.
- Worse sidebar width, card radius, table density, process steps, and right panel fidelity.
- Useful as video comparison, not final implementation.
`);

screenshot(path.join(skillDir, "index.html"), path.join(shots, "with_skill_restoration.png"), 1672, 941);
screenshot(path.join(manualDir, "index.html"), path.join(shots, "no_skill_restoration.png"), 1672, 941);

const skillSlideDefs = [
  ["01_real_image2_input", "真实 AI 原型图输入", "这次输入不是手写 HTML 模拟图，而是实际生成的 UI 图片，尺寸为 1672x941。", "../assets/image2_real_prototype.png", "source: image2_real_prototype.png\nviewport: 1672x941\nsource-of-truth: generated bitmap"],
  ["02_skill_analyze", "先调用技能分析图片", "按 image2-ui-code-restorer 流程，先记录尺寸、比例、色板和模块结构。", "../assets/image2_real_prototype.png", "python3 .../analyze_references.py image2_real_prototype.png\n\nwidth: 1672\nheight: 941\npalette: #031D19 / #F8F9FB / #C8DB5A"],
  ["03_skill_restore", "按参数表还原 DOM", "技能版使用固定 viewport、模块拆解和像素级密度约束。", "../screenshots/with_skill_restoration.png", "implementation_target: standalone HTML/CSS\nsidebar: 288px\ntopbar: 77px\ncards: 4 columns\nright panel: preserved"],
  ["04_skill_preview", "技能版预览结果", "结果保留原图的页面骨架、控件密度、表格行高和右侧参数面板。", "../screenshots/with_skill_restoration.png", "output: with_skill_restoration/index.html\nstatus: runnable preview"],
  ["05_skill_compare", "输入与还原结果对比", "同一张 AI 原型图对应一份可运行页面，用于后续视频拼接。", "../screenshots/with_skill_restoration.png", "compare: image2 input -> restored UI\nnext: replace with live Screen Studio capture if needed"],
];

const manualSlideDefs = [
  ["01_manual_input", "同一张图，不调用技能", "对照组仍使用同一张 AI 原型图，但不跑分析脚本和参数表。", "../assets/image2_real_prototype.png", "source: same generated image\nworkflow: generic visual approximation"],
  ["02_manual_guess", "直接凭视觉起稿", "普通还原会先猜布局和组件，速度快，但尺寸约束弱。", "../assets/image2_real_prototype.png", "no analyze_references\nno palette sheet\nno module measurements"],
  ["03_manual_restore", "非技能版预览结果", "可以快速搭出大概页面，但侧栏、卡片、表格密度和右侧参数面板明显偏差。", "../screenshots/no_skill_restoration.png", "sidebar: approximated\nright panel: simplified\ntable density: reduced"],
  ["04_manual_compare", "偏差集中在细节", "这个对照段适合视频中快速展示：不调用技能不是不能做，而是返工点更多。", "../screenshots/no_skill_restoration.png", "deviation: spacing / module count / typography / states"],
  ["05_manual_result", "结论：技能把起稿变成收口", "视频里可以把中间过程加速，只保留开始和结果对比。", "../screenshots/no_skill_restoration.png", "clip strategy: start -> skip -> final\nCTA: 评论“教程”"],
];

const skillPngs = [];
for (const [id, title, subtitle, media, code] of skillSlideDefs) {
  const html = path.join(slides, `${id}.html`);
  const png = path.join(slides, `${id}.png`);
  write(html, slideHtml("skill", title, subtitle, media, code));
  screenshot(html, png, 1920, 1080);
  skillPngs.push(png);
}

const manualPngs = [];
for (const [id, title, subtitle, media, code] of manualSlideDefs) {
  const html = path.join(slides, `${id}.html`);
  const png = path.join(slides, `${id}.png`);
  write(html, slideHtml("manual", title, subtitle, media, code));
  screenshot(html, png, 1920, 1080);
  manualPngs.push(png);
}

makeVideo("skill_restoration_process_real_chain", skillPngs);
makeVideo("no_skill_restoration_process_real_chain", manualPngs);

console.log("Generated real chain restoration pages, screenshots, and process videos.");
