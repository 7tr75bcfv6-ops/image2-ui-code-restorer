---
name: image2-ui-code-restorer
description: Restore one or more Image2-generated UI screenshots/effect images into runnable frontend code. Use when the user provides UI images and asks to 1:1 restore, convert, implement, land, or reproduce them as HTML/Tailwind, React, Vue, or project-native frontend code without Figma; especially for SaaS dashboards, Chinese UI screenshots, landing pages, admin systems, mobile/web mockups, and batches of multiple screens that need code plus screenshot comparison.
---

# Image2 UI Code Restorer

## Goal

Treat Image2 output images as the source of truth for implementation. Build runnable frontend UI by measuring the image, extracting hard-to-code visual assets, writing exact desktop-first code, then validating with a browser screenshot at the same viewport.

Default output is complete runnable `HTML + Tailwind CSS`. If the user is inside an existing project, use the project's framework, routing, component style, and asset conventions instead.

## Required Workflow

1. **Collect source images**
   - Accept one or many UI screenshots.
   - Preserve original dimensions and aspect ratio.
   - If multiple images are provided, create one page/route/component per image unless the user asks for a single combined flow.

2. **Analyze before coding**
   - Run `scripts/analyze_references.py <image...>` when local image paths are available.
   - Record image size, aspect ratio, main palette, page background, major modules, and likely non-code assets.
   - Write a short parameter sheet in the working notes before implementation.

3. **Decompose modules**
   - Split each screen top-to-bottom and left-to-right: sidebar, topbar, hero/banner, cards, tables, forms, navs, dialogs, footer, mobile chrome, etc.
   - For each module, note x/y position, width, height, gaps, radius, border, shadow, typography, text content, icon/image assets, and state.

4. **Extract visual assets**
   - Crop images for non-code visuals: 3D illustrations, product renders, avatars, complex icons, screenshots inside screenshots, maps, charts, decorative bitmap effects.
   - Do not redraw these with CSS or swap to generic icons when the crop preserves fidelity.
   - Save crops under the target app's asset directory, or under `outputs/assets/` for standalone deliverables.

5. **Implement desktop 1:1 first**
   - Use the original image width/height as the first desktop viewport.
   - Use exact pixel values for layout: widths, heights, gaps, padding, font sizes, line heights, border radii, shadows, table row heights, and button dimensions.
   - Re-type UI text as real text. Do not leave the whole screenshot as a background except as a temporary hidden/overlay reference if useful.
   - Use the repo's existing design system if integrating into a project. Otherwise use Tailwind atomic classes with arbitrary values such as `w-[234px]`, `rounded-[9px]`, `bg-[#f5f8fd]`.

6. **Handle multiple screens**
   - For standalone HTML, create `screen-name.html` per image plus an optional `index.html` linking them.
   - For app projects, create a route/view per image and share tokens/assets only when the screens clearly belong to the same product.
   - Keep each screen's reference dimensions documented; do not force unrelated images into one responsive layout.

7. **Validate visually**
   - Open or serve the page in a browser.
   - Capture a screenshot using the same viewport as the reference image.
   - Compare against the reference image for skeleton, spacing, colors, typography, assets, and table/form density.
   - Make one focused correction pass for obvious mismatches unless the user asks for deeper iteration.

8. **Deliver**
   - Provide links to runnable files, generated assets, and comparison screenshots.
   - Mention remaining deviations honestly: icon substitutions, OCR uncertainty, font mismatch, tiny text differences, or responsive work not yet done.

## Hard Rules

- Do not use Figma for this workflow unless the user explicitly asks for Figma.
- Do not redesign, beautify, simplify, or reinterpret the image.
- Do not start with responsive behavior. Restore the source desktop/mobile viewport first, then adapt.
- Do not replace complex Image2 artwork with generic icons if cropping the source image is possible.
- Do not rely on a full-image background as the final implementation; it must be real DOM/code with cropped assets only where appropriate.
- Do not run broad codebase exploration for standalone HTML deliverables. Create the page directly in `outputs/`.

## Resource Guide

- Read `references/restoration-checklist.md` for the detailed parameter sheet and QA checklist, especially for multi-image batches.
- Run `scripts/analyze_references.py` to get dimensions, aspect ratio, palette, and corner color samples.

## Useful Commands

```bash
python3 /Users/rk/.codex/skills/image2-ui-code-restorer/scripts/analyze_references.py reference.png
python3 /Users/rk/.codex/skills/image2-ui-code-restorer/scripts/analyze_references.py screen-a.png screen-b.png
```
