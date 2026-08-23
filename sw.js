/* Shiv AI — service worker.
   Everything except Vaani works with no connection, so the shell, the styles,
   the scripts and the whole knowledge corpus are precached.

   Strategies:
     navigation  -> network first, fall back to the cached shell
     same-origin -> cache first, revalidate in the background
     /api/*      -> never cached, never intercepted */

const VERSION = 'shivai-v5-2026-08';
const SHELL = 'shell-' + VERSION;
const RUNTIME = 'runtime-' + VERSION;

const PRECACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/privacy.html',
  '/terms.html',
  '/offline.html',
  '/assets/css/app.css',
  '/assets/js/app.js',
  '/assets/js/ui.js',
  '/assets/js/icons.js',
  '/assets/js/audio.js',
  '/assets/js/panchang.js',
  '/assets/js/chat.js',
  '/assets/data/mantras.js',
  '/assets/data/stotras.js',
  '/assets/data/knowledge.js',
  '/assets/data/places.js',
  '/assets/data/stories.js',
  '/assets/data/teachings.js',
  '/assets/data/practice.js',
  '/assets/data/names108.js',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(SHELL).then(async (cache) => {
      // Add individually so one missing file cannot fail the whole install.
      await Promise.all(
        PRECACHE.map((url) =>
          cache.add(new Request(url, { cache: 'reload' })).catch(() => null)
        )
      );
      await self.skipWaiting();
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys.filter((k) => k !== SHELL && k !== RUNTIME).map((k) => caches.delete(k))
      );
      if (self.registration.navigationPreload) {
        try { await self.registration.navigationPreload.enable(); } catch { /* unsupported */ }
      }
      await self.clients.claim();
    })()
  );
});

self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});

function isApi(url) {
  return url.pathname.startsWith('/api/') || url.pathname.startsWith('/.netlify/');
}

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  let url;
  try { url = new URL(req.url); } catch { return; }

  // The chat endpoint must always go to the network, and must never be stored.
  if (isApi(url)) return;

  // Google Fonts: opportunistic runtime cache so the app still looks right offline.
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(
      caches.open(RUNTIME).then(async (cache) => {
        const hit = await cache.match(req);
        if (hit) return hit;
        try {
          const res = await fetch(req);
          if (res && (res.ok || res.type === 'opaque')) cache.put(req, res.clone());
          return res;
        } catch {
          return hit || Response.error();
        }
      })
    );
    return;
  }

  if (url.origin !== self.location.origin) return;

  // Navigations: try the network so a deploy is picked up, fall back to the shell.
  if (req.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          const preload = await event.preloadResponse;
          if (preload) return preload;
          const fresh = await fetch(req);
          const cache = await caches.open(SHELL);
          cache.put('/index.html', fresh.clone());
          return fresh;
        } catch {
          const cache = await caches.open(SHELL);
          return (
            (await cache.match(req)) ||
            (await cache.match('/index.html')) ||
            (await cache.match('/offline.html')) ||
            new Response('Offline', { status: 503, headers: { 'Content-Type': 'text/plain' } })
          );
        }
      })()
    );
    return;
  }

  // Everything else: serve from cache, refresh behind the scenes.
  event.respondWith(
    (async () => {
      const cache = await caches.open(SHELL);
      const hit = await cache.match(req);
      const network = fetch(req)
        .then((res) => {
          if (res && res.ok && res.type === 'basic') {
            caches.open(hit ? SHELL : RUNTIME).then((c) => c.put(req, res.clone()));
          }
          return res;
        })
        .catch(() => null);
      if (hit) return hit;
      const res = await network;
      if (res) return res;
      const runtime = await caches.open(RUNTIME);
      return (
        (await runtime.match(req)) ||
        new Response('', { status: 504, statusText: 'Offline' })
      );
    })()
  );
});
