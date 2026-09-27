// js/storage.js
/**
 * Centralized LocalStorage Manager for Chennai Pulse
 */

const STORAGE_PREFIX = 'chennaiPulse_';

const StorageAPI = {
    getKeys: function() {
        return {
            theme: `${STORAGE_PREFIX}theme`,
            savedAreas: `${STORAGE_PREFIX}savedAreas`,
            reports: `${STORAGE_PREFIX}reports`,
            habitScore: `${STORAGE_PREFIX}habitScore`,
            preferences: `${STORAGE_PREFIX}preferences`
        };
    },

    save: function(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (e) {
            console.error('Error saving to storage', e);
            return false;
        }
    },

    get: function(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (e) {
            console.error('Error reading from storage', e);
            return defaultValue;
        }
    },

    remove: function(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (e) {
            console.error('Error removing from storage', e);
            return false;
        }
    },

    clearAll: function() {
        const keys = this.getKeys();
        Object.values(keys).forEach(key => this.remove(key));
    },

    // Specific Domain Methods
    getReports: function() {
        return this.get(this.getKeys().reports, []);
    },

    saveReport: function(report) {
        const reports = this.getReports();
        reports.push(report);
        this.save(this.getKeys().reports, reports);
    },
    
    getSavedAreas: function() {
        return this.get(this.getKeys().savedAreas, []);
    },
    
    toggleSavedArea: function(areaId) {
        let areas = this.getSavedAreas();
        const index = areas.indexOf(areaId);
        if (index > -1) {
            areas.splice(index, 1);
        } else {
            areas.push(areaId);
        }
        this.save(this.getKeys().savedAreas, areas);
        return areas;
    }
};

window.cpStorage = StorageAPI;
