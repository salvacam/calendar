var cacheNamePre = 'calendar-';
var cacheName = cacheNamePre + 'v0.1.031';

var filesToCache = [
  './',
  './index.html',
  './js/main.js',
  './img/icon.png',
  './img/icon-128-128.png',
  './img/icon-144-144.png',
  './img/icon-192-192.png',
  './img/icon-48-48.png',
  './img/icon-512-512.png',
  './img/icon-96-96.png'
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install_');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate_');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key.startsWith(cacheNamePre)){
          if (key !== cacheName) {
            console.log('[ServiceWorker] Removing old cache', key);
            return caches.delete(key);
          }
        }
      }));
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
