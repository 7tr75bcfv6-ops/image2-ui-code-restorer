import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const cwd = process.cwd();
const kit = path.join(cwd, "outputs/image2-ui-code-restorer-github-kit");
const examples = path.join(kit, "examples");
const assets = path.join(kit, "assets");
const compare = path.join(assets, "source/compare");
const covers = path.join(assets, "covers");
const hyperframes = path.join(kit, "hyperframes");
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

const uiBaseCss = `
  * { box-sizing: border-box; }
  html, body { margin: 0; width: 1920px; height: 1080px; overflow: hidden; }
  body {
    font-family: "Avenir Next", "PingFang SC", "Noto Sans SC", sans-serif;
    background: #f3f5ee;
    color: #17211d;
  }
  .screen { width: 1920px; height: 1080px; display: flex; background: #eef2e9; }
  .sidebar {
    width: 274px; height: 1080px; padding: 34px 24px;
    background: #12221d; color: #e7f5dc; display: flex; flex-direction: column; gap: 26px;
  }
  .brand { display: flex; align-items: center; gap: 14px; font-weight: 800; font-size: 25px; }
  .mark { width: 42px; height: 42px; border-radius: 12px; background: #d8ff62; color: #13221c; display: grid; place-items: center; font-weight: 900; }
  .nav { display: grid; gap: 10px; }
  .nav-item { height: 48px; border-radius: 10px; display: flex; align-items: center; gap: 12px; padding: 0 14px; color: #aabdae; font-size: 15px; }
  .nav-item.active { color: #111e19; background: #d8ff62; font-weight: 700; }
  .nav-dot { width: 9px; height: 9px; border-radius: 50%; background: currentColor; opacity: .72; }
  .side-card { margin-top: auto; border: 1px solid rgba(216,255,98,.28); border-radius: 18px; padding: 18px; background: rgba(216,255,98,.08); }
  .side-card strong { display: block; font-size: 17px; margin-bottom: 8px; color: #f1ffd1; }
  .side-card span { color: #b5c8ba; font-size: 13px; line-height: 1.55; }
  .main { width: 1646px; height: 1080px; padding: 28px 36px 34px; }
  .topbar { height: 78px; display: flex; align-items: center; justify-content: space-between; }
  .title-block h1 { margin: 0; font-size: 34px; line-height: 1.1; letter-spacing: 0; }
  .title-block p { margin: 8px 0 0; color: #6c746e; font-size: 15px; }
  .search { width: 430px; height: 46px; border-radius: 10px; border: 1px solid #d4ddd1; background: #fff; display: flex; align-items: center; padding: 0 18px; color: #7d857e; }
  .actions { display: flex; align-items: center; gap: 14px; }
  .button { height: 46px; border-radius: 10px; padding: 0 20px; border: 1px solid #17211d; background: #17211d; color: #f6ffe5; font-weight: 700; display: grid; place-items: center; }
  .grid { display: grid; grid-template-columns: 1.15fr .85fr; gap: 22px; }
  .panel { background: #ffffff; border: 1px solid #dbe4d9; border-radius: 20px; box-shadow: 0 24px 60px rgba(31,43,35,.08); }
  .hero { height: 250px; padding: 28px; display: grid; grid-template-columns: 1fr 380px; gap: 20px; overflow: hidden; position: relative; }
  .hero:after { content: ""; position: absolute; right: -70px; top: -92px; width: 330px; height: 330px; border-radius: 50%; background: rgba(216,255,98,.42); }
  .hero h2 { margin: 0; font-size: 34px; line-height: 1.08; max-width: 620px; }
  .hero p { margin: 14px 0 24px; color: #68716b; font-size: 16px; width: 610px; line-height: 1.65; }
  .hero-metrics { display: flex; gap: 14px; }
  .metric-pill { min-width: 132px; border-radius: 16px; padding: 14px 16px; background: #f3f7eb; border: 1px solid #dfe9d9; }
  .metric-pill b { display: block; font-size: 25px; }
  .metric-pill span { font-size: 12px; color: #708073; }
  .flow-card { align-self: end; position: relative; z-index: 1; height: 178px; background: #15231e; border-radius: 18px; color: #eaffcc; padding: 20px; display: grid; gap: 12px; }
  .flow-line { height: 12px; border-radius: 999px; background: linear-gradient(90deg,#d8ff62,var(--flow, #50e2a2)); }
  .stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin: 20px 0; }
  .stat { height: 150px; padding: 22px; }
  .stat label { color: #748079; font-size: 13px; }
  .stat strong { display: block; margin-top: 10px; font-size: 31px; }
  .stat .trend { display: inline-flex; margin-top: 14px; padding: 7px 10px; border-radius: 999px; background: #eaffc4; color: #20311b; font-weight: 700; font-size: 12px; }
  .lower { display: grid; grid-template-columns: 1.12fr .88fr; gap: 20px; }
  .table { height: 415px; padding: 22px 24px; }
  .panel-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; }
  .panel-head h3 { margin: 0; font-size: 21px; }
  .tag { border-radius: 999px; padding: 7px 12px; background: #edf3e8; color: #4f6255; font-size: 12px; font-weight: 700; }
  table { width: 100%; border-collapse: collapse; font-size: 14px; }
  th { color: #78827b; text-align: left; font-weight: 600; height: 42px; border-bottom: 1px solid #e2e8df; }
  td { height: 56px; border-bottom: 1px solid #eef2ec; }
  .status { display: inline-flex; padding: 7px 10px; border-radius: 999px; font-size: 12px; font-weight: 700; background: #e7ffd1; color: #28551f; }
  .status.warn { background: #fff0bd; color: #73520d; }
  .chart { height: 415px; padding: 22px; }
  .bars { height: 260px; display: flex; align-items: end; gap: 16px; margin-top: 30px; border-bottom: 1px solid #dde6db; }
  .bar { flex: 1; border-radius: 12px 12px 0 0; background: #17211d; position: relative; }
  .bar:nth-child(even) { background: #d8ff62; }
  .bar span { position: absolute; bottom: -34px; left: 0; right: 0; text-align: center; color: #748079; font-size: 12px; }
`;

function uiHtml(kind) {
  const manual = kind === "manual";
  const restored = kind === "restored";
  const label = restored ? "Restored DOM" : manual ? "Manual Draft" : "Image2 Reference";
  const delta = manual ? " manual" : "";
  return `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=1920,height=1080"><title>${label}</title><style>${uiBaseCss}
  .manual .screen { background: #f1f1ec; }
  .manual .sidebar { width: 292px; }
  .manual .main { padding-left: 28px; }
  .manual .panel { box-shadow: 0 10px 26px rgba(31,43,35,.04); border-radius: 14px; }
  .manual .hero { grid-template-columns: 1fr 330px; }
  .badge-source { position: absolute; right: 26px; bottom: 24px; z-index: 5; font-size: 12px; color: #718073; background: rgba(255,255,255,.76); padding: 8px 11px; border-radius: 999px; border: 1px solid #dce5da; }
  </style></head><body class="${delta.trim()}"><div class="screen">
    <aside class="sidebar">
      <div class="brand"><div class="mark">AI</div><span>前端还原台</span></div>
      <nav class="nav">
        ${["项目总览","Image2输入","还原任务","组件资产","对比报告","发布记录"].map((n,i)=>`<div class="nav-item ${i===2?"active":""}"><i class="nav-dot"></i>${n}</div>`).join("")}
      </nav>
      <div class="side-card"><strong>今日演示目标</strong><span>同一张 Image2 UI 图，输出可运行前端，并保留无插件对照。</span></div>
    </aside>
    <main class="main">
      <header class="topbar">
        <div class="title-block"><h1>Image2 UI 还原工作台</h1><p>任务 #EP01 · SaaS 仪表板 · pixel-accurate / strict</p></div>
        <div class="actions"><div class="search">搜索任务、参数、组件</div><div class="button">开始还原</div></div>
      </header>
      <section class="grid">
        <div>
          <div class="panel hero">
            <div><h2>从图片输入到前端页面，把“猜布局”变成可复现流程</h2><p>系统先识别模块边界、色彩和间距，再输出可编辑 DOM。人工修复从起稿阶段后移到收口阶段。</p><div class="hero-metrics">
              <div class="metric-pill"><b>4m12s</b><span>首版产出</span></div><div class="metric-pill"><b>91%</b><span>结构匹配</span></div><div class="metric-pill"><b>Fine</b><span>组件颗粒</span></div>
            </div></div>
            <div class="flow-card"><b>Image2 → Analyze → Code → Preview</b><div class="flow-line"></div><div class="flow-line" style="--flow:#ffd85d;width:84%"></div><div class="flow-line" style="--flow:#7ed6ff;width:62%"></div></div>
          </div>
          <div class="stats">
            <div class="panel stat"><label>平均节省</label><strong>68%</strong><span class="trend">+ 对比人工</span></div>
            <div class="panel stat"><label>间距偏差</label><strong>8px</strong><span class="trend">strict</span></div>
            <div class="panel stat"><label>可编辑节点</label><strong>126</strong><span class="trend">DOM</span></div>
            <div class="panel stat"><label>发布素材</label><strong>2版</strong><span class="trend">9:16 / 16:9</span></div>
          </div>
          <div class="lower">
            <div class="panel table">
              <div class="panel-head"><h3>还原任务队列</h3><span class="tag">实时</span></div>
              <table><thead><tr><th>模块</th><th>策略</th><th>耗时</th><th>状态</th></tr></thead><tbody>
                <tr><td>侧边栏导航</td><td>pixel-accurate</td><td>22s</td><td><span class="status">完成</span></td></tr>
                <tr><td>顶部工具栏</td><td>semantic</td><td>18s</td><td><span class="status">完成</span></td></tr>
                <tr><td>数据卡片</td><td>fine</td><td>46s</td><td><span class="status">完成</span></td></tr>
                <tr><td>表格状态</td><td>strict</td><td>31s</td><td><span class="status warn">待微调</span></td></tr>
              </tbody></table>
            </div>
            <div class="panel chart">
              <div class="panel-head"><h3>流程耗时对比</h3><span class="tag">分钟</span></div>
              <div class="bars">${[62,78,44,90,52,70,36].map((h,i)=>`<div class="bar" style="height:${h}%"><span>D${i+1}</span></div>`).join("")}</div>
            </div>
          </div>
        </div>
        <div class="panel chart" style="height:835px">
          <div class="panel-head"><h3>参数策略</h3><span class="tag">推荐</span></div>
          <div style="display:grid;gap:16px;margin-top:22px">
            ${[
              ["fast", "先跑首版，看结构是否成立"],
              ["pixel-accurate", "锁定边距、阴影和控件密度"],
              ["fine", "拆到可编辑组件颗粒"],
              ["strict", "终稿收口，减少偏差"],
              ["manual patch", "只补字体、状态和极小图标"]
            ].map(([a,b])=>`<div style="border:1px solid #dce5da;border-radius:16px;padding:18px;background:#f8faf5"><b style="font-size:22px">${a}</b><p style="margin:8px 0 0;color:#6e7972;line-height:1.6">${b}</p></div>`).join("")}
          </div>
        </div>
      </section>
      <div class="badge-source">${label}</div>
    </main>
  </div></body></html>`;
}

function coverHtml(kind) {
  const vertical = kind === "douyin";
  const w = vertical ? 1080 : 1920;
  const h = vertical ? 1920 : 1080;
  return `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=${w},height=${h}"><style>
    *{box-sizing:border-box}html,body{margin:0;width:${w}px;height:${h}px;overflow:hidden}
    body{font-family:"Avenir Next","PingFang SC",sans-serif;background:#17211d;color:#f5ffe8}
    .page{width:${w}px;height:${h}px;position:relative;padding:${vertical ? "86px 70px" : "66px 84px"};background:
      radial-gradient(circle at 18% 20%,rgba(216,255,98,.22),transparent 24%),
      radial-gradient(circle at 86% 74%,rgba(80,226,162,.18),transparent 28%),#17211d}
    .grid{position:absolute;inset:0;background-image:linear-gradient(rgba(245,255,232,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(245,255,232,.06) 1px,transparent 1px);background-size:42px 42px;opacity:.55}
    .headline{position:relative;z-index:1;font-size:${vertical ? 108 : 92}px;line-height:.98;font-weight:900;letter-spacing:0;margin:${vertical ? "95px 0 34px" : "24px 0 28px"};max-width:${vertical ? 870 : 1120}px}
    .headline mark{background:#d8ff62;color:#17211d;padding:0 .08em;border-radius:10px}
    .sub{position:relative;z-index:1;font-size:${vertical ? 36 : 32}px;color:#dbe9d0;font-weight:700}
    .compare{position:relative;z-index:1;margin-top:${vertical ? 86 : 64}px;display:grid;grid-template-columns:1fr 1fr;gap:${vertical ? 18 : 28}px;width:${vertical ? 940 : 1230}px}
    .shot{height:${vertical ? 430 : 500}px;border:2px solid rgba(245,255,232,.2);border-radius:22px;overflow:hidden;background:#fff;box-shadow:0 32px 88px rgba(0,0,0,.34)}
    .shot img{width:100%;height:100%;object-fit:cover}
    .label{position:absolute;top:16px;left:16px;padding:10px 14px;border-radius:999px;background:#17211d;color:#d8ff62;font-weight:800}
    .avatar{position:absolute;right:${vertical ? 70 : 92}px;bottom:${vertical ? 84 : 70}px;width:${vertical ? 190 : 170}px;height:${vertical ? 190 : 170}px;border-radius:50%;background:#d8ff62;color:#17211d;display:grid;place-items:center;font-weight:900;font-size:54px;border:8px solid #f5ffe8}
    .tag{position:absolute;left:${vertical ? 70 : 84}px;bottom:${vertical ? 86 : 74}px;font-size:${vertical ? 34 : 28}px;font-weight:800;color:#d8ff62}
  </style></head><body><div class="page"><div class="grid"></div>
    <div class="sub">image2-ui-code-restorer 实操演示</div>
    <h1 class="headline">AI图片到前端<br><mark>一键还原?</mark></h1>
    <div class="compare">
      <div class="shot" style="position:relative"><img src="../source/compare/reference_ui.png"><div class="label">Image2图</div></div>
      <div class="shot" style="position:relative"><img src="../source/compare/restored_ui.png"><div class="label">可运行前端</div></div>
    </div>
    <div class="tag">评论“教程”拿完整流程</div><div class="avatar">RK</div>
  </div></body></html>`;
}

function compareHtml(kind) {
  const wide = kind === "panel";
  const w = wide ? 1200 : 880;
  const h = wide ? 720 : 390;
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=${w},height=${h}"><style>
    *{box-sizing:border-box}html,body{margin:0;width:${w}px;height:${h}px;overflow:hidden}
    body{font-family:"Avenir Next","PingFang SC",sans-serif;background:transparent}
    .wrap{width:${w}px;height:${h}px;padding:${wide ? 28 : 18}px;background:#17211d;border-radius:${wide ? 24 : 18}px;color:#f5ffe8;display:grid;grid-template-columns:1fr 1fr;gap:${wide ? 22 : 16}px}
    .cell{position:relative;border-radius:${wide ? 18 : 14}px;overflow:hidden;background:#fff;border:1px solid rgba(245,255,232,.16)}
    img{width:100%;height:100%;object-fit:cover}
    .badge{position:absolute;left:14px;top:14px;background:#17211d;color:#d8ff62;border-radius:999px;padding:8px 12px;font-weight:800;font-size:${wide ? 18 : 13}px}
  </style></head><body><div class="wrap">
    <div class="cell"><img src="reference_ui.png"><span class="badge">Image2 输入</span></div>
    <div class="cell"><img src="restored_ui.png"><span class="badge">Restorer 输出</span></div>
  </div></body></html>`;
}

function videoHtml({ vertical }) {
  const w = vertical ? 1080 : 1920;
  const h = vertical ? 1920 : 1080;
  const titleSize = vertical ? 82 : 68;
  const capY = vertical ? "calc(100% - 170px)" : "calc(100% - 104px)";
  const frame = vertical
    ? "left:62px;top:360px;width:956px;height:1040px"
    : "left:120px;top:310px;width:1200px;height:560px";
  const side = vertical
    ? "right:62px;top:1240px;width:956px;height:310px"
    : "right:120px;top:310px;width:500px;height:560px";
  const reference = "assets/reference_ui.png";
  const restored = "assets/restored_ui.png";
  const manual = "assets/manual_ui.png";
  return `<!doctype html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=${w}, height=${h}">
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
  <style>
    *{box-sizing:border-box}html,body{margin:0;width:${w}px;height:${h}px;overflow:hidden;background:#17211d}
    body{font-family:"Avenir Next",sans-serif;color:#f5ffe8}
    #root{position:relative;width:${w}px;height:${h}px;overflow:hidden;background:
      radial-gradient(circle at 14% 20%,rgba(216,255,98,.16),transparent 28%),
      radial-gradient(circle at 88% 82%,rgba(80,226,162,.15),transparent 30%),
      #17211d}
    .grain{position:absolute;inset:0;background-image:linear-gradient(rgba(245,255,232,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(245,255,232,.045) 1px,transparent 1px);background-size:${vertical ? 44 : 36}px ${vertical ? 44 : 36}px;opacity:.65}
    .scene{position:absolute;inset:0;padding:${vertical ? 76 : 62}px ${vertical ? 62 : 82}px}
    .kicker{font-size:${vertical ? 30 : 24}px;color:#d8ff62;font-weight:800;text-transform:uppercase}
    h1{font-size:${titleSize}px;line-height:1.02;letter-spacing:0;margin:20px 0 0;max-width:${vertical ? 900 : 1100}px;font-weight:900}
    .caption{position:absolute;left:${vertical ? 62 : 82}px;top:${capY};width:${vertical ? 956 : 1280}px;font-size:${vertical ? 36 : 31}px;line-height:1.38;font-weight:800;color:#f5ffe8;text-shadow:0 3px 20px rgba(0,0,0,.38)}
    .panel{position:absolute;border-radius:${vertical ? 28 : 24}px;border:1px solid rgba(245,255,232,.18);background:rgba(245,255,232,.08);box-shadow:0 30px 90px rgba(0,0,0,.28);overflow:hidden}
    .panel img{width:100%;height:100%;object-fit:cover;display:block}
    .face{position:absolute;right:${vertical ? 76 : 102}px;bottom:${vertical ? 260 : 104}px;width:${vertical ? 220 : 170}px;height:${vertical ? 220 : 170}px;border-radius:50%;display:grid;place-items:center;background:#d8ff62;color:#17211d;font-weight:900;font-size:${vertical ? 66 : 52}px;border:8px solid #f5ffe8}
    .cards{display:grid;grid-template-columns:${vertical ? "1fr" : "repeat(3,1fr)"};gap:${vertical ? 18 : 22}px;position:absolute;left:${vertical ? 62 : 82}px;top:${vertical ? 560 : 360}px;width:${vertical ? 956 : 1250}px}
    .card{padding:${vertical ? 28 : 24}px;border-radius:18px;background:rgba(245,255,232,.1);border:1px solid rgba(245,255,232,.16)}
    .card b{display:block;font-size:${vertical ? 48 : 38}px;color:#d8ff62;margin-bottom:10px}.card span{font-size:${vertical ? 27 : 22}px;color:#dcebd2}
    .code{position:absolute;${side};padding:24px;background:#0e1713;color:#d8ff62;font-family:"SF Mono","JetBrains Mono",monospace;font-size:${vertical ? 23 : 18}px;line-height:1.7;white-space:pre-wrap}
    .split{position:absolute;${frame};display:grid;grid-template-columns:1fr 1fr;gap:18px}.split .panel{position:relative;inset:auto;width:100%;height:100%}
    .label{position:absolute;left:18px;top:18px;padding:10px 14px;border-radius:999px;background:#17211d;color:#d8ff62;font-weight:900;font-size:${vertical ? 23 : 18}px;z-index:2}
    .cta{position:absolute;left:${vertical ? 62 : 82}px;bottom:${vertical ? 92 : 74}px;font-size:${vertical ? 48 : 42}px;font-weight:900;color:#d8ff62}
    #transitionLayer{position:absolute;inset:0;background:#d8ff62;opacity:0;z-index:20;pointer-events:none;transform-origin:center}
  </style></head><body>
  <div id="root" data-composition-id="main" data-start="0" data-duration="60" data-width="${w}" data-height="${h}">
    <div class="grain" data-layout-ignore></div><div id="transitionLayer" data-layout-ignore></div>
    <audio id="voice" data-start="0" data-duration="60" data-track-index="20" src="assets/narration_ai_v1.wav" data-volume="1"></audio>
    <section id="s1" class="scene clip" data-start="0" data-duration="5" data-track-index="1"><div class="kicker">痛点</div><h1>同一张图，手工还原前端真的太慢了</h1><div class="face">RK</div><div class="caption">同一张图，纯手工还原常常改半天还不准？</div></section>
    <section id="s2" class="scene clip" data-start="5" data-duration="8" data-track-index="1"><div class="kicker">传统流程</div><h1>最容易翻车的不是代码，是尺寸、间距、状态</h1><div class="cards"><div class="card"><b>尺寸</b><span>容器宽高反复猜</span></div><div class="card"><b>间距</b><span>8px / 12px 总是偏</span></div><div class="card"><b>状态</b><span>hover / disabled 容易漏</span></div></div><div class="caption">传统抠图和重建，会把大量时间消耗在反复对齐上。</div></section>
    <section id="s3" class="scene clip" data-start="13" data-duration="10" data-track-index="1"><div class="kicker">Image2 输入</div><h1>先生成一张结构清晰的 UI 参考图</h1><div class="panel" style="${frame}"><img src="${reference}"></div><div class="caption">先让 Image2 生成可识别的 UI 图，保留清晰模块边界。</div></section>
    <section id="s4" class="scene clip" data-start="23" data-duration="9" data-track-index="1"><div class="kicker">Restorer</div><h1>喂给 image2-ui-code-restorer，一键开始</h1><div class="panel" style="${frame}"><img src="${reference}"></div><pre class="code">analyze reference.png
mode: fast
style: pixel-accurate
granularity: fine
output: runnable HTML</pre><div class="caption">页面结构先出来，样式和间距再进入精修阶段。</div></section>
    <section id="s5" class="scene clip" data-start="32" data-duration="8" data-track-index="1"><div class="kicker">运行结果</div><h1>输出不是图片，是能继续改的前端页面</h1><div class="panel" style="${frame}"><img src="${restored}"></div><pre class="code">&lt;aside class="sidebar"&gt;
&lt;main class="dashboard"&gt;
&lt;table class="queue"&gt;
CSS tokens locked</pre><div class="caption">代码、布局、组件都已经进入可编辑状态。</div></section>
    <section id="s6" class="scene clip" data-start="40" data-duration="9" data-track-index="1"><div class="kicker">无插件对照</div><h1>无插件版本只保留开始和结尾，中间加速跳过</h1><div class="split"><div class="panel"><span class="label">无插件</span><img src="${manual}"></div><div class="panel"><span class="label">Restorer</span><img src="${restored}"></div></div><div class="caption">你能清楚感受到，时间消耗差别到底有多大。</div></section>
    <section id="s7" class="scene clip" data-start="49" data-duration="11" data-track-index="1"><div class="kicker">关注领取</div><h1>我会继续拆参数、失败案例和完整教程</h1><div class="cards"><div class="card"><b>fast</b><span>先出首版结构</span></div><div class="card"><b>strict</b><span>终稿收口</span></div><div class="card"><b>fine</b><span>复杂布局拆细</span></div></div><div class="face">RK</div><div class="cta">关注我，评论“教程”拿完整参数包</div></section>
  </div>
  <script>
    window.__timelines = window.__timelines || {};
    const tl = gsap.timeline({ paused: true });
    const scenes = ["s1","s2","s3","s4","s5","s6","s7"];
    const starts = [0,5,13,23,32,40,49];
    scenes.forEach((id, i) => {
      const at = starts[i] + 0.18;
      tl.from("#"+id+" .kicker", { y: 26, opacity: 0, duration: .45, ease: "power3.out" }, at);
      tl.from("#"+id+" h1", { y: 44, opacity: 0, scale: .985, duration: .62, ease: "expo.out" }, at + .12);
      tl.from("#"+id+" .panel, #"+id+" .split, #"+id+" .cards, #"+id+" .face, #"+id+" .code", { y: 34, opacity: 0, scale: .985, duration: .55, ease: "back.out(1.2)", stagger: .06 }, at + .28);
      tl.from("#"+id+" .caption, #"+id+" .cta", { y: 22, opacity: 0, duration: .46, ease: "power2.out" }, at + .46);
    });
    [4.75,12.75,22.75,31.75,39.75,48.75].forEach((at) => {
      tl.fromTo("#transitionLayer", { opacity: 0, scaleX: 0 }, { opacity: .92, scaleX: 1, duration: .16, ease: "power2.out" }, at);
      tl.to("#transitionLayer", { opacity: 0, scaleX: 1, duration: .24, ease: "power2.in" }, at + .16);
    });
    tl.to("#root", { opacity: 0, duration: .35, ease: "power2.in" }, 59.6);
    window.__timelines["main"] = tl;
  </script></body></html>`;
}

ensure(examples);
ensure(compare);
ensure(covers);

write(path.join(examples, "image2_reference_ui.html"), uiHtml("reference"));
write(path.join(examples, "restored_plugin_ui.html"), uiHtml("restored"));
write(path.join(examples, "manual_no_plugin_ui.html"), uiHtml("manual"));

screenshot(path.join(examples, "image2_reference_ui.html"), path.join(compare, "reference_ui.png"), 1920, 1080);
screenshot(path.join(examples, "restored_plugin_ui.html"), path.join(compare, "restored_ui.png"), 1920, 1080);
screenshot(path.join(examples, "manual_no_plugin_ui.html"), path.join(compare, "manual_ui.png"), 1920, 1080);

write(path.join(compare, "before_after_card.html"), compareHtml("card"));
write(path.join(compare, "before_after_panel.html"), compareHtml("panel"));
screenshot(path.join(compare, "before_after_card.html"), path.join(compare, "before_after_card.png"), 880, 390);
screenshot(path.join(compare, "before_after_panel.html"), path.join(compare, "before_after_panel.png"), 1200, 720);

write(path.join(covers, "cover_douyin_9x16.html"), coverHtml("douyin"));
write(path.join(covers, "cover_bilibili_16x9.html"), coverHtml("bilibili"));
screenshot(path.join(covers, "cover_douyin_9x16.html"), path.join(covers, "cover_douyin_9x16.png"), 1080, 1920);
screenshot(path.join(covers, "cover_bilibili_16x9.html"), path.join(covers, "cover_bilibili_16x9.png"), 1920, 1080);

for (const project of ["ep01-douyin", "ep01-bilibili"]) {
  const pdir = path.join(hyperframes, project);
  const passets = path.join(pdir, "assets");
  ensure(passets);
  for (const name of ["reference_ui.png", "restored_ui.png", "manual_ui.png"]) {
    fs.copyFileSync(path.join(compare, name), path.join(passets, name));
  }
}

write(path.join(hyperframes, "ep01-douyin", "DESIGN.md"), `# DESIGN

## Style Prompt
Graphite editorial tech tutorial for Chinese AI frontend creators. The frame should feel like a serious workflow demo: dark botanical graphite canvas, precise lime highlight, crisp UI screenshots, strong captions, and a present but replaceable creator avatar.

## Colors
- Background: #17211d
- Foreground: #f5ffe8
- Accent: #d8ff62
- Secondary: #50e2a2
- Muted line: rgba(245,255,232,.16)

## Typography
- Display/UI: Avenir Next, PingFang SC, Noto Sans SC
- Code: SF Mono, JetBrains Mono

## What NOT to Do
- Do not use purple or blue-gradient SaaS defaults.
- Do not make the screenshots decorative only; they must carry the proof.
- Do not hide the CTA in small text.
`);
write(path.join(hyperframes, "ep01-bilibili", "DESIGN.md"), fs.readFileSync(path.join(hyperframes, "ep01-douyin", "DESIGN.md"), "utf8"));

write(path.join(hyperframes, "ep01-douyin", "index.html"), videoHtml({ vertical: true }));
write(path.join(hyperframes, "ep01-bilibili", "index.html"), videoHtml({ vertical: false }));

write(path.join(examples, "restoration_parameter_sheet.md"), `# Restoration Parameter Sheet

- source: assets/source/compare/reference_ui.png
- viewport: 1920x1080
- screen_name: image2_reference_ui
- layout: fixed desktop dashboard
- background: #eef2e9 / #f3f5ee light SaaS surface
- containers: 274px sidebar, 1646px main, 78px topbar, two-column content grid
- modules: sidebar nav, topbar search/actions, hero workflow card, metric cards, task table, chart panel, parameter strategy panel
- typography: Avenir Next / PingFang SC style, 12px-34px UI text, 700-900 headlines
- colors: graphite #17211d, lime #d8ff62, white cards #ffffff, border #dbe4d9, muted #6c746e
- assets_to_crop: none; all visible modules restored as DOM/CSS
- implementation_target: standalone HTML/CSS plus HyperFrames video compositions

## Notes

This local reference simulates the Image2 output for the first launch video when a real Image2 screenshot is not yet provided. Replace reference_ui.png with the final Image2 export when available and rerun the analyzer.
`);

console.log("Generated release assets and HyperFrames project files.");
