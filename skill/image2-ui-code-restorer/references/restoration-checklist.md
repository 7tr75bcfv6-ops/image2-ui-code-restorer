# Image2 UI Restoration Checklist

Use this reference when restoring one or more Image2 UI screenshots into frontend code.

## Parameter Sheet

For each source image, capture:

- `source`: image path or label
- `viewport`: exact width x height
- `screen_name`: stable output name
- `layout`: fixed desktop, mobile, tablet, or mixed
- `background`: page background colors and gradients
- `containers`: sidebar/topbar/main content widths and heights
- `modules`: ordered list of cards, banners, tables, forms, panels, dialogs
- `typography`: font family guess, key font sizes, weights, line heights
- `colors`: primary, secondary, text, muted text, border, card bg, status colors
- `assets_to_crop`: illustrations, avatars, logos, complex icons, images
- `implementation_target`: standalone HTML/Tailwind, React, Vue, Next.js, etc.

## Module Checklist

For every module:

- Record x/y position relative to the screen or parent.
- Record width/height and inner padding.
- Record gap between sibling elements.
- Record corner radius, border width/color, shadow, opacity.
- Retype exact visible copy; if text is illegible, keep the visual role and note the uncertainty.
- Preserve table density: header height, row height, column proportions, dividers, status tags.
- Preserve form density: input height, placeholder style, icon placement, button sizes.
- Preserve active/selected states exactly.

## Asset Cropping Rules

- Crop source bitmap assets generously enough to preserve soft shadows.
- Name assets by role: `hero-ai.png`, `avatar-admin.png`, `chart-preview.png`.
- Use actual cropped source assets for complex Image2 visuals.
- Use code/vector icons only for simple repeated system icons when exact source icons are not central to fidelity.
- Do not crop ordinary text or simple cards as images.

## Code Rules

- Prefer real DOM for layout, text, cards, tables, forms, progress bars, buttons, badges, and navs.
- Use exact pixel utilities for the first pass.
- Keep asset paths local and stable.
- Use absolute/fixed positioning when pixel fidelity is more important than content flexibility.
- Use CSS grid/table layout for real tables when column alignment matters.
- In project integrations, preserve existing component and CSS conventions.

## Browser QA

Capture at the exact reference viewport:

- Reference `1578x996` means browser screenshot should be `1578x996`.
- Disable browser scrollbars if the reference does not show them.
- Confirm all assets load.
- Compare left/right/top/bottom edges first.
- Then compare major module boxes.
- Then compare typography and data density.
- Then compare details: shadows, icons, tags, dividers.

## Final Report Template

Report:

- `Delivered`: runnable file(s) or route(s)
- `Assets`: cropped asset directory
- `Reference size`: one per screen
- `Validation`: screenshot path(s), if produced
- `Known deviations`: exact remaining mismatches
- `Recommended next pass`: targeted areas only, not a broad rewrite
