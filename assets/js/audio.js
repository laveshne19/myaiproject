/* Shiv AI — the sound engine.
   Everything here is synthesised in the browser with the Web Audio API: the tanpura
   drone, the temple bell, the conch and the damaru. Nothing is a recording, so the
   app carries no audio files, works offline, and owns every sound it makes.

   Physical recipes:
     bell    - inharmonic partial stack with per-partial decay (the classic bell series)
     tanpura - additive plucks with a jawari-like swell in the upper harmonics
     conch   - band-passed noise over a low tone, with a breath envelope
     damaru  - two fast noise transients with a falling resonant peak */

const A4 = 440;

/** Sa reference pitches offered to the user, in Hz. */
export const TONICS = [
  { label: 'C#  — low, settling', hz: 138.59 },
  { label: 'D   — the common Sa', hz: 146.83 },
  { label: 'E   — bright', hz: 164.81 },
  { label: 'F#  — high, alert', hz: 185.0 },
  { label: 'G   — deep chest', hz: 98.0 },
];

export class SoundEngine {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.droneGain = null;
    this.droneTimer = null;
    this.noiseBuf = null;
    this.volume = 0.7;
    this.droneOn = false;
    this.tonic = 146.83;
    this._nodes = new Set();
  }

  /** Must be called from inside a user gesture — iOS will not start audio otherwise. */
  async unlock() {
    if (!this.ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return false;
      this.ctx = new AC();
      this.master = this.ctx.createGain();
      this.master.gain.value = this.volume;
      this.master.connect(this.ctx.destination);
      this.droneGain = this.ctx.createGain();
      this.droneGain.gain.value = 0;
      this.droneGain.connect(this.master);
      this._makeNoise();
    }
    if (this.ctx.state === 'suspended') {
      try { await this.ctx.resume(); } catch { /* user will retry */ }
    }
    return this.ctx.state === 'running';
  }

  get available() {
    return !!(window.AudioContext || window.webkitAudioContext);
  }

  setVolume(v) {
    this.volume = Math.max(0, Math.min(1, v));
    if (this.master) {
      this.master.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.05);
    }
  }

  _makeNoise() {
    const len = Math.floor(this.ctx.sampleRate * 2);
    const buf = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    this.noiseBuf = buf;
  }

  _track(node, stopAt) {
    this._nodes.add(node);
    if (stopAt != null) {
      try { node.stop(stopAt); } catch { /* not a source node */ }
    }
    node.onended = () => this._nodes.delete(node);
  }

  /* ---------- Temple bell ---------- */

  /** A struck bell. `size` 0..1 — small hand bell to large temple ghanta. */
  bell(size = 0.5, when = 0) {
    if (!this.ctx) return;
    const t = this.ctx.currentTime + when;
    const base = 620 - size * 380; // 620 Hz hand bell down to ~240 Hz ghanta
    // Inharmonic partial ratios that give metal its character.
    const partials = [
      [0.5, 0.28, 5.5], [1.0, 1.0, 4.6], [1.19, 0.55, 3.4], [1.56, 0.42, 2.6],
      [2.0, 0.32, 2.0], [2.51, 0.22, 1.5], [2.66, 0.16, 1.2], [3.01, 0.14, 0.9],
      [4.07, 0.09, 0.6], [5.43, 0.05, 0.4],
    ];
    const out = this.ctx.createGain();
    out.gain.value = 0.32;
    out.connect(this.master);

    for (const [ratio, amp, decay] of partials) {
      const o = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      o.type = 'sine';
      o.frequency.value = base * ratio * (1 + (Math.random() - 0.5) * 0.004);
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(amp, t + 0.004);
      g.gain.exponentialRampToValueAtTime(0.0001, t + decay * (0.7 + size * 0.6));
      o.connect(g).connect(out);
      o.start(t);
      this._track(o, t + decay * 1.4 + 0.2);
    }
    // The strike transient.
    const n = this.ctx.createBufferSource();
    n.buffer = this.noiseBuf;
    const nf = this.ctx.createBiquadFilter();
    nf.type = 'bandpass';
    nf.frequency.value = base * 3;
    nf.Q.value = 1.2;
    const ng = this.ctx.createGain();
    ng.gain.setValueAtTime(0.25, t);
    ng.gain.exponentialRampToValueAtTime(0.0001, t + 0.09);
    n.connect(nf).connect(ng).connect(out);
    n.start(t);
    this._track(n, t + 0.2);
  }

  /* ---------- Conch (shankh) ---------- */

  conch(when = 0) {
    if (!this.ctx) return;
    const t = this.ctx.currentTime + when;
    const dur = 2.6;
    const out = this.ctx.createGain();
    out.gain.value = 0.3;
    out.connect(this.master);

    const n = this.ctx.createBufferSource();
    n.buffer = this.noiseBuf;
    n.loop = true;
    const bp = this.ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.Q.value = 6;
    bp.frequency.setValueAtTime(300, t);
    bp.frequency.exponentialRampToValueAtTime(760, t + 0.35);
    bp.frequency.setValueAtTime(760, t + dur - 0.5);
    bp.frequency.exponentialRampToValueAtTime(520, t + dur);
    const ng = this.ctx.createGain();
    ng.gain.setValueAtTime(0.0001, t);
    ng.gain.exponentialRampToValueAtTime(0.9, t + 0.3);
    ng.gain.setValueAtTime(0.9, t + dur - 0.6);
    ng.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    n.connect(bp).connect(ng).connect(out);
    n.start(t);
    this._track(n, t + dur + 0.1);

    // The pitched body under the breath.
    for (const [f, a] of [[196, 0.5], [294, 0.25], [392, 0.12]]) {
      const o = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      o.type = 'sawtooth';
      o.frequency.value = f;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(a * 0.3, t + 0.35);
      g.gain.setValueAtTime(a * 0.3, t + dur - 0.6);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      const lp = this.ctx.createBiquadFilter();
      lp.type = 'lowpass';
      lp.frequency.value = 1400;
      o.connect(lp).connect(g).connect(out);
      o.start(t);
      this._track(o, t + dur + 0.1);
    }
  }

  /* ---------- Damaru ---------- */

  damaru(beats = 4, when = 0) {
    if (!this.ctx) return;
    for (let i = 0; i < beats; i++) this._damaruHit(when + i * 0.13);
  }

  _damaruHit(when) {
    const t = this.ctx.currentTime + when;
    const n = this.ctx.createBufferSource();
    n.buffer = this.noiseBuf;
    const bp = this.ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.Q.value = 3.5;
    bp.frequency.setValueAtTime(900, t);
    bp.frequency.exponentialRampToValueAtTime(260, t + 0.1);
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.45, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.11);
    n.connect(bp).connect(g).connect(this.master);
    n.start(t);
    this._track(n, t + 0.2);
  }

  /* ---------- Tanpura drone ---------- */

  /** One plucked string: additive harmonics with a jawari-like upper swell. */
  _pluck(freq, when, gain = 1) {
    const t = this.ctx.currentTime + when;
    const out = this.ctx.createGain();
    out.gain.value = 0.14 * gain;
    out.connect(this.droneGain);

    const N = 14;
    for (let h = 1; h <= N; h++) {
      const o = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      o.type = 'sine';
      // Slight inharmonicity, as on a real string under tension.
      o.frequency.value = freq * h * (1 + 0.00018 * h * h);
      const amp = (1 / Math.pow(h, 1.25)) * (h > 3 ? 0.85 : 1);
      const decay = 4.4 / Math.pow(h, 0.32);
      g.gain.setValueAtTime(0, t);
      if (h <= 3) {
        g.gain.linearRampToValueAtTime(amp, t + 0.02);
      } else {
        // Jawari: the upper partials bloom a moment after the pluck.
        g.gain.linearRampToValueAtTime(amp * 0.35, t + 0.03);
        g.gain.linearRampToValueAtTime(amp, t + 0.18 + h * 0.01);
      }
      g.gain.exponentialRampToValueAtTime(0.0001, t + decay);
      o.connect(g).connect(out);
      o.start(t);
      this._track(o, t + decay + 0.2);
    }
  }

  /** Start the four-string tanpura cycle: Pa · Sa · Sa · Sa(low). */
  startDrone(tonicHz = this.tonic) {
    if (!this.ctx || this.droneOn) return;
    this.tonic = tonicHz;
    this.droneOn = true;
    this.droneGain.gain.cancelScheduledValues(this.ctx.currentTime);
    this.droneGain.gain.setTargetAtTime(1, this.ctx.currentTime, 0.6);

    const Sa = tonicHz;
    const Pa = tonicHz * (3 / 2) / 2; // the fifth, an octave down
    const strings = [
      { f: Pa, g: 0.85 },
      { f: Sa, g: 1.0 },
      { f: Sa, g: 1.0 },
      { f: Sa / 2, g: 1.1 },
    ];
    let i = 0;
    const GAP = 1150; // ms between plucks
    const step = () => {
      if (!this.droneOn) return;
      const s = strings[i % strings.length];
      this._pluck(s.f, 0, s.g);
      i++;
      this.droneTimer = setTimeout(step, GAP + (Math.random() - 0.5) * 60);
    };
    step();
  }

  stopDrone() {
    this.droneOn = false;
    if (this.droneTimer) clearTimeout(this.droneTimer);
    this.droneTimer = null;
    if (this.droneGain && this.ctx) {
      this.droneGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.5);
    }
  }

  /** Stop every sounding voice immediately. */
  stopAll() {
    this.stopDrone();
    for (const n of this._nodes) {
      try { n.stop(); } catch { /* already stopped */ }
    }
    this._nodes.clear();
  }
}

/* ---------- Spoken chant, layered over the drone ---------- */

/** Wraps speechSynthesis so a missing or broken engine never breaks the japa. */
export class Voice {
  constructor() {
    this.supported = typeof window !== 'undefined' && 'speechSynthesis' in window;
    this.voice = null;
    this.enabled = true;
    if (this.supported) {
      const pick = () => { this.voice = this._best(); };
      pick();
      window.speechSynthesis.onvoiceschanged = pick;
    }
  }

  _best() {
    let voices = [];
    try { voices = window.speechSynthesis.getVoices() || []; } catch { return null; }
    if (!voices.length) return null;
    // Prefer an Indian-language voice; Devanagari and IAST both read far better on one.
    return (
      voices.find((v) => /^hi(-|_)/i.test(v.lang)) ||
      voices.find((v) => /^(sa|mr|ne)(-|_)/i.test(v.lang)) ||
      voices.find((v) => /(-|_)IN$/i.test(v.lang)) ||
      voices.find((v) => /^en/i.test(v.lang)) ||
      voices[0]
    );
  }

  speak(text, { rate = 0.78, pitch = 0.85, onend, onerror } = {}) {
    if (!this.supported || !this.enabled) { onend && setTimeout(onend, 10); return null; }
    try {
      const u = new SpeechSynthesisUtterance(text);
      if (this.voice) { u.voice = this.voice; u.lang = this.voice.lang; }
      u.rate = rate;
      u.pitch = pitch;
      u.volume = 1;
      u.onend = () => onend && onend();
      u.onerror = () => (onerror ? onerror() : onend && onend());
      window.speechSynthesis.speak(u);
      return u;
    } catch {
      onend && setTimeout(onend, 10);
      return null;
    }
  }

  cancel() {
    if (!this.supported) return;
    try { window.speechSynthesis.cancel(); } catch { /* ignore */ }
  }
}

/**
 * Japa: repeat one mantra `total` times over the drone, ringing the bell each
 * mala-round. Runs on the spoken voice when available and falls back to a timed
 * count when it is not, so the counter is never blocked by a missing TTS engine.
 */
export class Japa {
  constructor(engine, voice) {
    this.engine = engine;
    this.voice = voice;
    this.running = false;
    this.count = 0;
    this.total = 108;
    this._timer = null;
  }

  start(mantra, { total = 108, from = 0, onTick, onDone } = {}) {
    this.stop();
    this.running = true;
    this.count = from;
    this.total = total;
    this.mantra = mantra;
    this.onTick = onTick;
    this.onDone = onDone;
    this._next();
  }

  _next() {
    if (!this.running) return;
    if (this.count >= this.total) {
      this.running = false;
      this.engine.bell(0.2);
      this.onDone && this.onDone(this.count);
      return;
    }
    this.count++;
    this.onTick && this.onTick(this.count, this.total);
    if (this.count % 27 === 0 && this.count < this.total) this.engine.bell(0.75);

    const text = this.mantra.deva || this.mantra.translit || this.mantra.name;
    const gap = Math.max(700, (this.mantra.seconds || 4) * 1000);
    const advance = () => {
      if (!this.running) return;
      this._timer = setTimeout(() => this._next(), 320);
    };
    if (this.voice.supported && this.voice.enabled) {
      let done = false;
      const finish = () => { if (!done) { done = true; advance(); } };
      this.voice.speak(text, { onend: finish, onerror: finish });
      // Safety net: some Android WebViews never fire onend.
      this._timer = setTimeout(finish, gap + 4000);
    } else {
      this._timer = setTimeout(() => this._next(), gap);
    }
  }

  stop() {
    this.running = false;
    if (this._timer) clearTimeout(this._timer);
    this._timer = null;
    this.voice && this.voice.cancel();
  }
}
