// js/animations.js
/**
 * Animation Utilities
 */

const Animations = {
    init: function() {
        this.initCustomCursor();
        this.initScrollReveal();
        this.initNumberCounters();
        this.initMagneticButtons();
        
        // Remove page loader
        const loader = document.querySelector('.page-loader');
        if (loader) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    loader.style.opacity = '0';
                    setTimeout(() => loader.remove(), 500);
                }, 500);
            });
        }
    },
    
    prefersReducedMotion: function() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches || 
               document.documentElement.getAttribute('data-motion') === 'reduced';
    },

    initCustomCursor: function() {
        if (this.prefersReducedMotion() || window.innerWidth < 992) return;
        
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);
        
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let cursorX = mouseX;
        let cursorY = mouseY;
        
        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        // Smooth follow
        const render = () => {
            cursorX += (mouseX - cursorX) * 0.2;
            cursorY += (mouseY - cursorY) * 0.2;
            cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
            requestAnimationFrame(render);
        };
        requestAnimationFrame(render);
        
        // Hover effects
        const interactiveElements = document.querySelectorAll('a, button, .interactive');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });
    },

    initScrollReveal: function() {
        if (this.prefersReducedMotion()) {
            document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
                el.classList.add('active');
                el.style.transition = 'none';
            });
            return;
        }
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    // Optional: observer.unobserve(entry.target); // If only once
                }
            });
        }, { threshold: 0.1 });
        
        document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
            observer.observe(el);
        });
    },

    initNumberCounters: function() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    const el = entry.target;
                    const target = parseFloat(el.getAttribute('data-count')) || 0;
                    const duration = 2000;
                    const stepTime = 20;
                    const steps = duration / stepTime;
                    const increment = target / steps;
                    let current = 0;
                    
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            current = target;
                            clearInterval(timer);
                            el.classList.add('counted');
                        }
                        // Format based on decimal
                        el.textContent = target % 1 === 0 ? Math.floor(current) : current.toFixed(1);
                    }, stepTime);
                }
            });
        }, { threshold: 0.5 });
        
        document.querySelectorAll('.counter').forEach(el => observer.observe(el));
    },

    initMagneticButtons: function() {
        if (this.prefersReducedMotion()) return;
        
        const buttons = document.querySelectorAll('.btn.magnetic');
        buttons.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
            });
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = `translate(0px, 0px)`;
            });
        });
    }
};

window.cpAnimations = Animations;
