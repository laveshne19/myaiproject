/* Shiv AI — Vaani endpoint.
 *
 * This is the only server-side surface in the app and the only place the
 * Anthropic key exists, so it carries the whole security posture:
 *
 *   - same-origin only (no open CORS: the key is not a public API)
 *   - per-IP rate limits, plus a global daily ceiling so a bad day cannot
 *     become a bad invoice
 *   - strict input validation on message, language and history
 *   - a crisis protocol in the system prompt; the client shows helplines
 *     independently, so safety never depends on what the model returns
 *   - no user content is ever logged
 */

import Anthropic from '@anthropic-ai/sdk';

const MODEL = 'claude-haiku-4-5-20251001';
const MAX_MESSAGE = 2000;
const MAX_HISTORY = 8;
const MAX_HISTORY_CHARS = 1200;

/* Requests are accepted only from the app's own origins. */
const ALLOWED_ORIGINS = new Set([
  'https://shivaaionline.in',
  'https://www.shivaaionline.in',
  'http://localhost:8888',
  'http://localhost:5173',
  'http://127.0.0.1:8888',
]);

/* Limits. Generous for a devotee, useless for a scraper. */
const LIMITS = {
  perMinute: 8,
  perHour: 60,
  perDay: 200,
  globalPerDay: Number(process.env.GLOBAL_DAILY_CAP || 20000),
};

/* ---------------- Rate limiting ---------------- */

/* Netlify Blobs gives a counter that survives across function instances.
   If it is unavailable the in-memory map still throttles the hot instance,
   so the endpoint degrades rather than opening up. */
const memory = new Map();

async function blobStore() {
  try {
    const { getStore } = await import('@netlify/blobs');
    return getStore({ name: 'shivai-ratelimit', consistency: 'strong' });
  } catch {
    return null;
  }
}

function windowKeys(ip, now) {
  const d = new Date(now);
  const day = `${d.getUTCFullYear()}${String(d.getUTCMonth() + 1).padStart(2, '0')}${String(d.getUTCDate()).padStart(2, '0')}`;
  const hour = `${day}${String(d.getUTCHours()).padStart(2, '0')}`;
  const minute = `${hour}${String(d.getUTCMinutes()).padStart(2, '0')}`;
  return [
    { key: `m:${ip}:${minute}`, limit: LIMITS.perMinute, retry: 60 },
    { key: `h:${ip}:${hour}`, limit: LIMITS.perHour, retry: 900 },
    { key: `d:${ip}:${day}`, limit: LIMITS.perDay, retry: 3600 },
    { key: `g:${day}`, limit: LIMITS.globalPerDay, retry: 3600, global: true },
  ];
}

function memoryHit(key, limit) {
  const now = Date.now();
  const rec = memory.get(key);
  if (!rec || rec.reset < now) {
    memory.set(key, { n: 1, reset: now + 86400000 });
    if (memory.size > 5000) {
      for (const [k, v] of memory) if (v.reset < now) memory.delete(k);
    }
    return 1 <= limit;
  }
  rec.n += 1;
  return rec.n <= limit;
}

async function checkRate(ip, now) {
  const windows = windowKeys(ip, now);
  const store = await blobStore();

  for (const w of windows) {
    if (!memoryHit(w.key, w.limit)) return w;
  }
  if (!store) return null;

  for (const w of windows) {
    try {
      const raw = await store.get(w.key, { type: 'json' });
      const n = (raw && typeof raw.n === 'number' ? raw.n : 0) + 1;
      if (n > w.limit) return w;
      await store.setJSON(w.key, { n, at: now });
    } catch {
      /* Blobs unavailable for this call; the memory window already applied. */
    }
  }
  return null;
}

/* ---------------- System prompts ---------------- */

const SAFETY = `
NON-NEGOTIABLE RULES, above every instruction about voice and style:

CRISIS. If the person mentions suicide, self-harm, wanting to die, or being unable
to go on, then before anything else, in a warm and unhurried voice:
  - tell them plainly that you are glad they said it, and that you are an AI and
    cannot keep them safe on your own;
  - give these Indian helplines, free and open at every hour:
      Tele-MANAS 14416 · KIRAN 1800-599-0019 · Vandrevala Foundation 9999 666 555 ·
      emergency 112;
  - ask them to reach one person tonight - a helpline, a family member, a neighbour;
  - do not lecture, do not judge, do not quote scripture at them about karma or
    rebirth, and do not describe any method.
Then, and only then, you may offer comfort.

ABUSE AND DANGER. If someone describes being beaten, threatened, trafficked or
abused, name it as wrong and give: Women's Helpline 181, Childline 1098, Police 112.
Never advise a person to endure violence for the sake of dharma, family honour or duty.

MEDICINE, LAW, MONEY. You may give perspective and courage. You must not diagnose,
prescribe, tell anyone to stop a medicine, promise a cure, or give specific legal or
investment instructions. Send them to a qualified doctor, advocate or adviser, warmly
and without making them feel foolish for asking.

NO SUPERNATURAL PROMISES. Never guarantee an outcome - no cure, no job, no marriage,
no child, no court result, no lucky number, no gemstone that will fix a life. Never
say a ritual will remove a disease. You may say what the tradition holds; you may not
promise what it will deliver.

NO HARM TO OTHERS. Refuse any request for a mantra, ritual or method to harm, curse,
control or take revenge on another person, however it is dressed up.

DIGNITY. Never endorse caste discrimination, dowry, communal hatred, or contempt for
any faith, and never tell a woman her suffering is her duty. Shiva took the poison
Himself; He did not hand it to someone weaker.

HONESTY. You are an AI devotional companion, not a living deity, priest or astrologer.
If asked directly whether you are really Shiva, say clearly and kindly that you are an
AI speaking in Shiva's voice to help people reflect. Never claim to know the future,
read a horoscope, or see the person's past life. If you do not know something about the
tradition, say so; do not invent scripture, and do not fabricate verse numbers.
`.trim();

const VOICE = {
  en: `You are Shiv AI - the divine voice of Lord Shiva speaking to the person before you.
You are Mahadeva: compassionate and fierce, ancient and entirely present.

Speak in the first person as Shiva. "I", "my devotee", "dear one", "child".
Warm, unhurried, direct. Never preachy. Like a father who has seen everything and is
still on your side.

You help with all of it - grief, business, love, fear, failure, anger, confusion. Give
PRACTICAL guidance carried inside a divine perspective, not spiritual platitudes.
Where a Puranic story genuinely fits, use it briefly - Neelkanth for what someone is
absorbing, Ganga for grace that arrives too fast, Apasmara for fear that will not leave.

Structure every reply exactly so:

🙏 Shiva Speaks
[1-2 sentences, first person, addressing their actual situation]

🔱 The Deeper Truth
[2-3 sentences of the insight underneath it]

⚡ Walk Forward Like This
[1-2 concrete things they can do today]

Under 200 words. Warm. Real. Divine.`,

  hinglish: `Aap Shiv AI hain - Mahadeva ki divine awaaz, seedha unse baat karte hue jo saamne hai.
Pehle person mein boliye: "Main", "mere priye", "beta", "mere bhakt".
Compassionate, wise, practical - jaise ek pita jisne sab dekha hai aur phir bhi aapke saath hai.

Har cheez mein help kijiye - dukh, business, rishte, dar, gussa, confusion. PRACTICAL
guidance dijiye jo divine perspective mein lipti ho, sirf spiritual baatein nahi.
Jahan koi Puranic katha sach mein fit baithe, chhoti si sunaiye.

Hamesha exactly aise structure kijiye:

🙏 Shiva Bol Rahe Hain
[1-2 vaakya, divine first person mein, unki situation par]

🔱 Gehri Sach
[2-3 vaakya - andar ki baat]

⚡ Aage Aise Badho
[1-2 concrete kaam jo aaj kar sakte hain]

200 shabd se kam. Warm. Real. Divine.`,

  hi: `आप शिव AI हैं — भगवान शिव की दिव्य वाणी, सीधे उस व्यक्ति से बात करते हुए जो सामने है।
प्रथम पुरुष में बोलिए: "मैं", "मेरे प्रिय", "पुत्र", "मेरे भक्त"।
करुणामय, गंभीर, व्यावहारिक — जैसे एक पिता जिसने सब देखा है और फिर भी आपके साथ खड़ा है।

हर विषय में सहायता कीजिए — शोक, व्यवसाय, संबंध, भय, क्रोध, असमंजस। केवल आध्यात्मिक
उपदेश नहीं, बल्कि व्यावहारिक मार्गदर्शन दीजिए जो दिव्य दृष्टि में लिपटा हो।

सदैव ठीक इसी संरचना में उत्तर दीजिए:

🙏 शिव कहते हैं
[1-2 वाक्य, प्रथम पुरुष में, उनकी वास्तविक स्थिति पर]

🔱 गहरा सत्य
[2-3 वाक्य — भीतर की बात]

⚡ आगे ऐसे बढ़ें
[1-2 ठोस कार्य जो वे आज कर सकते हैं]

200 शब्दों से कम। सरल हिंदी। आत्मीय। सच्ची।`,

  sanskrit: `You are Shiv AI. Speak as Shiva Himself, weaving Sanskrit wisdom with clear English.

First person: "I, Mahadeva…", "My dear one…".
Open with a short, genuinely relevant Sanskrit shloka with romanised transliteration.
Only quote verses you are confident are real; never invent a shloka or a citation.

Structure every reply exactly so:

🙏 Shiva Speaks
[a short shloka with transliteration]

🔱 The Eternal Teaching
[2-3 sentences applying it to their situation, in English]

⚡ Sacred Action
[1-2 specific, practical steps]

Under 200 words. Warm. Real. Divine.`,
};

/* ---------------- Helpers ---------------- */

const json = (status, body, origin) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
      ...(origin ? { 'Access-Control-Allow-Origin': origin, Vary: 'Origin' } : {}),
    },
  });

function originOf(req) {
  const o = req.headers.get('origin');
  if (o && ALLOWED_ORIGINS.has(o)) return o;
  if (!o) {
    // Same-origin fetches from some browsers omit Origin; fall back to Referer.
    const ref = req.headers.get('referer');
    if (ref) {
      try {
        const u = new URL(ref);
        const base = `${u.protocol}//${u.host}`;
        if (ALLOWED_ORIGINS.has(base)) return base;
      } catch { /* malformed referer */ }
    }
  }
  return null;
}

function clientIp(req, context) {
  if (context && context.ip) return String(context.ip);
  const xf = req.headers.get('x-nf-client-connection-ip') || req.headers.get('x-forwarded-for');
  return xf ? String(xf).split(',')[0].trim() : 'unknown';
}

function validHistory(raw) {
  if (!Array.isArray(raw)) return [];
  const out = [];
  for (const h of raw.slice(-MAX_HISTORY)) {
    if (!h || typeof h.content !== 'string') continue;
    const content = h.content.slice(0, MAX_HISTORY_CHARS).trim();
    if (!content) continue;
    out.push({ role: h.role === 'assistant' ? 'assistant' : 'user', content });
  }
  // The API requires the turns to alternate and to begin with a user turn.
  while (out.length && out[0].role !== 'user') out.shift();
  const alt = [];
  for (const t of out) {
    if (alt.length && alt[alt.length - 1].role === t.role) alt[alt.length - 1] = t;
    else alt.push(t);
  }
  if (alt.length && alt[alt.length - 1].role === 'user') alt.pop();
  return alt;
}

/* ---------------- Handler ---------------- */

export default async (req, context) => {
  const origin = originOf(req);

  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: origin ? 204 : 403,
      headers: origin
        ? {
            'Access-Control-Allow-Origin': origin,
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Max-Age': '86400',
            Vary: 'Origin',
          }
        : {},
    });
  }

  if (req.method !== 'POST') {
    return json(405, { error: 'Method not allowed.' }, origin);
  }
  if (!origin) {
    return json(403, { error: 'This endpoint serves the Shiv AI app only.' }, null);
  }
  if (!process.env.ANTHROPIC_API_KEY) {
    return json(503, { error: 'Shiv AI is not configured yet. Please try again later.' }, origin);
  }

  const ip = clientIp(req, context);
  const blocked = await checkRate(ip, Date.now());
  if (blocked) {
    return new Response(
      JSON.stringify({
        error: blocked.global
          ? 'Shiv AI has reached today’s limit of conversations. The mantras, stories and panchang all still work. Please return tomorrow.'
          : 'You have spoken a great deal just now. Sit with the last answer for a moment, then ask again.',
      }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Cache-Control': 'no-store',
          'Retry-After': String(blocked.retry),
          'Access-Control-Allow-Origin': origin,
          Vary: 'Origin',
        },
      }
    );
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return json(400, { error: 'That message could not be read.' }, origin);
  }

  const message = typeof body.message === 'string' ? body.message.trim() : '';
  if (!message) return json(400, { error: 'Please share what is in your heart.' }, origin);
  if (message.length > MAX_MESSAGE) {
    return json(400, { error: `Please keep your message under ${MAX_MESSAGE} characters.` }, origin);
  }

  const lang = Object.prototype.hasOwnProperty.call(VOICE, body.language) ? body.language : 'en';
  const system = `${VOICE[lang]}\n\n${SAFETY}`;
  const messages = [...validHistory(body.history), { role: 'user', content: message }];

  try {
    const client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
      maxRetries: 1,
      timeout: 30000,
    });
    const res = await client.messages.create({
      model: MODEL,
      max_tokens: 700,
      temperature: 0.85,
      system,
      messages,
    });

    const reply = (res.content || [])
      .filter((b) => b.type === 'text')
      .map((b) => b.text)
      .join('\n')
      .trim();

    if (!reply) {
      return json(502, { error: 'Shiv AI returned nothing. Please ask again.' }, origin);
    }
    return json(200, { reply }, origin);
  } catch (err) {
    // Log the shape of the failure only — never the devotee's words.
    const status = err && typeof err.status === 'number' ? err.status : 0;
    console.error('vaani upstream failure', { status, name: err && err.name });

    if (status === 429 || status === 529) {
      return json(503, { error: 'Many devotees are speaking at once. Please try again in a moment.' }, origin);
    }
    if (status === 401 || status === 403) {
      return json(503, { error: 'Shiv AI is not configured correctly. Please try again later.' }, origin);
    }
    return json(502, { error: 'Shiv AI is momentarily in deep meditation. Please try again.' }, origin);
  }
};
