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
        this.setupThemeToggle();
    }

    loadSavedTheme() {
        const savedTheme = localStorage.getItem('portfolio-theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme = savedTheme || (prefersDark ? 'dark' : 'light');
        this.applyTheme(theme);
    }

    setupThemeToggle() {
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
            themeToggle.setAttribute('aria-label', 'Toggle theme');
        }
    }

    toggleTheme() {
        const currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.applyTheme(newTheme);
        localStorage.setItem('portfolio-theme', newTheme);
        this.announceToScreenReader(`Switched to ${newTheme} theme`);
    }

    applyTheme(theme) {
        const body = document.body;
        const themeIcon = document.querySelector('.theme-icon');
        
        if (theme === 'dark') {
            body.classList.add('dark-theme');
            if (themeIcon) themeIcon.textContent = '☀️';
        } else {
            body.classList.remove('dark-theme');
            if (themeIcon) themeIcon.textContent = '🌙';
        }
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

    // Project filtering functionality
    initializeProjectFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');
        const featuredProjects = document.querySelectorAll('.featured-project');

        if (filterBtns.length === 0) return; // No filters on this page

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.getAttribute('data-filter');
                
                // Update active button and ARIA states
                filterBtns.forEach(b => {
                    b.classList.remove('active');
                    b.setAttribute('aria-pressed', 'false');
                });
                btn.classList.add('active');
                btn.setAttribute('aria-pressed', 'true');
                
                // Filter project cards
                projectCards.forEach(card => {
                    const categories = card.getAttribute('data-category') || '';
                    
                    if (filter === 'all' || categories.includes(filter)) {
                        card.style.display = 'block';
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });

                // Handle featured projects
                featuredProjects.forEach(featuredProject => {
                    const featuredCategories = featuredProject.getAttribute('data-category') || '';
                    
                    if (filter === 'all' || featuredCategories.includes(filter)) {
                        featuredProject.style.display = 'block';
                        featuredProject.style.opacity = '0';
                        featuredProject.style.transform = 'translateY(20px)';
                        
                        setTimeout(() => {
                            featuredProject.style.opacity = '1';
                            featuredProject.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        featuredProject.style.opacity = '0';
                        featuredProject.style.transform = 'translateY(20px)';
                        
                        setTimeout(() => {
                            featuredProject.style.display = 'none';
                        }, 300);
                    }
                });

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
                    text: target.textContent?.trim().substring(0, 50),
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
