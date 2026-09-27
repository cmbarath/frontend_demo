// js/pages/report.js
/**
 * Report Issue Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Populate Areas
    const areaSelect = document.getElementById('r-area');
    if (areaSelect && window.cpData && window.cpData.cityAreas) {
        window.cpData.cityAreas.forEach(area => {
            const opt = document.createElement('option');
            opt.value = area.id;
            opt.textContent = area.name;
            areaSelect.appendChild(opt);
        });
    }
    
    // 2. Populate Issue Types
    const typeSelect = document.getElementById('r-type');
    if (typeSelect && window.cpData && window.cpData.issueTypes) {
        window.cpData.issueTypes.forEach(type => {
            const opt = document.createElement('option');
            opt.value = type;
            opt.textContent = type;
            typeSelect.appendChild(opt);
        });
    }

    // 3. Image Preview Logic
    const fileInput = document.getElementById('r-image');
    const imagePreview = document.getElementById('image-preview');
    const uploadText = document.getElementById('upload-text');
    let base64Image = null;

    if (fileInput) {
        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                // Fictional limit
                if (file.size > 5 * 1024 * 1024) {
                    if(window.cpComponents) window.cpComponents.showToast('Image too large. Max 5MB.', 'error');
                    fileInput.value = '';
                    return;
                }
                
                const reader = new FileReader();
                reader.onload = function(event) {
                    base64Image = event.target.result;
                    imagePreview.src = base64Image;
                    imagePreview.style.display = 'block';
                    uploadText.textContent = 'Image attached. Click to change.';
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // 4. Form Submission
    const reportForm = document.getElementById('report-form');
    if (reportForm) {
        reportForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Basic validation is handled by HTML5, but we can do extra here
            
            // Generate ID
            const timestamp = new Date().getTime().toString().slice(-4);
            const reportId = `CP-2026-${timestamp}`;
            
            const newReport = {
                id: reportId,
                type: document.getElementById('r-type').value,
                area: document.getElementById('r-area').value,
                landmark: document.getElementById('r-landmark').value,
                description: document.getElementById('r-desc').value,
                priority: document.getElementById('r-priority').value,
                image: base64Image, // Store base64 (Note: LocalStorage has ~5MB limit, could fail if large, handled gracefully in real apps)
                date: new Date().toISOString(),
                status: 'SUBMITTED' // simulated status
            };
            
            // Save
            if (window.cpStorage) {
                try {
                    window.cpStorage.saveReport(newReport);
                    
                    // Show success modal
                    document.getElementById('modal-report-id').textContent = reportId;
                    if(window.cpComponents) window.cpComponents.openModal('success-modal');
                    
                    // Reset form
                    reportForm.reset();
                    imagePreview.style.display = 'none';
                    uploadText.textContent = 'Click or drag image to upload';
                    base64Image = null;
                } catch(err) {
                    if(window.cpComponents) window.cpComponents.showToast('Error saving report. Image might be too large.', 'error');
                }
            }
        });
    }
});
