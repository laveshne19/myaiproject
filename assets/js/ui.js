/* Shiv AI — UI primitives: escaping, storage, toast, bottom sheet, motes. */

/** Escape every character that can change HTML meaning. Used on ALL dynamic text. */
export function esc(v) {
  return String(v == null ? '' : v)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/* ---------- Storage ---------- */

const NS = 'shivai.';

export const store = {
  get(key, fallback = null) {
    try {
      const raw = localStorage.getItem(NS + key);
      return raw == null ? fallback : JSON.parse(raw);
    } catch { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem(NS + key, JSON.stringify(value)); return true; }
    catch { return false; }
  },
  del(key) {
    try { localStorage.removeItem(NS + key); } catch { /* ignore */ }
  },
  clearAll() {
    try {
      const keys = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith(NS)) keys.push(k);
      }
      keys.forEach((k) => localStorage.removeItem(k));
    } catch { /* ignore */ }
  },
};

/* ---------- Toast ---------- */

let toastEl = null;
let toastTimer = null;

export function toast(message, ms = 2400) {
  if (!toastEl) {
    toastEl = document.createElement('div');
    toastEl.className = 'toast';
    toastEl.setAttribute('role', 'status');
    toastEl.setAttribute('aria-live', 'polite');
    document.body.appendChild(toastEl);
  }
  toastEl.textContent = message;
  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), ms);
}

/* ---------- Bottom sheet ---------- */

let sheetEls = null;
let lastFocus = null;

function buildSheet() {
  const backdrop = document.createElement('div');
  backdrop.className = 'sheet-backdrop';
  const sheet = document.createElement('div');
  sheet.className = 'sheet';
  sheet.setAttribute('role', 'dialog');
  sheet.setAttribute('aria-modal', 'true');
  sheet.setAttribute('aria-hidden', 'true');
  sheet.innerHTML =
    '<div class="grab"></div>' +
    '<div class="sheet-head"><div class="st"></div>' +
    '<button class="iconbtn sheet-close" aria-label="Close"></button></div>' +
    '<div class="sheet-body"></div>';
  document.body.append(backdrop, sheet);
  sheetEls = {
    backdrop,
    sheet,
    head: sheet.querySelector('.st'),
    body: sheet.querySelector('.sheet-body'),
    close: sheet.querySelector('.sheet-close'),
  };
  backdrop.addEventListener('click', closeSheet);
  sheetEls.close.addEventListener('click', closeSheet);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sheet.classList.contains('open')) closeSheet();
  });
  return sheetEls;
}

/**
 * Open the reader sheet.
 * `headHTML` and `bodyHTML` must already be escaped by the caller — every call
 * site builds them from esc() or from static template markup.
 */
export function openSheet(headHTML, bodyHTML, closeIconHTML = '×') {
  const els = sheetEls || buildSheet();
  lastFocus = document.activeElement;
  els.head.innerHTML = headHTML;
  els.body.innerHTML = bodyHTML;
  els.close.innerHTML = closeIconHTML;
  els.body.scrollTop = 0;
  document.body.style.overflow = 'hidden';
  els.sheet.setAttribute('aria-hidden', 'false');
  requestAnimationFrame(() => {
    els.backdrop.classList.add('open');
    els.sheet.classList.add('open');
    els.close.focus();
  });
  return els;
}

export function closeSheet() {
  if (!sheetEls) return;
  sheetEls.backdrop.classList.remove('open');
  sheetEls.sheet.classList.remove('open');
  sheetEls.sheet.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  setTimeout(() => {
    if (sheetEls && !sheetEls.sheet.classList.contains('open')) {
      sheetEls.body.innerHTML = '';
      sheetEls.head.innerHTML = '';
    }
  }, 400);
  if (lastFocus && lastFocus.focus) { try { lastFocus.focus(); } catch { /* gone */ } }
}

export function sheetIsOpen() {
  return !!(sheetEls && sheetEls.sheet.classList.contains('open'));
}

/* ---------- Bhasma motes ---------- */

/** A slow drift of ash particles. Cheap, paused when hidden, off for reduced motion. */
export function startMotes(canvas) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !canvas || !canvas.getContext) return () => {};
  const ctx = canvas.getContext('2d');
  let w = 0, h = 0, raf = 0, running = true;
  let parts = [];

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.clientWidth; h = canvas.clientHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.min(46, Math.round((w * h) / 26000));
    parts = Array.from({ length: n }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 0.5 + Math.random() * 1.4,
      vy: -(0.05 + Math.random() * 0.16),
      vx: (Math.random() - 0.5) * 0.09,
      a: 0.14 + Math.random() * 0.34,
      t: Math.random() * Math.PI * 2,
    }));
  };

  const frame = () => {
    if (!running) return;
    ctx.clearRect(0, 0, w, h);
    for (const p of parts) {
      p.t += 0.011;
      p.x += p.vx + Math.sin(p.t) * 0.13;
      p.y += p.vy;
      if (p.y < -6) { p.y = h + 6; p.x = Math.random() * w; }
      if (p.x < -6) p.x = w + 6;
      if (p.x > w + 6) p.x = -6;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(232, 200, 140, ${p.a})`;
      ctx.fill();
    }
    raf = requestAnimationFrame(frame);
  };

  resize();
  frame();
  const onResize = () => resize();
  const onVis = () => {
    running = !document.hidden;
    if (running) frame(); else cancelAnimationFrame(raf);
  };
  window.addEventListener('resize', onResize);
  document.addEventListener('visibilitychange', onVis);

  return () => {
    running = false;
    cancelAnimationFrame(raf);
    window.removeEventListener('resize', onResize);
    document.removeEventListener('visibilitychange', onVis);
  };
}

/* ---------- Small helpers ---------- */

export function fmtDate(d) {
  return d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });
}
export function fmtTime(d) {
  return d.toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit', hour12: true });
}
export function daysBetween(a, b) {
  const A = new Date(a.getFullYear(), a.getMonth(), a.getDate());
  const B = new Date(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.round((B - A) / 86400000);
}
export function todayKey(d = new Date()) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
/** Deterministic index for "the same item all day, a different one tomorrow". */
export function dailyIndex(len, salt = 0) {
  const d = new Date();
  const n = d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate() + salt;
  let x = n;
  x = (x ^ 61) ^ (x >>> 16);
  x = x + (x << 3);
  x = x ^ (x >>> 4);
  x = Math.imul(x, 0x27d4eb2d);
  x = x ^ (x >>> 15);
  return Math.abs(x) % len;
}
