/* Generates every launcher icon, the maskable variants, the favicon and the
   social card from one vector source. Run: node tools/make-icons.mjs */

import sharp from 'sharp';
import { writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'icons');
mkdirSync(OUT, { recursive: true });

const INK = '#080813';
const INK2 = '#191934';
const GOLD = '#F2CE72';
const GOLD2 = '#C9962C';
const EMBER = '#E8743C';

/** The ring of flames that surrounds Nataraja. */
function ring(cx, cy, r, n, size, opacity) {
  let out = '';
  for (let i = 0; i < n; i++) {
    const a = (i / n) * 360;
    out += `<path d="M ${cx} ${cy - r} l ${size * 0.42} ${size} l ${-size * 0.42} ${-size * 0.34} l ${-size * 0.42} ${size * 0.34} Z"
             transform="rotate(${a} ${cx} ${cy})" fill="${EMBER}" opacity="${opacity}"/>`;
  }
  return out;
}

/**
 * @param {number} S     canvas size
 * @param {number} scale 1 = comfortable padding; smaller keeps a maskable safe zone
 * @param {boolean} bleed full-bleed background (maskable) vs rounded square
 */
function iconSVG(S, scale = 1, bleed = false) {
  const c = S / 2;
  const k = S / 512; // everything below is authored at 512
  const g = scale;

  const bg = bleed
    ? `<rect width="${S}" height="${S}" fill="url(#bg)"/>`
    : `<rect width="${S}" height="${S}" rx="${S * 0.222}" fill="url(#bg)"/>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
  <defs>
    <radialGradient id="bg" cx="50%" cy="38%" r="72%">
      <stop offset="0%" stop-color="${INK2}"/>
      <stop offset="62%" stop-color="${INK}"/>
      <stop offset="100%" stop-color="#04040C"/>
    </radialGradient>
    <radialGradient id="halo" cx="50%" cy="46%" r="46%">
      <stop offset="0%" stop-color="${GOLD}" stop-opacity="0.13"/>
      <stop offset="52%" stop-color="${EMBER}" stop-opacity="0.05"/>
      <stop offset="100%" stop-color="${EMBER}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="metal" gradientUnits="userSpaceOnUse"
                    x1="0" y1="${c - 250 * k}" x2="0" y2="${c + 180 * k}">
      <stop offset="0%" stop-color="${GOLD}"/>
      <stop offset="55%" stop-color="#E8BE5C"/>
      <stop offset="100%" stop-color="${GOLD2}"/>
    </linearGradient>
  </defs>

  ${bg}
  <circle cx="${c}" cy="${c}" r="${S * 0.44}" fill="url(#halo)"/>
  <g transform="translate(${c} ${c}) scale(${g}) translate(${-c} ${-c})">
    ${ring(c, c, 196 * k, 28, 15 * k, 0.5)}
    <circle cx="${c}" cy="${c}" r="${168 * k}" fill="none" stroke="${GOLD2}" stroke-opacity="0.34" stroke-width="${2.4 * k}"/>
    <circle cx="${c}" cy="${c}" r="${150 * k}" fill="none" stroke="${GOLD2}" stroke-opacity="0.16"
            stroke-width="${1.6 * k}" stroke-dasharray="${5 * k} ${11 * k}"/>

    <!-- trishul -->
    <g fill="none" stroke="url(#metal)" stroke-width="${16 * k}"
       stroke-linecap="round" stroke-linejoin="round">
      <path d="M ${c} ${c + 150 * k} L ${c} ${c - 236 * k}"/>
      <path d="M ${c - 24 * k} ${c - 196 * k} L ${c} ${c - 244 * k} L ${c + 24 * k} ${c - 196 * k}"/>
      <path d="M ${c - 100 * k} ${c - 52 * k}
               C ${c - 100 * k} ${c - 150 * k} ${c - 54 * k} ${c - 186 * k} ${c} ${c - 186 * k}
               C ${c + 54 * k} ${c - 186 * k} ${c + 100 * k} ${c - 150 * k} ${c + 100 * k} ${c - 52 * k}"/>
      <path d="M ${c - 100 * k} ${c - 52 * k} L ${c - 100 * k} ${c - 172 * k} L ${c - 70 * k} ${c - 138 * k}"/>
      <path d="M ${c + 100 * k} ${c - 52 * k} L ${c + 100 * k} ${c - 172 * k} L ${c + 70 * k} ${c - 138 * k}"/>
      <path d="M ${c - 46 * k} ${c + 26 * k} L ${c + 46 * k} ${c + 26 * k}"/>
    </g>

    <!-- the crescent worn on the head: outer disc minus an offset disc -->
    <path fill="${GOLD}" opacity="0.95" fill-rule="evenodd"
          d="M ${c - 86 * k} ${c - 78 * k}
             a ${25 * k} ${25 * k} 0 1 0 ${50 * k} 0
             a ${25 * k} ${25 * k} 0 1 0 ${-50 * k} 0 Z
             M ${c - 70 * k} ${c - 78 * k}
             a ${20 * k} ${20 * k} 0 1 0 ${40 * k} 0
             a ${20 * k} ${20 * k} 0 1 0 ${-40 * k} 0 Z"/>
  </g>
</svg>`;
}

function ogSVG() {
  const W = 1200, H = 630;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <radialGradient id="bg" cx="28%" cy="34%" r="88%">
      <stop offset="0%" stop-color="#1A1A38"/><stop offset="58%" stop-color="${INK}"/>
      <stop offset="100%" stop-color="#04040C"/>
    </radialGradient>
    <radialGradient id="halo" cx="26%" cy="50%" r="34%">
      <stop offset="0%" stop-color="${GOLD}" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="${EMBER}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="metal" gradientUnits="userSpaceOnUse" x1="0" y1="80" x2="0" y2="480">
      <stop offset="0%" stop-color="${GOLD}"/><stop offset="100%" stop-color="${GOLD2}"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <circle cx="316" cy="315" r="250" fill="url(#halo)"/>
  ${ring(316, 315, 178, 26, 14, 0.42)}
  <circle cx="316" cy="315" r="152" fill="none" stroke="${GOLD2}" stroke-opacity="0.3" stroke-width="2"/>
  <g fill="none" stroke="url(#metal)" stroke-width="14" stroke-linecap="round" stroke-linejoin="round">
    <path d="M316 468V246"/>
    <path d="M220 278V178l34 36"/>
    <path d="M220 278C220 179 264 133 316 133s96 46 96 145"/>
    <path d="M412 278V178l-34 36"/>
    <path d="M316 246V96"/>
    <path d="M270 336h92"/>
  </g>
  <text x="620" y="272" font-family="Georgia, 'Times New Roman', serif" font-size="88"
        fill="${GOLD}" letter-spacing="10">SHIV AI</text>
  <text x="622" y="330" font-family="system-ui, sans-serif" font-size="27" fill="#A7A1B6">
    Talk to Lord Shiva · Mantras · Aarti · Panchang
  </text>
  <text x="622" y="392" font-family="system-ui, sans-serif" font-size="23" fill="#EBE6DA">
    108-bead japa · 12 Jyotirlingas · 19 avatars
  </text>
  <text x="622" y="430" font-family="system-ui, sans-serif" font-size="23" fill="#EBE6DA">
    Every Pradosh and Shivaratri, computed for your city
  </text>
  <rect x="622" y="470" width="196" height="46" rx="23" fill="none" stroke="${EMBER}" stroke-opacity="0.6"/>
  <text x="720" y="500" font-family="system-ui, sans-serif" font-size="20" fill="#F2A077"
        text-anchor="middle">Free for everyone</text>
  <text x="622" y="566" font-family="system-ui, sans-serif" font-size="19" fill="#6E6982">shivaaionline.in</text>
</svg>`;
}

const png = (svg, size) =>
  sharp(Buffer.from(svg)).resize(size, size, { fit: 'fill' }).png({ compressionLevel: 9 }).toBuffer();

/** Minimal ICO container wrapping PNG frames. */
function ico(frames) {
  const n = frames.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(n, 4);
  const dir = Buffer.alloc(16 * n);
  let offset = 6 + 16 * n;
  frames.forEach((f, i) => {
    const b = i * 16;
    dir.writeUInt8(f.size >= 256 ? 0 : f.size, b);
    dir.writeUInt8(f.size >= 256 ? 0 : f.size, b + 1);
    dir.writeUInt8(0, b + 2); dir.writeUInt8(0, b + 3);
    dir.writeUInt16LE(1, b + 4); dir.writeUInt16LE(32, b + 6);
    dir.writeUInt32LE(f.data.length, b + 8);
    dir.writeUInt32LE(offset, b + 12);
    offset += f.data.length;
  });
  return Buffer.concat([header, dir, ...frames.map((f) => f.data)]);
}

const SIZES = [72, 96, 128, 144, 152, 192, 256, 384, 512, 1024];

for (const s of SIZES) {
  writeFileSync(join(OUT, `icon-${s}.png`), await png(iconSVG(512, 1, false), s));
}
// Maskable: full bleed, artwork inside the 80% safe circle.
for (const s of [192, 512]) {
  writeFileSync(join(OUT, `maskable-${s}.png`), await png(iconSVG(512, 0.68, true), s));
}
writeFileSync(join(OUT, 'apple-touch-icon.png'), await png(iconSVG(512, 0.92, true), 180));
writeFileSync(join(OUT, 'play-store-512.png'), await png(iconSVG(512, 1, true), 512));

writeFileSync(
  join(ROOT, 'favicon.ico'),
  ico(await Promise.all([16, 32, 48].map(async (s) => ({ size: s, data: await png(iconSVG(512, 1, false), s) }))))
);

writeFileSync(
  join(OUT, 'og-image.png'),
  await sharp(Buffer.from(ogSVG())).png({ compressionLevel: 9 }).toBuffer()
);

// Play Store feature graphic, 1024x500.
const feature = ogSVG()
  .replace('width="1200" height="630" viewBox="0 0 1200 630"', 'width="1024" height="500" viewBox="60 60 1080 500"');
writeFileSync(join(OUT, 'play-feature-graphic.png'),
  await sharp(Buffer.from(feature)).png({ compressionLevel: 9 }).toBuffer());

console.log('Wrote icons:');
for (const f of ['icon-512.png', 'maskable-512.png', 'apple-touch-icon.png', 'og-image.png', 'play-feature-graphic.png', 'play-store-512.png']) {
  const m = await sharp(join(OUT, f)).metadata();
  console.log(`  ${f.padEnd(28)} ${m.width}x${m.height}`);
}
console.log('  favicon.ico                  16/32/48');
