#!/usr/bin/env python3
import argparse
import json
import os
from collections import Counter

try:
    from PIL import Image
except Exception as exc:
    raise SystemExit(
        "Pillow is required for image analysis. Install it or use the workspace bundled Python environment. "
        f"Original error: {exc}"
    )


def hex_color(rgb):
    return "#{:02X}{:02X}{:02X}".format(*rgb)


def dominant_palette(image, count):
    img = image.convert("RGBA")
    img.thumbnail((320, 320))
    pixels = []
    for r, g, b, a in img.getdata():
        if a < 16:
            continue
        if r > 248 and g > 248 and b > 248:
            continue
        pixels.append((r, g, b))
    if not pixels:
        pixels = [(r, g, b) for r, g, b, a in img.getdata() if a >= 16]
    if not pixels:
        return []
    small = Image.new("RGB", (len(pixels), 1))
    small.putdata(pixels)
    quantized = small.quantize(colors=min(32, max(2, count * 2))).convert("RGB")
    palette_counts = Counter(quantized.getdata())
    return [
        {"hex": hex_color(rgb), "count": n}
        for rgb, n in palette_counts.most_common(count)
    ]


def sample_points(image):
    rgb = image.convert("RGB")
    w, h = rgb.size
    points = {
        "top_left": (max(0, min(w - 1, 8)), max(0, min(h - 1, 8))),
        "top_right": (max(0, w - 9), max(0, min(h - 1, 8))),
        "bottom_left": (max(0, min(w - 1, 8)), max(0, h - 9)),
        "bottom_right": (max(0, w - 9), max(0, h - 9)),
        "center": (w // 2, h // 2),
    }
    return {name: hex_color(rgb.getpixel(point)) for name, point in points.items()}


def analyze(path, palette_count):
    image = Image.open(path)
    w, h = image.size
    return {
        "path": os.path.abspath(path),
        "filename": os.path.basename(path),
        "width": w,
        "height": h,
        "aspect_ratio": round(w / h, 6) if h else None,
        "suggested_viewport": f"{w}x{h}",
        "corner_and_center_samples": sample_points(image),
        "dominant_palette": dominant_palette(image, palette_count),
    }


def main():
    parser = argparse.ArgumentParser(
        description="Analyze Image2 UI reference screenshots for code restoration."
    )
    parser.add_argument("images", nargs="+", help="Reference image path(s)")
    parser.add_argument("--palette-count", type=int, default=12)
    parser.add_argument("--pretty", action="store_true", default=True)
    args = parser.parse_args()

    result = {
        "count": len(args.images),
        "images": [analyze(path, args.palette_count) for path in args.images],
    }
    print(json.dumps(result, ensure_ascii=False, indent=2 if args.pretty else None))


if __name__ == "__main__":
    main()
