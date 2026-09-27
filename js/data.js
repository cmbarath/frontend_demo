// js/data.js
/**
 * CHENNAI PULSE
 * Simulated Demo Data
 * Note: These values are illustrative and do not reflect real-world municipal data.
 */

const cityAreas = [
    {
        id: "marina-beach",
        name: "Marina Beach",
        type: "Public Space / Recreation",
        score: 88,
        mobility: 65,
        environment: 82,
        community: 95,
        activity: 85,
        coordinates: { x: 80, y: 35 } // Simulated coordinates for SVG map (0-100%)
    },
    {
        id: "mylapore",
        name: "Mylapore",
        type: "Heritage / Culture",
        score: 84,
        mobility: 70,
        environment: 75,
        community: 92,
        activity: 88,
        coordinates: { x: 75, y: 45 }
    },
    {
        id: "tnagar",
        name: "T. Nagar",
        type: "Commercial Hub",
        score: 76,
        mobility: 55,
        environment: 60,
        community: 85,
        activity: 98,
        coordinates: { x: 65, y: 50 }
    },
    {
        id: "anna-nagar",
        name: "Anna Nagar",
        type: "Residential / Grid",
        score: 90,
        mobility: 85,
        environment: 88,
        community: 82,
        activity: 75,
        coordinates: { x: 50, y: 30 }
    },
    {
        id: "adyar",
        name: "Adyar",
        type: "Residential / Green",
        score: 86,
        mobility: 72,
        environment: 86,
        community: 81,
        activity: 64,
        coordinates: { x: 70, y: 65 }
    },
    {
        id: "guindy",
        name: "Guindy",
        type: "Industrial / Transit",
        score: 72,
        mobility: 88,
        environment: 65,
        community: 60,
        activity: 82,
        coordinates: { x: 60, y: 60 }
    },
    {
        id: "nungambakkam",
        name: "Nungambakkam",
        type: "Commercial / Premium",
        score: 82,
        mobility: 75,
        environment: 70,
        community: 78,
        activity: 90,
        coordinates: { x: 60, y: 40 }
    },
    {
        id: "egmore",
        name: "Egmore",
        type: "Heritage / Transit",
        score: 78,
        mobility: 80,
        environment: 65,
        community: 75,
        activity: 85,
        coordinates: { x: 65, y: 30 }
    },
    {
        id: "velachery",
        name: "Velachery",
        type: "IT Corridor / Residential",
        score: 75,
        mobility: 60,
        environment: 68,
        community: 80,
        activity: 85,
        coordinates: { x: 65, y: 75 }
    },
    {
        id: "perungudi",
        name: "Perungudi",
        type: "Tech Park Zone",
        score: 70,
        mobility: 65,
        environment: 60,
        community: 70,
        activity: 90,
        coordinates: { x: 75, y: 80 }
    },
    {
        id: "thiruvanmiyur",
        name: "Thiruvanmiyur",
        type: "Coastal Residential",
        score: 85,
        mobility: 70,
        environment: 80,
        community: 85,
        activity: 75,
        coordinates: { x: 80, y: 70 }
    },
    {
        id: "saidapet",
        name: "Saidapet",
        type: "Mixed Use / Market",
        score: 74,
        mobility: 78,
        environment: 62,
        community: 88,
        activity: 90,
        coordinates: { x: 65, y: 55 }
    }
];

const dashboardMetrics = {
    citywide: {
        aqi: 65,
        trafficIndex: 7.2,
        greenCover: 18, // percentage
        activeEvents: 14
    }
};

const insightsData = {
    mobility: {
        title: "Urban Mobility Patterns",
        description: "Simulated transit data showing peak flow across major arterial roads like Anna Salai and OMR.",
        stat: "1.2M",
        statLabel: "Demo Daily Commutes"
    },
    environment: {
        title: "Green Cover & Air Quality",
        description: "Illustrative environmental indicators tracking urban canopy and seasonal AQI changes.",
        stat: "18%",
        statLabel: "Simulated Green Cover"
    },
    lifestyle: {
        title: "Community & Culture",
        description: "Demo data representing public gatherings, cultural events, and community engagement.",
        stat: "14",
        statLabel: "Active Demo Events"
    },
    activity: {
        title: "Commercial Pulse",
        description: "Fictional activity heatmap based on simulated retail and commercial zone density.",
        stat: "89/100",
        statLabel: "Activity Index"
    }
};

const issueTypes = [
    "Road / Street",
    "Public Space",
    "Waste",
    "Lighting",
    "Water",
    "Other"
];

// Helper to get area by ID
function getAreaById(id) {
    return cityAreas.find(area => area.id === id);
}

// Export to window if modules aren't strictly enforced
window.cpData = {
    cityAreas,
    dashboardMetrics,
    insightsData,
    issueTypes,
    getAreaById
};
