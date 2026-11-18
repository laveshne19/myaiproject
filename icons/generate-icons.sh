#!/bin/bash
# Generate PNG icons from logo.svg using Inkscape or rsvg-convert or ImageMagick
# Run from the icons/ directory or project root

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
SVG="$SCRIPT_DIR/logo.svg"

if [ ! -f "$SVG" ]; then
  echo "logo.svg not found at $SVG"
  exit 1
fi

echo "Generating icons from $SVG ..."

for SIZE in 72 96 128 144 152 192 384 512; do
  OUT="$SCRIPT_DIR/icon-${SIZE}.png"
  if command -v inkscape &>/dev/null; then
    inkscape "$SVG" --export-png="$OUT" --export-width=$SIZE --export-height=$SIZE
  elif command -v rsvg-convert &>/dev/null; then
    rsvg-convert -w $SIZE -h $SIZE "$SVG" -o "$OUT"
  elif command -v convert &>/dev/null; then
    convert -background none -size "${SIZE}x${SIZE}" "$SVG" "$OUT"
  else
    echo "No SVG renderer found (inkscape / rsvg-convert / imagemagick)"
    exit 1
  fi
  echo "  icon-${SIZE}.png ✓"
done

echo "Done!"
