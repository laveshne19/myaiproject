const CACHE = "shiv-ai-v5";
const ASSETS = ["/", "/index.html", "/manifest.json", "/icons/icon-192.png", "/icons/icon-512.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener("fetch", e => {
  if (e.request.url.includes("/.netlify/functions/")) return;
  if (e.request.url.includes("/api/")) return;
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).catch(() => caches.match("/index.html")))
  );
});

self.addEventListener("push", e => {
  const data = e.data ? e.data.json() : {};
  e.waitUntil(
    self.registration.showNotification(data.title || "Shiv AI", {
      body: data.body || "Jai Shiv Shankar 🙏",
      icon: "/icons/icon-192.png",
      badge: "/icons/icon-96.png",
      vibrate: [100, 50, 100],
      data: { url: data.url || "/" }
    })
  );
});

self.addEventListener("notificationclick", e => {
  e.notification.close();
  e.waitUntil(clients.openWindow(e.notification.data.url || "/"));
});

self.addEventListener("sync", e => {
  if (e.tag === "shivai-sync") {
    e.waitUntil(Promise.resolve());
  }
});

self.addEventListener("periodicsync", e => {
  if (e.tag === "shivai-periodic") {
    e.waitUntil(Promise.resolve());
  }
});
