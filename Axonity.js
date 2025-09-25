/**
 * AXONITY - Script JavaScript optimisé
 * Code nettoyé et organisé pour performance et maintenabilité
 * Auteur: Mehala RABEMANANJARA
 * Version: 2.0
 */

'use strict';

// ==========================================
// CONFIGURATION ET CONSTANTES
// ==========================================
const CONFIG = {
    SCROLL_THRESHOLD: 50,
    SCROLL_PROGRESS_THRESHOLD: 300,
    COOKIE_BANNER_DELAY: 2000,
    COUNTER_SPEED: 10,
    OBSERVER_THRESHOLD: 0.2,
    ANIMATION_DELAY: 100
};

// ==========================================
// CLASSES UTILITAIRES
// ==========================================
class ElementUtils {
    static safeQuerySelector(selector) {
        return document.querySelector(selector);
    }
    
    static safeQuerySelectorAll(selector) {
        return document.querySelectorAll(selector);
    }
    
    static safeAddEventListener(element, event, callback) {
        if (element && typeof callback === 'function') {
            element.addEventListener(event, callback);
        }
    }
}

class ScrollManager {
    constructor() {
        this.ticking = false;
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', () => this.handleScroll());
    }
    
    handleScroll() {
        if (!this.ticking) {
            requestAnimationFrame(() => {
                this.updateScrollProgress();
                this.updateHeaderState();
                this.updateScrollArrow();
                this.updateBackToTop();
                this.ticking = false;
            });
            this.ticking = true;
        }
    }
    
    updateScrollProgress() {
        const scrollProgress = ElementUtils.safeQuerySelector('#scrollProgress');
        if (scrollProgress) {
            const scrollTop = window.scrollY;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const scrollPercent = Math.min((scrollTop / docHeight) * 100, 100);
            scrollProgress.style.width = `${scrollPercent}%`;
        }
    }
    
    updateHeaderState() {
        const header = ElementUtils.safeQuerySelector('.header, .navbar');
        if (header) {
            header.classList.toggle('scrolled', window.scrollY > CONFIG.SCROLL_THRESHOLD);
        }
    }
    
    updateScrollArrow() {
        const scrollArrow = ElementUtils.safeQuerySelector('.scroll-down-arrow, .scroll-indicator');
        if (scrollArrow) {
            scrollArrow.classList.toggle('hidden', window.scrollY > CONFIG.SCROLL_PROGRESS_THRESHOLD);
        }
    }
    
    updateBackToTop() {
        const backToTop = ElementUtils.safeQuerySelector('#backToTop');
        if (backToTop) {
            const shouldShow = window.scrollY > CONFIG.SCROLL_PROGRESS_THRESHOLD;
            backToTop.style.display = shouldShow ? 'block' : 'none';
        }
    }
}

class NavigationManager {
    constructor() {
        this.init();
    }
    
    init() {
        this.initMobileMenu();
        this.initSmoothScrolling();
        this.initActiveLinks();
    }
    
    initMobileMenu() {
        const menuToggle = ElementUtils.safeQuerySelector('.menu-toggle, .hamburger');
        const navbar = ElementUtils.safeQuerySelector('.navbar, .nav-menu');
        
        if (menuToggle && navbar) {
            ElementUtils.safeAddEventListener(menuToggle, 'click', () => {
                navbar.classList.toggle('active');
                menuToggle.classList.toggle('active');
            });
            
            // Gérer les dropdowns mobiles
            const dropdowns = ElementUtils.safeQuerySelectorAll('.dropdown');
            dropdowns.forEach(dropdown => {
                const link = dropdown.querySelector('a');
                if (link) {
                    ElementUtils.safeAddEventListener(link, 'click', (e) => {
                        if (window.innerWidth <= 768) {
                            e.preventDefault();
                            dropdown.classList.toggle('active');
                        }
                    });
                }
            });
            
            // Fermer le menu lors du clic sur un lien (sauf dropdowns)
            const navLinks = ElementUtils.safeQuerySelectorAll('.navbar a:not(.dropdown > a), .nav-menu a:not(.dropdown > a)');
            navLinks.forEach(link => {
                ElementUtils.safeAddEventListener(link, 'click', () => {
                    navbar.classList.remove('active');
                    menuToggle.classList.remove('active');
                    // Fermer tous les dropdowns
                    dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
                });
            });
            
            // Fermer le menu en cliquant sur l'overlay
            ElementUtils.safeAddEventListener(navbar, 'click', (e) => {
                if (e.target === navbar) {
                    navbar.classList.remove('active');
                    menuToggle.classList.remove('active');
                    dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
                }
            });
        }
    }
    
    initSmoothScrolling() {
        const anchors = ElementUtils.safeQuerySelectorAll('a[href^="#"]');
        anchors.forEach(anchor => {
            ElementUtils.safeAddEventListener(anchor, 'click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href');
                const target = ElementUtils.safeQuerySelector(targetId);
                
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
        
        // Scroll arrow special handling
        const scrollArrow = ElementUtils.safeQuerySelector('.scroll-down-arrow, .scroll-indicator');
        if (scrollArrow) {
            ElementUtils.safeAddEventListener(scrollArrow, 'click', () => {
                const nextSection = ElementUtils.safeQuerySelector('section:nth-of-type(2), #services');
                if (nextSection) {
                    nextSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
        
        // Back to top
        const backToTop = ElementUtils.safeQuerySelector('#backToTop');
        if (backToTop) {
            ElementUtils.safeAddEventListener(backToTop, 'click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    }
    
    initActiveLinks() {
        const navLinks = ElementUtils.safeQuerySelectorAll('.navbar a, .nav-menu a');
        navLinks.forEach(link => {
            ElementUtils.safeAddEventListener(link, 'click', function() {
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }
}

class AnimationManager {
    constructor() {
        this.init();
    }
    
    init() {
        this.initScrollAnimations();
        this.initCounters();
        this.addDynamicStyles();
    }
    
    initScrollAnimations() {
        const sections = ElementUtils.safeQuerySelectorAll('.fade-in, .animate-on-scroll, .service-card, .portfolio-item');
        
        if (sections.length === 0) return;
        
        const observerOptions = {
            root: null,
            threshold: CONFIG.OBSERVER_THRESHOLD,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                        entry.target.style.transform = 'translateY(0)';
                        entry.target.style.opacity = '1';
                    }, CONFIG.ANIMATION_DELAY);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        sections.forEach(section => observer.observe(section));
    }
    
    initCounters() {
        const counters = ElementUtils.safeQuerySelectorAll('.counter');
        if (counters.length === 0) return;
        
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        });
        
        counters.forEach(counter => counterObserver.observe(counter));
    }
    
    animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-target')) || 0;
        const increment = target / 200;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                setTimeout(updateCounter, CONFIG.COUNTER_SPEED);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    }
    
    addDynamicStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .advantage-cards .card .icon,
            .service-item img,
            .service-card .service-icon {
                transition: transform 0.3s ease;
            }
            .advantage-cards .card:hover .icon,
            .service-item:hover img,
            .service-card:hover .service-icon {
                transform: scale(1.1) rotate(-5deg);
            }
            .fade-in, .animate-on-scroll {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.6s ease;
            }
            .fade-in.visible, .animate-on-scroll.visible {
                opacity: 1;
                transform: translateY(0);
            }
        `;
        document.head.appendChild(style);
    }
}

class CookieManager {
    constructor() {
        this.init();
    }
    
    init() {
        this.checkCookieConsent();
        this.initCookieButtons();
    }
    
    checkCookieConsent() {
        if (!localStorage.getItem('cookieConsent')) {
            setTimeout(() => {
                const banner = ElementUtils.safeQuerySelector('#cookieBanner, #rgpd-banner');
                if (banner) {
                    banner.style.display = 'block';
                    banner.classList.remove('hidden');
                }
            }, CONFIG.COOKIE_BANNER_DELAY);
        }
    }
    
    initCookieButtons() {
        const acceptBtn = ElementUtils.safeQuerySelector('#accept-cookies, .rgpd-btn-primary');
        const rejectBtn = ElementUtils.safeQuerySelector('#reject-cookies, .rgpd-btn-secondary');
        
        ElementUtils.safeAddEventListener(acceptBtn, 'click', () => this.acceptCookies());
        ElementUtils.safeAddEventListener(rejectBtn, 'click', () => this.refuseCookies());
    }
    
    acceptCookies() {
        localStorage.setItem('cookieConsent', 'accepted');
        this.hideBanner();
        console.log('Cookies acceptés - Axonity');
    }
    
    refuseCookies() {
        localStorage.setItem('cookieConsent', 'refused');
        this.hideBanner();
        console.log('Cookies refusés - Axonity');
    }
    
    hideBanner() {
        const banner = ElementUtils.safeQuerySelector('#cookieBanner, #rgpd-banner');
        if (banner) {
            banner.style.display = 'none';
            banner.classList.add('hidden');
        }
    }
}

class UIManager {
    constructor() {
        this.init();
    }
    
    init() {
        this.initDropdowns();
        this.initFAQ();
        this.initContactForm();
        this.initDarkMode();
        this.initSecretMessage();
    }
    
    initDropdowns() {
        const dropdowns = ElementUtils.safeQuerySelectorAll('.dropdown');
        dropdowns.forEach(dropdown => {
            ElementUtils.safeAddEventListener(dropdown, 'click', (e) => {
                e.preventDefault();
                const menu = dropdown.querySelector('.dropdown-menu');
                if (menu) {
                    const isVisible = menu.style.display === 'block';
                    menu.style.display = isVisible ? 'none' : 'block';
                }
            });
        });
    }
    
    initFAQ() {
        const faqQuestions = ElementUtils.safeQuerySelectorAll('.faq-question');
        faqQuestions.forEach(question => {
            ElementUtils.safeAddEventListener(question, 'click', () => {
                const parent = question.parentElement;
                if (parent) {
                    parent.classList.toggle('open');
                }
            });
        });
    }
    
    initContactForm() {
        const form = ElementUtils.safeQuerySelector('#contact-form');
        if (form) {
            ElementUtils.safeAddEventListener(form, 'submit', (e) => {
                e.preventDefault();
                console.log('Formulaire soumis - Axonity');
                // Ici vous pouvez ajouter la logique d'envoi
            });
        }
    }
    
    initDarkMode() {
        const toggleDarkMode = ElementUtils.safeQuerySelector('#darkModeToggle');
        if (toggleDarkMode) {
            ElementUtils.safeAddEventListener(toggleDarkMode, 'click', () => {
                document.body.classList.toggle('dark-mode');
                localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
            });
            
            // Restaurer le mode sombre
            if (localStorage.getItem('darkMode') === 'true') {
                document.body.classList.add('dark-mode');
            }
        }
    }
    
    initSecretMessage() {
        let clickCount = 0;
        const logo = ElementUtils.safeQuerySelector('.nav-logo, .logo-text');
        const secretMessage = ElementUtils.safeQuerySelector('#secret-message, .secret-message');
        
        if (logo && secretMessage) {
            ElementUtils.safeAddEventListener(logo, 'click', () => {
                clickCount++;
                if (clickCount >= 5) {
                    secretMessage.style.display = 'block';
                    secretMessage.classList.add('visible');
                    setTimeout(() => {
                        secretMessage.style.display = 'none';
                        secretMessage.classList.remove('visible');
                        clickCount = 0;
                    }, 10000);
                }
            });
        }
    }
}

// ==========================================
// INITIALISATION PRINCIPALE
// ==========================================
class AxonityApp {
    constructor() {
        this.scrollManager = null;
        this.navigationManager = null;
        this.animationManager = null;
        this.cookieManager = null;
        this.uiManager = null;
    }
    
    init() {
        // Initialisation des gestionnaires
        this.scrollManager = new ScrollManager();
        this.navigationManager = new NavigationManager();
        this.animationManager = new AnimationManager();
        this.cookieManager = new CookieManager();
        this.uiManager = new UIManager();
        
        console.log('🚀 Axonity App initialisée avec succès');
    }
    
    hideLoader() {
        const loader = ElementUtils.safeQuerySelector('#loader');
        if (loader) {
            loader.style.display = 'none';
        }
    }
}

// ==========================================
// LANCEMENT DE L'APPLICATION
// ==========================================
const axonityApp = new AxonityApp();

// Initialisation au chargement du DOM
document.addEventListener('DOMContentLoaded', () => {
    axonityApp.init();
});

// Masquer le loader au chargement complet
window.addEventListener('load', () => {
    axonityApp.hideLoader();
});

