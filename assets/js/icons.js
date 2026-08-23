/* Shiv AI — hand-drawn line iconography.
   Geometric and reverent rather than figurative: the tradition's own preference,
   and it keeps the app free of any third-party artwork. */

const s = (body, vb = '0 0 24 24', extra = '') =>
  `<svg viewBox="${vb}" fill="none" stroke="currentColor" stroke-width="1.5"
        stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${extra}>${body}</svg>`;

export const I = {
  trishul: s(`<path d="M12 21V8"/><path d="M5 10V5l2.2 2.4M5 10c0-3.4 3-6 7-6s7 2.6 7 6M19 10V5l-2.2 2.4"/>
              <path d="M12 8V2.5"/><path d="M9.2 12.6h5.6"/>`),
  om: s(`<path d="M7.5 13.4c0-2 1.5-3.4 3.3-3.4 1.7 0 3 1.2 3 2.8 0 1.7-1.4 2.9-3 2.9-1.3 0-2.2-.6-2.7-1.4"/>
         <path d="M4.5 9.6c.9-1.3 2.3-2 3.7-1.6"/>
         <path d="M8.4 18.3c1.6 1.3 4 1.5 5.9.5 1.6-.9 2.4-2.4 2.4-4.1"/>
         <path d="M15.4 9.2c1.1-.5 2.4-.2 3.1.7"/><circle cx="17.8" cy="5.6" r="1.05"/>
         <path d="M13.6 4.6c1.1-.5 2.3-.4 3.2.3"/>`),
  damaru: s(`<path d="M7 4c3.4 2.6 6.6 2.6 10 0v3.4c-2.6 2.4-4 3.3-5 4.6-1-1.3-2.4-2.2-5-4.6V4Z"/>
             <path d="M7 20c3.4-2.6 6.6-2.6 10 0v-3.4c-2.6-2.4-4-3.3-5-4.6-1 1.3-2.4 2.2-5 4.6V20Z"/>
             <path d="M12 12h6.5M12 12H5.5"/><circle cx="19.4" cy="12" r="1"/><circle cx="4.6" cy="12" r="1"/>`),
  bell: s(`<path d="M6 16c0-5 1.4-8.5 6-8.5S18 11 18 16"/><path d="M4.2 16h15.6"/>
           <path d="M10.2 19.2a1.9 1.9 0 0 0 3.6 0"/><path d="M12 7.5V5"/><circle cx="12" cy="3.9" r="1.1"/>`),
  linga: s(`<path d="M8.4 15.5c0-3 1.4-5.6 3.6-5.6s3.6 2.6 3.6 5.6"/>
            <ellipse cx="12" cy="16.4" rx="7.4" ry="2.3"/><path d="M4.6 16.4v1.4c0 1.3 3.3 2.3 7.4 2.3s7.4-1 7.4-2.3v-1.4"/>
            <path d="M9.4 6.4c.9.7 1.9 1 2.6 1s1.7-.3 2.6-1"/>`),
  moon: s(`<path d="M18.5 15.4A7.6 7.6 0 1 1 9.4 5.2a6 6 0 0 0 9.1 10.2Z"/>`),
  lotus: s(`<path d="M12 19.5c-4 0-7.4-2.4-8.4-5.6 1.8-1 3.6-.8 5 .3"/>
            <path d="M12 19.5c4 0 7.4-2.4 8.4-5.6-1.8-1-3.6-.8-5 .3"/>
            <path d="M12 19.5c-2.4-1.8-3.6-4.4-3.2-7 1.6.2 2.7 1.1 3.2 2.1.5-1 1.6-1.9 3.2-2.1.4 2.6-.8 5.2-3.2 7Z"/>
            <path d="M12 14.6V9.2"/><path d="M12 9.2c-1-1.4-1-3.2 0-4.7 1 1.5 1 3.3 0 4.7Z"/>`),
  mountain: s(`<path d="M2.5 19h19L14 5.6 10.6 12l-2.2-3L2.5 19Z"/><path d="M11.2 10.2h5.6"/>`),
  chat: s(`<path d="M20.5 12c0 4.1-3.8 7.4-8.5 7.4-1 0-2-.15-2.9-.43L4 20.6l1.7-3.5C4.3 15.8 3.5 14 3.5 12 3.5 7.9 7.3 4.6 12 4.6s8.5 3.3 8.5 7.4Z"/>
           <path d="M8.6 11.9h6.8M10.4 14.6h3.2"/>`),
  book: s(`<path d="M4.5 5.2c2.6-1 5-.9 7.5.6 2.5-1.5 4.9-1.6 7.5-.6v13c-2.6-1-5-.9-7.5.6-2.5-1.5-4.9-1.6-7.5-.6v-13Z"/>
           <path d="M12 5.8v13.6"/>`),
  calendar: s(`<rect x="3.4" y="5.4" width="17.2" height="15.2" rx="3"/><path d="M3.4 10h17.2M8.4 3.4v3.6M15.6 3.4v3.6"/>
               <circle cx="12" cy="15" r="1.4" fill="currentColor" stroke="none"/>`),
  mala: s(`<circle cx="12" cy="12" r="7.6" stroke-dasharray="1.4 3.1"/><circle cx="12" cy="3.6" r="1.7"/>`),
  flame: s(`<path d="M12 21c3.3 0 5.6-2.2 5.6-5.2 0-3.7-3.4-5.3-3.4-8.6 0-1.6.7-3 1.4-4.2-4 .9-8 4.4-8 9.6"/>
            <path d="M12 21c-3.3 0-5.6-2.2-5.6-5.2"/><path d="M12 21c1.7 0 2.8-1.2 2.8-2.7 0-2-2.1-2.7-2.1-4.6-1.3.9-2.2 2.4-2.2 4 0 1.8 1 3.3 1.5 3.3Z"/>`),
  sparkle: s(`<path d="M12 3.2l1.9 5.2 5.2 1.9-5.2 1.9L12 17.4l-1.9-5.2L4.9 10.3l5.2-1.9L12 3.2Z"/>
              <path d="M18.6 16.4l.7 1.9 1.9.7-1.9.7-.7 1.9-.7-1.9-1.9-.7 1.9-.7.7-1.9Z"/>`),
  play: s(`<path d="M8 5.4v13.2l10.4-6.6L8 5.4Z" fill="currentColor"/>`),
  pause: s(`<rect x="7" y="5.2" width="3.6" height="13.6" rx="1.3" fill="currentColor" stroke="none"/>
            <rect x="13.4" y="5.2" width="3.6" height="13.6" rx="1.3" fill="currentColor" stroke="none"/>`),
  stop: s(`<rect x="6.4" y="6.4" width="11.2" height="11.2" rx="2.4" fill="currentColor" stroke="none"/>`),
  reset: s(`<path d="M20 12a8 8 0 1 1-2.6-5.9"/><path d="M20.4 4v4.4H16"/>`),
  send: s(`<path d="M20.6 3.4 3.9 10.1c-.8.3-.8 1.5 0 1.8l6.5 2.3 2.3 6.5c.3.8 1.5.8 1.8 0L20.6 3.4Z"/>
           <path d="m10.6 14 4.4-4.4"/>`),
  chevron: s(`<path d="m9.4 5.6 6.4 6.4-6.4 6.4"/>`),
  back: s(`<path d="m14.6 5.6-6.4 6.4 6.4 6.4"/>`),
  close: s(`<path d="M6.2 6.2 17.8 17.8M17.8 6.2 6.2 17.8"/>`),
  settings: s(`<circle cx="12" cy="12" r="3.1"/>
               <path d="M12 2.8v2.4M12 18.8v2.4M21.2 12h-2.4M5.2 12H2.8M18.5 5.5l-1.7 1.7M7.2 16.8l-1.7 1.7M18.5 18.5l-1.7-1.7M7.2 7.2 5.5 5.5"/>`),
  share: s(`<path d="M12 3.6v11.2"/><path d="m8.2 7.4 3.8-3.8 3.8 3.8"/>
            <path d="M5.4 12.6v5.6a2.2 2.2 0 0 0 2.2 2.2h8.8a2.2 2.2 0 0 0 2.2-2.2v-5.6"/>`),
  copy: s(`<rect x="8.4" y="8.4" width="11.2" height="11.2" rx="2.6"/>
           <path d="M15.6 8.4V6.8a2.4 2.4 0 0 0-2.4-2.4H6.8a2.4 2.4 0 0 0-2.4 2.4v6.4a2.4 2.4 0 0 0 2.4 2.4h1.6"/>`),
  volume: s(`<path d="M4.4 9.4h3l4-3.4v12l-4-3.4h-3a1 1 0 0 1-1-1V10.4a1 1 0 0 1 1-1Z"/>
             <path d="M15.4 9a4 4 0 0 1 0 6M18 6.6a7.4 7.4 0 0 1 0 10.8"/>`),
  mute: s(`<path d="M4.4 9.4h3l4-3.4v12l-4-3.4h-3a1 1 0 0 1-1-1V10.4a1 1 0 0 1 1-1Z"/><path d="m15.6 9.6 4.8 4.8M20.4 9.6l-4.8 4.8"/>`),
  heart: s(`<path d="M12 20.2s-7.6-4.6-7.6-9.6a4.2 4.2 0 0 1 7.6-2.5 4.2 4.2 0 0 1 7.6 2.5c0 5-7.6 9.6-7.6 9.6Z"/>`),
  info: s(`<circle cx="12" cy="12" r="8.6"/><path d="M12 11.2v5"/><circle cx="12" cy="8.2" r="1" fill="currentColor" stroke="none"/>`),
  install: s(`<path d="M12 3.4v11"/><path d="m8 10.6 4 4 4-4"/><path d="M4.4 17.4v1.4a2.2 2.2 0 0 0 2.2 2.2h10.8a2.2 2.2 0 0 0 2.2-2.2v-1.4"/>`),
  shield: s(`<path d="M12 3.2 5 6v6c0 4.2 2.9 7.4 7 8.8 4.1-1.4 7-4.6 7-8.8V6l-7-2.8Z"/><path d="m9.2 12 2 2 3.6-3.8"/>`),
};

/** The Nataraja ring used on the home screen — a ring of fire around a still centre. */
export function natarajaSVG() {
  const flames = Array.from({ length: 24 }, (_, i) => {
    const a = (i / 24) * 360;
    return `<path d="M50 6 L52.6 12.4 L50 10.6 L47.4 12.4 Z" transform="rotate(${a} 50 50)"/>`;
  }).join('');
  return `<svg viewBox="0 0 100 100" aria-hidden="true">
    <g class="ring" fill="rgba(232,116,60,.55)" stroke="none">${flames}</g>
    <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(217,169,60,.4)" stroke-width="0.7"/>
    <circle cx="50" cy="50" r="34" fill="none" stroke="rgba(217,169,60,.18)" stroke-width="0.5" stroke-dasharray="1 3"/>
    <g stroke="rgba(242,206,114,.9)" stroke-width="1.5" fill="none" stroke-linecap="round">
      <path d="M50 76V44"/>
      <path d="M39 48V34l4.6 5M39 48c0-7 5-11 11-11s11 4 11 11M61 48V34l-4.6 5"/>
      <path d="M50 44V27"/>
      <path d="M44.6 54h10.8"/>
    </g>
    <circle cx="50" cy="24" r="2.6" fill="rgba(232,116,60,.9)" stroke="none"/>
  </svg>`;
}

/** The trishul drawn on the splash screen. */
export function trishulSVG() {
  return `<svg class="trishul" viewBox="0 0 100 100" fill="none"
               stroke="var(--gold-bright)" stroke-width="2.4" stroke-linecap="round" aria-hidden="true">
    <path d="M50 92V34"/>
    <path d="M26 42V16l8.4 9.2"/>
    <path d="M26 42C26 26 36.7 15 50 15s24 11 24 27"/>
    <path d="M74 42V16l-8.4 9.2"/>
    <path d="M50 34V6"/>
    <path d="M39 54h22"/>
  </svg>`;
}

/** The mala ring behind the japa counter: 108 beads, filled as you go. */
export function malaSVG(done, total) {
  const R = 44, C = 50;
  const beads = Math.min(108, Math.max(12, total > 108 ? 108 : total));
  const filled = Math.round((done / total) * beads);
  let out = '';
  for (let i = 0; i < beads; i++) {
    const a = (i / beads) * Math.PI * 2 - Math.PI / 2;
    const x = C + R * Math.cos(a);
    const y = C + R * Math.sin(a);
    const on = i < filled;
    out += `<circle cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r="${on ? 2.1 : 1.3}"
             fill="${on ? 'var(--gold-bright)' : 'rgba(167,161,182,.42)'}"
             ${on ? 'opacity="1"' : 'opacity=".85"'}/>`;
  }
  // The sumeru bead, which is never crossed.
  out += `<circle cx="50" cy="3.6" r="3.1" fill="none" stroke="var(--ember)" stroke-width="1.1"/>`;
  return `<svg viewBox="0 0 100 100" aria-hidden="true">${out}</svg>`;
}
