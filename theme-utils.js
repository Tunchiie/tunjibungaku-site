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

        // Update theme icon
        this.updateThemeIcon();
    }

    toggleTheme() {
        const currentTheme = localStorage.getItem('theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }

    updateThemeIcon() {
        const themeIcon = document.querySelector('.theme-icon');
        const currentTheme = localStorage.getItem('theme') || 'light';

        if (themeIcon) {
            themeIcon.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
        }

        // Also handle legacy sun/moon icons if they exist
        const sunIcon = document.querySelector('.theme-toggle-sun');
        const moonIcon = document.querySelector('.theme-toggle-moon');

        if (sunIcon && moonIcon) {
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
            themeToggle.addEventListener('click', () => {
                this.toggleTheme();
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
