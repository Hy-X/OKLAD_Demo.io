// JavaScript for OKLAD Dataset Website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initScrollToTop();
    initSmoothScrolling();
    initNavbarScroll();
    initAnimations();
    initDemoFunctions();
});

// Scroll to top functionality
function initScrollToTop() {
    // Create scroll to top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.onclick = function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    document.body.appendChild(scrollToTopBtn);

    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.display = 'flex';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Navbar scroll effect
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 100) {
            navbar.style.background = 'rgba(13, 110, 253, 0.98) !important';
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
        } else {
            navbar.style.background = 'rgba(13, 110, 253, 0.95) !important';
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
    });
}

// Intersection Observer for animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe all cards and sections
    const animatedElements = document.querySelectorAll('.card, .feature-card, .use-case-item');
    animatedElements.forEach(el => observer.observe(el));
}

// Demo functions
function initDemoFunctions() {
    // Add click handlers for demo buttons
    const demoButtons = document.querySelectorAll('[onclick*="loadDemo"], [onclick*="runAnalysis"]');
    demoButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const action = this.getAttribute('onclick');
            if (action.includes('loadDemo')) {
                loadDemo();
            } else if (action.includes('runAnalysis')) {
                runAnalysis();
            }
        });
    });
}

// Load demo function
function loadDemo() {
    const demoPlaceholder = document.querySelector('.demo-placeholder');
    if (demoPlaceholder) {
        // Show loading state
        demoPlaceholder.innerHTML = `
            <div class="loading"></div>
            <p class="mt-3">Loading demo...</p>
        `;
        
        // Simulate loading time
        setTimeout(() => {
            demoPlaceholder.innerHTML = `
                <div class="alert alert-success">
                    <i class="fas fa-check-circle me-2"></i>
                    Demo loaded successfully!
                </div>
                <div class="mt-3">
                    <canvas id="demoChart" width="400" height="200"></canvas>
                </div>
                <div class="mt-3">
                    <button class="btn btn-outline-primary" onclick="resetDemo()">
                        <i class="fas fa-refresh me-2"></i>Reset Demo
                    </button>
                </div>
            `;
            
            // Create a simple chart (you can replace this with Chart.js or other library)
            createDemoChart();
        }, 2000);
    }
}

// Run analysis function
function runAnalysis() {
    const analysisPlaceholder = document.querySelectorAll('.demo-placeholder')[1];
    if (analysisPlaceholder) {
        // Show loading state
        analysisPlaceholder.innerHTML = `
            <div class="loading"></div>
            <p class="mt-3">Running analysis...</p>
        `;
        
        // Simulate analysis time
        setTimeout(() => {
            analysisPlaceholder.innerHTML = `
                <div class="alert alert-info">
                    <i class="fas fa-chart-line me-2"></i>
                    Analysis completed!
                </div>
                <div class="row mt-3">
                    <div class="col-6">
                        <div class="text-center">
                            <h6>Accuracy</h6>
                            <h4 class="text-success">94.2%</h4>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="text-center">
                            <h6>Precision</h6>
                            <h4 class="text-primary">91.8%</h4>
                        </div>
                    </div>
                </div>
                <div class="mt-3">
                    <button class="btn btn-outline-primary" onclick="resetAnalysis()">
                        <i class="fas fa-refresh me-2"></i>Run Again
                    </button>
                </div>
            `;
        }, 3000);
    }
}

// Reset demo function
function resetDemo() {
    const demoPlaceholder = document.querySelector('.demo-placeholder');
    if (demoPlaceholder) {
        demoPlaceholder.innerHTML = `
            <i class="fas fa-chart-bar fa-3x text-muted"></i>
            <p class="mt-3">Interactive charts and visualizations will be displayed here</p>
            <button class="btn btn-outline-primary" onclick="loadDemo()">
                <i class="fas fa-play me-2"></i>Load Demo
            </button>
        `;
    }
}

// Reset analysis function
function resetAnalysis() {
    const analysisPlaceholder = document.querySelectorAll('.demo-placeholder')[1];
    if (analysisPlaceholder) {
        analysisPlaceholder.innerHTML = `
            <i class="fas fa-microchip fa-3x text-muted"></i>
            <p class="mt-3">Machine learning model demonstrations using the dataset</p>
            <button class="btn btn-outline-primary" onclick="runAnalysis()">
                <i class="fas fa-cog me-2"></i>Run Analysis
            </button>
        `;
    }
}

// Create demo chart
function createDemoChart() {
    const canvas = document.getElementById('demoChart');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        
        // Simple bar chart
        const data = [65, 78, 90, 85, 92, 88];
        const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
        
        ctx.fillStyle = '#0d6efd';
        ctx.font = '12px Arial';
        
        data.forEach((value, index) => {
            const barHeight = (value / 100) * 150;
            const x = index * 60 + 20;
            const y = 180 - barHeight;
            
            ctx.fillRect(x, y, 40, barHeight);
            ctx.fillStyle = '#333';
            ctx.fillText(labels[index], x + 10, 195);
            ctx.fillText(value + '%', x + 5, y - 5);
            ctx.fillStyle = '#0d6efd';
        });
    }
}

// Download dataset function
function downloadDataset(format) {
    // Show loading state
    const button = event.target;
    const originalText = button.innerHTML;
    button.innerHTML = '<span class="loading"></span> Downloading...';
    button.disabled = true;
    
    // Simulate download time
    setTimeout(() => {
        let content, filename, contentType;
        
        switch(format) {
            case 'csv':
                content = `event_id,latitude,longitude,magnitude,timestamp,station_id
1,35.4675,-97.5164,2.1,2024-01-15T10:30:00Z,OK001
2,35.5123,-97.4891,1.8,2024-01-15T11:45:00Z,OK002
3,35.4987,-97.5234,2.3,2024-01-15T12:15:00Z,OK003
4,35.4567,-97.5012,1.9,2024-01-15T13:20:00Z,OK001
5,35.5234,-97.4789,2.0,2024-01-15T14:05:00Z,OK002`;
                filename = 'oklad_dataset.csv';
                contentType = 'text/csv';
                break;
                
            case 'hdf5':
                content = `# HDF5 file structure for OKLAD dataset
# This is a placeholder file. Replace with actual HDF5 content.
# 
# File structure:
# /events - Earthquake event data
# /traces - Seismic waveform data  
# /metadata - Dataset metadata
# /stations - Station information
#
# Use h5py or pandas to read this file:
# import h5py
# with h5py.File('oklad_dataset.h5', 'r') as f:
#     events = f['events'][:]
#     traces = f['traces'][:]`;
                filename = 'oklad_dataset.h5';
                contentType = 'application/x-hdf5';
                break;
                
            case 'json':
                content = `{
  "dataset_info": {
    "name": "OKLAD Dataset",
    "version": "1.0",
    "description": "Oklahoma Labeled AI Dataset for Earthquake Research",
    "total_events": 52193,
    "total_traces": 1139808,
    "time_range": "2010-2024"
  },
  "sample_events": [
    {
      "event_id": 1,
      "latitude": 35.4675,
      "longitude": -97.5164,
      "magnitude": 2.1,
      "timestamp": "2024-01-15T10:30:00Z",
      "station_id": "OK001"
    }
  ]
}`;
                filename = 'oklad_dataset.json';
                contentType = 'application/json';
                break;
                
            case 'complete':
                content = `OKLAD Dataset Complete Package
===============================

This package contains:
- oklad_dataset.csv (CSV format)
- oklad_dataset.h5 (HDF5 format)
- oklad_dataset.json (JSON format)
- README.md (Documentation)
- examples/ (Usage examples)

For more information, visit: https://github.com/yourusername/OKLAD_Github_Page`;
                filename = 'oklad_dataset_complete.zip';
                contentType = 'application/zip';
                break;
                
            default:
                content = 'Invalid format specified';
                filename = 'oklad_dataset.txt';
                contentType = 'text/plain';
        }
        
        const blob = new Blob([content], { type: contentType });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        
        // Reset button
        button.innerHTML = originalText;
        button.disabled = false;
        
        // Show success message
        showNotification(`Dataset downloaded successfully in ${format.toUpperCase()} format!`, 'success');
    }, 2000);
}

// Show notification function
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Copy citation to clipboard
function copyCitation(format) {
    let citation = '';
    
    if (format === 'bibtex') {
        citation = `@dataset{oklad_dataset,
  title={OKLAD Dataset: A Comprehensive Dataset for Research},
  author={[Your Name]},
  year={2024},
  url={https://github.com/yourusername/OKLAD_Github_Page},
  note={Version 1.0}
}`;
    } else if (format === 'apa') {
        citation = '[Your Name]. (2024). OKLAD Dataset: A Comprehensive Dataset for Research [Dataset]. GitHub. https://github.com/yourusername/OKLAD_Github_Page';
    }
    
    navigator.clipboard.writeText(citation).then(() => {
        showNotification('Citation copied to clipboard!', 'success');
    }).catch(() => {
        showNotification('Failed to copy citation. Please copy manually.', 'warning');
    });
}

// Add copy buttons to citation sections
document.addEventListener('DOMContentLoaded', function() {
    const citationSections = document.querySelectorAll('pre');
    citationSections.forEach(pre => {
        const copyButton = document.createElement('button');
        copyButton.className = 'btn btn-sm btn-outline-light position-absolute';
        copyButton.style.cssText = 'top: 10px; right: 10px;';
        copyButton.innerHTML = '<i class="fas fa-copy"></i>';
        copyButton.onclick = function() {
            navigator.clipboard.writeText(pre.textContent).then(() => {
                showNotification('Code copied to clipboard!', 'success');
            });
        };
        
        pre.style.position = 'relative';
        pre.appendChild(copyButton);
    });
});

// Page view counter (simple localStorage implementation)
function incrementPageViews() {
    let views = localStorage.getItem('oklad_page_views') || 0;
    views = parseInt(views) + 1;
    localStorage.setItem('oklad_page_views', views);
    
    // Update view counter if it exists
    const viewCounter = document.getElementById('page-views');
    if (viewCounter) {
        viewCounter.textContent = views.toLocaleString();
    }
}

// Initialize page view counter
document.addEventListener('DOMContentLoaded', function() {
    incrementPageViews();
});

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + D to scroll to download section
    if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        document.querySelector('#download').scrollIntoView({ behavior: 'smooth' });
    }
    
    // Ctrl/Cmd + H to scroll to home
    if ((e.ctrlKey || e.metaKey) && e.key === 'h') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

// Add search functionality (if needed)
function initSearch() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search sections...';
    searchInput.className = 'form-control';
    searchInput.style.cssText = 'position: fixed; top: 80px; right: 20px; width: 200px; z-index: 1000;';
    
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const title = section.querySelector('h2')?.textContent.toLowerCase() || '';
            const content = section.textContent.toLowerCase();
            
            if (title.includes(query) || content.includes(query)) {
                section.style.opacity = '1';
            } else {
                section.style.opacity = '0.3';
            }
        });
    });
    
    document.body.appendChild(searchInput);
}

// Initialize search if needed
// initSearch(); // Uncomment to enable search functionality 