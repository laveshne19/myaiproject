# Shiv AI

A free devotional companion for Lord Shiva — web app, installable PWA, and an
Android TWA on Google Play. Live at **[shivaaionline.in](https://shivaaionline.in)**.

Five places:

| | | |
|---|---|---|
| **Darshan** | दर्शन | Today's tithi and sun times, the day's teaching and mantra, the next observance |
| **Jaap** | जाप | Ten mantras, a 108-bead mala counter, auto-chant, tanpura drone, guided breath, streaks |
| **Gyaan** | ज्ञान | 12 forms · 19 avatars · 14 stories · 22 teachings · 7 stotras and the aarti · 12 Jyotirlingas · 12 symbols · 5 faces · the family · 108 names |
| **Vaani** | वाणी | Conversation in the voice of Shiva, in English, Hinglish, Hindi or Sanskrit |
| **Panchang** | पंचांग | Tithi, sunrise/sunset, and every Pradosh, Masik and Maha Shivaratri, computed for your city |

Everything except Vaani works with no connection.

## How it is built

No framework and no bundler. The app is ES modules served as authored, which keeps
it small and fast on the low-end Android phones most of its users will have.

```
index.html              app shell (no inline JS — the CSP forbids it)
assets/css/app.css      the design system
assets/css/article.css  the static learn pages
assets/js/app.js        router and the five views
assets/js/ui.js         escaping, storage, toast, bottom sheet, ash motes
assets/js/icons.js      hand-drawn line SVGs
assets/js/audio.js      Web Audio: bell, conch, damaru, tanpura, japa
assets/js/panchang.js   solar/lunar astronomy → tithi and observances
assets/js/chat.js       Vaani client, crisis detection, safe rendering
assets/data/*.js        the knowledge corpus (loaded on demand)
netlify/functions/chat.js  the only server-side code
learn/                  111 generated static pages (do not edit — regenerate)
tools/                  build, SEO generator, icon generator
```

### The sound is synthesised, not sampled

There are no audio files. `audio.js` builds the temple bell from an inharmonic
partial stack, the conch from band-passed noise over a low tone, the damaru from
falling resonant transients, and a four-string tanpura from additive plucks with a
jawari-like bloom in the upper harmonics. That means the app owns every sound it
makes, ships nothing licensed, and works offline.

### The panchang is real astronomy

`panchang.js` computes solar and lunar longitude following Meeus, and derives the
tithi from the Moon's elongation. It was checked against the January 2000 new and
full moon instants and the 2017 eclipse (within 0.03°), and its sunrise times
against known values for Delhi, Mumbai and Chennai.

Maha Shivaratri uses the traditional rule rather than a lookup table: the Krishna
Chaturdashi running at *nishita* (midnight) within the lunation that contains
Kumbha Sankranti. It reproduces 2024–2028 exactly.

Dates follow the **Amanta** reckoning. Purnimanta calendars, used across much of
north India, name the lunar month a fortnight differently — the days themselves
are the same. The app says so on screen.

## Working on it

```bash
npm install
npm run build      # regenerates learn/ + sitemap.xml, assembles dist/
npm run seo        # just the static pages
npm run icons      # regenerate every icon from vector source
npx netlify dev    # local server with the function running
```

`dist/` is what deploys. Publishing the repo root would ship `node_modules`,
`tools/` and `package.json` to the CDN, so the build assembles an explicit list
and fails if the shell, app bundle, icon or assetlinks file is missing.

Content lives in `assets/data/*.js`. Edit those and run `npm run build` — the app
and the 111 static pages both come from the same source.

## Security posture

The Vaani endpoint is the only server-side surface and the only place the
Anthropic key exists.

- **Same-origin only.** Requests without an allowed `Origin` (or `Referer`) are
  refused. This is not a public API.
- **Rate limited** per IP at 8/minute, 60/hour, 200/day, plus a global daily
  ceiling (`GLOBAL_DAILY_CAP`, default 20 000) so a bad day cannot become a bad
  invoice. Counters use Netlify Blobs, falling back to an in-memory window if
  Blobs are unavailable — it degrades rather than opening up.
- **Validated input**: message length, language allow-list, history shape,
  role alternation.
- **No user content is logged.** Failures record an error status and name only.
- **Crisis safety is client-side.** `chat.js` matches self-harm language in
  English, Hinglish and Hindi and renders Indian helplines immediately, so it
  never depends on what the model returns. The system prompt carries its own
  crisis protocol as a second layer.
- **Every dynamic string is escaped** before it reaches `innerHTML`. Model output
  is escaped first and only then has a fixed set of section headings styled.
- **CSP** with `script-src 'self'`, plus HSTS, `nosniff`, `frame-ancestors 'none'`
  and a restrictive Permissions-Policy.

Verified in Chromium under the production CSP: app boots, dynamic imports work,
the service worker registers, a full reply renders, and the corpus still opens
offline.

## Deploying

Push to `main`. `.github/workflows/deploy.yml` syntax-checks every module, builds
`dist/`, deploys to Netlify, then verifies six paths are actually serving.

**Required Netlify environment variable:** `ANTHROPIC_API_KEY`. Without it Vaani
returns a polite 503 and the rest of the app is unaffected.

**Required GitHub secret:** `NETLIFY_AUTH_TOKEN`.

## Android

`.github/workflows/build-android.yml` (run manually) produces a signed `.aab`.
It takes the version code from the run number, so every build is uploadable
without editing anything by hand.

Secrets: `KEYSTORE_BASE64`, `KEYSTORE_PASSWORD`, `KEY_PASSWORD`.

The SHA-256 in `.well-known/assetlinks.json` must match the key Google actually
signs with. With Play App Signing that is the **app signing key** from
Play Console → Test and release → App integrity, not your upload key. If it is
wrong the app still runs but shows a URL bar.

See **[LAUNCH.md](LAUNCH.md)** for the go-live checklist and store listing copy.

## A note on the content

Scriptural texts — mantras, stotras, the aarti, the 108 names — are traditional
and in the public domain. Translations, retellings, explanations, design and code
are original to this project. Where a text is an excerpt rather than the complete
work, the app says so instead of implying completeness. Where lineages disagree,
the app notes the disagreement instead of picking one and calling it the truth.
