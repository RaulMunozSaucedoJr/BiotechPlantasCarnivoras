var self = this;

var filesToCache = [
    '/',
    '/Home.html',
    '/Gracias.html',
    '/README.md',
    '/sw.js',
    './assets/icon/ICONOBIOTECH.jpg',
    './assets/img/Foto1.jpg',
    './assets/img/Foto17.jpg',
    './assets/img/Foto2.jpg',
    './assets/img/Foto3.jpg',
    './assets/img/Foto4.jpg',
    './assets/img/Foto5.jpg',
    './assets/img/Foto6.jpg',
    './assets/img/NOSOTROS.jpg',
    './assets/img/Testimonio1.png',
    './assets/img/Testimonio15.png',
    './assets/img/Testimonio9.png',
    './assets/js/main.js',
    './assets/js/Validation.js',
    './assets/scss/styles.css',
    './assets/scss/styles.css.map',
    './assets/scss/styles.scss',
    './manifiest.json'
];

self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open('app-name').then(function (cache) {
            return cache.addAll(filesToCache);
        })
    );
});
self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.filter(function (cacheName) {}).map(function (cacheName) {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});
self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.open('mysite-dynamic').then(function (cache) {
            return cache.match(event.request).then(function (response) {
                return response || fetch(event.request).then(function (response) {
                    cache.put(event.request, response.clone());
                    return response;
                });
            });
        })
    );
});

console.clear();