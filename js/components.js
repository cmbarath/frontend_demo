// js/components.js
/**
 * Reusable Components and Layout logic
 */

const Components = {
    initNavbar: function() {
        const navbar = document.querySelector('.navbar');
        const menuToggle = document.querySelector('.menu-toggle');
        const navLinks = document.querySelector('.nav-links');

        // Scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Mobile menu toggle
        if (menuToggle && navLinks) {
            menuToggle.addEventListener('click', () => {
                menuToggle.classList.toggle('active');
                navLinks.classList.toggle('active');
            });
        }
        
        // Active state
        const currentPath = window.location.pathname;
        const links = document.querySelectorAll('.nav-link');
        links.forEach(link => {
            const href = link.getAttribute('href');
            // Basic matching logic
            if (currentPath.includes(href) && href !== '/' && href !== 'index.html' && href !== '../index.html') {
                link.classList.add('active');
            } else if ((currentPath === '/' || currentPath.endsWith('index.html')) && (href === '/' || href === 'index.html' || href === '../index.html')) {
                link.classList.add('active');
            }
        });
    },

    showToast: function(message, type = 'info') {
        let container = document.querySelector('.toast-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'toast-container';
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        toast.className = 'toast';
        // Add color based on type if needed
        if (type === 'success') {
            toast.style.borderLeftColor = 'var(--color-primary)';
        } else if (type === 'error') {
            toast.style.borderLeftColor = 'var(--color-accent)';
        }
        
        toast.innerHTML = `<p>${message}</p>`;
        container.appendChild(toast);

        // Animate in
        setTimeout(() => toast.classList.add('show'), 10);

        // Remove after 3s
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 400);
        }, 3000);
    },

    initModal: function() {
        const overlays = document.querySelectorAll('.modal-overlay');
        overlays.forEach(overlay => {
            const closeBtn = overlay.querySelector('.modal-close');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    overlay.classList.remove('active');
                });
            }
            
            // Close on outside click
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    overlay.classList.remove('active');
                }
            });
        });
    },
    
    openModal: function(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
        }
    }
};

window.cpComponents = Components;
