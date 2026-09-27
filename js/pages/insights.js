// js/pages/insights.js
/**
 * Insights & Calculator Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Tabs Logic
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active
            btn.classList.add('active');
            const targetId = btn.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
            
            // Optional: Re-trigger animations in content
        });
    });

    // 2. Calculator Logic
    const calcForm = document.getElementById('calc-form');
    const calcResult = document.getElementById('calc-result');
    const scoreDisplay = document.getElementById('score-display');
    const suggestionDisplay = document.getElementById('suggestion-display');
    
    if (calcForm) {
        calcForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get values
            const distance = parseFloat(document.getElementById('c-distance').value) || 0;
            const transport = document.getElementById('c-transport').value; // car, bike, transit, walk
            const trips = parseInt(document.getElementById('c-trips').value) || 0;
            const reusable = document.getElementById('c-reusable').value; // yes, no
            
            // Fictional logic to calculate score (0-100)
            let score = 100;
            
            // Transport penalty
            if (transport === 'car') score -= (distance * 0.5);
            else if (transport === 'bike') score -= (distance * 0.2);
            else if (transport === 'transit') score -= (distance * 0.05);
            // walking has no penalty
            
            // Trips penalty
            score -= (trips * 1);
            
            // Reusable bonus
            if (reusable === 'yes') score += 10;
            else score -= 5;
            
            // Clamp 0-100
            score = Math.max(0, Math.min(100, Math.round(score)));
            
            // Determine suggestion
            let suggestion = "";
            if (score > 80) {
                suggestion = "Excellent! Your daily habits are highly sustainable. Keep it up!";
            } else if (score > 50) {
                suggestion = "Good effort! Try using public transit more often to boost your score.";
            } else {
                suggestion = "There's room for improvement. Consider carpooling or reducing weekly trips.";
            }
            
            // Animate number
            let current = 0;
            scoreDisplay.textContent = 0;
            calcResult.classList.add('show');
            suggestionDisplay.textContent = suggestion;
            
            const interval = setInterval(() => {
                current += 2;
                if (current >= score) {
                    current = score;
                    clearInterval(interval);
                    
                    // Save to local storage when done animating
                    if (window.cpStorage) {
                        const keys = window.cpStorage.getKeys();
                        window.cpStorage.save(keys.habitScore, score);
                        if(window.cpComponents) window.cpComponents.showToast('Habit score saved!', 'success');
                    }
                }
                scoreDisplay.textContent = current;
            }, 30);
            
            // Scroll to result on mobile
            if (window.innerWidth < 992) {
                setTimeout(() => {
                    calcResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 100);
            }
        });
    }
});
