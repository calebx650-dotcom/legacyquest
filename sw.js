// LegacyQuest service worker.
//
// Strategy (fixed from v1, which was cache-first on everything and pinned
// users to the first build they ever loaded):
//   - Navigations / HTML: network-first, falling back to cache offline. Every
//     visit with a connection gets the newest index.html.
//   - Other same-origin assets: stale-while-revalidate. Vite asset filenames
//     are content-hashed, so serving cache instantly is safe while the network
//     copy refreshes the cache in the background.
//   - The cache name is versioned; activation deletes old caches, and
//     skipWaiting + clients.claim let an updated worker take over immediately.

const CACHE = 'legacyquest-v2'
const CORE = ['./', './index.html', './manifest.webmanifest', './favicon.svg']

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((c) => c.addAll(CORE))
      .then(() => self.skipWaiting()),
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  )
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return

  // HTML: network-first so deploys reach users on their next visit.
  if (request.mode === 'navigate' || request.destination === 'document') {
    event.respondWith(
      fetch(request)
        .then((res) => {
          const copy = res.clone()
          caches.open(CACHE).then((c) => c.put(request, copy))
          return res
        })
        .catch(() =>
          caches.match(request).then((hit) => hit || caches.match('./index.html')),
        ),
    )
    return
  }

  // Assets: stale-while-revalidate.
  event.respondWith(
    caches.match(request).then((cached) => {
      const refresh = fetch(request)
        .then((res) => {
          const copy = res.clone()
          caches.open(CACHE).then((c) => c.put(request, copy))
          return res
        })
        .catch(() => cached)
      return cached || refresh
    }),
  )
})
