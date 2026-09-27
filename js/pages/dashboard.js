// js/pages/dashboard.js
/**
 * Dashboard Page Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    if (!window.cpData || !window.cpData.cityAreas) return;
    
    const areas = window.cpData.cityAreas;
    
    // Parse URL params
    const urlParams = new URLSearchParams(window.location.search);
    let currentAreaId = urlParams.get('area') || areas[0].id; // Fallback to first
    
    // Populate Select
    const selector = document.getElementById('area-select');
    if (selector) {
        areas.forEach(area => {
            const option = document.createElement('option');
            option.value = area.id;
            option.textContent = area.name;
            if (area.id === currentAreaId) {
                option.selected = true;
            }
            selector.appendChild(option);
        });
        
        selector.addEventListener('change', (e) => {
            // Update URL and reload, or just update data
            window.location.href = `dashboard.html?area=${e.target.value}`;
        });
    }
    
    const area = areas.find(a => a.id === currentAreaId);
    if (!area) return;
    
    // Update DOM
    document.getElementById('db-title').textContent = area.name;
    document.getElementById('db-type').textContent = area.type;
    
    // Render Charts
    setTimeout(() => {
        if (window.cpCharts) {
            window.cpCharts.createCircularProgress(area.score, document.getElementById('score-chart'), 'Green Index');
            
            // Generate some random history data for the bar chart based on score
            const barData = [
                Math.max(10, area.score - 15),
                Math.max(10, area.score - 5),
                area.score + 5,
                area.score - 2,
                area.score + 8,
                area.score
            ];
            window.cpCharts.createBarChart(barData, document.getElementById('activity-chart'));
        }
        
        // Update basic metrics
        document.getElementById('m-mobility').textContent = area.mobility;
        document.getElementById('m-environment').textContent = area.environment;
        document.getElementById('m-community').textContent = area.community;
    }, 100);

    // Save Area Logic
    const saveBtn = document.getElementById('save-area-btn');
    if (saveBtn && window.cpStorage) {
        const savedAreas = window.cpStorage.getSavedAreas();
        if (savedAreas.includes(area.id)) {
            saveBtn.classList.add('saved');
            saveBtn.innerHTML = '★ Area Saved';
        }
        
        saveBtn.addEventListener('click', () => {
            const updated = window.cpStorage.toggleSavedArea(area.id);
            if (updated.includes(area.id)) {
                saveBtn.classList.add('saved');
                saveBtn.innerHTML = '★ Area Saved';
                if(window.cpComponents) window.cpComponents.showToast(`${area.name} saved to My Chennai`, 'success');
            } else {
                saveBtn.classList.remove('saved');
                saveBtn.innerHTML = '☆ Save Area';
                if(window.cpComponents) window.cpComponents.showToast(`${area.name} removed from saved`, 'info');
            }
        });
    }
});
