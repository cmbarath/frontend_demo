// js/app.js
/**
 * Global Initialization
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Apply Theme from LocalStorage
    const keys = window.cpStorage.getKeys();
    const prefs = window.cpStorage.get(keys.preferences, { theme: 'dark', motion: 'full' });
    
    if (prefs.theme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
    }
    if (prefs.motion === 'reduced') {
        document.documentElement.setAttribute('data-motion', 'reduced');
    }
    
    // 2. Init Components
    if (window.cpComponents) {
        window.cpComponents.initNavbar();
        window.cpComponents.initModal();
    }
    
    // 3. Init Animations
    if (window.cpAnimations) {
        window.cpAnimations.init();
    }
});
