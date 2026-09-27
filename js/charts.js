// js/charts.js
/**
 * Custom SVG Chart Generation (Vanilla JS, No libraries)
 */

const Charts = {
    /**
     * Create a simple SVG bar chart
     * @param {Array} data - Array of values (0-100)
     * @param {HTMLElement} container - DOM element to render in
     */
    createBarChart: function(data, container, labels = []) {
        if (!container) return;
        container.innerHTML = '';
        
        const width = container.clientWidth || 300;
        const height = container.clientHeight || 200;
        const padding = 20;
        const chartWidth = width - (padding * 2);
        const chartHeight = height - (padding * 2);
        
        const barWidth = chartWidth / data.length - 10;
        
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '100%');
        svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
        
        data.forEach((val, i) => {
            const barHeight = (val / 100) * chartHeight;
            const x = padding + i * (barWidth + 10);
            const y = height - padding - barHeight;
            
            const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rect.setAttribute('x', x);
            rect.setAttribute('y', height - padding); // Start at bottom for animation
            rect.setAttribute('width', barWidth);
            rect.setAttribute('height', 0); // Start with 0 height
            rect.setAttribute('fill', 'var(--color-primary)');
            rect.setAttribute('rx', '4');
            
            // CSS transition for animation
            rect.style.transition = 'all 1s cubic-bezier(0.19, 1, 0.22, 1)';
            
            svg.appendChild(rect);
            
            // Trigger animation
            setTimeout(() => {
                rect.setAttribute('y', y);
                rect.setAttribute('height', barHeight);
            }, 100 + (i * 100));
        });
        
        container.appendChild(svg);
    },

    /**
     * Create a circular progress indicator
     */
    createCircularProgress: function(value, container, label) {
        if (!container) return;
        container.innerHTML = '';
        
        const size = 120;
        const strokeWidth = 8;
        const radius = (size - strokeWidth) / 2;
        const circumference = radius * 2 * Math.PI;
        
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', size);
        svg.setAttribute('height', size);
        
        // Background circle
        const bgCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        bgCircle.setAttribute('cx', size/2);
        bgCircle.setAttribute('cy', size/2);
        bgCircle.setAttribute('r', radius);
        bgCircle.setAttribute('fill', 'none');
        bgCircle.setAttribute('stroke', 'var(--color-border)');
        bgCircle.setAttribute('stroke-width', strokeWidth);
        
        // Progress circle
        const progCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        progCircle.setAttribute('cx', size/2);
        progCircle.setAttribute('cy', size/2);
        progCircle.setAttribute('r', radius);
        progCircle.setAttribute('fill', 'none');
        progCircle.setAttribute('stroke', 'var(--color-primary)');
        progCircle.setAttribute('stroke-width', strokeWidth);
        progCircle.setAttribute('stroke-linecap', 'round');
        progCircle.setAttribute('stroke-dasharray', circumference);
        progCircle.setAttribute('stroke-dashoffset', circumference);
        progCircle.style.transform = 'rotate(-90deg)';
        progCircle.style.transformOrigin = '50% 50%';
        progCircle.style.transition = 'stroke-dashoffset 1.5s cubic-bezier(0.19, 1, 0.22, 1)';
        
        // Text
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', '50%');
        text.setAttribute('y', '50%');
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('dominant-baseline', 'central');
        text.setAttribute('fill', 'var(--color-text-main)');
        text.setAttribute('font-size', '24');
        text.setAttribute('font-weight', 'bold');
        text.textContent = '0'; // Start at 0
        
        svg.appendChild(bgCircle);
        svg.appendChild(progCircle);
        svg.appendChild(text);
        container.appendChild(svg);
        
        // Animate
        setTimeout(() => {
            const offset = circumference - (value / 100) * circumference;
            progCircle.setAttribute('stroke-dashoffset', offset);
            
            // Animate number
            let current = 0;
            const interval = setInterval(() => {
                current += 2;
                if (current >= value) {
                    current = value;
                    clearInterval(interval);
                }
                text.textContent = current;
            }, 30);
        }, 100);
    }
};

window.cpCharts = Charts;
