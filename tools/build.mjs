/* Assembles dist/ — exactly what belongs on the CDN, and nothing else.
 * Publishing the repo root would ship node_modules, tools/ and package.json.
 * Run: node tools/build.mjs   (or: npm run build) */

import { cpSync, mkdirSync, rmSync, existsSync, statSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');

// Regenerate the static learn pages and the sitemap so lastmod matches the deploy.
execFileSync(process.execPath, [join(ROOT, 'tools', 'build-seo.mjs')], { stdio: 'inherit', cwd: ROOT });

rmSync(DIST, { recursive: true, force: true });
mkdirSync(DIST, { recursive: true });

const FILES = [
  'index.html', 'privacy.html', 'terms.html', 'offline.html',
  'manifest.json', 'sw.js', 'favicon.ico', 'robots.txt', 'sitemap.xml', '_redirects',
];
const DIRS = ['assets', 'icons', 'learn', '.well-known'];

for (const f of FILES) {
  const src = join(ROOT, f);
  if (!existsSync(src)) throw new Error(`build: missing required file ${f}`);
  cpSync(src, join(DIST, f));
}
for (const d of DIRS) {
  const src = join(ROOT, d);
  if (!existsSync(src)) throw new Error(`build: missing required directory ${d}`);
  cpSync(src, join(DIST, d), { recursive: true });
}

const walk = (dir) => {
  let n = 0, bytes = 0;
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) { const r = walk(p); n += r.n; bytes += r.bytes; }
    else { n += 1; bytes += statSync(p).size; }
  }
  return { n, bytes };
};
const { n, bytes } = walk(DIST);
console.log(`dist/ ready — ${n} files, ${(bytes / 1024).toFixed(0)} KB`);

// A deploy that lost the app shell or the asset links file is worse than no deploy.
for (const must of ['index.html', 'assets/js/app.js', 'icons/icon-512.png', '.well-known/assetlinks.json']) {
  if (!existsSync(join(DIST, must))) throw new Error(`build: dist/${must} is missing`);
}
console.log('dist/ verified.');
