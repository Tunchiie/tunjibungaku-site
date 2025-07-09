// Enhanced Portfolio Analytics and Professional UI Management
class ProfessionalPortfolio {
    constructor() {
        this.sessionStart = Date.now();
        this.pageViews = [];
        this.interactions = [];
        this.performance = {};
        this.filters = new Map();
        this.observers = new Map();
        
        this.init();
    }

    init() {
        this.setupAccessibility();
        this.setupThemeManagement();
        this.setupScrollManagement();
        this.setupProjectFiltering();
        this.setupAnimations();
        this.setupPerformanceTracking();
        this.setupErrorHandling();
        this.trackAnalytics();
    }

    // Enhanced accessibility features
    setupAccessibility() {
        this.addSkipLinks();
        this.setupKeyboardNavigation();
        this.setupScreenReaderAnnouncements();
        this.setupFocusManagement();
    }

    addSkipLinks() {
        if (!document.querySelector('.skip-to-content')) {
            const skipLink = document.createElement('a');
            skipLink.href = '#main-content';
            skipLink.className = 'skip-to-content';
            skipLink.textContent = 'Skip to main content';
            skipLink.setAttribute('aria-label', 'Skip to main content');
            document.body.insertBefore(skipLink, document.body.firstChild);
        }
    }

    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.target.classList.contains('filter-btn')) {
                this.handleFilterKeyboard(e);
            }
            
            if (e.target.classList.contains('theme-toggle') && e.key === 'Enter') {
                this.toggleTheme();
            }
            
            if (e.key === 'Escape') {
                this.handleEscapeKey();
            }
        });
    }

    handleFilterKeyboard(e) {
        const filterButtons = Array.from(document.querySelectorAll('.filter-btn'));
        const currentIndex = filterButtons.indexOf(e.target);
        
        switch (e.key) {
            case 'ArrowLeft':
            case 'ArrowUp':
                e.preventDefault();
                const prevIndex = currentIndex > 0 ? currentIndex - 1 : filterButtons.length - 1;
                filterButtons[prevIndex].focus();
                break;
            case 'ArrowRight':
            case 'ArrowDown':
                e.preventDefault();
                const nextIndex = currentIndex < filterButtons.length - 1 ? currentIndex + 1 : 0;
                filterButtons[nextIndex].focus();
                break;
        }
    }

    setupScreenReaderAnnouncements() {
        if (!document.getElementById('sr-announcements')) {
            const liveRegion = document.createElement('div');
            liveRegion.id = 'sr-announcements';
            liveRegion.setAttribute('aria-live', 'polite');
            liveRegion.setAttribute('aria-atomic', 'true');
            liveRegion.style.position = 'absolute';
            liveRegion.style.left = '-10000px';
            liveRegion.style.width = '1px';
            liveRegion.style.height = '1px';
            liveRegion.style.overflow = 'hidden';
            document.body.appendChild(liveRegion);
        }
    }

    announceToScreenReader(message) {
        const liveRegion = document.getElementById('sr-announcements');
        if (liveRegion) {
            liveRegion.textContent = message;
        }
    }

    // Professional theme management
    setupThemeManagement() {
        this.loadSavedTheme();
        // Store the bound handler for proper add/remove
        this._boundToggleTheme = this.toggleTheme.bind(this);
        this.setupThemeToggle();
        this.setupThemeSyncAcrossPages();
    }

    loadSavedTheme() {
        // Use consistent theme key across all pages
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme = savedTheme || (prefersDark ? 'dark' : 'light');
        this.applyTheme(theme);
        console.log('Enhanced Portfolio - Loaded theme:', theme);
    }

    setupThemeToggle() {
        // Guard to prevent multiple initializations
        if (this._themeToggleInitialized) return;
        this._themeToggleInitialized = true;

        // Use event delegation for robustness
        document.body.addEventListener('click', (e) => {
            const themeToggle = e.target.closest('.theme-toggle');
            if (themeToggle) {
                this.toggleTheme();
            }
        });

        // Set ARIA label if button exists at init
        setTimeout(() => {
            const themeToggle = document.querySelector('.theme-toggle');
            if (themeToggle) {
                themeToggle.setAttribute('aria-label', 'Toggle theme');
                console.log('Enhanced Portfolio - Theme toggle ARIA label set');
            }
        }, 100);
    }

    toggleTheme() {
        const currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.applyTheme(newTheme);
        // Save to consistent theme key
        localStorage.setItem('theme', newTheme);
        this.announceToScreenReader(`Switched to ${newTheme} theme`);
        console.log('Enhanced Portfolio - Toggled to:', newTheme);
    }

    applyTheme(theme) {
        const body = document.body;
        const sunIcon = document.querySelector('.theme-toggle-sun');
        const moonIcon = document.querySelector('.theme-toggle-moon');
        
        console.log('Enhanced Portfolio - Applying theme:', theme);
        console.log('Enhanced Portfolio - Sun icon found:', !!sunIcon);
        console.log('Enhanced Portfolio - Moon icon found:', !!moonIcon);
        
        if (theme === 'dark') {
            body.classList.add('dark-theme');
            // Show sun icon in dark mode (to switch to light)
            if (sunIcon) sunIcon.style.display = 'inline';
            if (moonIcon) moonIcon.style.display = 'none';
        } else {
            body.classList.remove('dark-theme');
            // Show moon icon in light mode (to switch to dark)
            if (sunIcon) sunIcon.style.display = 'none';
            if (moonIcon) moonIcon.style.display = 'inline';
        }
    }

    setupThemeSyncAcrossPages() {
        // Listen for theme changes from other pages
        window.addEventListener('storage', (e) => {
            if (e.key === 'theme') {
                console.log('Enhanced Portfolio - Theme changed on another page:', e.newValue);
                this.applyTheme(e.newValue);
            }
        });
    }

    // Enhanced scroll management
    setupScrollManagement() {
        this.setupScrollProgress();
        this.setupBackToTop();
    }

    setupScrollProgress() {
        const progressBar = document.getElementById('scrollProgress') || 
                           document.querySelector('.scroll-progress');
        
        if (progressBar) {
            window.addEventListener('scroll', () => {
                const scrollPercent = (window.pageYOffset / 
                    (document.documentElement.scrollHeight - window.innerHeight)) * 100;
                progressBar.style.width = `${Math.min(scrollPercent, 100)}%`;
            }, { passive: true });
        }
    }

    setupBackToTop() {
        const backToTop = document.getElementById('backToTop') || 
                         document.querySelector('.back-to-top');
        
        if (backToTop) {
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 300) {
                    backToTop.classList.add('visible');
                } else {
                    backToTop.classList.remove('visible');
                }
            }, { passive: true });
            
            backToTop.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    }

    // Enhanced project filtering
    setupProjectFiltering() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        if (filterButtons.length === 0) return;
        
        this.currentFilter = 'all';
        
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const filter = button.getAttribute('data-filter');
                this.applyFilter(filter, button);
            });
            
            button.setAttribute('aria-pressed', button.classList.contains('active'));
        });
        
        this.initializeProjects();
        this.initializeProjectFilters();
    }

    initializeProjects() {
        const projectCards = document.querySelectorAll('.project-card, .featured-project');
        
        projectCards.forEach((card, index) => {
            card.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    applyFilter(filter, activeButton) {
        if (this.currentFilter === filter) return;
        
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card, .featured-project');
        
        filterButtons.forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-pressed', 'false');
        });
        
        activeButton.classList.add('active');
        activeButton.setAttribute('aria-pressed', 'true');
        
        let visibleCount = 0;
        
        projectCards.forEach((card, index) => {
            const categories = (card.getAttribute('data-category') || '').toLowerCase().split(' ');
            const shouldShow = filter === 'all' || categories.includes(filter.toLowerCase());
            
            if (shouldShow) {
                visibleCount++;
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 50);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(-20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
        
        this.announceToScreenReader(`Showing ${visibleCount} projects for ${filter} category`);
        this.currentFilter = filter;
    }

    initializeProjectFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        if (filterBtns.length === 0) return; // No filters on this page

        filterBtns.forEach(btn => {
        const projectCards = document.querySelectorAll('.project-card, .featured-project');
        const featuredProjects = document.querySelectorAll('.featured-project');
                const filter = btn.getAttribute('data-filter');
                this.applyFilter(filter, btn);

                // Analytics tracking
                if (typeof trackEvent === 'function') {
                    trackEvent('project_filter', 'click', filter);
                }
            });

            // Add keyboard support
            btn.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    btn.click();
                }
            });
        });
    }

    // Animation setup
    setupAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });
        
        this.observers.set('intersection', observer);
    }

    // Performance tracking
    setupPerformanceTracking() {
        if ('performance' in window) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    if (perfData) {
                        console.log('Page Performance:', {
                            loadTime: Math.round(perfData.loadEventEnd - perfData.fetchStart),
                            domContentLoaded: Math.round(perfData.domContentLoadedEventEnd - perfData.fetchStart)
                        });
                    }
                }, 100);
            });
        }
    }

    // Error handling
    setupErrorHandling() {
        window.addEventListener('error', (e) => {
            console.error('Portfolio Error:', {
                message: e.message,
                filename: e.filename,
                lineno: e.lineno
            });
        });
    }

    // Analytics
    trackAnalytics() {
        this.trackPageView();
        this.setupInteractionTracking();
    }

    trackPageView() {
        console.log('Page View:', {
            url: window.location.href,
            title: document.title,
            timestamp: Date.now()
        });
    }

    setupInteractionTracking() {
        document.addEventListener('click', (e) => {
            const target = e.target.closest('a, button, .project-card, .nav-item, .filter-btn');
            if (target) {
                console.log('Interaction:', {
                    element: target.tagName.toLowerCase(),
                    text: target.textContent ? target.textContent.trim().substring(0, 50) : '',
                    className: target.className
                });
            }
        });
    }

    setupFocusManagement() {
        let focusedElement = null;
        
        document.addEventListener('focusin', (e) => {
            focusedElement = e.target;
        });
        
        this.returnFocus = () => {
            if (focusedElement && typeof focusedElement.focus === 'function') {
                focusedElement.focus();
            }
        };
    }

    handleEscapeKey() {
        const allButton = document.querySelector('.filter-btn[data-filter="all"]');
        if (allButton && !allButton.classList.contains('active')) {
            allButton.click();
        }
    }

    destroy() {
        this.observers.forEach(observer => {
            if (observer && typeof observer.disconnect === 'function') {
                observer.disconnect();
            }
        });
        this.observers.clear();
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.portfolioManager = new ProfessionalPortfolio();
    });
} else {
    window.portfolioManager = new ProfessionalPortfolio();
}
