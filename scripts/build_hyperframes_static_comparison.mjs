import { cpSync, mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const repo = resolve(new URL("..", import.meta.url).pathname);
const sourceDir = resolve(repo, "real_chain/user_actual_comparison/assets");
const outRoot = resolve(repo, "real_chain/hyperframes_static_comparison");

const sources = {
  noSkill: resolve(sourceDir, "01_no_skill_restore.png"),
  original: resolve(sourceDir, "02_original_prototype.png"),
  withSkill: resolve(sourceDir, "03_with_skill_restore.png"),
};

const design = `# Visual Identity

## Style Prompt

Clean technical explainer for AI frontend restoration. Light product-documentation canvas, deep navy editorial typography, bright blue product accents, green for skill confidence, orange for ordinary-restoration drift. The video should feel like a precise case study, not a loud ad.

## Colors

- Canvas: #F6F8FC
- Ink: #071A3D
- Muted: #667694
- Product blue: #1264FF
- Skill green: #13B981
- Drift orange: #FF7A1A
- Panel: #FFFFFF

## Typography

- Headlines: generic serif, heavy
- Body: generic sans-serif
- Data/code labels: generic monospace

## What NOT to Do

- Do not claim pixel-level 1:1.
- Do not make the result look like a crypto/neon ad.
- Do not overuse purple or dark mode.
- Do not hide the source UI images behind decoration.
`;

function copyAssets(projectDir) {
  const assets = resolve(projectDir, "assets");
  mkdirSync(assets, { recursive: true });
  cpSync(sources.noSkill, resolve(assets, "no-skill.png"));
  cpSync(sources.original, resolve(assets, "original.png"));
  cpSync(sources.withSkill, resolve(assets, "with-skill.png"));
}

function commonCss(w, h, platform) {
  const isVertical = platform === "douyin";
  return `
    :root {
      --canvas: #f6f8fc;
      --ink: #071a3d;
      --muted: #667694;
      --blue: #1264ff;
      --green: #13b981;
      --orange: #ff7a1a;
      --panel: #ffffff;
      --line: #dae5f3;
    }
    * { box-sizing: border-box; }
    html, body {
      margin: 0;
      width: ${w}px;
      height: ${h}px;
      overflow: hidden;
      background: var(--canvas);
      color: var(--ink);
      font-family: sans-serif;
    }
    #root {
      position: relative;
      width: ${w}px;
      height: ${h}px;
      overflow: hidden;
      background:
        radial-gradient(circle at 10% 12%, rgba(18, 100, 255, 0.17), rgba(18, 100, 255, 0) 30%),
        radial-gradient(circle at 90% 18%, rgba(19, 185, 129, 0.14), rgba(19, 185, 129, 0) 26%),
        linear-gradient(135deg, #fbfdff 0%, #eef4fc 100%);
    }
    .scene {
      position: absolute;
      inset: 0;
      width: ${w}px;
      height: ${h}px;
      background-color: var(--canvas);
      overflow: hidden;
    }
    .scene:not(#scene1) { opacity: 0; visibility: hidden; }
    .grain {
      position: absolute;
      inset: 0;
      opacity: 0.34;
      pointer-events: none;
      background-image:
        linear-gradient(rgba(7, 26, 61, 0.035) 1px, rgba(0,0,0,0) 1px),
        linear-gradient(90deg, rgba(7, 26, 61, 0.035) 1px, rgba(0,0,0,0) 1px);
      background-size: ${isVertical ? "54px 54px" : "64px 64px"};
    }
    .ghost {
      position: absolute;
      font-family: serif;
      font-weight: 900;
      letter-spacing: -0.06em;
      color: rgba(7, 26, 61, 0.045);
      white-space: nowrap;
      pointer-events: none;
      user-select: none;
    }
    .scene-content {
      position: relative;
      z-index: 2;
      width: 100%;
      height: 100%;
      padding: ${isVertical ? "86px 64px 74px" : "70px 92px 64px"};
      display: flex;
      flex-direction: column;
      gap: ${isVertical ? "30px" : "28px"};
    }
    .eyebrow {
      display: inline-flex;
      align-items: center;
      width: max-content;
      gap: 12px;
      padding: ${isVertical ? "12px 18px" : "10px 16px"};
      border-radius: 999px;
      background: rgba(18, 100, 255, 0.10);
      border: 1px solid rgba(18, 100, 255, 0.22);
      color: var(--blue);
      font-family: monospace;
      font-size: ${isVertical ? "28px" : "22px"};
      font-weight: 800;
      letter-spacing: -0.03em;
    }
    .headline {
      font-family: serif;
      font-size: ${isVertical ? "94px" : "78px"};
      line-height: 1.02;
      font-weight: 900;
      letter-spacing: -0.07em;
      margin: 0;
      color: var(--ink);
      max-width: ${isVertical ? "900px" : "1180px"};
    }
    .headline strong { color: var(--blue); }
    .subline {
      font-size: ${isVertical ? "35px" : "28px"};
      line-height: 1.45;
      font-weight: 520;
      color: var(--muted);
      max-width: ${isVertical ? "850px" : "1150px"};
      margin: 0;
    }
    .panel {
      background: rgba(255, 255, 255, 0.88);
      border: 1px solid var(--line);
      box-shadow: 0 20px 65px rgba(29, 66, 125, 0.12);
      border-radius: ${isVertical ? "34px" : "28px"};
      overflow: hidden;
    }
    .image-card {
      position: relative;
      background: #ffffff;
      border: 1px solid var(--line);
      border-radius: ${isVertical ? "34px" : "26px"};
      box-shadow: 0 20px 65px rgba(29, 66, 125, 0.12);
      overflow: hidden;
    }
    .image-card img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      display: block;
      background: #fff;
    }
    .label {
      position: absolute;
      left: ${isVertical ? "24px" : "22px"};
      top: ${isVertical ? "24px" : "20px"};
      z-index: 3;
      padding: ${isVertical ? "12px 18px" : "10px 15px"};
      border-radius: 999px;
      color: #fff;
      font-size: ${isVertical ? "27px" : "20px"};
      font-weight: 820;
      letter-spacing: -0.03em;
      box-shadow: 0 12px 35px rgba(7, 26, 61, 0.18);
    }
    .label.orange { background: var(--orange); }
    .label.green { background: var(--green); }
    .label.blue { background: var(--blue); }
    .split {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: ${isVertical ? "28px" : "30px"};
      flex: 1;
      min-height: 0;
    }
    .table {
      display: grid;
      gap: ${isVertical ? "18px" : "14px"};
      padding: ${isVertical ? "34px" : "30px"};
    }
    .row {
      display: grid;
      grid-template-columns: ${isVertical ? "1fr 1fr" : "220px 1fr 1fr"};
      align-items: center;
      gap: ${isVertical ? "18px" : "22px"};
      padding: ${isVertical ? "22px" : "18px 22px"};
      border-radius: ${isVertical ? "22px" : "18px"};
      background: #f6f9fd;
      border: 1px solid #e1eaf6;
      font-size: ${isVertical ? "26px" : "22px"};
      color: var(--ink);
      line-height: 1.35;
    }
    .row .k {
      color: var(--muted);
      font-family: monospace;
      font-weight: 800;
    }
    .row .bad { color: var(--orange); font-weight: 850; }
    .row .good { color: var(--green); font-weight: 850; }
    .caption {
      position: absolute;
      left: ${isVertical ? "64px" : "92px"};
      right: ${isVertical ? "64px" : "92px"};
      bottom: ${isVertical ? "70px" : "56px"};
      z-index: 4;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 24px;
      padding: ${isVertical ? "24px 28px" : "18px 24px"};
      border-radius: ${isVertical ? "26px" : "22px"};
      background: rgba(7, 26, 61, 0.88);
      color: #f7fbff;
      box-shadow: 0 22px 70px rgba(7, 26, 61, 0.22);
      font-size: ${isVertical ? "31px" : "25px"};
      font-weight: 760;
      line-height: 1.28;
    }
    .caption .tag {
      flex: 0 0 auto;
      padding: 9px 14px;
      border-radius: 999px;
      background: rgba(19, 185, 129, 0.18);
      color: #93ffd0;
      font-family: monospace;
      font-size: ${isVertical ? "22px" : "17px"};
      letter-spacing: -0.03em;
    }
    .cta-card {
      margin-top: auto;
      padding: ${isVertical ? "38px" : "34px 42px"};
      border-radius: ${isVertical ? "34px" : "30px"};
      background: #071a3d;
      color: #fff;
      display: grid;
      gap: 14px;
      box-shadow: 0 28px 80px rgba(7, 26, 61, 0.25);
    }
    .cta-card .big {
      font-family: serif;
      font-weight: 900;
      letter-spacing: -0.06em;
      font-size: ${isVertical ? "62px" : "52px"};
      line-height: 1.05;
    }
    .cta-card .small {
      font-size: ${isVertical ? "31px" : "25px"};
      color: #d7e7ff;
      line-height: 1.38;
    }
    .url {
      font-family: monospace;
      color: #9af5cc;
      font-size: ${isVertical ? "24px" : "20px"};
      word-break: break-all;
    }
  `;
}

function sceneTransitionScript(sceneIds, starts) {
  const transitions = [];
  for (let i = 1; i < sceneIds.length; i += 1) {
    const prev = sceneIds[i - 1];
    const curr = sceneIds[i];
    const t = starts[i];
    transitions.push(`
      tl.set("#${curr}", { visibility: "visible", opacity: 1, zIndex: ${i + 2} }, ${t});
      tl.from("#${curr} .reveal", { y: ${i % 2 ? 42 : -34}, x: ${i % 2 ? 0 : 32}, opacity: 0, scale: 0.985, duration: 0.62, stagger: 0.08, ease: "${i % 2 ? "power3.out" : "expo.out"}" }, ${t + 0.16});
      tl.from("#${curr} .image-card", { scale: 0.96, opacity: 0, duration: 0.72, stagger: 0.10, ease: "back.out(1.2)" }, ${t + 0.22});
      tl.to("#${prev}", { opacity: 0, duration: 0.42, ease: "power2.inOut" }, ${t + 0.06});
      tl.set("#${prev}", { visibility: "hidden" }, ${t + 0.52});
    `);
  }
  return transitions.join("\n");
}

function douyinHtml() {
  const w = 1080;
  const h = 1920;
  const starts = [0, 4.5, 10, 16, 23, 31, 38];
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
  <style>${commonCss(w, h, "douyin")}
    .hero-img { height: 650px; margin-top: auto; }
    .single-img { height: 930px; }
    .compare-stack { display: grid; gap: 22px; flex: 1; min-height: 0; }
    .compare-stack .image-card { height: 570px; }
    .table .row { grid-template-columns: 1fr 1fr; }
    #scene1 .ghost { font-size: 210px; left: -18px; bottom: 390px; }
    #scene4 .ghost { font-size: 190px; right: -40px; top: 80px; }
  </style>
</head>
<body>
  <div id="root" data-composition-id="douyin-static-comparison" data-width="1080" data-height="1920" data-start="0" data-duration="45">
    <div id="scene1" class="scene">
      <div class="grain"></div><div class="ghost">RESTORE</div>
      <div class="scene-content">
        <div class="eyebrow reveal">CASE / UI RESTORE</div>
        <h1 class="headline reveal">同一张 UI 图，<strong>普通还原</strong>和技能还原差在哪？</h1>
        <p class="subline reveal">结论很直接：普通版更像重新设计，技能版更像按原型结构复原。</p>
        <div class="image-card hero-img reveal"><span class="label blue">原型图</span><img src="assets/original.png" /></div>
      </div>
    </div>
    <div id="scene2" class="scene">
      <div class="grain"></div>
      <div class="scene-content">
        <div class="eyebrow reveal">INPUT</div>
        <h1 class="headline reveal">先看原型图：专家库页面</h1>
        <p class="subline reveal">核心模块：筛选区、专家卡片、右侧统计、领域分布、专家优势。</p>
        <div class="image-card single-img reveal"><span class="label blue">原型结构</span><img src="assets/original.png" /></div>
      </div>
    </div>
    <div id="scene3" class="scene">
      <div class="grain"></div>
      <div class="scene-content">
        <div class="eyebrow reveal">NO SKILL</div>
        <h1 class="headline reveal">普通还原：页面完整，但结构被改写</h1>
        <p class="subline reveal">顶部导航、咨询记录、字母头像、卡片数据，都开始偏离原型。</p>
        <div class="image-card single-img reveal"><span class="label orange">更像重做</span><img src="assets/no-skill.png" /></div>
      </div>
    </div>
    <div id="scene4" class="scene">
      <div class="grain"></div><div class="ghost">SKILL</div>
      <div class="scene-content">
        <div class="eyebrow reveal">WITH SKILL</div>
        <h1 class="headline reveal">技能还原：先拆结构，再复原模块</h1>
        <p class="subline reveal">保留真实头像、右侧模块顺序、专家卡片网格和原型视觉节奏。</p>
        <div class="image-card single-img reveal"><span class="label green">更接近原型</span><img src="assets/with-skill.png" /></div>
      </div>
    </div>
    <div id="scene5" class="scene">
      <div class="grain"></div>
      <div class="scene-content">
        <div class="eyebrow reveal">SIDE BY SIDE</div>
        <h1 class="headline reveal">不是更漂亮，而是更像原图</h1>
        <div class="compare-stack">
          <div class="image-card reveal"><span class="label orange">普通版：重新设计感更强</span><img src="assets/no-skill.png" /></div>
          <div class="image-card reveal"><span class="label green">技能版：结构更接近原型</span><img src="assets/with-skill.png" /></div>
        </div>
      </div>
    </div>
    <div id="scene6" class="scene">
      <div class="grain"></div>
      <div class="scene-content">
        <div class="eyebrow reveal">COMPARISON</div>
        <h1 class="headline reveal">对比重点看这 4 项</h1>
        <div class="panel table reveal">
          <div class="row"><span class="k">页面骨架</span><span><b class="bad">普通版偏移</b> / <b class="good">技能版更接近</b></span></div>
          <div class="row"><span class="k">头像资产</span><span><b class="bad">字母头像</b> / <b class="good">真实头像</b></span></div>
          <div class="row"><span class="k">右侧模块</span><span><b class="bad">重新组织</b> / <b class="good">基本保留</b></span></div>
          <div class="row"><span class="k">文本数据</span><span><b class="bad">都有误差</b>，不能说像素级 1:1</span></div>
        </div>
      </div>
    </div>
    <div id="scene7" class="scene">
      <div class="grain"></div>
      <div class="scene-content">
        <div class="eyebrow reveal">CTA</div>
        <h1 class="headline reveal">想要完整教程和案例？</h1>
        <p class="subline reveal">我已经整理了原型图、普通还原、技能还原、对比报告和 GitHub 示例。</p>
        <div class="cta-card reveal">
          <div class="big">评论「教程」</div>
          <div class="small">领取 image2-ui-code-restorer 使用流程和真实对比素材。</div>
          <div class="url">github.com/7tr75bcfv6-ops/image2-ui-code-restorer</div>
        </div>
      </div>
    </div>
    <div class="caption"><span>普通方式可以做出页面；技能方式更适合做结构还原首版。</span><span class="tag">NOT 1:1 CLAIM</span></div>
  </div>
  <script>
    window.__timelines = window.__timelines || {};
    var tl = gsap.timeline({ paused: true });
    tl.from("#scene1 .reveal", { y: 50, opacity: 0, scale: 0.985, duration: 0.72, stagger: 0.08, ease: "expo.out" }, 0.2);
    tl.from(".caption", { y: 32, opacity: 0, duration: 0.48, ease: "power3.out" }, 1.1);
    ${sceneTransitionScript(["scene1", "scene2", "scene3", "scene4", "scene5", "scene6", "scene7"], starts)}
    tl.to("#scene7 .reveal", { opacity: 0, y: -24, duration: 0.42, stagger: 0.04, ease: "power2.in" }, 44.2);
    window.__timelines["douyin-static-comparison"] = tl;
  </script>
</body>
</html>`;
}

function bilibiliHtml() {
  const w = 1920;
  const h = 1080;
  const starts = [0, 6, 14, 24, 35, 47, 56];
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
  <style>${commonCss(w, h, "bilibili")}
    .wide-grid { display: grid; grid-template-columns: 1.05fr 0.95fr; gap: 34px; flex: 1; min-height: 0; }
    .wide-img { height: 100%; min-height: 0; }
    .triple { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 26px; flex: 1; min-height: 0; }
    .triple .image-card { min-height: 0; }
    .compare-two { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; flex: 1; min-height: 0; }
    .compare-two .image-card { min-height: 0; }
    #scene1 .ghost { font-size: 180px; right: -30px; bottom: 80px; }
    #scene4 .ghost { font-size: 170px; left: 18px; bottom: 55px; }
  </style>
</head>
<body>
  <div id="root" data-composition-id="bilibili-static-comparison" data-width="1920" data-height="1080" data-start="0" data-duration="64">
    <div id="scene1" class="scene">
      <div class="grain"></div><div class="ghost">IMAGE TO UI</div>
      <div class="scene-content">
        <div class="eyebrow reveal">真实案例 / 专家库页面</div>
        <div class="wide-grid">
          <div>
            <h1 class="headline reveal">同一张原型图，为什么结果差这么多？</h1>
            <p class="subline reveal">普通还原能做出页面，但更像重新设计；调用 image2-ui-code-restorer 后，结构更接近原型。</p>
          </div>
          <div class="image-card reveal"><span class="label blue">输入原型</span><img src="assets/original.png" /></div>
        </div>
      </div>
    </div>
    <div id="scene2" class="scene">
      <div class="grain"></div>
      <div class="scene-content">
        <div class="eyebrow reveal">STEP 1 / 原型图</div>
        <h1 class="headline reveal">先确定还原目标：不是美化，是复原信息结构</h1>
        <div class="wide-grid">
          <div class="image-card wide-img reveal"><span class="label blue">原型图</span><img src="assets/original.png" /></div>
          <div class="panel table reveal">
            <div class="row"><span class="k">筛选区</span><span>专家领域、年限、评分、费用</span><span class="good">必须保留</span></div>
            <div class="row"><span class="k">主列表</span><span>专家头像、标签、价格、操作</span><span class="good">核心模块</span></div>
            <div class="row"><span class="k">右侧栏</span><span>统计、分布、优势、指南</span><span class="good">结构锚点</span></div>
          </div>
        </div>
      </div>
    </div>
    <div id="scene3" class="scene">
      <div class="grain"></div>
      <div class="scene-content">
        <div class="eyebrow reveal">STEP 2 / 普通还原</div>
        <h1 class="headline reveal">普通版本：完整，但像重新做了一套</h1>
        <div class="wide-grid">
          <div class="image-card wide-img reveal"><span class="label orange">普通还原</span><img src="assets/no-skill.png" /></div>
          <div class="panel table reveal">
            <div class="row"><span class="k">导航</span><span>新增顶部导航和咨询记录条</span><span class="bad">结构偏移</span></div>
            <div class="row"><span class="k">头像</span><span>真实头像变字母头像</span><span class="bad">资产丢失</span></div>
            <div class="row"><span class="k">数据</span><span>价格、服务单、评分被改写</span><span class="bad">语义变化</span></div>
          </div>
        </div>
      </div>
    </div>
    <div id="scene4" class="scene">
      <div class="grain"></div><div class="ghost">SKILL WORKFLOW</div>
      <div class="scene-content">
        <div class="eyebrow reveal">STEP 3 / 技能还原</div>
        <h1 class="headline reveal">技能版本：更像按截图拆模块后复原</h1>
        <div class="wide-grid">
          <div class="image-card wide-img reveal"><span class="label green">技能还原</span><img src="assets/with-skill.png" /></div>
          <div class="panel table reveal">
            <div class="row"><span class="k">骨架</span><span>标题、筛选、列表、右栏都在</span><span class="good">更接近</span></div>
            <div class="row"><span class="k">资产</span><span>专家头像继续保留</span><span class="good">更真实</span></div>
            <div class="row"><span class="k">右栏</span><span>统计、分布、优势、指南顺序接近</span><span class="good">更稳</span></div>
          </div>
        </div>
      </div>
    </div>
    <div id="scene5" class="scene">
      <div class="grain"></div>
      <div class="scene-content">
        <div class="eyebrow reveal">RESULT / 三图同屏</div>
        <h1 class="headline reveal">真正差距：不是审美，而是结构忠实度</h1>
        <div class="triple">
          <div class="image-card reveal"><span class="label blue">原型</span><img src="assets/original.png" /></div>
          <div class="image-card reveal"><span class="label orange">普通：更像重做</span><img src="assets/no-skill.png" /></div>
          <div class="image-card reveal"><span class="label green">技能：更像复原</span><img src="assets/with-skill.png" /></div>
        </div>
      </div>
    </div>
    <div id="scene6" class="scene">
      <div class="grain"></div>
      <div class="scene-content">
        <div class="eyebrow reveal">TAKEAWAY</div>
        <h1 class="headline reveal">这条案例能怎么讲？</h1>
        <div class="panel table reveal">
          <div class="row"><span class="k">公开结论</span><span>普通还原更像重新设计</span><span class="good">可以说</span></div>
          <div class="row"><span class="k">公开结论</span><span>技能还原更接近原型结构</span><span class="good">可以说</span></div>
          <div class="row"><span class="k">不要过度承诺</span><span>当前仍有视口、字号、数据误差</span><span class="bad">别说 1:1</span></div>
        </div>
      </div>
    </div>
    <div id="scene7" class="scene">
      <div class="grain"></div>
      <div class="scene-content">
        <div class="eyebrow reveal">GITHUB / 教程入口</div>
        <h1 class="headline reveal">完整素材已经整理成 GitHub 案例</h1>
        <p class="subline reveal">包含原型图、普通还原图、技能还原图、分析 JSON、对比报告和发布文案。</p>
        <div class="cta-card reveal">
          <div class="big">评论「教程」获取完整流程</div>
          <div class="small">适合 AI 生图到前端、截图还原、产品 Demo 快速起稿。</div>
          <div class="url">github.com/7tr75bcfv6-ops/image2-ui-code-restorer</div>
        </div>
      </div>
    </div>
    <div class="caption"><span>核心表达：技能版不是更会美化，而是更会按原型结构复原。</span><span class="tag">BILIBILI 16:9</span></div>
  </div>
  <script>
    window.__timelines = window.__timelines || {};
    var tl = gsap.timeline({ paused: true });
    tl.from("#scene1 .reveal", { y: 40, x: -24, opacity: 0, scale: 0.985, duration: 0.72, stagger: 0.08, ease: "expo.out" }, 0.2);
    tl.from(".caption", { y: 28, opacity: 0, duration: 0.48, ease: "power3.out" }, 1.0);
    ${sceneTransitionScript(["scene1", "scene2", "scene3", "scene4", "scene5", "scene6", "scene7"], starts)}
    tl.to("#scene7 .reveal", { opacity: 0, y: -20, duration: 0.42, stagger: 0.04, ease: "power2.in" }, 63.2);
    window.__timelines["bilibili-static-comparison"] = tl;
  </script>
</body>
</html>`;
}

function build() {
  mkdirSync(outRoot, { recursive: true });
  const projects = [
    ["douyin_9x16", douyinHtml()],
    ["bilibili_16x9", bilibiliHtml()],
  ];
  for (const [name, html] of projects) {
    const dir = resolve(outRoot, name);
    mkdirSync(dir, { recursive: true });
    copyAssets(dir);
    writeFileSync(resolve(dir, "DESIGN.md"), design);
    writeFileSync(resolve(dir, "index.html"), html);
  }
  writeFileSync(
    resolve(outRoot, "README.md"),
    `# HyperFrames 静态对比视频工程\n\n` +
      `本目录包含两套平台视频工程：\n\n` +
      `- douyin_9x16：抖音竖屏 1080x1920，45 秒\n` +
      `- bilibili_16x9：B站横屏 1920x1080，64 秒\n\n` +
      `核心结论：普通还原更像重新设计，技能还原更像按原型结构复原。\n\n` +
      `渲染命令：\n\n` +
      `\`\`\`bash\n` +
      `npx hyperframes render real_chain/hyperframes_static_comparison/douyin_9x16 --output ../renders/douyin_static_comparison_9x16.mp4 --quality standard\n` +
      `npx hyperframes render real_chain/hyperframes_static_comparison/bilibili_16x9 --output ../renders/bilibili_static_comparison_16x9.mp4 --quality standard\n` +
      `\`\`\`\n`,
  );
}

build();
console.log(`Built HyperFrames projects at ${outRoot}`);
