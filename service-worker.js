let cacheName = 'lessons-v1';
let cacheFiles = [
    'index.html',
    'LessonsStore.webmanifest',
    'images/Lessons_Icon.png',
    'https://cw2-server-cst3145.herokuapp.com/pho.png',
    'https://cw2-server-cst3145.herokuapp.com/rob.jpg'
]

self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
    e.waitUntil(
        caches.open(cacheName).then((cache) => {
            console.log('[Service Worker] Caching all the files');
            return cache.addAll(cacheFiles);
        })
    );
});

self.addEventListener('fetch', function (e) {
    e.respondWith(
        caches.match(e.request).then(function (r) {
            // Download the file if it is not in the cache, 
            return r || fetch(e.request).then(function (response) {
                // add the new file to cache
                return caches.open(cacheName).then(function (cache) {
                    cache.put(e.request, response.clone());
                    return response;
                });
            });
        })
    );
});