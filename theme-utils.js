// Unified theme management utility
class ThemeManager {
    constructor() {
        this.init();
    }

    init() {
        // Apply saved theme on page load
        this.applySavedTheme();
        
        // Set up theme toggle button
        this.setupThemeToggle();
        
        // Update theme icon
        this.updateThemeIcon();
    }

    applySavedTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        this.setTheme(savedTheme, false); // false = don't save to localStorage again
    }

    setTheme(theme, save = true) {
        if (save) {
            localStorage.setItem('theme', theme);
        }

        // Update document attributes and classes
        document.documentElement.setAttribute('data-theme', theme);

        if (theme === 'dark') {
            document.documentElement.classList.add('dark-theme');
            document.body.classList.add('dark-theme');
        } else {
            document.documentElement.classList.remove('dark-theme');
            document.body.classList.remove('dark-theme');
        }

        // Update theme icon with animation
        this.updateThemeIcon(true);
    }

    toggleTheme() {
        const currentTheme = localStorage.getItem('theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        // Add visual feedback
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.style.transform = 'scale(0.95)';
            setTimeout(() => {
                themeToggle.style.transform = '';
            }, 150);
        }

        this.setTheme(newTheme);
    }

    updateThemeIcon(animate = false) {
        const themeIcon = document.querySelector('.theme-icon');
        const currentTheme = localStorage.getItem('theme') || 'light';

        if (themeIcon) {
            // Add spinning animation if changing themes
            if (animate) {
                themeIcon.classList.add('spinning');

                // Remove animation class after animation completes
                setTimeout(() => {
                    themeIcon.classList.remove('spinning');
                }, 600);
            }

            themeIcon.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
        }

        // Also handle legacy sun/moon icons if they exist
        const sunIcon = document.querySelector('.theme-toggle-sun');
        const moonIcon = document.querySelector('.theme-toggle-moon');

        if (sunIcon && moonIcon) {
            if (animate) {
                const visibleIcon = currentTheme === 'dark' ? sunIcon : moonIcon;
                if (visibleIcon) {
                    visibleIcon.classList.add('spinning');

                    setTimeout(() => {
                        visibleIcon.classList.remove('spinning');
                    }, 600);
                }
            }

            if (currentTheme === 'dark') {
                sunIcon.style.display = 'inline';
                moonIcon.style.display = 'none';
            } else {
                sunIcon.style.display = 'none';
                moonIcon.style.display = 'inline';
            }
        }
    }

    setupThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            // Remove any existing event listeners to prevent duplicates
            themeToggle.replaceWith(themeToggle.cloneNode(true));
            const newThemeToggle = document.getElementById('theme-toggle');

            newThemeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });

            // Add keyboard support
            newThemeToggle.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.toggleTheme();
                }
            });
        }
    }
}

// Initialize theme manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
});

// Also apply theme immediately (before DOM is fully loaded) to prevent flash
(function() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark-theme');
        if (document.body) {
            document.body.classList.add('dark-theme');
        }
    }
})();
