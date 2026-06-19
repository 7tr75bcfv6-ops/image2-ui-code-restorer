import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { spawnSync } from "node:child_process";

const root = resolve(new URL("..", import.meta.url).pathname);
const real = resolve(root, "real_chain");
const outDir = resolve(real, "final_skeleton");
const tmpDir = resolve(outDir, "_tmp");
mkdirSync(tmpDir, { recursive: true });

const assets = {
  prototype: resolve(real, "assets/image2_real_prototype.png"),
  withSkillShot: resolve(real, "screenshots/with_skill_restoration.png"),
  noSkillShot: resolve(real, "screenshots/no_skill_restoration.png"),
  withSkillFallback: resolve(real, "recordings/skill_restoration_process_real_chain.mp4"),
  noSkillFallback: resolve(real, "recordings/no_skill_restoration_process_real_chain.mp4"),
  image2User: resolve(real, "user_recordings/01_image2_prompt_to_prototype_screenstudio.mp4"),
  withSkillUser: resolve(real, "user_recordings/02_with_skill_codex_restore_screenstudio_fast.mp4"),
  noSkillUser: resolve(real, "user_recordings/03_no_skill_codex_restore_screenstudio_fast.mp4"),
  talkingRaw: resolve(real, "user_recordings/04_talking_head_raw.mp4"),
  talkingClean: resolve(real, "user_recordings/05_talking_head_clean_cut.mp4"),
};

const selected = {
  talking: existsSync(assets.talkingClean) ? assets.talkingClean : existsSync(assets.talkingRaw) ? assets.talkingRaw : null,
  image2: existsSync(assets.image2User) ? assets.image2User : null,
  withSkill: existsSync(assets.withSkillUser) ? assets.withSkillUser : assets.withSkillFallback,
  noSkill: existsSync(assets.noSkillUser) ? assets.noSkillUser : assets.noSkillFallback,
};

const timing = [
  { id: "hook", start: 0, end: 5, text: "同一张图：技能还原 vs 普通还原" },
  { id: "pain", start: 5, end: 13, text: "布局、颜色、细节，截图还原最容易跑偏" },
  { id: "image2", start: 13, end: 22, text: "Image2 生成中文 SaaS 原型图" },
  { id: "with_skill", start: 22, end: 39, text: "调用 image2-ui-code-restorer：先分析，再还原" },
  { id: "no_skill", start: 39, end: 49, text: "不调用技能：流程更散，结果更依赖临场发挥" },
  { id: "compare", start: 49, end: 56, text: "差距不是玄学提示词，是工程化还原流程" },
  { id: "cta", start: 56, end: 60, text: "关注我，评论「教程」，领取 GitHub 完整流程" },
];

const srtLines = [
  "1",
  "00:00:00,000 --> 00:00:05,000",
  "同一张 AI 生成 UI 图，直接还原和调用技能还原，差距到底有多大？",
  "",
  "2",
  "00:00:05,000 --> 00:00:13,000",
  "布局不准、颜色不准、细节反复手改，是截图还原里最常见的问题。",
  "",
  "3",
  "00:00:13,000 --> 00:00:22,000",
  "这张图是先用 Image2 生成的中文 SaaS 后台原型。",
  "",
  "4",
  "00:00:22,000 --> 00:00:39,000",
  "调用 image2-ui-code-restorer 后，它会先分析图片尺寸、主色、模块结构，再还原成可运行前端。",
  "",
  "5",
  "00:00:39,000 --> 00:00:49,000",
  "不调用技能也能做，但结构和间距更容易跑偏。",
  "",
  "6",
  "00:00:49,000 --> 00:00:56,000",
  "真正拉开差距的是前面的分析和还原规则。",
  "",
  "7",
  "00:00:56,000 --> 00:01:00,000",
  "关注我，评论教程，我发你 GitHub 和使用流程。",
  "",
];

writeFileSync(resolve(outDir, "subtitles_60s_real_chain.srt"), srtLines.join("\n"));
writeFileSync(
  resolve(outDir, "voiceover_timing_60s.json"),
  JSON.stringify({ duration: 60, timing, selectedMedia: selected }, null, 2),
);

function run(cmd, args) {
  const res = spawnSync(cmd, args, { stdio: "inherit", cwd: root });
  if (res.status !== 0) {
    throw new Error(`${cmd} failed with exit code ${res.status}`);
  }
}

function fitFilter({ w, h, mode = "contain" }) {
  if (mode === "cover") {
    return `scale=${w}:${h}:force_original_aspect_ratio=increase,crop=${w}:${h}`;
  }
  return `scale=${w}:${h}:force_original_aspect_ratio=decrease,pad=${w}:${h}:(ow-iw)/2:(oh-ih)/2`;
}

function withFormat(...parts) {
  return [...parts.filter(Boolean), "format=yuv420p"].join(",");
}

function makeImageSegment({ file, input, duration, w, h, text, platform, mode = "contain", blurBg = true }) {
  const vf = withFormat(fitFilter({ w, h, mode }));
  run("ffmpeg", [
    "-y",
    "-loop",
    "1",
    "-t",
    String(duration),
    "-i",
    input,
    "-f",
    "lavfi",
    "-t",
    String(duration),
    "-i",
    "anullsrc=channel_layout=stereo:sample_rate=44100",
    "-vf",
    vf,
    "-r",
    "30",
    "-c:v",
    "libx264",
    "-preset",
    "veryfast",
    "-pix_fmt",
    "yuv420p",
    "-c:a",
    "aac",
    "-shortest",
    file,
  ]);
}

function makeVideoSegment({ file, input, duration, w, h, text, platform, mode = "contain", blurBg = true }) {
  const vf = withFormat(fitFilter({ w, h, mode }));
  run("ffmpeg", [
    "-y",
    "-stream_loop",
    "-1",
    "-t",
    String(duration),
    "-i",
    input,
    "-f",
    "lavfi",
    "-t",
    String(duration),
    "-i",
    "anullsrc=channel_layout=stereo:sample_rate=44100",
    "-vf",
    vf,
    "-r",
    "30",
    "-map",
    "0:v:0",
    "-map",
    "1:a:0",
    "-c:v",
    "libx264",
    "-preset",
    "veryfast",
    "-pix_fmt",
    "yuv420p",
    file,
  ]);
}

function makeCompareSegment({ file, duration, w, h, platform }) {
  const vf = [
    `[0:v]scale=${Math.floor(w / 2 - 70)}:${Math.floor(h * 0.58)}:force_original_aspect_ratio=decrease,pad=${Math.floor(w / 2 - 70)}:${Math.floor(h * 0.58)}:(ow-iw)/2:(oh-ih)/2:color=0xF8F9FB[left]`,
    `[1:v]scale=${Math.floor(w / 2 - 70)}:${Math.floor(h * 0.58)}:force_original_aspect_ratio=decrease,pad=${Math.floor(w / 2 - 70)}:${Math.floor(h * 0.58)}:(ow-iw)/2:(oh-ih)/2:color=0xF8F9FB[right]`,
    `color=0xF8F9FB:s=${w}x${h}:d=${duration}[bg]`,
    `[bg][left]overlay=${platform === "douyin" ? 40 : 70}:${platform === "douyin" ? 460 : 230}[m1]`,
    `[m1][right]overlay=${Math.floor(w / 2 + 30)}:${platform === "douyin" ? 460 : 230}[stack]`,
    `[stack]format=yuv420p[v]`,
  ].join(";");
  run("ffmpeg", [
    "-y",
    "-loop",
    "1",
    "-t",
    String(duration),
    "-i",
    assets.withSkillShot,
    "-loop",
    "1",
    "-t",
    String(duration),
    "-i",
    assets.noSkillShot,
    "-f",
    "lavfi",
    "-t",
    String(duration),
    "-i",
    "anullsrc=channel_layout=stereo:sample_rate=44100",
    "-filter_complex",
    vf,
    "-map",
    "[v]",
    "-map",
    "2:a",
    "-r",
    "30",
    "-c:v",
    "libx264",
    "-preset",
    "veryfast",
    "-pix_fmt",
    "yuv420p",
    "-c:a",
    "aac",
    "-shortest",
    file,
  ]);
}

function concatSegments(files, output) {
  const listPath = resolve(tmpDir, `${output.split("/").pop()}.txt`);
  writeFileSync(listPath, files.map((f) => `file '${f.replace(/'/g, "'\\''")}'`).join("\n"));
  run("ffmpeg", ["-y", "-f", "concat", "-safe", "0", "-i", listPath, "-c", "copy", output]);
}

function buildPlatform({ name, w, h, platform }) {
  const segDir = resolve(tmpDir, name);
  mkdirSync(segDir, { recursive: true });
  const files = [];
  const add = (filename) => {
    const p = resolve(segDir, filename);
    files.push(p);
    return p;
  };

  if (selected.talking) {
    makeVideoSegment({
      file: add("01_hook.mp4"),
      input: selected.talking,
      duration: 5,
      w,
      h,
      text: "同一张图：技能还原 vs 普通还原",
      platform,
      mode: "cover",
      blurBg: false,
    });
  } else {
    makeImageSegment({
      file: add("01_hook.mp4"),
      input: assets.prototype,
      duration: 5,
      w,
      h,
      text: "同一张图：技能还原 vs 普通还原",
      platform,
    });
  }

  makeImageSegment({
    file: add("02_pain.mp4"),
    input: assets.prototype,
    duration: 8,
    w,
    h,
    text: "截图还原最容易跑偏：布局 / 颜色 / 细节",
    platform,
  });

  if (selected.image2) {
    makeVideoSegment({
      file: add("03_image2.mp4"),
      input: selected.image2,
      duration: 9,
      w,
      h,
      text: "Image2 生成真实原型图",
      platform,
    });
  } else {
    makeImageSegment({
      file: add("03_image2.mp4"),
      input: assets.prototype,
      duration: 9,
      w,
      h,
      text: "Image2 生成真实原型图",
      platform,
    });
  }

  makeVideoSegment({
    file: add("04_with_skill.mp4"),
    input: selected.withSkill,
    duration: 17,
    w,
    h,
    text: "技能版：先分析截图，再生成可运行前端",
    platform,
  });

  makeVideoSegment({
    file: add("05_no_skill.mp4"),
    input: selected.noSkill,
    duration: 10,
    w,
    h,
    text: "普通版：能做，但流程更散",
    platform,
  });

  makeCompareSegment({
    file: add("06_compare.mp4"),
    duration: 7,
    w,
    h,
    platform,
  });

  makeImageSegment({
    file: add("07_cta.mp4"),
    input: assets.prototype,
    duration: 4,
    w,
    h,
    text: "评论「教程」领取 GitHub 完整流程",
    platform,
  });

  concatSegments(files, resolve(outDir, `final_${name}_real_chain_skeleton.mp4`));
}

buildPlatform({ name: "douyin_9x16", w: 1080, h: 1920, platform: "douyin" });
buildPlatform({ name: "bilibili_16x9", w: 1920, h: 1080, platform: "bilibili" });

writeFileSync(
  resolve(outDir, "README.md"),
  `# 真实链路成片骨架\n\n` +
    `本目录由 scripts/build_final_skeleton_videos.mjs 生成。\n\n` +
    `## 输出\n\n` +
    `- final_douyin_9x16_real_chain_skeleton.mp4\n` +
    `- final_bilibili_16x9_real_chain_skeleton.mp4\n` +
    `- subtitles_60s_real_chain.srt\n` +
    `- voiceover_timing_60s.json\n\n` +
    `## 替换规则\n\n` +
    `脚本会优先读取 real_chain/user_recordings/ 下的真人和 Screen Studio 录屏素材。如果这些文件不存在，就使用真实链路截图和流程占位视频生成预览版。\n\n` +
    `你录完素材后，按 REAL_CHAIN_RECORDING_HANDOFF.md 的命名放入 user_recordings，再运行：\n\n` +
    `\`\`\`bash\nnode scripts/build_final_skeleton_videos.mjs\n\`\`\`\n\n` +
    `## 当前媒体选择\n\n` +
    `\`\`\`json\n${JSON.stringify(selected, null, 2)}\n\`\`\`\n`,
);

console.log("Built real-chain skeleton videos in", outDir);
