/* ============================================================
   SERVICE WORKER — silent offline caching, no "download" button.
   ------------------------------------------------------------
   Strategy: cache-first for the core app shell + data files
   (small, text-only -- a few hundred KB at most), so the site
   works offline immediately after a first normal visit.
   On every visit while online, it checks the network in the
   background and refreshes the cache for next time (stale-
   while-revalidate), so new resolutions/committees show up
   automatically once you're back online, no user action needed.
   ============================================================ */

const CACHE_NAME = "mun-db-v1"; // bump this string when you ship a real content update

// Keep this list to the small core files only -- do not add large
// binaries (images, videos) or this will defeat the "don't cache
// huge files" requirement.
const CORE_FILES = [
    "./",
    "./index.html",
    "./data-resolutions.js",
    "./data-poi.js",
    "./app-mun.js",
    "./app-poi.js",
    "./manifest.json"
];

self.addEventListener("install", event => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(CORE_FILES))
    );
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
        ).then(() => self.clients.claim())
    );
});

self.addEventListener("fetch", event => {
    if (event.request.method !== "GET") return;

    event.respondWith(
        caches.match(event.request).then(cached => {
            const networkFetch = fetch(event.request).then(response => {
                if (response && response.status === 200) {
                    const copy = response.clone();
                    caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
                }
                return response;
            }).catch(() => cached); // offline -> fall back to cache

            // Stale-while-revalidate: serve cache immediately if we have it,
            // update it in the background; otherwise wait for the network.
            return cached || networkFetch;
        })
    );
});
