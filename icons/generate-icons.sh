#!/bin/bash
# Generates Shiv AI icons using ImageMagick if available, else creates SVG placeholders
for size in 72 96 128 144 152 192 384 512; do
  if command -v convert &>/dev/null; then
    convert -size ${size}x${size} \
      gradient:#1a0a2e-#0a0a1a \
      -fill '#ff6b35' -font DejaVu-Sans-Bold -pointsize $((size/3)) \
      -gravity Center -annotate 0 '🔱' \
      "icon-${size}.png" 2>/dev/null || \
    convert -size ${size}x${size} xc:'#12122a' \
      -fill '#ff6b35' -font DejaVu-Sans -pointsize $((size/3)) \
      -gravity Center -annotate 0 'S' \
      "icon-${size}.png"
  fi
done
echo "Done"
