// js/pages/home.js
/**
 * Home Page Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    // Populate featured areas
    const areasGrid = document.querySelector('.areas-grid');
    if (areasGrid && window.cpData && window.cpData.cityAreas) {
        // Just take the first 3 for the home page
        const featuredAreas = window.cpData.cityAreas.slice(0, 3);
        
        featuredAreas.forEach((area, index) => {
            const card = document.createElement('div');
            card.className = `card area-card bg-glass reveal ${index % 2 === 0 ? 'reveal-left' : 'reveal-right'}`;
            
            card.innerHTML = `
                <div class="area-header">
                    <h3>${area.name}</h3>
                    <div class="area-score" title="Area Score">${area.score}</div>
                </div>
                <p>${area.type}</p>
                <a href="pages/dashboard.html?area=${area.id}" class="btn btn-secondary btn-sm" style="margin-top: auto; padding: 0.5rem 1rem;">View Profile</a>
            `;
            
            areasGrid.appendChild(card);
        });
        
        // Re-init observer for new elements
        if (window.cpAnimations) {
            window.cpAnimations.initScrollReveal();
        }
    }
});
