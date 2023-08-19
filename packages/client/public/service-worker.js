const assetManifest = self.__WB_MANIFEST || [];

const STATIC_CACHE_NAME = 'static-data';
const DYNAMIC_CACHE_NAME = 'dynamic-data';

const manifestURLs = assetManifest.map((entry) => entry.url);

const staticAssets = ['/', ...manifestURLs];

self.addEventListener('install', (event) => {
  event.waitUntil(cacheStaticAssets());
});

self.addEventListener('activate', (event) => {
  event.waitUntil(removeOldCaches());
  return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  event.respondWith(cacheData(request));
});

async function cacheStaticAssets() {
  const cache = await caches.open(STATIC_CACHE_NAME);
  return cache.addAll(staticAssets);
}

async function removeOldCaches() {
  const cacheKeys = await caches.keys();
  return Promise.all(
    cacheKeys.filter((key) => key !== STATIC_CACHE_NAME && key !== DYNAMIC_CACHE_NAME).map((key) => caches.delete(key)),
  );
}

async function cacheData(request) {
  const cachedRequest = await caches.match(request);
  if (cachedRequest) {
    return cachedRequest;
  }

  if (shouldCache(request)) {
    return networkFirst(request);
  }

  return fetch(request);
}

function shouldCache(request) {
  return staticAssets.some((sa) => request.url.indexOf(sa) >= 0) || request.headers.get('accept').includes('text/html');
}

async function networkFirst(request) {
  const cache = await caches.open(DYNAMIC_CACHE_NAME);
  try {
    const response = await fetch(request);
    cache.put(request, response.clone());
    return response;
  } catch (error) {
    return await cache.match(request);
  }
}
