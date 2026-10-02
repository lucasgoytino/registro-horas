/**
 * Service worker: guarda la app en el celular para que abra sin señal.
 * Cuando cambies index.html, subí también este archivo con VERSION aumentada (v2, v3...).
 */
var VERSION = 'pecom-horas-v1';
var ARCHIVOS = ['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png'];
var TAILWIND = 'https://cdn.tailwindcss.com';

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(VERSION)
      .then(function (cache) {
        return cache.addAll(ARCHIVOS).then(function () {
          return fetch(new Request(TAILWIND, { mode: 'no-cors' }))
            .then(function (r) { return cache.put(TAILWIND, r); })
            .catch(function () {});
        });
      })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys()
      .then(function (claves) {
        return Promise.all(claves.filter(function (k) { return k !== VERSION; })
          .map(function (k) { return caches.delete(k); }));
      })
      .then(function () { return self.clients.claim(); })
  );
});

// Responde desde el celular y actualiza en segundo plano cuando hay señal.
// Las llamadas a Apps Script (script.google.com) no se interceptan.
self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  var propio = new URL(req.url).origin === self.location.origin;
  if (!propio && req.url.indexOf(TAILWIND) !== 0) return;

  e.respondWith(
    caches.open(VERSION).then(function (cache) {
      return cache.match(req, { ignoreSearch: true }).then(function (guardado) {
        var deRed = fetch(req)
          .then(function (r) {
            if (r && (r.ok || r.type === 'opaque')) cache.put(req, r.clone());
            return r;
          })
          .catch(function () {
            return guardado || (req.mode === 'navigate' ? cache.match('./index.html') : Response.error());
          });
        return guardado || deRed;
      });
    })
  );
});
