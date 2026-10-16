// Copia local de la encuesta para responder sin señal. Al cambiar la página, subir este número.
const VERSION = "pet-encuesta-v1-20261015";
self.addEventListener("install", e => { e.waitUntil(caches.open(VERSION).then(c => c.addAll(["./"]))); self.skipWaiting(); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k))))); self.clients.claim(); });
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET" || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then(r => r || fetch(e.request).then(resp => { const copia = resp.clone(); caches.open(VERSION).then(c => c.put(e.request, copia)); return resp; })));
});
