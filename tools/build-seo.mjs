/* Builds static, crawlable HTML for the whole knowledge corpus, plus a sitemap.
 *
 * The app itself is a single-page shell, which search engines index poorly. These
 * pages carry the same content as real documents so that a search for
 * "Rudrashtakam meaning" or "Bhimashankar Jyotirlinga" can land on one, with a
 * clear route into the app from every page.
 *
 * Run: node tools/build-seo.mjs
 */

import { writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://shivaaionline.in';
const LEARN = join(ROOT, 'learn');

const { MANTRAS } = await import('../assets/data/mantras.js');
const { STOTRAS, AARTIS } = await import('../assets/data/stotras.js');
const { FORMS, AVATARS, SYMBOLS, FACES, FAMILY } = await import('../assets/data/knowledge.js');
const { JYOTIRLINGAS, PANCHA_BHOOTA, PANCH_KEDAR } = await import('../assets/data/places.js');
const { STORIES } = await import('../assets/data/stories.js');
const { TEACHINGS } = await import('../assets/data/teachings.js');
const { FESTIVALS, PUJA } = await import('../assets/data/practice.js');
const { NAMES_108 } = await import('../assets/data/names108.js');

const esc = (v) =>
  String(v == null ? '' : v)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

const slug = (s) =>
  String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

/** First N characters of prose, cut on a word boundary, for the meta description. */
const summarise = (text, n = 155) => {
  const flat = String(text).replace(/\s+/g, ' ').trim();
  if (flat.length <= n) return flat;
  return flat.slice(0, flat.lastIndexOf(' ', n)) + '…';
};

const pages = [];

function page({ path, title, description, h1, eyebrow, bodyHTML, kind = 'Article', related = [] }) {
  const url = `${SITE}/${path}`;
  const ld = {
    '@context': 'https://schema.org',
    '@type': kind,
    headline: h1,
    description,
    url,
    inLanguage: 'en-IN',
    isPartOf: { '@type': 'WebSite', name: 'Shiv AI', url: SITE + '/' },
    publisher: { '@type': 'Organization', name: 'Shiv AI', url: SITE + '/' },
    about: { '@type': 'Thing', name: 'Lord Shiva' },
  };
  const crumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Shiv AI', item: SITE + '/' },
      { '@type': 'ListItem', position: 2, name: 'Learn', item: SITE + '/learn/' },
      { '@type': 'ListItem', position: 3, name: h1, item: url },
    ],
  };

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta name="theme-color" content="#080813">
<meta name="robots" content="index, follow, max-image-preview:large">
<link rel="canonical" href="${esc(url)}">
<meta property="og:type" content="article">
<meta property="og:site_name" content="Shiv AI">
<meta property="og:locale" content="en_IN">
<meta property="og:url" content="${esc(url)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:image" content="${SITE}/icons/og-image.png">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/icons/icon-192.png" sizes="192x192" type="image/png">
<link rel="apple-touch-icon" href="/icons/apple-touch-icon.png">
<link rel="manifest" href="/manifest.json">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Marcellus&family=Tiro+Devanagari+Sanskrit&display=swap">
<link rel="stylesheet" href="/assets/css/app.css">
<link rel="stylesheet" href="/assets/css/article.css">
<script type="application/ld+json">${JSON.stringify(ld)}</script>
<script type="application/ld+json">${JSON.stringify(crumbs)}</script>
</head>
<body>
<header class="art-bar">
  <a class="art-brand" href="/">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
         stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M12 21V8"/><path d="M5 10V5l2.2 2.4M5 10c0-3.4 3-6 7-6s7 2.6 7 6M19 10V5l-2.2 2.4"/>
      <path d="M12 8V2.5"/><path d="M9.2 12.6h5.6"/>
    </svg><span>Shiv AI</span></a>
  <a class="art-cta" href="/">Open the app</a>
</header>

<main class="article">
  <nav class="crumbs" aria-label="Breadcrumb">
    <a href="/">Shiv AI</a> <span>/</span> <a href="/learn/">Learn</a>
  </nav>
  ${eyebrow ? `<div class="eyebrow">${esc(eyebrow)}</div>` : ''}
  <h1>${esc(h1)}</h1>
  ${bodyHTML}

  ${related.length ? `<section class="related">
    <h2>Read next</h2>
    <ul>${related.map((r) => `<li><a href="${esc(r.href)}">${esc(r.label)}</a></li>`).join('')}</ul>
  </section>` : ''}

  <section class="appcta">
    <h2>Chant it in the app</h2>
    <p>Shiv AI is free, needs no account, and works without a connection.
    A 108-bead mala counter, a synthesised temple bell and tanpura, the great stotras,
    all twelve Jyotirlingas, and a panchang that knows every Pradosh and Shivaratri.</p>
    <a class="btn btn-primary" href="/">Open Shiv AI</a>
  </section>
</main>

<footer class="art-foot">
  <p><a href="/">Home</a> · <a href="/learn/">All topics</a> ·
     <a href="/privacy.html">Privacy</a> · <a href="/terms.html">Terms</a></p>
  <p class="small faint">Shiv AI is a devotional companion, not a priest, doctor or astrologer.
     Scriptural texts are traditional and in the public domain.</p>
</footer>
</body>
</html>`;

  const out = join(ROOT, path);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, html);
  pages.push({ url, path });
}

const prose = (t) =>
  String(t).split('\n').filter((l) => l.trim()).map((l) => `<p>${esc(l)}</p>`).join('\n');

const pick = (arr, n, exclude) =>
  arr.filter((x) => x.href !== exclude).sort(() => 0).slice(0, n);

/* ------------------------------------------------------------- build */

rmSync(LEARN, { recursive: true, force: true });

const idx = { stories: [], mantras: [], stotras: [], jyotirlingas: [], teachings: [], forms: [], avatars: [], festivals: [] };

// --- Stories
STORIES.forEach((s) => {
  const path = `learn/story/${slug(s.id)}.html`;
  idx.stories.push({ href: '/' + path, label: s.title });
});
STORIES.forEach((s) => {
  const path = `learn/story/${slug(s.id)}.html`;
  page({
    path,
    title: `${s.title} — the story of Shiva | Shiv AI`,
    description: summarise(s.text),
    h1: s.title,
    eyebrow: `${s.hi} · ${s.cat} · ${s.minutes} min read`,
    bodyHTML: `<p class="deva lead">${esc(s.hi)}</p>${prose(s.text)}
      <div class="callout"><h2>What it asks of you</h2><p>${esc(s.lesson)}</p></div>`,
    related: pick(idx.stories, 4, '/' + path),
  });
});

// --- Mantras
MANTRAS.forEach((m) => idx.mantras.push({ href: `/learn/mantra/${slug(m.id)}.html`, label: m.name }));
MANTRAS.forEach((m) => {
  const path = `learn/mantra/${slug(m.id)}.html`;
  page({
    path,
    title: `${m.name} — meaning, Devanagari and how to chant it | Shiv AI`,
    description: summarise(`${m.name}: ${m.meaning}`),
    h1: m.name,
    eyebrow: m.tag,
    bodyHTML: `<div class="scripture">
        <p class="deva">${esc(m.deva)}</p>
        <p class="translit">${esc(m.translit)}</p>
      </div>
      <h2>What it means</h2><p>${esc(m.meaning)}</p>
      <h2>Chanted for</h2><p>${esc(m.benefit)}</p>
      <h2>How to chant it</h2>
      <p>The traditional count is ${esc(m.count)} repetitions — one full mala.
      Sit facing east or north, light a lamp if you can, and let the sound settle
      rather than hurrying it. Shiv AI counts the beads for you and rings the bell
      every twenty-seven.</p>`,
    related: pick(idx.mantras, 5, '/' + path),
  });
});

// --- Stotras and aarti
const ALL_STOTRA = [...STOTRAS, ...AARTIS];
ALL_STOTRA.forEach((s) => idx.stotras.push({ href: `/learn/stotra/${slug(s.id)}.html`, label: s.name }));
ALL_STOTRA.forEach((s) => {
  const path = `learn/stotra/${slug(s.id)}.html`;
  page({
    path,
    title: `${s.name} — full text with meaning in English | Shiv AI`,
    description: `${s.name} (${s.hi}) by ${s.by}. ${s.verses.length} verses in Devanagari with transliteration and a plain-English meaning for each.`,
    h1: s.name,
    eyebrow: `${s.hi} · ${s.by}`,
    bodyHTML: `<p class="lead">${esc(s.note)}</p>
      ${s.complete === false ? '<div class="callout"><p>This page carries an excerpt rather than the complete text — only the verses that can be presented accurately.</p></div>' : ''}
      ${s.verses.map((v, i) => `<section class="verse">
        <h2>Verse ${i + 1}</h2>
        <p class="deva">${esc(v.deva)}</p>
        ${v.translit ? `<p class="translit">${esc(v.translit)}</p>` : ''}
        <p>${esc(v.meaning)}</p>
      </section>`).join('')}`,
    related: pick(idx.stotras, 5, '/' + path),
  });
});

// --- Jyotirlingas
JYOTIRLINGAS.forEach((j) => idx.jyotirlingas.push({ href: `/learn/jyotirlinga/${slug(j.name)}.html`, label: `${j.name} Jyotirlinga` }));
JYOTIRLINGAS.forEach((j) => {
  const path = `learn/jyotirlinga/${slug(j.name)}.html`;
  page({
    path,
    kind: 'Article',
    title: `${j.name} Jyotirlinga — story, location and when to visit | Shiv AI`,
    description: summarise(`${j.name} Jyotirlinga, ${j.where}. ${j.text}`),
    h1: `${j.name} Jyotirlinga`,
    eyebrow: `${j.hi} · Jyotirlinga ${j.n} of 12`,
    bodyHTML: `<p class="lead"><strong>Where:</strong> ${esc(j.where)}</p>
      ${prose(j.text)}
      <div class="callout"><h2>When to go</h2><p>${esc(j.best)}</p></div>`,
    related: pick(idx.jyotirlingas, 5, '/' + path),
  });
});

// --- Forms
FORMS.forEach((f) => idx.forms.push({ href: `/learn/form/${slug(f.id)}.html`, label: f.name }));
FORMS.forEach((f) => {
  const path = `learn/form/${slug(f.id)}.html`;
  page({
    path,
    title: `${f.name} — ${f.tag} | Shiv AI`,
    description: summarise(f.text),
    h1: f.name,
    eyebrow: `${f.hi} · ${f.tag}`,
    bodyHTML: `${prose(f.text)}<div class="callout"><h2>Where</h2><p>${esc(f.where)}</p></div>`,
    related: pick(idx.forms, 5, '/' + path),
  });
});

// --- Avatars
AVATARS.forEach((a) => idx.avatars.push({ href: `/learn/avatar/${slug(a.name)}.html`, label: a.name }));
AVATARS.forEach((a) => {
  const path = `learn/avatar/${slug(a.name)}.html`;
  page({
    path,
    title: `${a.name} — avatar ${a.n} of the nineteen avatars of Shiva | Shiv AI`,
    description: summarise(a.text),
    h1: a.name,
    eyebrow: `${a.hi} · Avatar ${a.n} of 19`,
    bodyHTML: prose(a.text),
    related: pick(idx.avatars, 5, '/' + path),
  });
});

// --- Teachings
TEACHINGS.forEach((t) => idx.teachings.push({ href: `/learn/teaching/${slug(t.id)}.html`, label: t.title }));
TEACHINGS.forEach((t) => {
  const path = `learn/teaching/${slug(t.id)}.html`;
  page({
    path,
    title: `${t.title} — a teaching of Shiva | Shiv AI`,
    description: summarise(t.text),
    h1: t.title,
    eyebrow: `${t.cat} · ${t.minutes} min read`,
    bodyHTML: `${prose(t.text)}<div class="callout"><h2>Practice</h2><p>${esc(t.practice)}</p></div>`,
    related: pick(idx.teachings, 5, '/' + path),
  });
});

// --- Festivals
FESTIVALS.forEach((f) => idx.festivals.push({ href: `/learn/festival/${slug(f.id)}.html`, label: f.name }));
FESTIVALS.forEach((f) => {
  const path = `learn/festival/${slug(f.id)}.html`;
  page({
    path,
    title: `${f.name} — when it falls and how it is kept | Shiv AI`,
    description: summarise(`${f.name} (${f.hi}). ${f.when}. ${f.text}`),
    h1: f.name,
    eyebrow: `${f.hi} · ${f.when}`,
    bodyHTML: `${prose(f.text)}
      <h2>How it is kept</h2>
      <ul>${f.how.map((h) => `<li>${esc(h)}</li>`).join('')}</ul>
      <div class="callout"><p>Fasting is a devotional choice, not a medical one. If you are pregnant,
      diabetic, unwell, elderly, or on medication that needs food, keep the prayer and skip the fast.</p></div>`,
    related: pick(idx.festivals, 5, '/' + path),
  });
});

// --- Single reference pages
page({
  path: 'learn/108-names-of-shiva.html',
  title: '108 Names of Lord Shiva — Ashtottara Shatanamavali with meanings | Shiv AI',
  description: 'The complete Shiva Ashtottara Shatanamavali: all 108 names of Lord Shiva in Devanagari and Roman script, each with its meaning.',
  h1: '108 Names of Lord Shiva',
  eyebrow: 'Ashtottara Shatanamavali',
  bodyHTML: `<p class="lead">Recited as “Om … namaḥ”, one name to a bead of the mala.
    These are the hundred and eight ways the tradition has found to say the same thing.</p>
    <ol class="names">${NAMES_108.map((n) =>
      `<li><span class="deva">${esc(n.deva)}</span> <strong>${esc(n.name)}</strong>
       <span class="dim">— ${esc(n.meaning)}</span></li>`).join('')}</ol>`,
  related: [
    { href: '/learn/mantra/panchakshara.html', label: 'Om Namah Shivaya' },
    { href: '/learn/stotra/rudrashtakam.html', label: 'Shiva Rudrashtakam' },
  ],
});

page({
  path: 'learn/symbols-of-shiva.html',
  title: 'The symbols of Shiva — trident, damaru, moon, serpent and ash explained | Shiv AI',
  description: 'What every symbol on Lord Shiva means: the trishula, the damaru, the third eye, the crescent moon, the Ganga, Vasuki, bhasma, rudraksha, the tiger skin, Nandi and the linga.',
  h1: 'The symbols of Shiva',
  eyebrow: 'What everything on Him means',
  bodyHTML: SYMBOLS.map((s) => `<section><h2>${esc(s.name)} — ${esc(s.hi)}</h2><p>${esc(s.text)}</p></section>`).join(''),
  related: idx.forms.slice(0, 5),
});

page({
  path: 'learn/five-faces-of-shiva.html',
  title: 'The five faces of Shiva — Sadyojata, Vamadeva, Aghora, Tatpurusha, Ishana | Shiv AI',
  description: 'The Panchanana: the five faces of Sadashiva, their directions, elements and powers — from creation in the west to revelation at the zenith.',
  h1: 'The five faces of Shiva',
  eyebrow: 'Panchanana',
  bodyHTML: FACES.map((f) => `<section><h2>${esc(f.name)} — ${esc(f.hi)}</h2>
    <p class="dim small">${esc(f.dir)} · ${esc(f.element)} · ${esc(f.power)}</p>
    <p>${esc(f.text)}</p></section>`).join(''),
  related: idx.forms.slice(0, 5),
});

page({
  path: 'learn/family-of-shiva.html',
  title: 'The family of Shiva — Parvati, Ganesha, Kartikeya and Nandi | Shiv AI',
  description: 'Who stands around Shiva on Kailash: Parvati and Sati, Ganesha, Kartikeya or Murugan, Nandi the bull, and Ashokasundari.',
  h1: 'The family of Shiva',
  eyebrow: 'Kailash',
  bodyHTML: FAMILY.map((f) => `<section><h2>${esc(f.name)} — ${esc(f.hi)}</h2>
    <p class="dim small">${esc(f.rel)}</p><p>${esc(f.text)}</p></section>`).join(''),
  related: idx.stories.slice(0, 5),
});

page({
  path: 'learn/how-to-worship-shiva-at-home.html',
  title: 'How to worship Shiva at home — puja steps and what to offer | Shiv AI',
  description: 'A nine-step household Shiva puja: abhishek order, bilva patra, bhasma, aarti and japa — with what may be offered and what must not, and why.',
  h1: 'How to worship Shiva at home',
  eyebrow: 'Nine steps',
  bodyHTML: `<p class="lead">${esc(PUJA.intro)}</p>
    ${PUJA.steps.map((s) => `<section><h2>${s.n}. ${esc(s.name)}</h2><p>${esc(s.text)}</p></section>`).join('')}
    <h2>What to offer, and what not to</h2>
    <table class="offer"><thead><tr><th></th><th>Offering</th><th>Why</th></tr></thead><tbody>
    ${PUJA.offer.map((o) => `<tr><td class="${o.yes ? 'yes' : 'no'}">${o.yes ? '✓' : '✕'}</td>
      <td><strong>${esc(o.item)}</strong></td><td>${esc(o.why)}</td></tr>`).join('')}
    </tbody></table>
    <p class="dim">${esc(PUJA.note)}</p>`,
  related: idx.festivals.slice(0, 5),
});

page({
  path: 'learn/pancha-bhoota-and-panch-kedar.html',
  title: 'The five element temples and the Panch Kedar | Shiv AI',
  description: 'The Pancha Bhoota Sthalams — earth, water, fire, air and ether — and the five Kedar shrines of Uttarakhand where the bull surfaced.',
  h1: 'The element temples and the Panch Kedar',
  eyebrow: 'Sacred geography',
  bodyHTML: `<h2>The Pancha Bhoota Sthalams</h2>
    <p>Five temples in the south, one for each element, where Shiva is worshipped as that element itself.</p>
    ${PANCHA_BHOOTA.map((p) => `<section><h3>${esc(p.temple)} — ${esc(p.el)} (${esc(p.hi)})</h3>
      <p class="dim small">${esc(p.where)}</p><p>${esc(p.text)}</p></section>`).join('')}
    <h2>The Panch Kedar</h2>
    <p>Fleeing the Pandavas, Shiva took the form of a bull and sank into the ground.
    Five parts surfaced across the Garhwal Himalaya, and each became a shrine.</p>
    <ul>${PANCH_KEDAR.map((k) => `<li><strong>${esc(k.name)}</strong> — ${esc(k.part)}. ${esc(k.where)}</li>`).join('')}</ul>`,
  related: idx.jyotirlingas.slice(0, 5),
});

// --- Learn index
const group = (title, items) =>
  `<section><h2>${esc(title)}</h2><ul class="idx">${items
    .map((i) => `<li><a href="${esc(i.href)}">${esc(i.label)}</a></li>`).join('')}</ul></section>`;

page({
  path: 'learn/index.html',
  kind: 'CollectionPage',
  title: 'Everything about Lord Shiva — stories, mantras, stotras and Jyotirlingas | Shiv AI',
  description: 'A complete reference on Lord Shiva: fourteen Puranic stories, ten mantras, seven stotras and the aarti, twelve Jyotirlingas, nineteen avatars, twenty-two teachings, the 108 names and how to worship at home.',
  h1: 'Everything about Lord Shiva',
  eyebrow: 'Learn',
  bodyHTML: `<p class="lead">Drawn from the Shiva Purana, the Linga Purana, the Skanda Purana,
    the Mahabharata and the living temple tradition. Free to read, and all of it is inside the app too.</p>
    ${group('The great stories', idx.stories)}
    ${group('Mantras', idx.mantras)}
    ${group('Stotras and aarti', idx.stotras)}
    ${group('The twelve Jyotirlingas', idx.jyotirlingas)}
    ${group('The forms of Shiva', idx.forms)}
    ${group('The nineteen avatars', idx.avatars)}
    ${group('Teachings', idx.teachings)}
    ${group('Observances', idx.festivals)}
    ${group('Reference', [
      { href: '/learn/108-names-of-shiva.html', label: '108 names of Shiva' },
      { href: '/learn/symbols-of-shiva.html', label: 'The symbols of Shiva' },
      { href: '/learn/five-faces-of-shiva.html', label: 'The five faces' },
      { href: '/learn/family-of-shiva.html', label: 'The family of Shiva' },
      { href: '/learn/how-to-worship-shiva-at-home.html', label: 'How to worship at home' },
      { href: '/learn/pancha-bhoota-and-panch-kedar.html', label: 'Element temples and Panch Kedar' },
    ])}`,
});

/* ------------------------------------------------------------ sitemap */

const today = process.env.SITEMAP_DATE || new Date().toISOString().slice(0, 10);
const urls = [
  { loc: SITE + '/', pri: '1.0', freq: 'daily' },
  { loc: SITE + '/learn/', pri: '0.9', freq: 'weekly' },
  ...pages
    .filter((p) => p.path !== 'learn/index.html')
    .map((p) => ({ loc: p.url, pri: '0.7', freq: 'monthly' })),
  { loc: SITE + '/privacy.html', pri: '0.3', freq: 'yearly' },
  { loc: SITE + '/terms.html', pri: '0.3', freq: 'yearly' },
];

const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls
    .map(
      (u) =>
        `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${today}</lastmod>\n` +
        `    <changefreq>${u.freq}</changefreq>\n    <priority>${u.pri}</priority>\n  </url>`
    )
    .join('\n') +
  `\n</urlset>\n`;

writeFileSync(join(ROOT, 'sitemap.xml'), sitemap);

console.log(`Wrote ${pages.length} learn pages and sitemap.xml with ${urls.length} URLs.`);
