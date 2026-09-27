// js/pages/profile.js
/**
 * My Chennai / Profile Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    if (!window.cpStorage) return;
    
    // 1. Load Habit Score
    const scoreDisplay = document.getElementById('my-habit-score');
    const scoreVal = window.cpStorage.get(window.cpStorage.getKeys().habitScore, null);
    
    if (scoreVal !== null) {
        scoreDisplay.textContent = scoreVal;
    } else {
        scoreDisplay.innerHTML = '<span style="font-size: 1rem; color: var(--color-text-muted);">No score yet</span>';
    }

    // 2. Load Saved Areas
    const areasContainer = document.getElementById('saved-areas-container');
    const savedAreaIds = window.cpStorage.getSavedAreas();
    
    if (savedAreaIds.length === 0) {
        areasContainer.innerHTML = '<div class="empty-message">No saved areas. Go to the Explorer to save areas.</div>';
    } else {
        areasContainer.innerHTML = '';
        savedAreaIds.forEach(id => {
            if (!window.cpData) return;
            const area = window.cpData.getAreaById(id);
            if (area) {
                const card = document.createElement('div');
                card.className = 'saved-area-card';
                card.innerHTML = `
                    <div>
                        <h4 style="margin-bottom: 0;">${area.name}</h4>
                        <span class="text-sm text-muted">${area.type}</span>
                    </div>
                    <div style="display: flex; gap: 8px; align-items: center;">
                        <a href="dashboard.html?area=${area.id}" class="btn btn-secondary btn-sm" style="padding: 4px 12px;">View</a>
                        <button class="remove-area-btn" data-id="${area.id}" title="Remove">&times;</button>
                    </div>
                `;
                areasContainer.appendChild(card);
            }
        });
        
        // Add remove listeners
        document.querySelectorAll('.remove-area-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                window.cpStorage.toggleSavedArea(id);
                // Reload page to reflect changes
                window.location.reload();
            });
        });
    }

    // 3. Load Reports
    const reportsContainer = document.getElementById('reports-container');
    const reports = window.cpStorage.getReports();
    
    if (reports.length === 0) {
        reportsContainer.innerHTML = '<div class="empty-message">No reports submitted.</div>';
    } else {
        reportsContainer.innerHTML = '';
        // Sort descending
        reports.reverse().forEach(report => {
            const dateStr = new Date(report.date).toLocaleDateString();
            const card = document.createElement('div');
            card.className = 'report-item';
            
            // Generate a simple image thumbnail if exists
            let imgHTML = '';
            if (report.image) {
                imgHTML = `<img src="${report.image}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px; margin-top: 8px;">`;
            }
            
            card.innerHTML = `
                <div class="report-header-row">
                    <span class="report-id">${report.id}</span>
                    <span class="report-status">${report.status}</span>
                </div>
                <h4>${report.type} at ${report.area}</h4>
                <p class="text-sm text-muted">${report.landmark}</p>
                <p class="text-sm" style="margin-top: 8px;">${report.description}</p>
                ${imgHTML}
                <div class="text-xs text-muted" style="margin-top: 8px; text-align: right;">Submitted on ${dateStr}</div>
            `;
            reportsContainer.appendChild(card);
        });
    }

    // 4. Preferences
    const themeSelect = document.getElementById('pref-theme');
    const motionSelect = document.getElementById('pref-motion');
    
    const prefsKey = window.cpStorage.getKeys().preferences;
    const currentPrefs = window.cpStorage.get(prefsKey, { theme: 'dark', motion: 'full' });
    
    if (themeSelect) themeSelect.value = currentPrefs.theme;
    if (motionSelect) motionSelect.value = currentPrefs.motion;
    
    const savePrefs = () => {
        const newPrefs = {
            theme: themeSelect.value,
            motion: motionSelect.value
        };
        window.cpStorage.save(prefsKey, newPrefs);
        
        // Apply instantly
        if (newPrefs.theme === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
        
        if (newPrefs.motion === 'reduced') {
            document.documentElement.setAttribute('data-motion', 'reduced');
            document.querySelector('.custom-cursor')?.remove();
        } else {
            document.documentElement.removeAttribute('data-motion');
        }
        
        if(window.cpComponents) window.cpComponents.showToast('Preferences updated', 'success');
    };
    
    if (themeSelect) themeSelect.addEventListener('change', savePrefs);
    if (motionSelect) motionSelect.addEventListener('change', savePrefs);
    
    // Clear Data Utility
    const clearBtn = document.getElementById('clear-data-btn');
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to clear all simulated data? This cannot be undone.')) {
                window.cpStorage.clearAll();
                window.location.reload();
            }
        });
    }
});
