# Shiv AI — launch checklist and store copy

Everything here is either something **you** must do in a console I cannot reach,
or copy you can paste straight in.

---

## 1. Before anything else — three settings

| Where | What | Why |
|---|---|---|
| Netlify → Site settings → Environment variables | `ANTHROPIC_API_KEY` | Vaani returns a polite 503 without it. Everything else works. |
| Netlify → Environment variables | `GLOBAL_DAILY_CAP` (optional, default `20000`) | Hard ceiling on Vaani conversations per day. Set it to what you are willing to pay for. |
| GitHub → Settings → Secrets → Actions | `NETLIFY_AUTH_TOKEN` | Already set if the old workflow was deploying. |

**Set a billing alert on your Anthropic account today.** The app is free and will
be advertised; the rate limits protect you from abuse, not from success.

Also create `support@shivaaionline.in` (or a forward to your inbox). It is printed
in the privacy policy, the terms and the in-app report flow, and Google Play
requires a working contact address.

## 2. Verify the site after the first deploy

```
https://shivaaionline.in/                          → the app
https://shivaaionline.in/manifest.json             → 200, application/manifest+json
https://shivaaionline.in/.well-known/assetlinks.json → 200, application/json
https://shivaaionline.in/sitemap.xml               → 200, 114 URLs
https://shivaaionline.in/learn/                    → the topic index
https://shivaaionline.in/icons/icon-512.png        → the launcher icon
```

The deploy workflow checks all six and fails the run if any is not 200, so a
green deploy already means these are live.

Then open the site on an Android phone and confirm: the splash draws, the tabs
work, the bell sounds when you tap it, and Vaani answers.

## 3. Digital Asset Links — the one thing that silently breaks a TWA

`.well-known/assetlinks.json` currently lists:

```
63:46:92:05:35:F5:DB:54:66:C4:EC:6E:70:9F:DC:41:CB:22:CE:CE:51:64:F9:14:59:20:A2:23:86:0E:87:C3
```

Confirm this matches **Play Console → Test and release → App integrity →
App signing key certificate → SHA-256**. With Play App Signing that is *not* your
upload key. If they differ, replace the value (or add the second fingerprint to
the array — both may be listed) and redeploy.

Symptom of a mismatch: the app opens with a Chrome address bar across the top.

## 4. Android build and upload

GitHub → Actions → **Build Android App Bundle** → Run workflow → version name
`2.0.0`. The version code comes from the run number automatically.

Secrets needed: `KEYSTORE_BASE64` (`base64 -w0 android.keystore`),
`KEYSTORE_PASSWORD`, `KEY_PASSWORD`.

Download the `.aab` from the run artefacts and upload to Play Console. Because a
TWA loads the live website, **most future updates need no new upload at all** —
push to `main` and users get them immediately. Only manifest, icon or TWA-config
changes require a new bundle.

## 5. Play Console — what to fill in

### Store listing

**App name** (30 max)
```
Shiv AI: Talk to Lord Shiva
```

**Short description** (80 max)
```
Chant, listen, learn and ask. Mantras, aarti, stories and panchang. Free, no ads.
```

**Full description**
```
Shiv AI is a free devotional companion for Lord Shiva — built with respect for the
Shaiva tradition, and free for everyone.

🙏 TALK TO SHIVA
Bring anything: grief, a decision you cannot make, fear, anger, a failing business,
a question about the tradition. Vaani answers in the voice of Mahadeva — warm,
practical, never preachy — in English, Hinglish, हिन्दी or Sanskrit.

📿 CHANT WITH A REAL MALA
Ten mantras with Devanagari, transliteration and plain meaning: Om Namah Shivaya,
the Mahamrityunjaya mantra, the Shiva Gayatri, Om Namo Bhagavate Rudraya, Karpura
Gauram, the Aghora mantra, Shivoham and more. A 108-bead counter you can tap by
hand or let chant itself. The temple bell sounds every 27 beads, and your streak
is kept.

🔔 TEMPLE SOUND, MADE FOR YOU
A tanpura drone, a temple bell, the conch and the damaru — all generated live on
your phone, in the pitch you choose. Sit with the guided breath when the mind will
not settle.

📖 EVERYTHING ABOUT MAHADEVA
• 14 stories from the Puranas — Halahala, the descent of the Ganga, Daksha's
  yajna, Tripura, Markandeya, Bhasmasura, the birth of Ganesha and more
• The 19 avatars of the Shiva Purana
• 12 forms: Nataraja, Ardhanarishvara, Dakshinamurthy, Neelkanth, Mahakala,
  Bhairava, Lingodbhava, Adiyogi and others
• Rudrashtakam, Lingashtakam, Bilvashtakam, Nirvana Shatakam, Shiva Panchakshara
  Stotram, Shiv Tandav Stotram — verse by verse, with meanings
• Om Jai Shiv Omkara, the full aarti
• All 108 names, with what each one means
• The 12 Jyotirlingas, the five element temples and the Panch Kedar — story,
  location and when to go
• What every symbol means: trishul, damaru, third eye, moon, Ganga, serpent, ash
• 22 teachings, each with one concrete thing to do today

🗓 PANCHANG THAT ACTUALLY CALCULATES
Today's tithi and paksha, sunrise and sunset for your city, and every Pradosh
Vrat, Masik Shivaratri and Maha Shivaratri — computed astronomically, not looked
up from a list. 20 Indian cities. Plus how to perform puja at home in nine steps,
and what may and may not be offered to Shiva.

✨ FREE, AND MEANT TO STAY THAT WAY
No account. No subscription. No advertising. No tracking. Your chants, counts and
conversations never leave your phone. Almost everything works with no internet at
all.

ॐ नमः शिवाय

—
Shiv AI is an AI devotional companion. It is not a priest, doctor, therapist,
lawyer or astrologer, and it cannot predict the future. For medical, legal or
financial matters please consult a qualified professional. If you are in distress,
Tele-MANAS 14416 and KIRAN 1800-599-0019 are free and open at every hour in India.
```

### Graphics — all already generated

| Slot | File |
|---|---|
| App icon 512×512 | `icons/play-store-512.png` |
| Feature graphic 1024×500 | `icons/play-feature-graphic.png` |
| Phone screenshots | `icons/shot-darshan.png`, `shot-jaap.png`, `shot-gyaan.png`, `shot-panchang.png`, `shot-vaani.png` (1080×1920) |
| Tablet / wide | `icons/shot-wide.png` (1920×1080) |

These are real captures of the running app, not mockups.

### Data safety form

- **Does your app collect or share user data?** Yes.
- **Data type:** Messages → *Other in-app messages*.
  - Collected: Yes · Shared: Yes (with the AI provider, as a service provider)
  - **Processed ephemerally: Yes** — not stored on our servers
  - Optional (only if the user chooses to use Vaani)
  - Purpose: App functionality
- **Encrypted in transit:** Yes.
- **Can users request data deletion?** No account exists; all local data is erased
  from Settings → *Erase everything on this device*, or by uninstalling.
- No location, no contacts, no photos, no device IDs, no advertising ID, no
  analytics SDK, no third-party SDK of any kind.

### Generative AI declaration

Play requires this for any app with AI-generated output. Declare:

- The app produces AI-generated text (devotional guidance).
- **In-app reporting:** yes — a **Report** button under every reply, with five
  reasons, opening a pre-filled email to support@shivaaionline.in.
- **Safeguards:** a documented crisis protocol in the system prompt; independent
  client-side detection of self-harm language in English, Hinglish and Hindi that
  surfaces Indian helplines regardless of model output; refusal rules covering
  medical/legal/financial advice, supernatural guarantees, harm to others, caste
  and communal hatred; and an explicit instruction to state it is an AI when asked.

### Content rating

Reuse the existing IARC ID (`e84b072d-71b3-4d3e-86ae-31a8ce4e53b7`) or refill the
questionnaire. Nothing in the app is violent, sexual or gambling-related; it does
allow free-text user input to an AI, so answer that question honestly.

### Policy links

- Privacy policy: `https://shivaaionline.in/privacy.html`
- Terms: `https://shivaaionline.in/terms.html`
- Support email: `support@shivaaionline.in`

## 6. Apple App Store — the honest position

I could not build this, and it is not a step you can skip past. Two facts:

1. **iOS users can install it today, free, with no App Store involved.** Safari →
   Share → *Add to Home Screen*. It runs full-screen with the icon and splash, and
   everything but Vaani works offline. Say so on your site and in your ads.
2. **A plain web wrapper will very likely be rejected** under App Review
   guideline 4.2 (Minimum Functionality). Apple rejects apps that are a website in
   a shell.

To actually ship on the App Store you need:
- an Apple Developer Program membership (₹8,900/year),
- a Mac with Xcode, or a cloud build service (Xcode Cloud, Codemagic),
- a Capacitor wrapper around this same site, **plus real native functionality** so
  it clears 4.2. The natural candidates, in order of value:
  - local notifications for Pradosh and Shivaratri (the panchang already computes
    the dates — this is the strongest one),
  - a home-screen widget showing today's tithi and the next observance,
  - background audio for the drone,
  - Siri shortcut: "start my japa".

That is a genuine piece of work, not a checkbox. Ship Android and the web first;
they cover the overwhelming majority of Indian users.

## 7. Search — getting found

Done already: 111 crawlable pages, canonical URLs, Open Graph, Article and
BreadcrumbList structured data, an FAQPage on the home page, `robots.txt` and a
114-URL sitemap.

What you need to do:

1. **Google Search Console** — add `shivaaionline.in`, verify by DNS, submit
   `https://shivaaionline.in/sitemap.xml`. Then request indexing on
   `/learn/` and five or six of the strongest pages.
2. **Bing Webmaster Tools** — same, and it feeds ChatGPT search too.
3. **Google Play Console → Store presence** — the listing copy above is already
   written around the phrases people search for.

The pages most likely to rank, because they answer a specific question in full:

- `/learn/mantra/mahamrityunjaya.html` — "mahamrityunjaya mantra meaning"
- `/learn/stotra/rudrashtakam.html` — "rudrashtakam lyrics with meaning"
- `/learn/stotra/shiv-tandav.html` — "shiv tandav stotram"
- `/learn/108-names-of-shiva.html` — "108 names of shiva"
- `/learn/how-to-worship-shiva-at-home.html` — "how to do shiv puja at home"
- `/learn/festival/mahashivaratri.html` — "maha shivaratri 2027 date"
- each `/learn/jyotirlinga/*.html` — "bhimashankar jyotirlinga story"

A realistic note: these are competitive queries against sites with years of
authority. Expect movement in weeks, not days, and expect the long-tail pages
(individual Jyotirlingas, specific stotras) to land first.

**The highest-value thing you can add next** is a Hindi version of the learn
pages at `/hi/learn/…` with `hreflang` pairs. The Hindi search volume for these
terms is far larger than the English, and the corpus is already structured to
generate them.

## 8. Ads — what to actually run

Angles that fit what the app really does, rather than generic devotional imagery:

- **Maha Shivaratri and Shravan** are the two moments of the year. Build the
  calendar around them; nothing else comes close.
- **"Never miss a Pradosh again"** — the panchang is the most genuinely useful
  thing here and nobody else computes it live in a free app.
- **"108 beads, wherever you are"** — the mala counter, shown in use.
- **"Ask Shiva anything"** — highest curiosity, but be careful: keep the creative
  clearly about reflection and guidance. Meta rejects ad copy that promises
  supernatural outcomes, and so does Google.

Targeting: 18–55, India, interests in devotional/spiritual content, Hindi and
English creatives separately. The app is free with no purchases, so optimise for
installs and for `source=pwa` sessions, not revenue.

**Do not** claim the app cures anything, guarantees results, or speaks for a real
deity. Both the ad platforms and Play will act on that, and the app's own system
prompt refuses it anyway.

## 9. What I could not do from here

- Upload anything to Play Console or App Store Connect (no credentials, and these
  are yours to sign).
- Verify the live site or the assetlinks fingerprint — this build environment has
  no outbound internet, so everything was verified locally against the exact
  production headers instead.
- Create `support@shivaaionline.in`.
- Any Apple work, for the reasons in section 6.
