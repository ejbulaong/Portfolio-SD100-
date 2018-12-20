const cacheName= "v1";

self.addEventListener("install", e => {
    e.waitUntil(
        caches.open(cacheName)
        .then(cache => {
            cache.addAll(
                [
                    "images/image0.jpg",
                    "images/image1.jpg",
                    "images/image2.jpg",
                    "images/image3.jpg",
                    "images/image4.jpg",
                    "styles/styles.css",
                    "index.html",
                    "app.js"
                ]
            )
        }).then(() => self.skipWaiting())
    );
});

self.addEventListener("activate", e => {
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if(cache !== cacheName) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

self.addEventListener("fetch", e => {
    e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)));
})