const CACHE_NAME = 'al-muxtaar-v2';
const OFFLINE_URL = '/offline';

const PRECACHE_ASSETS = [
  '/',
  '/offline',
  '/assets/logo/logo.png',
  '/manifest.json',
];

// Install: precache shell assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS).catch((err) => {
        console.warn('[SW] Pré-mise en cache partielle:', err);
      });
    })
  );
  self.skipWaiting();
});

// Activate: clean old caches & claim immediately
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch: stratégie hybride résiliente
self.addEventListener('fetch', (event) => {
  // Ignorer les requêtes non GET
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // 1. Ne JAMAIS intercepter les domaines tiers (Supabase, CDN, etc.)
  if (url.origin !== self.location.origin) return;

  // 2. Ne JAMAIS intercepter les routes API
  if (url.pathname.startsWith('/api/')) return;

  // 3. Navigation HTML complète (chargement de page directe dans l'onglet)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response && response.status === 200) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy)).catch(() => {});
          }
          return response;
        })
        .catch(async () => {
          // Fallback sur la version en cache de la page si disponible
          const cachedPage = await caches.match(event.request);
          if (cachedPage) return cachedPage;

          // Sinon afficher la page hors-ligne PWA
          const offlinePage = await caches.match(OFFLINE_URL);
          return offlinePage || new Response('Hors-ligne - Al Muxtaar', {
            status: 503,
            headers: { 'Content-Type': 'text/plain; charset=utf-8' },
          });
        })
    );
    return;
  }

  // 4. Assets statiques immutables de Next.js (_next/static/*) -> Cache First avec fallback sécurisé
  if (url.pathname.startsWith('/_next/static/') || url.pathname.startsWith('/assets/')) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        if (cached) return cached;
        return fetch(event.request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const copy = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy)).catch(() => {});
            }
            return networkResponse;
          })
          .catch(() => {
            return new Response('', { status: 408, statusText: 'Asset Fetch Timeout' });
          });
      })
    );
    return;
  }

  // 5. Pour les requêtes Next.js RSC / Data Prefetch (ex: prefetch de liens /cours/...)
  // Network first avec capture d'erreur systématique pour ne JAMAIS rejeter la promesse non gérée
  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const copy = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy)).catch(() => {});
        }
        return networkResponse;
      })
      .catch(async () => {
        // En cas de micro-coupure réseau ou requête prefetch annulée par le navigateur
        const cached = await caches.match(event.request);
        if (cached) return cached;
        return new Response('', { status: 504, statusText: 'Network Unavailable' });
      })
  );
});
