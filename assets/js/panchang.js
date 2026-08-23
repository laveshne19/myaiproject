/* Shiv AI — panchang.
   Real astronomy, not a lookup table. Solar and lunar longitudes follow Meeus,
   "Astronomical Algorithms" (ch. 25 and 47, abridged series). Accuracy is well
   inside a minute of arc, which is far more than a tithi boundary needs.

   Tithi = the 12-degree steps of the Moon's elongation from the Sun.
   Shukla (bright) 1..15, then Purnima; Krishna (dark) 1..14, then Amavasya.

   Shiva observances we derive here:
     Pradosh          — Trayodashi (tithi 13 or 28), worshipped at sunset
     Masik Shivaratri — Krishna Chaturdashi (tithi 29), monthly
     Maha Shivaratri  — the Krishna Chaturdashi that falls in Magha/Phalguna (Feb-Mar) */

const RAD = Math.PI / 180;
const sin = (d) => Math.sin(d * RAD);
const norm360 = (d) => ((d % 360) + 360) % 360;

export function toJD(date) {
  return date.getTime() / 86400000 + 2440587.5;
}
export function fromJD(jd) {
  return new Date((jd - 2440587.5) * 86400000);
}

/** Apparent geometric longitude of the Sun, degrees. */
export function sunLongitude(jd) {
  const T = (jd - 2451545.0) / 36525;
  const L0 = 280.46646 + 36000.76983 * T + 0.0003032 * T * T;
  const M = 357.52911 + 35999.05029 * T - 0.0001537 * T * T;
  const C =
    (1.914602 - 0.004817 * T - 0.000014 * T * T) * sin(M) +
    (0.019993 - 0.000101 * T) * sin(2 * M) +
    0.000289 * sin(3 * M);
  return norm360(L0 + C);
}

/* Meeus 47.A — the 25 largest periodic terms in lunar longitude.
   Columns: D, M, M', F, coefficient (units of 1e-6 degrees). */
const LUNAR_TERMS = [
  [0, 0, 1, 0, 6288774], [2, 0, -1, 0, 1274027], [2, 0, 0, 0, 658314],
  [0, 0, 2, 0, 213618], [0, 1, 0, 0, -185116], [0, 0, 0, 2, -114332],
  [2, 0, -2, 0, 58793], [2, -1, -1, 0, 57066], [2, 0, 1, 0, 53322],
  [2, -1, 0, 0, 45758], [0, 1, -1, 0, -40923], [1, 0, 0, 0, -34720],
  [0, 1, 1, 0, -30383], [2, 0, 0, -2, 15327], [0, 0, 1, 2, -12528],
  [0, 0, 1, -2, 10980], [4, 0, -1, 0, 10675], [0, 0, 3, 0, 10034],
  [4, 0, -2, 0, 8548], [2, 1, -1, 0, -7888], [2, 1, 0, 0, -6766],
  [1, 0, -1, 0, -5163], [1, 1, 0, 0, 4987], [2, -1, 1, 0, 4036],
  [2, 0, 2, 0, 3994], [4, 0, 0, 0, 3861], [2, 0, -3, 0, 3665],
  [0, 1, -2, 0, -2689], [2, 0, -1, 2, -2602], [2, -1, -2, 0, 2390],
  [1, 0, 1, 0, -2348], [2, -2, 0, 0, 2236], [0, 1, 2, 0, -2120],
  [0, 2, 0, 0, -2069], [2, -2, -1, 0, 2048], [2, 0, 1, -2, -1773],
  [2, 0, 0, 2, -1595], [4, -1, -1, 0, 1215], [0, 0, 2, 2, -1110],
  [3, 0, -1, 0, -892], [2, 1, 1, 0, -810], [4, -1, -2, 0, 759],
  [0, 2, -1, 0, -713], [2, 2, -1, 0, -700], [2, 1, -2, 0, 691],
  [2, -1, 0, -2, 596], [4, 0, 1, 0, 549], [0, 0, 4, 0, 537],
  [4, -1, 0, 0, 520], [1, 0, -2, 0, -487],
];

/** Apparent geometric longitude of the Moon, degrees. */
export function moonLongitude(jd) {
  const T = (jd - 2451545.0) / 36525;
  const T2 = T * T, T3 = T2 * T, T4 = T3 * T;

  const Lp = 218.3164477 + 481267.88123421 * T - 0.0015786 * T2 + T3 / 538841 - T4 / 65194000;
  const D  = 297.8501921 + 445267.1114034  * T - 0.0018819 * T2 + T3 / 545868 - T4 / 113065000;
  const M  = 357.5291092 + 35999.0502909   * T - 0.0001536 * T2 + T3 / 24490000;
  const Mp = 134.9633964 + 477198.8675055  * T + 0.0087414 * T2 + T3 / 69699  - T4 / 14712000;
  const F  =  93.2720950 + 483202.0175233  * T - 0.0036539 * T2 - T3 / 3526000 + T4 / 863310000;

  // Eccentricity correction for terms involving the Sun's anomaly.
  const E = 1 - 0.002516 * T - 0.0000074 * T2;

  let sum = 0;
  for (const [d, m, mp, f, coef] of LUNAR_TERMS) {
    const arg = d * D + m * M + mp * Mp + f * F;
    let term = coef * sin(arg);
    const am = Math.abs(m);
    if (am === 1) term *= E;
    else if (am === 2) term *= E * E;
    sum += term;
  }
  return norm360(Lp + sum / 1000000);
}

/** Elongation of the Moon from the Sun, 0..360 degrees. */
export function elongation(jd) {
  return norm360(moonLongitude(jd) - sunLongitude(jd));
}

/** Tithi index 1..30 at an instant. 15 = Purnima, 30 = Amavasya. */
export function tithiAt(jd) {
  return Math.floor(elongation(jd) / 12) + 1;
}

export const TITHI_NAMES = [
  'Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami', 'Shashthi',
  'Saptami', 'Ashtami', 'Navami', 'Dashami', 'Ekadashi', 'Dwadashi',
  'Trayodashi', 'Chaturdashi', 'Purnima',
];

export function tithiLabel(t) {
  if (t === 15) return { name: 'Purnima', paksha: 'Shukla', hi: 'पूर्णिमा' };
  if (t === 30) return { name: 'Amavasya', paksha: 'Krishna', hi: 'अमावस्या' };
  const paksha = t <= 15 ? 'Shukla' : 'Krishna';
  const idx = t <= 15 ? t - 1 : t - 16;
  return { name: TITHI_NAMES[idx], paksha, hi: paksha === 'Shukla' ? 'शुक्ल पक्ष' : 'कृष्ण पक्ष' };
}

/** Instant (JD) at which the Moon's elongation next reaches `targetDeg`, searching forward. */
export function nextElongation(fromJd, targetDeg) {
  // The elongation advances ~12.19 deg/day. Step coarsely, then bisect the crossing.
  const rel = (jd) => norm360(elongation(jd) - targetDeg);
  let a = fromJd;
  let prev = rel(a);
  const STEP = 0.25;
  for (let i = 1; i <= 4 * 40; i++) {
    const b = fromJd + i * STEP;
    const cur = rel(b);
    if (cur < prev) {
      // Wrapped past 360 -> 0, so the target lies inside [a, b].
      let lo = a, hi = b;
      for (let k = 0; k < 60; k++) {
        const mid = (lo + hi) / 2;
        if (rel(mid) > 180) lo = mid; else hi = mid;
      }
      return hi;
    }
    a = b;
    prev = cur;
  }
  return null;
}

/** Start and end instants of the tithi that is running at `jd`. */
export function tithiWindow(jd) {
  const t = tithiAt(jd);
  const startDeg = (t - 1) * 12;
  // Walk back to the start of this tithi.
  let lo = jd - 2, hi = jd;
  const past = (x) => {
    const e = elongation(x);
    return norm360(e - startDeg) < 180;
  };
  for (let k = 0; k < 60; k++) {
    const mid = (lo + hi) / 2;
    if (past(mid)) hi = mid; else lo = mid;
  }
  return { tithi: t, start: hi, end: nextElongation(jd, t % 30 * 12) };
}

/* ---------- Sunrise / sunset (NOAA algorithm, minute accuracy) ---------- */

export function sunEvents(date, lat, lon) {
  // n is the integer day number since 2000-01-01 12:00 UT (J2000).
  const jdMid = Math.floor(toJD(date) - 0.5) + 0.5; // 00:00 UT of that date
  const n = Math.round(jdMid - 2451545.0 + 0.0008);
  // Longitude is east-positive here: eastern meridians reach solar noon earlier in UT.
  const Jstar = n - lon / 360;
  const M = norm360(357.5291 + 0.98560028 * Jstar);
  const C = 1.9148 * sin(M) + 0.02 * sin(2 * M) + 0.0003 * sin(3 * M);
  const lambda = norm360(M + C + 180 + 102.9372);
  const Jtransit = 2451545.0 + Jstar + 0.0053 * sin(M) - 0.0069 * sin(2 * lambda);
  const decl = Math.asin(sin(lambda) * sin(23.4397)) / RAD;

  const cosH =
    (sin(-0.833) - sin(lat) * sin(decl)) / (Math.cos(lat * RAD) * Math.cos(decl * RAD));
  if (cosH > 1) return { sunrise: null, sunset: null, polar: 'night' };
  if (cosH < -1) return { sunrise: null, sunset: null, polar: 'day' };

  const H = Math.acos(cosH) / RAD;
  return {
    sunrise: fromJD(Jtransit - H / 360),
    sunset: fromJD(Jtransit + H / 360),
  };
}

/* ---------- Sidereal positions (Lahiri) ---------- */

/** Lahiri ayanamsa in degrees: 23.85 deg at J2000, precessing 50.29"/yr. */
export function ayanamsa(jd) {
  const years = (jd - 2451545.0) / 365.25;
  return 23.85 + years * (50.29 / 3600);
}

/** Sun's sidereal longitude, degrees. */
export function sunSidereal(jd) {
  return norm360(sunLongitude(jd) - ayanamsa(jd));
}

/** Sidereal solar month (rashi) index 0..11 — 0 = Mesha (Aries). */
export function solarRashi(jd) {
  return Math.floor(sunSidereal(jd) / 30);
}

export const RASHIS = [
  'Mesha', 'Vrishabha', 'Mithuna', 'Karka', 'Simha', 'Kanya',
  'Tula', 'Vrischika', 'Dhanu', 'Makara', 'Kumbha', 'Meena',
];

/** Instant the Sun's sidereal longitude next reaches `deg`, searched around `nearJd`. */
export function sankranti(nearJd, deg) {
  const rel = (jd) => norm360(sunSidereal(jd) - deg);
  let a = nearJd - 200, prev = rel(a);
  for (let i = 1; i <= 200; i++) {
    const b = nearJd - 200 + i * 2;
    const cur = rel(b);
    if (cur < prev) {
      let lo = a, hi = b;
      for (let k = 0; k < 50; k++) {
        const mid = (lo + hi) / 2;
        if (rel(mid) > 180) lo = mid; else hi = mid;
      }
      return hi;
    }
    a = b; prev = cur;
  }
  return null;
}

/** Kumbha Sankranti (Sun enters sidereal Aquarius) for a Gregorian year. */
export function kumbhaSankranti(year) {
  return sankranti(toJD(new Date(Date.UTC(year, 1, 12))), 300);
}

/* ---------- Observances ---------- */

/** The tithi that governs a Hindu day is the one running at sunrise. */
export function tithiForDay(date, lat, lon) {
  const ev = sunEvents(date, lat, lon);
  const ref = ev.sunrise || new Date(date.getFullYear(), date.getMonth(), date.getDate(), 6, 0, 0);
  return tithiAt(toJD(ref));
}

/**
 * Upcoming Shiva observances from `from`, looking `days` ahead.
 * Returns entries sorted by date: pradosh (Trayodashi), masik shivaratri
 * (Krishna Chaturdashi) and the annual Maha Shivaratri.
 */
export function upcomingObservances(from, lat, lon, days = 120) {
  const out = [];
  const start = new Date(from.getFullYear(), from.getMonth(), from.getDate());

  for (let i = 0; i < days; i++) {
    const d = new Date(start.getTime() + i * 86400000);
    const t = tithiForDay(d, lat, lon);
    const ev = sunEvents(d, lat, lon);

    if (t === 13 || t === 28) {
      const isSat = d.getDay() === 6;
      const isMon = d.getDay() === 1;
      out.push({
        kind: 'pradosh',
        id: 'pradosh',
        date: d,
        title: isSat ? 'Shani Pradosh' : isMon ? 'Soma Pradosh' : 'Pradosh Vrat',
        hi: 'प्रदोष व्रत',
        detail: t === 13 ? 'Shukla Trayodashi' : 'Krishna Trayodashi',
        window: ev.sunset
          ? { from: new Date(ev.sunset.getTime() - 45 * 60000), to: new Date(ev.sunset.getTime() + 45 * 60000) }
          : null,
        note: 'Worship in the 90 minutes around sunset.',
      });
    }

    // Shivaratri is fixed by the tithi at nishita (midnight), not at sunrise:
    // the night belongs to the day on which it begins.
    const midnight = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1, 0, 0, 0);
    if (tithiAt(toJD(midnight)) === 29) {
      // Maha Shivaratri is the Chaturdashi of the lunation (amavasya to amavasya)
      // containing Kumbha Sankranti. Every other one is a Masik Shivaratri.
      const amavasya = nextElongation(toJD(midnight), 0);
      const ks = kumbhaSankranti(d.getFullYear());
      const maha =
        amavasya != null && ks != null && ks <= amavasya && ks > amavasya - 29.53;
      out.push({
        kind: maha ? 'mahashivaratri' : 'masik',
        id: maha ? 'mahashivaratri' : 'masik-shivaratri',
        date: d,
        title: maha ? 'Maha Shivaratri' : 'Masik Shivaratri',
        hi: maha ? 'महाशिवरात्रि' : 'मासिक शिवरात्रि',
        detail: 'Krishna Chaturdashi',
        window: ev.sunset ? { from: ev.sunset, to: null } : null,
        note: maha
          ? 'Observed through the night in four watches.'
          : 'Night worship after sunset.',
      });
    }

    if (d.getDay() === 1) {
      // Shravan (Amanta) is the lunar month running while the Sun is in sidereal
      // Karka (Cancer). Purnimanta calendars, used across much of north India,
      // begin the month about a fortnight earlier - the UI notes this.
      if (solarRashi(toJD(ev.sunrise || d)) === 3) {
        out.push({
          kind: 'somvar',
          id: 'shravan',
          date: d,
          title: 'Shravan Somvar',
          hi: 'श्रावण सोमवार',
          detail: 'Monday of Shiva’s month',
          window: null,
          note: 'Fast through the day; jalabhishek at the temple.',
        });
      }
    }
  }
  return out.sort((a, b) => a.date - b.date);
}

export const CITIES = [
  { name: 'New Delhi', lat: 28.6139, lon: 77.209 },
  { name: 'Mumbai', lat: 19.076, lon: 72.8777 },
  { name: 'Bengaluru', lat: 12.9716, lon: 77.5946 },
  { name: 'Kolkata', lat: 22.5726, lon: 88.3639 },
  { name: 'Chennai', lat: 13.0827, lon: 80.2707 },
  { name: 'Hyderabad', lat: 17.385, lon: 78.4867 },
  { name: 'Pune', lat: 18.5204, lon: 73.8567 },
  { name: 'Ahmedabad', lat: 23.0225, lon: 72.5714 },
  { name: 'Jaipur', lat: 26.9124, lon: 75.7873 },
  { name: 'Lucknow', lat: 26.8467, lon: 80.9462 },
  { name: 'Varanasi', lat: 25.3176, lon: 82.9739 },
  { name: 'Ujjain', lat: 23.1793, lon: 75.7849 },
  { name: 'Haridwar', lat: 29.9457, lon: 78.1642 },
  { name: 'Chandigarh', lat: 30.7333, lon: 76.7794 },
  { name: 'Bhopal', lat: 23.2599, lon: 77.4126 },
  { name: 'Patna', lat: 25.5941, lon: 85.1376 },
  { name: 'Guwahati', lat: 26.1445, lon: 91.7362 },
  { name: 'Nagpur', lat: 21.1458, lon: 79.0882 },
  { name: 'Kochi', lat: 9.9312, lon: 76.2673 },
  { name: 'Rishikesh', lat: 30.0869, lon: 78.2676 },
];
