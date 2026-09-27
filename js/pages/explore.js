// js/pages/explore.js
/**
 * Explore Page Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    const mapContainer = document.getElementById('map-container');
    const searchInput = document.getElementById('area-search');
    const detailPanel = document.getElementById('detail-panel');
    const emptyState = document.getElementById('empty-state');
    
    // Panel Elements
    const pTitle = document.getElementById('p-title');
    const pType = document.getElementById('p-type');
    const pScore = document.getElementById('p-score');
    const pMobility = document.getElementById('p-mobility');
    const pActivity = document.getElementById('p-activity');
    const pCommunity = document.getElementById('p-community');
    const pBtn = document.getElementById('p-btn');
    
    let markers = [];

    if (!window.cpData || !window.cpData.cityAreas) return;
    
    const areas = window.cpData.cityAreas;

    // 1. Render Markers
    function renderMarkers() {
        if (!mapContainer) return;
        mapContainer.innerHTML = '<div class="map-disclaimer">Illustrative city map — not to scale.</div>';
        
        areas.forEach(area => {
            const marker = document.createElement('div');
            marker.className = 'map-marker';
            marker.style.left = `${area.coordinates.x}%`;
            marker.style.top = `${area.coordinates.y}%`;
            marker.setAttribute('data-id', area.id);
            
            const label = document.createElement('div');
            label.className = 'marker-label';
            label.textContent = area.name;
            marker.appendChild(label);
            
            // Add click event
            marker.addEventListener('click', () => {
                selectArea(area.id);
            });
            
            mapContainer.appendChild(marker);
            markers.push({ element: marker, data: area });
        });
    }

    // 2. Select Area Logic
    function selectArea(id) {
        // Update markers
        markers.forEach(m => {
            if (m.data.id === id) {
                m.element.classList.add('active');
            } else {
                m.element.classList.remove('active');
            }
        });
        
        const area = areas.find(a => a.id === id);
        if (!area) return;
        
        // Update panel
        emptyState.style.display = 'none';
        detailPanel.classList.remove('active');
        
        setTimeout(() => {
            pTitle.textContent = area.name;
            pType.textContent = area.type;
            
            // Animate counters if possible
            pScore.textContent = area.score;
            pMobility.textContent = area.mobility;
            pActivity.textContent = area.activity;
            pCommunity.textContent = area.community;
            
            pBtn.href = `dashboard.html?area=${area.id}`;
            
            detailPanel.classList.add('active');
        }, 50);
        
        // On mobile, scroll to panel
        if (window.innerWidth < 992) {
            document.querySelector('.explore-sidebar').scrollIntoView({ behavior: 'smooth' });
        }
    }

    // 3. Search Logic
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            
            markers.forEach(m => {
                const match = m.data.name.toLowerCase().includes(query);
                m.element.style.display = match ? 'block' : 'none';
                
                // Optional: auto select if exact match or 1 result left
            });
        });
    }

    // Initialize
    renderMarkers();
});
