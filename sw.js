/**
 * Axonity Service Worker
 * Cache intelligent pour les performances
 */

const CACHE_NAME = 'axonity-v1.2';
const CRITICAL_RESOURCES = [
    '/',
    '/index.html',
    '/Axonity.CSS',
    '/Axonity.js',
    '/performance-optimizer.js',
    '/Logo.png',
    '/favicon.svg'
];

const CACHE_STRATEGIES = {
    images: 'cache-first',
    styles: 'cache-first',
    scripts: 'cache-first',
    documents: 'network-first'
};

// Installation du Service Worker
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('📦 Cache Axonity ouvert');
                return cache.addAll(CRITICAL_RESOURCES);
            })
            .then(() => {
                console.log('✅ Ressources critiques mises en cache');
                return self.skipWaiting();
            })
    );
});

// Activation et nettoyage des anciens caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('🗑️ Suppression ancien cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            console.log('✅ Service Worker activé');
            return self.clients.claim();
        })
    );
});

// Stratégie de mise en cache
self.addEventListener('fetch', event => {
    const request = event.request;
    const url = new URL(request.url);
    
    // Ignorer les requêtes non-GET
    if (request.method !== 'GET') return;
    
    // Stratégie pour les images
    if (request.destination === 'image') {
        event.respondWith(cacheFirst(request));
        return;
    }
    
    // Stratégie pour CSS/JS
    if (request.destination === 'style' || request.destination === 'script') {
        event.respondWith(cacheFirst(request));
        return;
    }
    
    // Stratégie pour les documents HTML
    if (request.destination === 'document') {
        event.respondWith(networkFirst(request));
        return;
    }
    
    // Par défaut : network first
    event.respondWith(networkFirst(request));
});

// Cache First (bon pour les assets statiques)
async function cacheFirst(request) {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(request);
    
    if (cached) {
        // Mise à jour en arrière-plan
        fetch(request).then(response => {
            if (response.status === 200) {
                cache.put(request, response.clone());
            }
        }).catch(() => {}); // Ignorer les erreurs de mise à jour
        
        return cached;
    }
    
    try {
        const response = await fetch(request);
        if (response.status === 200) {
            cache.put(request, response.clone());
        }
        return response;
    } catch (error) {
        console.log('❌ Erreur réseau:', error);
        return new Response('Contenu non disponible hors ligne', {
            status: 503,
            statusText: 'Service Unavailable'
        });
    }
}

// Network First (bon pour le contenu dynamique)
async function networkFirst(request) {
    const cache = await caches.open(CACHE_NAME);
    
    try {
        const response = await fetch(request);
        if (response.status === 200) {
            cache.put(request, response.clone());
        }
        return response;
    } catch (error) {
        console.log('🔄 Fallback vers cache pour:', request.url);
        const cached = await cache.match(request);
        
        if (cached) {
            return cached;
        }
        
        // Page offline par défaut
        if (request.destination === 'document') {
            return cache.match('/index.html');
        }
        
        return new Response('Contenu non disponible', {
            status: 404,
            statusText: 'Not Found'
        });
    }
}

// Nettoyage périodique du cache
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'CACHE_CLEAN') {
        cleanOldCache();
    }
});

async function cleanOldCache() {
    const cache = await caches.open(CACHE_NAME);
    const requests = await cache.keys();
    
    // Supprimer les entrées anciennes (> 7 jours)
    const oneWeekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
    
    for (const request of requests) {
        const response = await cache.match(request);
        const dateHeader = response.headers.get('date');
        
        if (dateHeader) {
            const responseDate = new Date(dateHeader).getTime();
            if (responseDate < oneWeekAgo) {
                await cache.delete(request);
                console.log('🗑️ Cache expiré supprimé:', request.url);
            }
        }
    }
}