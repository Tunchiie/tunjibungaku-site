// Portfolio Analytics and Performance Tracking
class PortfolioAnalytics {
    constructor() {
        this.sessionStart = Date.now();
        this.pageViews = [];
        this.interactions = [];
        this.performance = {};
        
        this.init();
    }

    init() {
        this.trackPageView();
        this.trackPerformance();
        this.setupInteractionTracking();
        this.trackScrollDepth();
        this.trackTimeOnPage();
    }

    // Track page views
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
            }
        };
        
        this.pageViews.push(pageData);
        this.logEvent('page_view', pageData);
    }

    // Track page performance
    trackPerformance() {
        if ('performance' in window) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    this.performance = {
                        loadTime: Math.round(perfData.loadEventEnd - perfData.fetchStart),
                        domContentLoaded: Math.round(perfData.domContentLoadedEventEnd - perfData.fetchStart),
                        firstPaint: this.getFirstPaint(),
                        pageSize: this.getPageSize()
                    };
                    
                    this.logEvent('performance', this.performance);
                }, 100);
            });
        }
    }

    // Get First Paint timing
    getFirstPaint() {
        const paintEntries = performance.getEntriesByType('paint');
        const firstPaint = paintEntries.find(entry => entry.name === 'first-paint');
        return firstPaint ? Math.round(firstPaint.startTime) : null;
    }

    // Estimate page size
    getPageSize() {
        const resources = performance.getEntriesByType('resource');
        const totalSize = resources.reduce((size, resource) => {
            return size + (resource.transferSize || 0);
        }, 0);
        return Math.round(totalSize / 1024); // KB
    }

    // Setup interaction tracking
    setupInteractionTracking() {
        // Track clicks on important elements
        document.addEventListener('click', (e) => {
            const target = e.target.closest('a, button, .project-card, .skill-tag, .nav-item');
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
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                this.trackInteraction('form_submit', {
                    formId: form.id,
                    timestamp: Date.now()
                });
            });
        });

        // Track downloads
        document.addEventListener('click', (e) => {
            if (e.target.closest('.download-btn')) {
                this.trackInteraction('download', {
                    type: 'resume_pdf',
                    timestamp: Date.now()
                });
            }
        });
    }

    // Track scroll depth
    trackScrollDepth() {
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
    }

    // Track time on page
    trackTimeOnPage() {
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
    }

    // Track specific interactions
    trackInteraction(type, data) {
        const interaction = {
            type,
            data,
            timestamp: Date.now(),
            page: window.location.pathname
        };
        
        this.interactions.push(interaction);
        this.logEvent('interaction', interaction);
    }

    // Log events (can be extended to send to analytics service)
    logEvent(eventType, eventData) {
        // For development - log to console
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            console.log(`[Analytics] ${eventType}:`, eventData);
        }

        // Store in localStorage for review
        const storageKey = 'portfolio_analytics';
        const stored = JSON.parse(localStorage.getItem(storageKey) || '[]');
        stored.push({ type: eventType, data: eventData, timestamp: Date.now() });
        
        // Keep only last 100 events
        if (stored.length > 100) {
            stored.splice(0, stored.length - 100);
        }
        
        localStorage.setItem(storageKey, JSON.stringify(stored));

        // Here you could send to Google Analytics, Mixpanel, etc.
        // Example for Google Analytics:
        // if (typeof gtag !== 'undefined') {
        //     gtag('event', eventType, eventData);
        // }
    }

    // Get analytics summary
    getAnalyticsSummary() {
        return {
            session: {
                duration: Date.now() - this.sessionStart,
                pageViews: this.pageViews.length,
                interactions: this.interactions.length
            },
            performance: this.performance,
            topInteractions: this.getTopInteractions(),
            deviceInfo: this.getDeviceInfo()
        };
    }

    // Get top interactions
    getTopInteractions() {
        const counts = {};
        this.interactions.forEach(interaction => {
            const key = interaction.type;
            counts[key] = (counts[key] || 0) + 1;
        });
        
        return Object.entries(counts)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 5);
    }

    // Get device information
    getDeviceInfo() {
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
    }
}

// Initialize analytics when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.portfolioAnalytics = new PortfolioAnalytics();
    
    // Add analytics summary to console for development
    setTimeout(() => {
        console.log('[Portfolio Analytics] Session Summary:', window.portfolioAnalytics.getAnalyticsSummary());
    }, 10000);
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
                });
            }
        });
    }
}

// Initialize performance monitoring
if ('PerformanceObserver' in window) {
    document.addEventListener('DOMContentLoaded', () => {
        new PerformanceMonitor();
    });
}
