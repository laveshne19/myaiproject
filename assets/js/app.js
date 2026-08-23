/* Shiv AI — application shell, router and views.

   Five places: Darshan (home), Jaap (chant), Gyaan (knowledge), Vaani (talk),
   Panchang (calendar). Content modules load on demand so the first paint is small.

   All dynamic text goes through esc() before it reaches innerHTML. */

import { esc, store, toast, openSheet, closeSheet, startMotes, fmtDate, fmtTime, daysBetween, todayKey, dailyIndex } from './ui.js';
import { I, natarajaSVG, malaSVG } from './icons.js';
import { SoundEngine, Voice, Japa, TONICS } from './audio.js';
import * as P from './panchang.js';
import { Conversation, LANGS, OPENERS, isCrisis, crisisCardHTML, renderReply, copyText } from './chat.js';

/* ---------- State ---------- */

const engine = new SoundEngine();
const voice = new Voice();
const japa = new Japa(engine, voice);
const convo = new Conversation();

const settings = {
  city: store.get('city', 'New Delhi'),
  lang: store.get('lang', 'en'),
  voiceOn: store.get('voiceOn', true),
  volume: store.get('volume', 0.7),
  tonic: store.get('tonic', 146.83),
  droneWithJapa: store.get('droneWithJapa', true),
};
engine.setVolume(settings.volume);
voice.enabled = settings.voiceOn;

const data = {};
async function load(name) {
  if (!data[name]) data[name] = await import(`../data/${name}.js`);
  return data[name];
}

function city() {
  return P.CITIES.find((c) => c.name === settings.city) || P.CITIES[0];
}

let deferredInstall = null;

/* ---------- Streak & counters ---------- */

function bumpStreak() {
  const today = todayKey();
  const last = store.get('streak.last', null);
  let n = store.get('streak.n', 0);
  if (last === today) return n;
  if (last && daysBetween(new Date(last), new Date()) === 1) n += 1;
  else n = 1;
  store.set('streak.last', today);
  store.set('streak.n', n);
  return n;
}
const streakCount = () => {
  const last = store.get('streak.last', null);
  if (!last) return 0;
  const gap = daysBetween(new Date(last), new Date());
  return gap <= 1 ? store.get('streak.n', 0) : 0;
};
const lifetimeJapa = () => store.get('japa.total', 0);
function addJapa(n) {
  store.set('japa.total', lifetimeJapa() + n);
  const key = 'japa.day.' + todayKey();
  store.set(key, (store.get(key, 0) || 0) + n);
  bumpStreak();
}

/* ---------- Router ---------- */

const TABS = [
  { id: 'darshan', label: 'Darshan', deva: 'दर्शन', icon: 'trishul' },
  { id: 'jaap', label: 'Jaap', deva: 'जाप', icon: 'mala' },
  { id: 'gyaan', label: 'Gyaan', deva: 'ज्ञान', icon: 'book' },
  { id: 'vaani', label: 'Vaani', deva: 'वाणी', icon: 'chat' },
  { id: 'panchang', label: 'Panchang', deva: 'पंचांग', icon: 'calendar' },
];

let current = 'darshan';
let cleanupView = null;

function go(tab, replace = false) {
  if (!TABS.some((t) => t.id === tab)) tab = 'darshan';
  current = tab;
  const url = '#/' + tab;
  if (location.hash !== url) {
    if (replace) history.replaceState(null, '', url);
    else history.pushState(null, '', url);
  }
  render();
}

function render() {
  if (cleanupView) { try { cleanupView(); } catch { /* ignore */ } cleanupView = null; }
  document.querySelectorAll('.tab').forEach((b) => {
    b.setAttribute('aria-selected', String(b.dataset.tab === current));
  });
  const main = document.getElementById('main');
  main.scrollTop = 0;
  window.scrollTo(0, 0);
  const views = { darshan: viewDarshan, jaap: viewJaap, gyaan: viewGyaan, vaani: viewVaani, panchang: viewPanchang };
  (views[current] || viewDarshan)(main);
}

/* ---------- Shared bits ---------- */

function greeting() {
  const h = new Date().getHours();
  if (h < 5) return 'The still hour';
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  if (h < 21) return 'Good evening';
  return 'Good night';
}

function sectionHead(title, moreLabel, moreId) {
  return `<div class="section-head"><h2>${esc(title)}</h2>${
    moreLabel ? `<button class="more" data-more="${esc(moreId)}">${esc(moreLabel)} →</button>` : ''
  }</div>`;
}

function listItem(lead, title, sub, attrs = '') {
  return `<button class="list-item" ${attrs}>
    <span class="lead">${lead}</span>
    <span class="body"><span class="t">${esc(title)}</span>${sub ? `<span class="s">${esc(sub)}</span>` : ''}</span>
    <span class="chev">${I.chevron}</span>
  </button>`;
}

function readerHead(title, sub) {
  return `<div class="eyebrow">${esc(sub || '')}</div><h2 style="margin-top:3px">${esc(title)}</h2>`;
}

/* ---------- View: Darshan ---------- */

async function viewDarshan(main) {
  const t = await load('teachings');
  const m = await load('mantras');
  const teaching = t.TEACHINGS[dailyIndex(t.TEACHINGS.length)];
  const mantra = m.MANTRAS[dailyIndex(m.MANTRAS.length, 7)];
  const c = city();
  const now = new Date();
  const tithi = P.tithiForDay(now, c.lat, c.lon);
  const tl = P.tithiLabel(tithi);
  const ev = P.sunEvents(now, c.lat, c.lon);
  const obs = P.upcomingObservances(now, c.lat, c.lon, 60);
  const next = obs[0];
  const streak = streakCount();

  main.innerHTML = `
  <div class="view">
    <section class="shrine">
      <div class="halo"></div>
      <div class="nataraja">${natarajaSVG()}</div>
      <div class="greet">${esc(greeting())}<span class="om"> · ॐ</span></div>
      <div class="sub">Har Har Mahadev</div>
      <div class="tithi-strip">
        <span class="pill">${esc(tl.paksha)} ${esc(tl.name)}</span>
        ${ev.sunrise ? `<span class="pill neel">Sunrise ${esc(fmtTime(ev.sunrise))}</span>` : ''}
        ${streak > 0 ? `<span class="pill ember">${esc(streak)}-day streak</span>` : ''}
      </div>
    </section>

    <div class="quick">
      <button data-go="jaap">${I.mala}<span>Chant</span></button>
      <button data-act="bell">${I.bell}<span>Bell</span></button>
      <button data-act="aarti">${I.flame}<span>Aarti</span></button>
      <button data-go="vaani">${I.chat}<span>Ask</span></button>
    </div>

    <div class="section">
      ${sectionHead('Today’s teaching')}
      <div class="card verse-card tap" data-teaching="${esc(teaching.id)}">
        <div class="eyebrow">${esc(teaching.cat)}</div>
        <div class="q" style="margin-top:8px">${esc(teaching.title)}</div>
        <p class="dim small" style="margin-top:9px">${esc(teaching.text.split('\n')[0].slice(0, 170))}…</p>
        <div class="row" style="margin-top:12px;color:var(--gold)">
          <span class="small">Read · ${esc(teaching.minutes)} min</span>
        </div>
      </div>
    </div>

    <div class="section">
      ${sectionHead('Mantra for today')}
      <div class="card tap" data-mantra="${esc(mantra.id)}">
        <div class="row">
          <div style="flex:1">
            <div class="eyebrow">${esc(mantra.tag)}</div>
            <h3 style="margin-top:4px">${esc(mantra.name)}</h3>
          </div>
          <span class="pill">${esc(mantra.count)}×</span>
        </div>
        <div class="deva" style="margin-top:10px;font-size:1.05em">${esc(mantra.deva)}</div>
        <p class="small dim" style="margin-top:8px">${esc(mantra.benefit)}</p>
      </div>
    </div>

    ${next ? `<div class="section">
      ${sectionHead('Next observance', 'All', 'panchang')}
      <div class="card obs ${next.kind === 'mahashivaratri' ? 'maha' : ''} tap" data-go="panchang">
        <div class="cal">
          <div class="d">${esc(next.date.getDate())}</div>
          <div class="m">${esc(next.date.toLocaleDateString('en-IN', { month: 'short' }))}</div>
        </div>
        <div style="flex:1;min-width:0">
          <div class="t" style="font-size:15px;color:var(--white)">${esc(next.title)}</div>
          <div class="small dim">${esc(next.detail)} · ${esc(P.CITIES.find(x => x.name === settings.city) ? settings.city : 'New Delhi')}</div>
          <div class="small faint" style="margin-top:3px">${esc(next.note)}</div>
        </div>
      </div>
    </div>` : ''}

    <div class="section">
      ${sectionHead('Begin somewhere')}
      <div class="list">
        ${listItem(I.book, 'The stories', 'Fourteen tellings from the Puranas', 'data-go2="stories"')}
        ${listItem(I.mountain, 'The twelve Jyotirlingas', 'Where to go, and why', 'data-go2="jyotirlinga"')}
        ${listItem(I.linga, 'How to worship at home', 'Nine steps, and what to offer', 'data-go2="puja"')}
      </div>
    </div>

    <p class="disclaimer" style="margin-top:26px">
      Shiv AI is a devotional companion built with respect for the Shaiva tradition.
      It is not a priest, a doctor or a substitute for professional help.
    </p>
  </div>`;

  main.querySelectorAll('[data-go]').forEach((el) =>
    el.addEventListener('click', () => go(el.dataset.go)));
  main.querySelector('[data-teaching]').addEventListener('click', async () => {
    openTeaching(teaching);
  });
  main.querySelector('[data-mantra]').addEventListener('click', () => go('jaap'));
  main.querySelectorAll('[data-go2]').forEach((el) =>
    el.addEventListener('click', () => { pendingGyaan = el.dataset.go2; go('gyaan'); }));
  const bellBtn = main.querySelector('[data-act="bell"]');
  if (bellBtn) bellBtn.addEventListener('click', async () => {
    await engine.unlock();
    engine.bell(0.7);
    toast('Om Namah Shivaya');
  });
  const aartiBtn = main.querySelector('[data-act="aarti"]');
  if (aartiBtn) aartiBtn.addEventListener('click', async () => {
    const s = await load('stotras');
    openStotra(s.AARTIS[0]);
  });
}

/* ---------- View: Jaap ---------- */

let jaapMantraId = store.get('jaap.mantra', 'panchakshara');
let jaapCount = 0;
let jaapFilter = 'all';

async function viewJaap(main) {
  const m = await load('mantras');
  const list = jaapFilter === 'all' ? m.MANTRAS : m.MANTRAS.filter((x) => x.intent === jaapFilter);
  const mantra = m.MANTRAS.find((x) => x.id === jaapMantraId) || m.MANTRAS[0];
  const target = mantra.count || 108;

  main.innerHTML = `
  <div class="view">
    <div class="chips" role="tablist" aria-label="Chant by intention">
      <button class="chip" data-f="all" aria-pressed="${jaapFilter === 'all'}">All</button>
      ${m.INTENTS.map((i) => `<button class="chip" data-f="${esc(i.id)}" aria-pressed="${jaapFilter === i.id}">${esc(i.label)} · ${esc(i.hi)}</button>`).join('')}
    </div>

    <div class="japa-stage">
      <div class="mala" id="mala" role="button" tabindex="0"
           aria-label="Tap to count one repetition">
        <span class="ripple"></span>
        <span id="malaring">${malaSVG(jaapCount, target)}</span>
        <span class="inner">
          <span class="count" id="jcount">${esc(jaapCount)}</span>
          <span class="of">OF ${esc(target)}</span>
        </span>
      </div>

      <div class="mantra-title">
        <div class="name">${esc(mantra.name)}</div>
        <div class="tagline">${esc(mantra.tag)}</div>
      </div>

      <div class="transport">
        <button class="round" id="jreset" aria-label="Reset count">${I.reset}</button>
        <button class="round main" id="jplay" aria-label="Start chanting">${I.play}</button>
        <button class="round" id="jdrone" aria-label="Toggle drone">${I.volume}</button>
      </div>
      <p class="small faint center" style="margin-top:12px;max-width:300px">
        Tap the mala to count by hand, or press play and let the chant carry you.
        The bell sounds every 27 beads.
      </p>
    </div>

    <div class="card" style="margin-top:20px">
      <div class="deva">${esc(mantra.deva)}</div>
      <div class="translit" style="margin-top:10px">${esc(mantra.translit)}</div>
      <p class="meaning" style="margin-top:12px">${esc(mantra.meaning)}</p>
      <div class="panel" style="margin-top:12px">
        <div class="eyebrow">Chanted for</div>
        <p class="small" style="margin-top:4px">${esc(mantra.benefit)}</p>
      </div>
    </div>

    <div class="section">
      ${sectionHead('Sit and breathe')}
      <div class="card tap" id="breathcard">
        <div class="row">
          <div style="flex:1">
            <h3>Guided breath</h3>
            <p class="small dim" style="margin-top:3px">Four in, hold, six out. Eleven-second cycle, with the drone.</p>
          </div>
          ${I.lotus}
        </div>
      </div>
    </div>

    <div class="section">
      ${sectionHead('Choose a mantra')}
      <div class="list">
        ${list.map((x) => listItem(
          `<span class="num">${esc(x.count)}</span>`,
          x.name,
          x.tag,
          `data-m="${esc(x.id)}"`
        )).join('')}
      </div>
    </div>

    <div class="section">
      ${sectionHead('Temple sounds')}
      <div class="grid3">
        <button class="chip" data-sound="bell" style="justify-content:center">Bell</button>
        <button class="chip" data-sound="conch" style="justify-content:center">Conch</button>
        <button class="chip" data-sound="damaru" style="justify-content:center">Damaru</button>
      </div>
    </div>

    <div class="card" style="margin-top:22px">
      <div class="row">
        <div style="flex:1"><div class="eyebrow">Your practice</div>
          <h3 style="margin-top:4px">${esc(lifetimeJapa().toLocaleString('en-IN'))} repetitions</h3></div>
        <span class="pill">${esc(streakCount())}-day streak</span>
      </div>
    </div>
  </div>`;

  const countEl = main.querySelector('#jcount');
  const ringEl = main.querySelector('#malaring');
  const malaEl = main.querySelector('#mala');
  const playBtn = main.querySelector('#jplay');
  const droneBtn = main.querySelector('#jdrone');

  const paint = () => {
    countEl.textContent = String(jaapCount);
    ringEl.innerHTML = malaSVG(jaapCount, target);
  };

  const tick = async (fromAuto) => {
    if (jaapCount >= target) return;
    jaapCount++;
    paint();
    malaEl.classList.remove('pulse');
    void malaEl.offsetWidth;
    malaEl.classList.add('pulse');
    if (!fromAuto) {
      await engine.unlock();
      if (jaapCount % 27 === 0) engine.bell(0.75);
    }
    if (jaapCount >= target) {
      addJapa(target);
      engine.bell(0.2);
      toast('Mala complete · ' + target + ' repetitions');
      stopAuto();
    }
  };

  malaEl.addEventListener('click', () => tick(false));
  malaEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); tick(false); }
  });

  main.querySelector('#jreset').addEventListener('click', () => {
    stopAuto(); jaapCount = 0; paint(); toast('Count reset');
  });

  function stopAuto() {
    japa.stop();
    playBtn.innerHTML = I.play;
    playBtn.setAttribute('aria-label', 'Start chanting');
  }

  playBtn.addEventListener('click', async () => {
    if (japa.running) { stopAuto(); return; }
    const ok = await engine.unlock();
    if (!ok) { toast('Sound is not available on this device'); return; }
    if (settings.droneWithJapa) engine.startDrone(settings.tonic);
    playBtn.innerHTML = I.pause;
    playBtn.setAttribute('aria-label', 'Pause chanting');
    japa.start(mantra, {
      total: target,
      from: jaapCount,
      onTick: (n) => { jaapCount = n; paint(); malaEl.classList.remove('pulse'); void malaEl.offsetWidth; malaEl.classList.add('pulse'); },
      onDone: () => { addJapa(target); stopAuto(); toast('Mala complete'); },
    });
  });

  droneBtn.addEventListener('click', async () => {
    await engine.unlock();
    if (engine.droneOn) { engine.stopDrone(); droneBtn.innerHTML = I.mute; toast('Drone off'); }
    else { engine.startDrone(settings.tonic); droneBtn.innerHTML = I.volume; toast('Tanpura drone'); }
  });

  main.querySelectorAll('[data-sound]').forEach((b) =>
    b.addEventListener('click', async () => {
      await engine.unlock();
      const k = b.dataset.sound;
      if (k === 'bell') engine.bell(0.6);
      else if (k === 'conch') engine.conch();
      else engine.damaru(5);
    }));

  main.querySelectorAll('[data-f]').forEach((b) =>
    b.addEventListener('click', () => { jaapFilter = b.dataset.f; render(); }));

  main.querySelectorAll('[data-m]').forEach((b) =>
    b.addEventListener('click', () => {
      stopAuto();
      jaapMantraId = b.dataset.m;
      store.set('jaap.mantra', jaapMantraId);
      jaapCount = 0;
      render();
    }));

  main.querySelector('#breathcard').addEventListener('click', openBreath);

  cleanupView = () => { stopAuto(); };
}

function openBreath() {
  openSheet(
    readerHead('Guided breath', 'Eleven seconds'),
    `<div class="breath"><div class="orb" id="orb">Breathe in</div></div>
     <p class="center dim small">Four seconds in · hold · six out. Follow the orb.<br>
     Stay as long as you like. Close when you are ready.</p>
     <button class="btn btn-ghost btn-block" style="margin-top:18px" id="breathdrone">Tanpura drone</button>`,
    I.close
  );
  const orb = document.getElementById('orb');
  const phases = [[0, 'Breathe in'], [4000, 'Hold'], [5000, 'Breathe out'], [11000, null]];
  let i = 0;
  const loop = () => {
    if (!document.body.contains(orb)) return;
    const [, label] = phases[i % 3];
    orb.textContent = label;
    i++;
    const delays = [4000, 1000, 6000];
    setTimeout(loop, delays[(i - 1) % 3]);
  };
  loop();
  const db = document.getElementById('breathdrone');
  db.addEventListener('click', async () => {
    await engine.unlock();
    if (engine.droneOn) { engine.stopDrone(); db.textContent = 'Tanpura drone'; }
    else { engine.startDrone(settings.tonic); db.textContent = 'Stop drone'; }
  });
}

/* ---------- View: Gyaan ---------- */

let pendingGyaan = null;

const GYAAN_SECTIONS = [
  { id: 'forms', title: 'The forms of Shiva', sub: 'Nataraja, Ardhanarishvara, Neelkanth and nine more', icon: 'trishul' },
  { id: 'stories', title: 'The great stories', sub: 'Fourteen tellings, and what each one asks of you', icon: 'book' },
  { id: 'teachings', title: 'Teachings', sub: 'Twenty-two, each with something to do today', icon: 'sparkle' },
  { id: 'stotras', title: 'Stotras & aarti', sub: 'Rudrashtakam, Lingashtakam, Om Jai Shiv Omkara', icon: 'flame' },
  { id: 'avatars', title: 'The nineteen avatars', sub: 'From Nandi and Bhairava to Hanuman', icon: 'sparkle' },
  { id: 'jyotirlinga', title: 'Twelve Jyotirlingas', sub: 'Somnath to Grishneshwar — where and why', icon: 'mountain' },
  { id: 'symbols', title: 'What every symbol means', sub: 'Trident, damaru, moon, serpent, ash', icon: 'damaru' },
  { id: 'faces', title: 'The five faces', sub: 'Sadyojata, Vamadeva, Aghora, Tatpurusha, Ishana', icon: 'lotus' },
  { id: 'family', title: 'The family', sub: 'Parvati, Ganesha, Kartikeya, Nandi', icon: 'heart' },
  { id: 'names', title: 'The 108 names', sub: 'Ashtottara Shatanamavali, with meanings', icon: 'mala' },
];

async function viewGyaan(main) {
  if (pendingGyaan) {
    const target = pendingGyaan;
    pendingGyaan = null;
    if (target === 'puja') { const pr = await load('practice'); openPuja(pr.PUJA); }
    else { await openGyaanSection(target); }
  }

  main.innerHTML = `
  <div class="view">
    <div class="eyebrow">Gyaan · ज्ञान</div>
    <h1 style="margin-top:4px">Everything about Mahadeva</h1>
    <p class="dim" style="margin-top:8px">The forms, the stories, the teachings and the places —
    drawn from the Shiva Purana, the Linga Purana, the Mahabharata and the living temple tradition.</p>
    <div class="list" style="margin-top:20px">
      ${GYAAN_SECTIONS.map((s) => listItem(I[s.icon], s.title, s.sub, `data-sec="${esc(s.id)}"`)).join('')}
    </div>
    <div class="card" style="margin-top:22px">
      <div class="row"><span style="color:var(--gold)">${I.info}</span>
        <p class="small dim" style="flex:1">Regional lineages differ, sometimes sharply.
        Where a story or a rule has more than one accepted version, this app says so
        rather than picking one and calling it the truth.</p></div>
    </div>
  </div>`;

  main.querySelectorAll('[data-sec]').forEach((b) =>
    b.addEventListener('click', () => openGyaanSection(b.dataset.sec)));
}

async function openGyaanSection(id) {
  if (id === 'forms') {
    const k = await load('knowledge');
    openList('The forms of Shiva', 'Twelve', k.FORMS.map((f) => ({
      title: f.name, sub: f.tag, lead: I[f.icon] ? I[f.icon] : I.trishul,
      open: () => openSheet(
        readerHead(f.name, f.tag),
        `<div class="deva" style="font-size:1.2em">${esc(f.hi)}</div>
         <p class="prose" style="margin-top:14px">${esc(f.text)}</p>
         <div class="panel" style="margin-top:16px"><div class="eyebrow">Where</div>
         <p class="small" style="margin-top:5px">${esc(f.where)}</p></div>`, I.close),
    })));
  } else if (id === 'stories') {
    const k = await load('stories');
    openList('The great stories', 'Fourteen', k.STORIES.map((s) => ({
      title: s.title, sub: `${s.cat} · ${s.minutes} min`, lead: I.book,
      open: () => openSheet(
        readerHead(s.title, `${s.cat} · ${s.minutes} min read`),
        `<div class="deva" style="font-size:1.15em">${esc(s.hi)}</div>
         <p class="prose" style="margin-top:14px">${esc(s.text)}</p>
         <div class="panel" style="margin-top:18px;border-color:rgba(217,169,60,.3)">
           <div class="eyebrow">What it asks of you</div>
           <p style="margin-top:6px">${esc(s.lesson)}</p></div>`, I.close),
    })));
  } else if (id === 'teachings') {
    const k = await load('teachings');
    openList('Teachings', 'Twenty-two', k.TEACHINGS.map((t) => ({
      title: t.title, sub: `${t.cat} · ${t.minutes} min`, lead: I.sparkle,
      open: () => openTeaching(t),
    })));
  } else if (id === 'stotras') {
    const k = await load('stotras');
    const all = [...k.STOTRAS, ...k.AARTIS];
    openList('Stotras & aarti', 'Seven', all.map((s) => ({
      title: s.name, sub: `${s.by} · ${s.verses.length} verses`, lead: I.flame,
      open: () => openStotra(s),
    })));
  } else if (id === 'avatars') {
    const k = await load('knowledge');
    openList('The nineteen avatars', 'Shiva Purana', k.AVATARS.map((a) => ({
      title: `${a.n}. ${a.name}`, sub: a.hi, lead: `<span class="num">${a.n}</span>`,
      open: () => openSheet(
        readerHead(a.name, `Avatar ${a.n} of 19`),
        `<div class="deva" style="font-size:1.25em">${esc(a.hi)}</div>
         <p class="prose" style="margin-top:14px">${esc(a.text)}</p>`, I.close),
    })));
  } else if (id === 'jyotirlinga') {
    const k = await load('places');
    const items = k.JYOTIRLINGAS.map((j) => ({
      title: `${j.n}. ${j.name}`, sub: j.where, lead: `<span class="num">${j.n}</span>`,
      open: () => openSheet(
        readerHead(j.name, `Jyotirlinga ${j.n} of 12`),
        `<div class="deva" style="font-size:1.25em">${esc(j.hi)}</div>
         <div class="pill" style="margin-top:10px">${esc(j.where)}</div>
         <p class="prose" style="margin-top:14px">${esc(j.text)}</p>
         <div class="panel" style="margin-top:16px"><div class="eyebrow">When to go</div>
         <p class="small" style="margin-top:5px">${esc(j.best)}</p></div>`, I.close),
    }));
    items.push(...k.PANCHA_BHOOTA.map((p) => ({
      title: `${p.temple} — ${p.el}`, sub: p.where, lead: I.lotus,
      open: () => openSheet(
        readerHead(p.temple, `The ${p.el.toLowerCase()} temple · ${p.hi}`),
        `<div class="pill">${esc(p.where)}</div>
         <p class="prose" style="margin-top:14px">${esc(p.text)}</p>`, I.close),
    })));
    items.push({
      title: 'The Panch Kedar', sub: 'Five shrines where the bull sank', lead: I.mountain,
      open: () => openSheet(
        readerHead('The Panch Kedar', 'Uttarakhand'),
        `<p class="prose">Fleeing the Pandavas, Shiva took the form of a bull and sank into the ground at Guptkashi. Five parts surfaced across the Garhwal Himalaya, and each became a shrine.</p>
         ${k.PANCH_KEDAR.map((x) => `<div class="verse-block">
            <div class="vnum">${esc(x.part)}</div>
            <h3 style="margin-top:4px">${esc(x.name)}</h3>
            <p class="small dim" style="margin-top:3px">${esc(x.where)}</p></div>`).join('')}`, I.close),
    });
    openList('Sacred geography', 'Twelve + five + five', items);
  } else if (id === 'symbols') {
    const k = await load('knowledge');
    openList('What every symbol means', 'Twelve', k.SYMBOLS.map((s) => ({
      title: s.name, sub: s.hi, lead: I.damaru,
      open: () => openSheet(
        readerHead(s.name, s.hi),
        `<p class="prose">${esc(s.text)}</p>`, I.close),
    })));
  } else if (id === 'faces') {
    const k = await load('knowledge');
    openList('The five faces', 'Panchanana', k.FACES.map((f) => ({
      title: f.name, sub: `${f.dir} · ${f.element} · ${f.power}`, lead: I.lotus,
      open: () => openSheet(
        readerHead(f.name, `${f.dir} · ${f.element}`),
        `<div class="deva" style="font-size:1.3em">${esc(f.hi)}</div>
         <div class="row" style="margin-top:10px;gap:7px;flex-wrap:wrap">
           <span class="pill">${esc(f.dir)}</span><span class="pill neel">${esc(f.element)}</span>
           <span class="pill ember">${esc(f.power)}</span></div>
         <p class="prose" style="margin-top:14px">${esc(f.text)}</p>`, I.close),
    })));
  } else if (id === 'family') {
    const k = await load('knowledge');
    openList('The family', 'Kailash', k.FAMILY.map((f) => ({
      title: f.name, sub: f.rel, lead: I.heart,
      open: () => openSheet(
        readerHead(f.name, f.rel),
        `<div class="deva" style="font-size:1.3em">${esc(f.hi)}</div>
         <p class="prose" style="margin-top:14px">${esc(f.text)}</p>`, I.close),
    })));
  } else if (id === 'names') {
    const k = await load('names108');
    openSheet(
      readerHead('The 108 names', 'Ashtottara Shatanamavali'),
      `<p class="small dim">Recited as “Om … namaḥ”, one name to a bead. Tap the bell to begin.</p>
       <button class="btn btn-ghost btn-block" style="margin:14px 0" id="namesbell">Sound the bell</button>
       ${k.NAMES_108.map((n) => `<div class="verse-block">
          <div class="row" style="align-items:baseline;gap:9px">
            <span class="vnum" style="min-width:26px">${esc(n.n)}</span>
            <div style="flex:1">
              <span class="deva" style="font-size:1.1em">${esc(n.deva)}</span>
              <div style="font-family:var(--display);font-size:15px;color:var(--white)">${esc(n.name)}</div>
              <div class="small dim" style="margin-top:2px">${esc(n.meaning)}</div>
            </div>
          </div></div>`).join('')}`, I.close);
    const nb = document.getElementById('namesbell');
    if (nb) nb.addEventListener('click', async () => { await engine.unlock(); engine.bell(0.55); });
  }
}

function openList(title, sub, items) {
  openSheet(
    readerHead(title, sub),
    `<div class="list">${items.map((it, i) => listItem(it.lead, it.title, it.sub, `data-i="${i}"`)).join('')}</div>`,
    I.close
  );
  document.querySelectorAll('.sheet-body [data-i]').forEach((b) => {
    b.addEventListener('click', () => {
      const it = items[Number(b.dataset.i)];
      if (it && it.open) it.open();
    });
  });
}

function openTeaching(t) {
  openSheet(
    readerHead(t.title, `${t.cat} · ${t.minutes} min`),
    `<p class="prose">${esc(t.text)}</p>
     <div class="panel" style="margin-top:18px;border-color:rgba(217,169,60,.3)">
       <div class="eyebrow">Practice</div>
       <p style="margin-top:6px">${esc(t.practice)}</p></div>
     <button class="btn btn-ghost btn-block" style="margin-top:16px" id="tshare">Copy this teaching</button>`,
    I.close
  );
  const b = document.getElementById('tshare');
  if (b) b.addEventListener('click', () => copyText(`${t.title}\n\n${t.text}\n\nPractice: ${t.practice}\n\n— Shiv AI, shivaaionline.in`));
}

function openStotra(s) {
  openSheet(
    readerHead(s.name, `${s.by} · ${s.minutes} min`),
    `<div class="deva" style="font-size:1.3em">${esc(s.hi)}</div>
     <p class="small dim" style="margin-top:8px">${esc(s.note)}</p>
     ${s.complete === false ? '<div class="panel" style="margin-top:12px"><p class="small">This is an excerpt, not the complete text — the app shows only verses it can present accurately.</p></div>' : ''}
     <div style="margin-top:8px">
       ${s.verses.map((v, i) => `<div class="verse-block">
         <div class="vnum">Verse ${i + 1}</div>
         <div class="deva" style="margin-top:6px">${esc(v.deva)}</div>
         ${v.translit ? `<div class="translit" style="margin-top:8px">${esc(v.translit)}</div>` : ''}
         <p class="meaning" style="margin-top:9px">${esc(v.meaning)}</p>
       </div>`).join('')}
     </div>
     <button class="btn btn-ghost btn-block" style="margin-top:16px" id="stbell">Sound the bell</button>`,
    I.close
  );
  const b = document.getElementById('stbell');
  if (b) b.addEventListener('click', async () => { await engine.unlock(); engine.bell(0.6); });
}

function openPuja(PUJA) {
  openSheet(
    readerHead('Worship at home', 'Nine steps'),
    `<p class="prose">${esc(PUJA.intro)}</p>
     ${PUJA.steps.map((s) => `<div class="verse-block">
        <div class="vnum">Step ${esc(s.n)}</div>
        <h3 style="margin-top:4px">${esc(s.name)}</h3>
        <p class="small" style="margin-top:5px">${esc(s.text)}</p></div>`).join('')}
     <h3 style="margin-top:20px">What to offer</h3>
     <div style="margin-top:10px">
       ${PUJA.offer.map((o) => `<div class="row" style="align-items:flex-start;gap:9px;padding:8px 0;border-bottom:1px solid var(--line-soft)">
          <span style="color:${o.yes ? 'var(--ok)' : 'var(--ember)'};font-weight:700;flex:none">${o.yes ? '✓' : '✕'}</span>
          <div style="flex:1"><div style="font-size:14px;color:var(--white)">${esc(o.item)}</div>
          <div class="small dim" style="margin-top:2px">${esc(o.why)}</div></div></div>`).join('')}
     </div>
     <p class="small dim" style="margin-top:16px">${esc(PUJA.note)}</p>`,
    I.close
  );
}

/* ---------- Reporting a reply ----------
   Google Play's generative-AI policy requires an in-app way to report offensive
   output. The report carries only the reply being flagged and the reason. */

const REPORT_REASONS = [
  'Offensive or disrespectful',
  'Factually wrong about the tradition',
  'Unsafe or harmful advice',
  'Sexual or violent content',
  'Something else',
];

function reportReply(text) {
  openSheet(
    readerHead('Report this reply', 'Every report is read'),
    `<p class="small dim">Tell us what was wrong. Only the reply below and your reason are sent —
     nothing else from your device, and nothing about you.</p>
     <div class="panel" style="margin-top:12px;max-height:190px;overflow:auto">
       <p class="small" style="white-space:pre-wrap">${esc(text.slice(0, 1200))}</p>
     </div>
     <div class="stack" style="margin-top:14px">
       ${REPORT_REASONS.map((r) => `<button class="btn btn-ghost" data-reason="${esc(r)}">${esc(r)}</button>`).join('')}
     </div>
     <p class="small faint" style="margin-top:14px">This opens your email app so you can see exactly
     what is being sent before it leaves your device.</p>`,
    I.close
  );
  document.querySelectorAll('.sheet-body [data-reason]').forEach((b) => {
    b.addEventListener('click', () => {
      const reason = b.dataset.reason;
      const body =
        `Reason: ${reason}\n\n--- Reply reported ---\n${text.slice(0, 1500)}\n\n` +
        `--- App ---\nShiv AI 2.0\n${navigator.userAgent.slice(0, 160)}`;
      const href =
        'mailto:support@shivaaionline.in' +
        '?subject=' + encodeURIComponent('Shiv AI — report a reply') +
        '&body=' + encodeURIComponent(body);
      closeSheet();
      window.location.href = href;
      toast('Thank you. Opening your email app.');
    });
  });
}

/* ---------- View: Vaani ---------- */

function viewVaani(main) {
  main.innerHTML = `
  <div class="view chat-wrap">
    <div class="chips" style="flex:none;padding-bottom:8px">
      ${LANGS.map((l) => `<button class="chip" data-lang="${esc(l.id)}" aria-pressed="${settings.lang === l.id}">${esc(l.label)}</button>`).join('')}
      <button class="chip" data-clear="1">Clear</button>
    </div>
    <div class="chat-scroll" id="scroll" aria-live="polite"></div>
    <div class="composer">
      <label class="sr-only" for="ask">Ask Shiva</label>
      <textarea id="ask" rows="1" placeholder="Share what is in your heart…" maxlength="2000"></textarea>
      <button class="send" id="send" aria-label="Send">${I.send}</button>
    </div>
    <p class="disclaimer">Shiv AI is an AI companion, not a priest, doctor, lawyer or therapist.
      For medical, legal or financial matters, please consult a qualified person.</p>
  </div>`;

  const scroll = main.querySelector('#scroll');
  const ta = main.querySelector('#ask');
  const send = main.querySelector('#send');

  const atBottom = () => scroll.scrollHeight - scroll.scrollTop - scroll.clientHeight < 90;
  const toBottom = () => { scroll.scrollTop = scroll.scrollHeight; };

  function addUser(text) {
    const d = document.createElement('div');
    d.className = 'msg me';
    d.innerHTML = `<div class="bubble">${esc(text)}</div>`;
    scroll.appendChild(d);
    toBottom();
  }
  function addShiva(text, err) {
    const d = document.createElement('div');
    d.className = 'msg shiva' + (err ? ' err' : '');
    d.innerHTML = `<div class="bubble">${err ? esc(text) : renderReply(text)}
      ${err ? '' : `<span class="msg-actions">
        <button class="msg-act" data-copy type="button">Copy</button>
        <button class="msg-act" data-report type="button">Report</button>
      </span>`}</div>`;
    scroll.appendChild(d);
    if (!err) {
      d.querySelector('[data-copy]').addEventListener('click', () => copyText(text));
      d.querySelector('[data-report]').addEventListener('click', () => reportReply(text));
    }
    toBottom();
    return d;
  }
  function addCrisis() {
    const d = document.createElement('div');
    d.className = 'msg shiva';
    d.innerHTML = crisisCardHTML();
    scroll.appendChild(d);
    toBottom();
  }
  function addTyping() {
    const d = document.createElement('div');
    d.className = 'msg shiva';
    d.id = 'typing';
    d.innerHTML = '<div class="bubble"><span class="typing"><i></i><i></i><i></i></span></div>';
    scroll.appendChild(d);
    toBottom();
    return d;
  }

  function paintHistory() {
    scroll.innerHTML = '';
    if (!convo.turns.length) {
      scroll.innerHTML = `
        <div class="card" style="margin-bottom:14px">
          <div class="row"><span style="color:var(--gold)">${I.trishul}</span>
            <div style="flex:1"><h3>Speak, and I am listening</h3>
            <p class="small dim" style="margin-top:4px">Bring anything — grief, a decision, fear, anger, a question about the tradition. Nothing is too small or too shameful.</p></div>
          </div>
        </div>
        <div class="chips" style="flex-wrap:wrap;overflow:visible">
          ${OPENERS.map((o) => `<button class="chip" data-open="${esc(o)}" style="white-space:normal;text-align:left">${esc(o)}</button>`).join('')}
        </div>`;
      scroll.querySelectorAll('[data-open]').forEach((b) =>
        b.addEventListener('click', () => { ta.value = b.dataset.open; ta.focus(); autosize(); }));
      return;
    }
    for (const t of convo.turns) {
      if (t.role === 'user') { addUser(t.content); if (isCrisis(t.content)) addCrisis(); }
      else addShiva(t.content, false);
    }
    toBottom();
  }

  function autosize() {
    ta.style.height = 'auto';
    ta.style.height = Math.min(ta.scrollHeight, 128) + 'px';
  }

  async function doSend() {
    const text = ta.value.trim();
    if (!text || convo.busy) return;
    ta.value = '';
    autosize();
    if (scroll.querySelector('[data-open]')) scroll.innerHTML = '';
    addUser(text);
    if (isCrisis(text)) addCrisis();
    const typing = addTyping();
    send.disabled = true;
    await convo.send(text, settings.lang, {
      onDone: (reply) => { typing.remove(); addShiva(reply, false); send.disabled = false; },
      onError: (msg) => { typing.remove(); addShiva(msg, true); send.disabled = false; },
    });
    send.disabled = false;
  }

  send.addEventListener('click', doSend);
  ta.addEventListener('input', autosize);
  ta.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey && window.matchMedia('(min-width: 680px)').matches) {
      e.preventDefault(); doSend();
    }
  });
  main.querySelectorAll('[data-lang]').forEach((b) =>
    b.addEventListener('click', () => {
      settings.lang = b.dataset.lang; store.set('lang', settings.lang);
      main.querySelectorAll('[data-lang]').forEach((x) =>
        x.setAttribute('aria-pressed', String(x.dataset.lang === settings.lang)));
      toast('Replies will come in ' + (LANGS.find((l) => l.id === settings.lang) || {}).label);
    }));
  main.querySelector('[data-clear]').addEventListener('click', () => {
    convo.clear(); paintHistory(); toast('Conversation cleared from this device');
  });

  paintHistory();
  cleanupView = () => convo.abort();
}

/* ---------- View: Panchang ---------- */

async function viewPanchang(main) {
  const pr = await load('practice');
  const c = city();
  const now = new Date();
  const tithi = P.tithiForDay(now, c.lat, c.lon);
  const tl = P.tithiLabel(tithi);
  const ev = P.sunEvents(now, c.lat, c.lon);
  const obs = P.upcomingObservances(now, c.lat, c.lon, 200);
  const maha = obs.find((o) => o.kind === 'mahashivaratri');
  const next = obs[0];

  const daysTo = maha ? daysBetween(now, maha.date) : null;

  main.innerHTML = `
  <div class="view">
    <div class="eyebrow">Panchang · पंचांग</div>
    <h1 style="margin-top:4px">Today</h1>
    <p class="dim small" style="margin-top:4px">${esc(fmtDate(now))} · ${esc(settings.city)}</p>

    <div class="card" style="margin-top:14px">
      <div class="grid2">
        <div><div class="eyebrow">Tithi</div><h3 style="margin-top:4px">${esc(tl.name)}</h3>
          <div class="small dim">${esc(tl.paksha)} Paksha</div></div>
        <div><div class="eyebrow">Sun</div>
          <h3 style="margin-top:4px">${ev.sunrise ? esc(fmtTime(ev.sunrise)) : '—'}</h3>
          <div class="small dim">sets ${ev.sunset ? esc(fmtTime(ev.sunset)) : '—'}</div></div>
      </div>
      ${next && next.window && next.window.from ? `<div class="panel" style="margin-top:13px">
        <div class="eyebrow">${esc(next.title)} window</div>
        <p class="small" style="margin-top:4px">${esc(fmtTime(next.window.from))}${next.window.to ? ' – ' + esc(fmtTime(next.window.to)) : ' onward'} on ${esc(fmtDate(next.date))}</p>
      </div>` : ''}
    </div>

    ${maha ? `<div class="section">
      ${sectionHead('Maha Shivaratri')}
      <div class="card">
        <div class="center">
          <div class="deva" style="font-size:1.4em">महाशिवरात्रि</div>
          <p class="small dim" style="margin-top:2px">${esc(maha.date.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }))}</p>
        </div>
        <div class="countdown">
          <div><div class="n">${esc(daysTo)}</div><div class="l">Days</div></div>
        </div>
      </div>
    </div>` : ''}

    <div class="section">
      ${sectionHead('Coming up')}
      <div class="list">
        ${obs.slice(0, 14).map((o) => `<div class="card obs ${o.kind === 'mahashivaratri' ? 'maha' : ''}" style="margin-top:9px">
          <div class="cal"><div class="d">${esc(o.date.getDate())}</div>
            <div class="m">${esc(o.date.toLocaleDateString('en-IN', { month: 'short' }))}</div></div>
          <div style="flex:1;min-width:0">
            <div style="font-size:14.5px;color:var(--white)">${esc(o.title)}</div>
            <div class="small dim">${esc(o.detail)}</div>
            <div class="small faint" style="margin-top:2px">${esc(o.note)}</div>
          </div>
        </div>`).join('')}
      </div>
      <p class="small faint" style="margin-top:12px">
        Dates are computed astronomically for ${esc(settings.city)} using the Amanta reckoning.
        Purnimanta calendars, used across much of north India, name the lunar month a fortnight
        differently — the days themselves are the same. Confirm with your family’s panchang before a vrat.
      </p>
    </div>

    <div class="section">
      ${sectionHead('How to worship')}
      <div class="list">
        ${listItem(I.linga, 'Worship at home', 'Nine steps, and what to offer', 'data-puja="1"')}
      </div>
    </div>

    <div class="section">
      ${sectionHead('The observances')}
      <div class="list">
        ${pr.FESTIVALS.map((f) => listItem(I.flame, f.name, f.when, `data-fest="${esc(f.id)}"`)).join('')}
      </div>
    </div>
  </div>`;

  main.querySelector('[data-puja]').addEventListener('click', () => openPuja(pr.PUJA));
  main.querySelectorAll('[data-fest]').forEach((b) =>
    b.addEventListener('click', () => {
      const f = pr.FESTIVALS.find((x) => x.id === b.dataset.fest);
      if (!f) return;
      openSheet(
        readerHead(f.name, f.tag),
        `<div class="deva" style="font-size:1.3em">${esc(f.hi)}</div>
         <div class="pill" style="margin-top:10px">${esc(f.when)}</div>
         <p class="prose" style="margin-top:14px">${esc(f.text)}</p>
         <h3 style="margin-top:18px">How it is kept</h3>
         <div style="margin-top:8px">${f.how.map((h) => `<div class="row" style="align-items:flex-start;gap:9px;padding:7px 0">
            <span style="color:var(--gold);flex:none">•</span><p class="small" style="flex:1">${esc(h)}</p></div>`).join('')}</div>
         <div class="panel" style="margin-top:14px"><p class="small dim">Fasting is a devotional choice, not a medical one.
         If you are pregnant, diabetic, unwell, elderly or on medication that needs food, keep the prayer and skip the fast.</p></div>`,
        I.close
      );
    }));
}

/* ---------- Settings ---------- */

function openSettings() {
  const tonicOpts = TONICS.map((t) =>
    `<option value="${t.hz}" ${Math.abs(t.hz - settings.tonic) < 0.01 ? 'selected' : ''}>${esc(t.label)}</option>`).join('');
  const cityOpts = P.CITIES.map((c) =>
    `<option value="${esc(c.name)}" ${c.name === settings.city ? 'selected' : ''}>${esc(c.name)}</option>`).join('');

  openSheet(
    readerHead('Settings', 'Shiv AI'),
    `<div class="setting"><div class="sl"><div class="t">City</div>
       <div class="s">Used for sunrise, sunset and tithi</div></div>
       <select id="s-city">${cityOpts}</select></div>

     <div class="setting"><div class="sl"><div class="t">Chant voice</div>
       <div class="s">Speak the mantra aloud during japa</div></div>
       <label class="switch"><input type="checkbox" id="s-voice" ${settings.voiceOn ? 'checked' : ''}>
       <span class="track"></span><span class="knob"></span></label></div>

     <div class="setting"><div class="sl"><div class="t">Drone with japa</div>
       <div class="s">Start the tanpura when chanting begins</div></div>
       <label class="switch"><input type="checkbox" id="s-drone" ${settings.droneWithJapa ? 'checked' : ''}>
       <span class="track"></span><span class="knob"></span></label></div>

     <div class="setting"><div class="sl"><div class="t">Drone pitch</div>
       <div class="s">Your Sa</div></div><select id="s-tonic">${tonicOpts}</select></div>

     <div class="setting"><div class="sl"><div class="t">Volume</div></div>
       <input type="range" id="s-vol" min="0" max="1" step="0.05" value="${settings.volume}"></div>

     <div class="section" style="margin-top:22px">
       <h3>Your data</h3>
       <p class="small dim" style="margin-top:6px">Your conversations, counts and settings are stored only on this
       device. Nothing is sent anywhere except the message you type in Vaani, which goes to the AI to be answered
       and is not kept afterwards. There is no account and no tracking.</p>
       <button class="btn btn-ghost btn-block" style="margin-top:12px" id="s-clearchat">Clear conversation</button>
       <button class="btn btn-ghost btn-block" style="margin-top:9px" id="s-clearall">Erase everything on this device</button>
     </div>

     <div class="section" style="margin-top:22px">
       <h3>About</h3>
       <p class="small dim" style="margin-top:6px">Shiv AI is a free devotional companion. The texts are traditional
       and in the public domain; every sound in the app is synthesised in your browser, so nothing here is
       borrowed from anyone.</p>
       <div class="row" style="margin-top:12px;gap:9px;flex-wrap:wrap">
         <a class="chip" href="/privacy.html">Privacy</a>
         <a class="chip" href="/terms.html">Terms</a>
       </div>
       <p class="small faint" style="margin-top:14px">Version 2.0 · shivaaionline.in</p>
     </div>

     <div id="s-install"></div>`,
    I.close
  );

  const $ = (id) => document.getElementById(id);
  $('s-city').addEventListener('change', (e) => {
    settings.city = e.target.value; store.set('city', settings.city);
    toast('Panchang now set for ' + settings.city); render();
  });
  $('s-voice').addEventListener('change', (e) => {
    settings.voiceOn = e.target.checked; voice.enabled = settings.voiceOn; store.set('voiceOn', settings.voiceOn);
  });
  $('s-drone').addEventListener('change', (e) => {
    settings.droneWithJapa = e.target.checked; store.set('droneWithJapa', settings.droneWithJapa);
  });
  $('s-tonic').addEventListener('change', async (e) => {
    settings.tonic = Number(e.target.value); store.set('tonic', settings.tonic);
    if (engine.droneOn) { engine.stopDrone(); await engine.unlock(); engine.startDrone(settings.tonic); }
  });
  $('s-vol').addEventListener('input', (e) => {
    settings.volume = Number(e.target.value); engine.setVolume(settings.volume); store.set('volume', settings.volume);
  });
  $('s-clearchat').addEventListener('click', () => { convo.clear(); toast('Conversation cleared'); });
  $('s-clearall').addEventListener('click', () => {
    store.clearAll(); convo.clear(); toast('Everything erased from this device');
    setTimeout(() => location.reload(), 900);
  });

  if (deferredInstall) {
    const host = $('s-install');
    host.innerHTML = `<button class="btn btn-primary btn-block" style="margin-top:20px" id="s-doinstall">${I.install} Install Shiv AI</button>`;
    $('s-doinstall').addEventListener('click', async () => {
      const p = deferredInstall; deferredInstall = null;
      p.prompt();
      try { await p.userChoice; } catch { /* dismissed */ }
      closeSheet();
    });
  }
}

/* ---------- Boot ---------- */

function boot() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <header class="appbar">
      <div class="brand">
        <span class="mark" style="color:var(--gold-bright)">${I.trishul}</span>
        <span class="name">Shiv AI</span>
      </div>
      <div class="spacer"></div>
      <button class="iconbtn" id="btn-bell" aria-label="Sound the bell">${I.bell}</button>
      <button class="iconbtn" id="btn-settings" aria-label="Settings">${I.settings}</button>
    </header>
    <main id="main"></main>
    <nav class="tabbar" role="tablist" aria-label="Sections">
      ${TABS.map((t) => `<button class="tab" role="tab" data-tab="${esc(t.id)}"
          aria-selected="false" aria-controls="main">
          ${I[t.icon]}<span>${esc(t.label)}</span></button>`).join('')}
    </nav>`;

  document.querySelectorAll('.tab').forEach((b) =>
    b.addEventListener('click', () => go(b.dataset.tab)));
  document.getElementById('btn-settings').addEventListener('click', openSettings);
  document.getElementById('btn-bell').addEventListener('click', async () => {
    await engine.unlock(); engine.bell(0.55);
  });

  window.addEventListener('popstate', () => {
    const tab = (location.hash || '').replace('#/', '') || 'darshan';
    current = TABS.some((t) => t.id === tab) ? tab : 'darshan';
    render();
  });

  startMotes(document.getElementById('motes'));

  const initial = (location.hash || '').replace('#/', '') || 'darshan';
  go(TABS.some((t) => t.id === initial) ? initial : 'darshan', true);

  // Dismiss the splash once the first view has painted.
  requestAnimationFrame(() => {
    setTimeout(() => {
      const sp = document.getElementById('splash');
      if (sp) { sp.classList.add('gone'); setTimeout(() => sp.remove(), 800); }
    }, 1500);
  });
}

/* Service worker: registered after load so it never competes with first paint. */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then((reg) => {
      reg.addEventListener('updatefound', () => {
        const sw = reg.installing;
        if (!sw) return;
        sw.addEventListener('statechange', () => {
          if (sw.state === 'installed' && navigator.serviceWorker.controller) {
            toast('A new version is ready — reopen the app to update.', 5000);
          }
        });
      });
    }).catch(() => { /* offline support is optional */ });
  });
}

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredInstall = e;
});

// Stop audio when the app is backgrounded, so nothing plays on in a locked pocket.
document.addEventListener('visibilitychange', () => {
  if (document.hidden) { japa.stop(); engine.stopDrone(); voice.cancel(); }
});

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();
