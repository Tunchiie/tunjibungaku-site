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
        // Add skip links
        this.addSkipLinks();
        
        // Enhanced keyboard navigation
        this.setupKeyboardNavigation();
        
        // Screen reader announcements
        this.setupScreenReaderAnnouncements();
        
        // Color contrast validation
        this.validateColorContrast();
        
        // Focus management
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
        // Enhanced keyboard navigation for filter buttons
        document.addEventListener('keydown', (e) => {
            if (e.target.classList.contains('filter-btn')) {
                this.handleFilterKeyboard(e);
            }
            
            // Theme toggle keyboard support
            if (e.target.classList.contains('theme-toggle') && e.key === 'Enter') {
                this.toggleTheme();
            }
            
            // ESC key to close modals or reset filters
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
            case 'Home':
                e.preventDefault();
                filterButtons[0].focus();
                break;
            case 'End':
                e.preventDefault();
                filterButtons[filterButtons.length - 1].focus();
                break;
        }
    }

    setupScreenReaderAnnouncements() {
        // Create live region for announcements
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
        this.setupSystemThemeDetection();
    }

    loadSavedTheme() {
        const savedTheme = localStorage.getItem('portfolio-theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme = savedTheme || (prefersDark ? 'dark' : 'light');
        
        this.applyTheme(theme);
    }

    setupSystemThemeDetection() {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('portfolio-theme')) {
                this.applyTheme(e.matches ? 'dark' : 'light');
            }
        });
    }

    setupThemeToggle() {
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
            themeToggle.setAttribute('aria-label', 'Toggle theme');
            themeToggle.setAttribute('role', 'button');
        }
    }

    toggleTheme() {
        const currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.applyTheme(newTheme);
        localStorage.setItem('portfolio-theme', newTheme);
        
        // Announce theme change
        this.announceToScreenReader(`Switched to ${newTheme} theme`);
        
        // Track interaction
        this.trackInteraction('theme_toggle', { from: currentTheme, to: newTheme });
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
        
        // Update meta theme-color for mobile browsers
        this.updateThemeColor(theme);
    }

    updateThemeColor(theme) {
        let metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (!metaThemeColor) {
            metaThemeColor = document.createElement('meta');
            metaThemeColor.name = 'theme-color';
            document.head.appendChild(metaThemeColor);
        }
        
        metaThemeColor.content = theme === 'dark' ? '#3a3153' : '#5f43b2';
    }

    // Enhanced scroll management
    setupScrollManagement() {
        this.setupScrollProgress();
        this.setupBackToTop();
        this.setupSmoothScrolling();
        // this.setupScrollSpy(); // Removed because the method is not defined
    }

    setupScrollProgress() {
        const progressBar = document.getElementById('scrollProgress') || 
                           document.querySelector('.scroll-progress');
        
        if (progressBar) {
            let isScrolling = false;
            
            window.addEventListener('scroll', () => {
                if (!isScrolling) {
                    requestAnimationFrame(() => {
                        const scrollPercent = (window.pageYOffset / 
                            (document.documentElement.scrollHeight - window.innerHeight)) * 100;
                        progressBar.style.width = `${Math.min(scrollPercent, 100)}%`;
                        isScrolling = false;
                    });
                    isScrolling = true;
                }
            }, { passive: true });
        }
    }

    setupBackToTop() {
        const backToTop = document.getElementById('backToTop') || 
                         document.querySelector('.back-to-top');
        
        if (backToTop) {
            let isScrolling = false;
            
            window.addEventListener('scroll', () => {
                if (!isScrolling) {
                    requestAnimationFrame(() => {
                        if (window.pageYOffset > 300) {
                            backToTop.classList.add('visible');
                        } else {
                            backToTop.classList.remove('visible');
                        }
                        isScrolling = false;
                    });
                    isScrolling = true;
                }
            }, { passive: true });
            
            backToTop.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                this.trackInteraction('back_to_top', { scrollPosition: window.pageYOffset });
            });
        }
    }

    // Enhanced project filtering with better UX
    setupProjectFiltering() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card, .featured-project');
        
        if (filterButtons.length === 0) return;
        
        // Initialize filter state
        this.currentFilter = 'all';
        
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const filter = button.getAttribute('data-filter');
                this.applyFilter(filter, button);
            });
            
            // Add ARIA attributes
            button.setAttribute('role', 'button');
            button.setAttribute('aria-pressed', button.classList.contains('active'));
        });
        
        // Ensure all projects are visible on load
        this.initializeProjects();
    }

    initializeProjects() {
        const projectCards = document.querySelectorAll('.project-card, .featured-project');
        
        projectCards.forEach((card, index) => {
            card.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            // Stagger animation
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
        
        // Update button states
        filterButtons.forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-pressed', 'false');
        });
        
        activeButton.classList.add('active');
        activeButton.setAttribute('aria-pressed', 'true');
        
        // Filter projects with animation
        let visibleCount = 0;
        
        projectCards.forEach((card, index) => {
            const categories = (card.getAttribute('data-category') || '').toLowerCase().split(' ');
            const shouldShow = filter === 'all' || categories.includes(filter.toLowerCase());
            
            if (shouldShow) {
                visibleCount++;
                card.style.display = 'block';
                
                // Animate in
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 50);
            } else {
                // Animate out
                card.style.opacity = '0';
                card.style.transform = 'translateY(-20px)';
                
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
        
        // Announce filter change
        this.announceToScreenReader(`Showing ${visibleCount} projects for ${filter} category`);
        
        // Track filter usage
        this.trackInteraction('project_filter', { 
            filter, 
            visibleCount,
            previousFilter: this.currentFilter 
        });
        
        this.currentFilter = filter;
    }

    // Enhanced animations with intersection observer
    setupAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Stagger child animations
                    const children = entry.target.querySelectorAll('.animate-stagger');
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('visible');
                        }, index * 100);
                    });
                }
            });
        }, observerOptions);

        // Observe fade-in elements
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });
        
        this.observers.set('intersection', observer);
    }

    // Performance tracking and optimization
    setupPerformanceTracking() {
        if ('performance' in window) {
            this.trackPageLoad();
            this.trackLargestContentfulPaint();
            this.trackCumulativeLayoutShift();
        }
    }

    trackPageLoad() {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                if (perfData) {
                    this.performance = {
                        loadTime: Math.round(perfData.loadEventEnd - perfData.fetchStart),
                        domContentLoaded: Math.round(perfData.domContentLoadedEventEnd - perfData.fetchStart),
                        firstPaint: this.getFirstPaint(),
                        pageSize: this.getPageSize()
                    };
                    
                    this.logEvent('performance', this.performance);
                }
            }, 100);
        });
    }

    getFirstPaint() {
        const paintEntries = performance.getEntriesByType('paint');
        const firstPaint = paintEntries.find(entry => entry.name === 'first-paint');
        return firstPaint ? Math.round(firstPaint.startTime) : null;
    }

    getPageSize() {
        const resources = performance.getEntriesByType('resource');
        const totalSize = resources.reduce((size, resource) => {
            return size + (resource.transferSize || 0);
        }, 0);
        return Math.round(totalSize / 1024); // KB
    }

    // Error handling and logging
    setupErrorHandling() {
        window.addEventListener('error', (e) => {
            this.logError('JavaScript Error', {
                message: e.message,
                filename: e.filename,
                lineno: e.lineno,
                colno: e.colno,
                stack: e.error ? e.error.stack : null
            });
        });

        window.addEventListener('unhandledrejection', (e) => {
            this.logError('Unhandled Promise Rejection', {
                reason: e.reason
            });
        });
    }

    logError(type, details) {
        console.error(`Portfolio Error [${type}]:`, details);
        
        // Track error for analytics
        this.trackInteraction('error', {
            type,
            details,
            timestamp: Date.now(),
            userAgent: navigator.userAgent,
            url: window.location.href
        });
    }

    // Analytics and interaction tracking
    trackAnalytics() {
        this.trackPageView();
        this.setupInteractionTracking();
    }

    trackPageView() {
        const pageData = {
            url: window.location.href,
            title: document.title,
            timestamp: Date.now(),
            referrer: document.referrer,
            userAgent: navigator.userAgent,
            viewport: {
                width: window.innerWidth,
                height: window.innerHeight
            },
            theme: document.body.classList.contains('dark-theme') ? 'dark' : 'light'
        };
        
        this.pageViews.push(pageData);
        this.logEvent('page_view', pageData);
    }

    setupInteractionTracking() {
        // Track clicks on important elements
        document.addEventListener('click', (e) => {
            const target = e.target.closest('a, button, .project-card, .nav-item, .filter-btn');
            if (target) {
                this.trackInteraction('click', {
                    element: target.tagName.toLowerCase(),
                    text: target.textContent?.trim().substring(0, 50),
                    href: target.href || null,
                    className: target.className,
                    timestamp: Date.now()
                });
            }
        });

        // Track form interactions
        document.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', (e) => {
                this.trackInteraction('form_submit', {
                    formId: form.id,
                    timestamp: Date.now()
                });
            });
        });
    }

    trackInteraction(type, data) {
        this.interactions.push({
            type,
            data,
            timestamp: Date.now()
        });
        
        this.logEvent('interaction', { type, data });
    }

    logEvent(eventType, eventData) {
        if (console && console.log) {
            console.log(`Portfolio Analytics [${eventType}]:`, eventData);
        }
    }

    // Utility methods
    validateColorContrast() {
        // Basic color contrast validation (simplified)
        const contrastElements = document.querySelectorAll('[data-contrast-check]');
        contrastElements.forEach(element => {
            const styles = window.getComputedStyle(element);
            const bgColor = styles.backgroundColor;
            const textColor = styles.color;
            
            // Log contrast information for manual review
            console.log('Contrast check:', {
                element: element.tagName,
                background: bgColor,
                text: textColor
            });
        });
    }

    setupFocusManagement() {
        // Enhanced focus management for better keyboard navigation
        let focusedElement = null;
        
        document.addEventListener('focusin', (e) => {
            focusedElement = e.target;
        });
        
        document.addEventListener('focusout', (e) => {
            focusedElement = null;
        });
        
        // Return focus to last focused element when needed
        this.returnFocus = () => {
            if (focusedElement && typeof focusedElement.focus === 'function') {
                focusedElement.focus();
            }
        };
    }

    handleEscapeKey() {
        // Handle escape key for better UX
        const activeModal = document.querySelector('[role="dialog"][aria-hidden="false"]');
        if (activeModal) {
            // Close modal logic would go here
            return;
        }
        
        // Reset filters to "all"
        const allButton = document.querySelector('.filter-btn[data-filter="all"]');
        if (allButton && !allButton.classList.contains('active')) {
            allButton.click();
        }
    }

    // Cleanup method
    destroy() {
        // Clean up observers and event listeners
        this.observers.forEach(observer => {
            if (observer && typeof observer.disconnect === 'function') {
                observer.disconnect();
            }
        });
        this.observers.clear();
    }
}

// Initialize the professional portfolio when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.portfolioManager = new ProfessionalPortfolio();
    });
} else {
    window.portfolioManager = new ProfessionalPortfolio();
}

// Merge analytics responsibilities into ProfessionalPortfolio

// Add additional analytics tracking to ProfessionalPortfolio
ProfessionalPortfolio.prototype.trackScrollDepth = function() {
    let maxScroll = 0;
    const milestones = [25, 50, 75, 90, 100];
    const reached = new Set();

    window.addEventListener('scroll', () => {
        const scrollPercent = Math.round(
            (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
        );
        
        maxScroll = Math.max(maxScroll, scrollPercent);
        
        milestones.forEach(milestone => {
            if (scrollPercent >= milestone && !reached.has(milestone)) {
                reached.add(milestone);
                this.trackInteraction('scroll_depth', {
                    percentage: milestone,
                    timestamp: Date.now()
                });
            }
        });
    });
};

ProfessionalPortfolio.prototype.trackTimeOnPage = function() {
    let isActive = true;
    let timeSpent = 0;
    let lastActiveTime = Date.now();

    // Track when user becomes inactive
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    events.forEach(event => {
        document.addEventListener(event, () => {
            if (!isActive) {
                lastActiveTime = Date.now();
                isActive = true;
            }
        });
    });

    // Check for inactivity
    setInterval(() => {
        if (isActive && Date.now() - lastActiveTime > 30000) { // 30 seconds
            isActive = false;
            timeSpent += 30;
        } else if (isActive) {
            timeSpent += 5;
        }
    }, 5000);

    // Send time data before leaving
    window.addEventListener('beforeunload', () => {
        this.trackInteraction('time_on_page', {
            totalSeconds: Math.round((Date.now() - this.sessionStart) / 1000),
            activeSeconds: timeSpent,
            timestamp: Date.now()
        });
    });
};

ProfessionalPortfolio.prototype.getAnalyticsSummary = function() {
    return {
        session: {
            duration: Date.now() - this.sessionStart,
            pageViews: this.pageViews.length,
            interactions: this.interactions.length
        },
        performance: this.performance,
        topInteractions: this.getTopInteractions ? this.getTopInteractions() : [],
        deviceInfo: this.getDeviceInfo ? this.getDeviceInfo() : {}
    };
};

ProfessionalPortfolio.prototype.getTopInteractions = function() {
    const counts = {};
    this.interactions.forEach(interaction => {
        const key = interaction.type;
        counts[key] = (counts[key] || 0) + 1;
    });
    
    return Object.entries(counts)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5);
};

ProfessionalPortfolio.prototype.getDeviceInfo = function() {
    return {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        language: navigator.language,
        cookieEnabled: navigator.cookieEnabled,
        onLine: navigator.onLine,
        viewport: {
            width: window.innerWidth,
            height: window.innerHeight
        },
        screen: {
            width: screen.width,
            height: screen.height,
            colorDepth: screen.colorDepth
        }
    };
};

// Add download tracking to ProfessionalPortfolio
document.addEventListener('click', (e) => {
    if (window.portfolioManager && e.target.closest('.download-btn')) {
        window.portfolioManager.trackInteraction('download', {
            type: 'resume_pdf',
            timestamp: Date.now()
        });
    }
});

// Initialize additional analytics when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    if (window.portfolioManager) {
        window.portfolioManager.trackScrollDepth();
        window.portfolioManager.trackTimeOnPage();

        // Add analytics summary to console for development
        setTimeout(() => {
            console.log('[Portfolio Analytics] Session Summary:', window.portfolioManager.getAnalyticsSummary());
        }, 10000);
    }
});

// Performance monitoring
class PerformanceMonitor {
    constructor() {
        this.init();
    }

    init() {
        this.monitorLargestContentfulPaint();
        this.monitorFirstInputDelay();
        this.monitorCumulativeLayoutShift();
        this.monitorResourceLoading();
    }

    // Monitor Largest Contentful Paint (LCP)
    monitorLargestContentfulPaint() {
        new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            const lastEntry = entries[entries.length - 1];
            
            console.log('[Performance] LCP:', Math.round(lastEntry.startTime), 'ms');
            
            // Good: < 2.5s, Needs Improvement: 2.5s - 4s, Poor: > 4s
            const score = lastEntry.startTime < 2500 ? 'good' : 
                         lastEntry.startTime < 4000 ? 'needs-improvement' : 'poor';
            
            window.portfolioAnalytics?.logEvent('lcp', {
                value: Math.round(lastEntry.startTime),
                score: score
            });
        }).observe({ type: 'largest-contentful-paint', buffered: true });
    }

    // Monitor First Input Delay (FID)
    monitorFirstInputDelay() {
        new PerformanceObserver((entryList) => {
            const firstEntry = entryList.getEntries()[0];
            
            console.log('[Performance] FID:', Math.round(firstEntry.processingStart - firstEntry.startTime), 'ms');
            
            const delay = firstEntry.processingStart - firstEntry.startTime;
            const score = delay < 100 ? 'good' : delay < 300 ? 'needs-improvement' : 'poor';
            
            window.portfolioAnalytics?.logEvent('fid', {
                value: Math.round(delay),
                score: score
            });
        }).observe({ type: 'first-input', buffered: true });
    }
/**
 * PerformanceMonitor class provides real-time monitoring of key web performance metrics
 * such as Largest Contentful Paint (LCP), First Input Delay (FID), Cumulative Layout Shift (CLS),
 * and resource loading times. It logs these metrics to the console and optionally sends them
 * to the PortfolioAnalytics instance for further analysis.
 */
class PerformanceMonitor {
    // Monitor Cumulative Layout Shift (CLS)
    monitorCumulativeLayoutShift() {
        let clsValue = 0;
        
        new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
                if (!entry.hadRecentInput) {
                    clsValue += entry.value;
                }
            }
            
            console.log('[Performance] CLS:', clsValue.toFixed(3));
            
            const score = clsValue < 0.1 ? 'good' : clsValue < 0.25 ? 'needs-improvement' : 'poor';
            
            window.portfolioAnalytics?.logEvent('cls', {
                value: parseFloat(clsValue.toFixed(3)),
                score: score
            });
        }).observe({ type: 'layout-shift', buffered: true });
    }

    // Monitor resource loading
    monitorResourceLoading() {
        window.addEventListener('load', () => {
            const resources = performance.getEntriesByType('resource');
            const slowResources = resources.filter(resource => resource.duration > 1000);
            
            if (slowResources.length > 0) {
                console.warn('[Performance] Slow resources detected:', slowResources);
                
                window.portfolioAnalytics?.logEvent('slow_resources', {
                    count: slowResources.length,
                    resources: slowResources.map(r => ({
                        name: r.name,
                        duration: Math.round(r.duration),
                        size: Math.round(r.transferSize / 1024) // KB
                    }))
// Initialize performance monitoring
if ('PerformanceObserver' in window && 'performance' in window) {
    document.addEventListener('DOMContentLoaded', () => {
        new PerformanceMonitor();
    });
}
// Initialize performance monitoring
if ('PerformanceObserver' in window) {
    document.addEventListener('DOMContentLoaded', () => {
        new PerformanceMonitor();
    });
}
