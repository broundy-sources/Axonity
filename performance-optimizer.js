/**
 * AXONITY Performance Optimizer
 * Optimisations avancées pour les performances web
 */

// Lazy Loading avancé pour les images
const lazyImageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            img.classList.remove('lazy');
            img.classList.add('loaded');
            lazyImageObserver.unobserve(img);
        }
    });
}, {
    rootMargin: '50px 0px',
    threshold: 0.1
});

// Observer toutes les images avec lazy loading
document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    lazyImages.forEach(img => {
        img.classList.add('lazy');
        lazyImageObserver.observe(img);
    });
});

// Préchargement critique des ressources
const preloadCriticalResources = () => {
    const criticalImages = [
        'Logo.png',
        'Exemple1.png'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
};

// Optimisation des polices
const optimizeFonts = () => {
    // Préchargement des polices critiques
    const fontLink = document.createElement('link');
    fontLink.rel = 'preload';
    fontLink.as = 'font';
    fontLink.type = 'font/woff2';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap';
    fontLink.crossOrigin = 'anonymous';
    document.head.appendChild(fontLink);
};

// Compression et optimisation des images en WebP si supporté
const supportsWebP = () => {
    return new Promise((resolve) => {
        const webP = new Image();
        webP.onload = webP.onerror = () => {
            resolve(webP.height === 2);
        };
        webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    });
};

// Détection et utilisation de WebP
const optimizeImages = async () => {
    const webpSupported = await supportsWebP();
    if (webpSupported) {
        console.log('✅ WebP supporté - Optimisation des images possible');
    }
};

// Mise en cache intelligente
const setupServiceWorker = () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('✅ Service Worker enregistré');
            })
            .catch(error => {
                console.log('❌ Erreur Service Worker:', error);
            });
    }
};

// Métriques de performance
const trackPerformance = () => {
    window.addEventListener('load', () => {
        const perfData = performance.getEntriesByType('navigation')[0];
        const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
        const domContentLoaded = perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart;
        
        console.log(`⚡ Temps de chargement: ${loadTime}ms`);
        console.log(`📄 DOM Content Loaded: ${domContentLoaded}ms`);
        
        // Core Web Vitals
        if ('web-vitals' in window) {
            getCLS(console.log);
            getFID(console.log);
            getLCP(console.log);
        }
    });
};

// Optimisation de l'affichage
const optimizeRendering = () => {
    // Reduce motion pour les utilisateurs qui le préfèrent
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.style.setProperty('--animation-duration', '0s');
    }
    
    // Optimisation de la densité de pixels
    if (window.devicePixelRatio > 1) {
        document.documentElement.classList.add('high-dpi');
    }
};

// Initialisation des optimisations
document.addEventListener('DOMContentLoaded', () => {
    preloadCriticalResources();
    optimizeFonts();
    optimizeImages();
    optimizeRendering();
    trackPerformance();
    
    console.log('🚀 Axonity Performance Optimizer - Activé');
});

// Export pour les tests
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        supportsWebP,
        optimizeImages,
        preloadCriticalResources
    };
}