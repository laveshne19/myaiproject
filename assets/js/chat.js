/* Shiv AI — Vaani. Conversation with the divine voice.

   Two rules govern this file:
   1. Model output is untrusted text. It is escaped before it ever touches the DOM,
      and only a fixed set of section headings is then styled.
   2. This app is used by people in real distress. Crisis language triggers Indian
      helpline numbers on the client immediately, without waiting for, or depending
      on, whatever the model happens to reply. */

import { esc, store, toast } from './ui.js';
import { I } from './icons.js';

const API = '/api/chat';
const HISTORY_KEY = 'chat.history';
const MAX_TURNS = 40;

export const LANGS = [
  { id: 'en', label: 'English' },
  { id: 'hinglish', label: 'Hinglish' },
  { id: 'hi', label: 'हिन्दी' },
  { id: 'sanskrit', label: 'Sanskrit + English' },
];

/* ---------- Crisis safety ---------- */

/* Deliberately broad. A false positive shows a helpline card to someone who did not
   need it, which is a minor cost. A false negative is not recoverable. */
const CRISIS_PATTERNS = [
  /\b(kill|killing|hurt|harm|cut|cutting)\s+(my ?self|myself|me)\b/i,
  /\b(suicide|suicidal|self[\s-]?harm)\b/i,
  /\b(end|ending|finish|finishing)\s+(my|it|this)\s+(life|all)\b/i,
  /\bi\s+(want|wanna|need|am going|'m going|plan)\s+to\s+(die|end it|kill)\b/i,
  /\b(don'?t|dont|do not)\s+want\s+to\s+(live|be alive)\b/i,
  /\b(no reason|nothing) to live\b/i,
  /\b(better off|world is better)\s+(dead|without me)\b/i,
  /\bjaan\s*d[eo]/i,
  /\b(marna|mar\s*ja(u|o)|khudkushi|khudkhushi|atmahatya|aatmahatya)\b/i,
  /\bjeena\s+nahi/i,
  /\b(zindagi|jindagi)\s+(khatam|khatm)/i,
  /\b(khatam|khatm)\s+kar\s*(du|lu|dena)/i,
  /जान\s*दे|आत्महत्या|खुदकुशी|मरना चाह|मर जाऊ|जीना नहीं चाह|ज़िंदगी ख़त्म|जिंदगी खत्म/,
];

export function isCrisis(text) {
  const t = String(text || '');
  return CRISIS_PATTERNS.some((re) => re.test(t));
}

export const HELPLINES = [
  { name: 'Tele-MANAS', num: '14416', note: 'Government of India · 24×7 · 20 languages', tel: '14416' },
  { name: 'KIRAN', num: '1800-599-0019', note: 'Ministry of Social Justice · 24×7 · free', tel: '18005990019' },
  { name: 'Vandrevala Foundation', num: '9999 666 555', note: '24×7 · call or WhatsApp', tel: '9999666555' },
  { name: 'AASRA', num: '+91 9820 466 726', note: '24×7 · Mumbai-based, all-India', tel: '+919820466726' },
  { name: 'Emergency', num: '112', note: 'Police, ambulance, fire', tel: '112' },
];

export function crisisCardHTML() {
  const rows = HELPLINES.map(
    (h) => `<div style="display:flex;gap:10px;align-items:baseline;margin-top:7px">
      <a href="tel:${esc(h.tel)}" style="min-width:132px">${esc(h.num)}</a>
      <span class="small dim">${esc(h.name)} — ${esc(h.note)}</span>
    </div>`
  ).join('');
  return `<div class="crisis" role="alert">
    <div class="h">Please talk to a person who can help, right now.</div>
    <div class="small">You reached out, and that matters. Shiv AI is an AI and cannot keep you safe.
    These lines are free, confidential and open at every hour in India.</div>
    ${rows}
    <div class="small dim" style="margin-top:10px">If you are in immediate danger, call 112 or go to the nearest hospital.</div>
  </div>`;
}

/* ---------- Rendering model output ---------- */

/* The system prompt asks for exactly these headings. Anything else stays plain text. */
const HEADINGS = [
  '🙏 Shiva Speaks', '🙏 Shiva Bol Rahe Hain', '🙏 शिव कहते हैं',
  '🔱 The Deeper Truth', '🔱 Gehri Sach', '🔱 गहरा सत्य', '🔱 The Eternal Teaching',
  '⚡ Walk Forward Like This', '⚡ Aage Aise Badho', '⚡ आगे ऐसे बढ़ें', '⚡ Sacred Action',
];

/**
 * Turn a model reply into safe HTML.
 * Everything is escaped first; only whole lines that exactly match a known heading
 * are then wrapped. No model text can introduce markup.
 */
export function renderReply(text) {
  const lines = String(text || '').split('\n');
  return lines
    .map((line) => {
      const trimmed = line.trim();
      if (!trimmed) return '';
      const safe = esc(trimmed);
      if (HEADINGS.includes(trimmed)) return `<span class="hd">${safe}</span>`;
      return safe;
    })
    .filter(Boolean)
    .join('\n');
}

/* ---------- Conversation ---------- */

export class Conversation {
  constructor() {
    this.turns = this._load();
    this.busy = false;
    this.controller = null;
  }

  _load() {
    const raw = store.get(HISTORY_KEY, []);
    if (!Array.isArray(raw)) return [];
    return raw
      .filter((t) => t && (t.role === 'user' || t.role === 'assistant') && typeof t.content === 'string')
      .slice(-MAX_TURNS);
  }

  save() {
    store.set(HISTORY_KEY, this.turns.slice(-MAX_TURNS));
  }

  clear() {
    this.turns = [];
    store.del(HISTORY_KEY);
  }

  /** History sent upstream: last 8 turns, each capped, roles normalised. */
  _wireHistory() {
    return this.turns.slice(-8).map((t) => ({
      role: t.role === 'assistant' ? 'assistant' : 'user',
      content: String(t.content).slice(0, 1200),
    }));
  }

  async send(message, language, { onStart, onDone, onError } = {}) {
    const text = String(message || '').trim();
    if (!text || this.busy) return null;
    if (text.length > 2000) {
      onError && onError('That is a long message. Please keep it under 2000 characters.');
      return null;
    }

    this.busy = true;
    const history = this._wireHistory();
    this.turns.push({ role: 'user', content: text, at: Date.now() });
    this.save();
    onStart && onStart();

    this.controller = new AbortController();
    const timeout = setTimeout(() => this.controller.abort(), 45000);

    try {
      const res = await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, language, history }),
        signal: this.controller.signal,
      });

      let data = null;
      try { data = await res.json(); } catch { /* non-JSON error page */ }

      if (!res.ok) {
        const msg =
          res.status === 429
            ? (data && data.error) || 'Many devotees are speaking at once. Please wait a moment and try again.'
            : (data && data.error) || 'Shiv AI is momentarily in deep meditation. Please try again.';
        this.busy = false;
        onError && onError(msg, res.status);
        return null;
      }

      const reply = data && typeof data.reply === 'string' ? data.reply : '';
      if (!reply) {
        this.busy = false;
        onError && onError('The reply came back empty. Please ask again.');
        return null;
      }

      this.turns.push({ role: 'assistant', content: reply, at: Date.now() });
      this.save();
      this.busy = false;
      onDone && onDone(reply);
      return reply;
    } catch (err) {
      this.busy = false;
      const aborted = err && err.name === 'AbortError';
      onError && onError(
        aborted
          ? 'That took too long. Please try again.'
          : navigator.onLine === false
            ? 'You are offline. Vaani needs a connection — the mantras, teachings and stories all work without one.'
            : 'The divine signal flickered. Please try again.'
      );
      return null;
    } finally {
      clearTimeout(timeout);
      this.controller = null;
    }
  }

  abort() {
    if (this.controller) { try { this.controller.abort(); } catch { /* ignore */ } }
    this.busy = false;
  }
}

export const OPENERS = [
  'I am carrying something heavy and cannot put it down.',
  'Help me decide — I have been stuck for weeks.',
  'I lost someone. How do I keep going?',
  'My work is failing and I am afraid.',
  'Teach me how to sit in silence.',
  'Why does the same problem keep returning to me?',
  'I am angry at someone I love.',
  'What does Shiva say about starting again?',
];

export function copyText(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(
      () => toast('Copied'),
      () => toast('Could not copy')
    );
  } else {
    toast('Copying is not available on this device');
  }
}

export const chatIcons = I;
