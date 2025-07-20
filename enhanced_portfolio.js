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
        this.setupMetricsCounter();
        this.setupSkillsAnimation();
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
                e.preventDefault();
                e.target.click();
            }
        });
    }

    handleFilterKeyboard(e) {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
            e.preventDefault();
            const filterBtns = Array.from(document.querySelectorAll('.filter-btn'));
            const currentIndex = filterBtns.indexOf(e.target);
            let nextIndex;
            
            if (e.key === 'ArrowRight') {
                nextIndex = (currentIndex + 1) % filterBtns.length;
            } else {
                nextIndex = currentIndex === 0 ? filterBtns.length - 1 : currentIndex - 1;
            }
            
            filterBtns[nextIndex].focus();
        }
    }

    setupScreenReaderAnnouncements() {
        // Create aria-live region for announcements
        const announcementRegion = document.createElement('div');
        announcementRegion.setAttribute('aria-live', 'polite');
        announcementRegion.setAttribute('aria-atomic', 'true');
        announcementRegion.className = 'sr-only';
        announcementRegion.style.cssText = 'position: absolute; left: -10000px; width: 1px; height: 1px; overflow: hidden;';
        document.body.appendChild(announcementRegion);
        this.announcementRegion = announcementRegion;
    }

    announceToScreenReader(message) {
        if (this.announcementRegion) {
            this.announcementRegion.textContent = message;
        }
    }

    // Theme Management
    setupThemeManagement() {
        this.loadSavedTheme();
        this._boundToggleTheme = this.toggleTheme.bind(this);
        this.setupThemeToggle();
        this.setupThemeSyncAcrossPages();
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
        const html = document.documentElement;
        const body = document.body;
        
        // Update data attribute
        html.setAttribute('data-theme', theme);
        
        if (theme === 'dark') {
            html.classList.add('dark-theme');
            body.classList.add('dark-theme');
        } else {
            html.classList.remove('dark-theme');
            body.classList.remove('dark-theme');
        }
        
        console.log('Enhanced Portfolio - Applied theme:', theme);
    }

    // Scroll Management
    setupScrollManagement() {
        this.setupScrollProgress();
        this.setupBackToTop();
        this.setupScrollBehavior();
    }

    setupScrollProgress() {
        const progressBar = document.getElementById('scrollProgress');
        if (!progressBar) return;

        const updateProgress = () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = Math.min(100, Math.max(0, scrollPercent)) + '%';
        };

        window.addEventListener('scroll', updateProgress, { passive: true });
        updateProgress(); // Initial call
    }

    setupBackToTop() {
        const backToTop = document.getElementById('back-to-top');
        if (!backToTop) return;

        const toggleVisibility = () => {
            const shouldShow = window.pageYOffset > 300;
            backToTop.style.display = shouldShow ? 'flex' : 'none';
        };

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            this.announceToScreenReader('Returned to top of page');
        });

        window.addEventListener('scroll', toggleVisibility, { passive: true });
        toggleVisibility(); // Initial call
    }

    setupScrollBehavior() {
        // Smooth scrolling for anchor links
        document.addEventListener('click', (e) => {
            if (e.target.tagName === 'A' && e.target.getAttribute('href')?.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(e.target.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    }

    // Project Filtering
    setupProjectFiltering() {
        this.initializeProjectFilters();
        this.currentFilter = 'all';
    }

    initializeProjectFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        if (filterBtns.length === 0) return;

        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const filter = btn.getAttribute('data-filter');
                this.applyFilter(filter, btn);
            });

            btn.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    btn.click();
                }
            });
        });
    }

    applyFilter(filter, activeBtn) {
        const projectCards = document.querySelectorAll('.project-card, .featured-project');
        const filterBtns = document.querySelectorAll('.filter-btn');
        
        // Update active button
        filterBtns.forEach(btn => btn.classList.remove('active'));
        if (activeBtn) activeBtn.classList.add('active');

        let visibleCount = 0;
        projectCards.forEach((card, index) => {
            const tags = card.querySelectorAll('.tech-tag');
            const shouldShow = filter === 'all' || Array.from(tags).some(tag => 
                tag.textContent.toLowerCase().includes(filter.toLowerCase())
            );

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

        const fadeElements = document.querySelectorAll('.fade-in');
        fadeElements.forEach(element => observer.observe(element));
        
        this.observers.set('fadeIn', observer);
    }

    // Performance tracking
    setupPerformanceTracking() {
        this.performance.domContentLoaded = Date.now();
        
        window.addEventListener('load', () => {
            this.performance.windowLoaded = Date.now();
            this.performance.totalLoadTime = this.performance.windowLoaded - this.sessionStart;
        });
    }

    // Error handling
    setupErrorHandling() {
        window.addEventListener('error', (e) => {
            console.error('Portfolio Error:', e.error);
        });

        window.addEventListener('unhandledrejection', (e) => {
            console.error('Portfolio Promise Rejection:', e.reason);
        });
    }

    // Analytics
    trackAnalytics() {
        this.trackPageView();
        this.setupInteractionTracking();
    }

    trackPageView() {
        this.pageViews.push({
            url: window.location.href,
            timestamp: Date.now(),
            referrer: document.referrer
        });
    }

    setupInteractionTracking() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('project-card') || 
                e.target.classList.contains('filter-btn') ||
                e.target.classList.contains('theme-toggle')) {
                this.interactions.push({
                    type: 'click',
                    element: e.target.className,
                    timestamp: Date.now()
                });
            }
        });
    }

    // Focus management
    setupFocusManagement() {
        // Trap focus in modals if any
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.handleEscapeKey();
            }
        });
    }

    handleEscapeKey() {
        // Close any open modals or overlays
        const activeModal = document.querySelector('.modal.active');
        if (activeModal) {
            activeModal.classList.remove('active');
        }
    }

    // Cleanup
    destroy() {
        this.observers.forEach(observer => observer.disconnect());
        window.removeEventListener('scroll', this.setupScrollProgress);
        document.removeEventListener('click', this._boundToggleTheme);
    }

    // Professional Metrics Counter Animation
    setupMetricsCounter() {
        const metricCards = document.querySelectorAll('.metrics-dashboard .metric-card');
        if (metricCards.length === 0) {
            console.log('No metrics dashboard cards found');
            return;
        }
        console.log(`Found ${metricCards.length} metric cards to animate`);

        const observerOptions = {
            threshold: 0.3,
            rootMargin: '0px 0px -50px 0px'
        };

        const metricsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const numberElement = entry.target.querySelector('.metric-number[data-target]');
                    if (numberElement && !numberElement.classList.contains('counted')) {
                        this.animateCounter(numberElement);
                        numberElement.classList.add('counted');
                    }
                }
            });
        }, observerOptions);

        metricCards.forEach(card => {
            metricsObserver.observe(card);
        });

        this.observers.set('metrics', metricsObserver);
    }

    animateCounter(element) {
        const targetValue = element.getAttribute('data-target');
        const target = parseInt(targetValue);

        // Check for invalid data-target values
        if (isNaN(target) || target < 0) {
            console.error('Invalid data-target value:', targetValue, 'for element:', element);
            element.textContent = '0';
            return;
        }

        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;

        element.classList.add('counting');

        const updateCounter = () => {
            current += increment;

            if (current >= target) {
                element.textContent = target;
                element.classList.remove('counting');
                return;
            }

            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        };

        requestAnimationFrame(updateCounter);
    }

    formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
        }
        return num.toString();
    }

    // Interactive Skills Animation
    setupSkillsAnimation() {
        const skillItems = document.querySelectorAll('.skill-item');
        if (skillItems.length === 0) return;

        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        };

        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target.querySelector('.skill-progress');
                    if (progressBar && !progressBar.classList.contains('animated')) {
                        const level = progressBar.getAttribute('data-level');
                        progressBar.style.setProperty('--progress-width', level + '%');
                        progressBar.style.width = level + '%';
                        progressBar.classList.add('animated');
                        entry.target.classList.add('animate');
                    }
                }
            });
        }, observerOptions);

        skillItems.forEach(item => {
            skillsObserver.observe(item);
        });

        this.observers.set('skills', skillsObserver);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    try {
        window.portfolioInstance = new ProfessionalPortfolio();
        console.log('Enhanced Portfolio initialized successfully');
    } catch (error) {
        console.error('Failed to initialize Enhanced Portfolio:', error);
    }
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProfessionalPortfolio;
}
