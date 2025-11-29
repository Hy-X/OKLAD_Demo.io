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

// Data Visualization Functions
function updateDataVisualization() {
    const featureSelect = document.getElementById('featureSelect');
    const timeRangeSelect = document.getElementById('timeRangeSelect');
    const magnitudeSelect = document.getElementById('magnitudeSelect');
    const canvas = document.getElementById('dataVisualization');
    
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Simulate data based on selections
    const feature = featureSelect.value;
    const timeRange = timeRangeSelect.value;
    const magnitude = magnitudeSelect.value;
    
    // Draw visualization based on selections
    drawDataVisualization(ctx, feature, timeRange, magnitude);
}

function drawDataVisualization(ctx, feature, timeRange, magnitude) {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    
    // Set up gradient background
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#667eea');
    gradient.addColorStop(1, '#764ba2');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // Draw chart based on feature type
    switch(feature) {
        case 'magnitude':
            drawMagnitudeDistribution(ctx, width, height);
            break;
        case 'depth':
            drawDepthDistribution(ctx, width, height);
            break;
        case 'time':
            drawTemporalDistribution(ctx, width, height);
            break;
        case 'location':
            drawSpatialDistribution(ctx, width, height);
            break;
    }
}

function drawMagnitudeDistribution(ctx, width, height) {
    // Simulate magnitude distribution data
    const magnitudes = [1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0];
    const counts = [15000, 12000, 8000, 5000, 3000, 1500, 800, 400];
    
    const maxCount = Math.max(...counts);
    const barWidth = width / magnitudes.length * 0.8;
    const barSpacing = width / magnitudes.length * 0.2;
    
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    
    magnitudes.forEach((mag, i) => {
        const x = (width / magnitudes.length) * i + barSpacing / 2;
        const barHeight = (counts[i] / maxCount) * (height * 0.7);
        const y = height - barHeight - 50;
        
        // Draw bar
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.fillRect(x, y, barWidth, barHeight);
        
        // Draw border
        ctx.strokeStyle = 'rgba(255, 255, 255, 1)';
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, barWidth, barHeight);
        
        // Draw labels
        ctx.fillStyle = 'white';
        ctx.fillText(mag.toString(), x + barWidth / 2, height - 20);
        ctx.fillText(counts[i].toLocaleString(), x + barWidth / 2, y - 10);
    });
    
    // Draw title
    ctx.fillStyle = 'white';
    ctx.font = 'bold 18px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Magnitude Distribution', width / 2, 30);
}

function drawDepthDistribution(ctx, width, height) {
    // Simulate depth distribution
    const depths = [0, 5, 10, 15, 20, 25, 30];
    const counts = [8000, 12000, 15000, 10000, 6000, 3000, 1000];
    
    const maxCount = Math.max(...counts);
    const barWidth = width / depths.length * 0.8;
    const barSpacing = width / depths.length * 0.2;
    
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    
    depths.forEach((depth, i) => {
        const x = (width / depths.length) * i + barSpacing / 2;
        const barHeight = (counts[i] / maxCount) * (height * 0.7);
        const y = height - barHeight - 50;
        
        // Draw bar
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.fillRect(x, y, barWidth, barHeight);
        
        // Draw border
        ctx.strokeStyle = 'rgba(255, 255, 255, 1)';
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, barWidth, barHeight);
        
        // Draw labels
        ctx.fillStyle = 'white';
        ctx.fillText(depth + 'km', x + barWidth / 2, height - 20);
        ctx.fillText(counts[i].toLocaleString(), x + barWidth / 2, y - 10);
    });
    
    // Draw title
    ctx.fillStyle = 'white';
    ctx.font = 'bold 18px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Depth Distribution', width / 2, 30);
}

function drawTemporalDistribution(ctx, width, height) {
    // Simulate temporal distribution
    const years = [2010, 2012, 2014, 2016, 2018, 2020, 2022, 2024];
    const counts = [2000, 3000, 5000, 8000, 12000, 15000, 18000, 20000];
    
    const maxCount = Math.max(...counts);
    const pointSpacing = width / (years.length - 1);
    
    ctx.strokeStyle = 'rgba(255, 255, 255, 1)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    years.forEach((year, i) => {
        const x = (width / (years.length - 1)) * i;
        const y = height - 50 - (counts[i] / maxCount) * (height * 0.7);
        
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
        
        // Draw point
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, 2 * Math.PI);
        ctx.fill();
        
        // Draw labels
        ctx.fillStyle = 'white';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(year.toString(), x, height - 20);
        ctx.fillText(counts[i].toLocaleString(), x, y - 15);
    });
    
    ctx.stroke();
    
    // Draw title
    ctx.fillStyle = 'white';
    ctx.font = 'bold 18px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Temporal Distribution', width / 2, 30);
}

function drawSpatialDistribution(ctx, width, height) {
    // Simulate spatial distribution (heat map style)
    const gridSize = 20;
    const cols = Math.floor(width / gridSize);
    const rows = Math.floor(height / gridSize);
    
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            const intensity = Math.random() * 0.8 + 0.2;
            const x = i * gridSize;
            const y = j * gridSize;
            
            ctx.fillStyle = `rgba(255, 255, 255, ${intensity})`;
            ctx.fillRect(x, y, gridSize, gridSize);
        }
    }
    
    // Draw title
    ctx.fillStyle = 'white';
    ctx.font = 'bold 18px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Spatial Distribution', width / 2, 30);
}

// Waveform Visualization
function drawWaveform() {
    const canvas = document.getElementById('waveformCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw background
    ctx.fillStyle = '#f8f9fa';
    ctx.fillRect(0, 0, width, height);
    
    // Draw grid
    ctx.strokeStyle = '#e9ecef';
    ctx.lineWidth = 1;
    
    // Vertical grid lines
    for (let i = 0; i <= width; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, height);
        ctx.stroke();
    }
    
    // Horizontal grid lines
    for (let i = 0; i <= height; i += 20) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(width, i);
        ctx.stroke();
    }
    
    // Draw waveform
    ctx.strokeStyle = '#0d6efd';
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    // Simulate seismic waveform
    for (let x = 0; x < width; x++) {
        const time = x / width * 120; // 120 seconds
        const amplitude = Math.sin(time * 0.5) * 0.3 + 
                         Math.sin(time * 2) * 0.2 + 
                         Math.sin(time * 8) * 0.1 +
                         Math.random() * 0.1;
        
        const y = height / 2 + amplitude * height / 2;
        
        if (x === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    
    ctx.stroke();
    
    // Draw axis labels
    ctx.fillStyle = '#6c757d';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Time (seconds)', width / 2, height - 5);
    
    ctx.save();
    ctx.translate(10, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Amplitude', 0, 0);
    ctx.restore();
}

// Tutorial Functions
function initializeTutorials() {
    // Add click handlers for tutorial cards
    const tutorialCards = document.querySelectorAll('.tutorial-card');
    tutorialCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.closest('.btn')) {
                // Navigate to tutorial (placeholder)
                console.log('Navigate to tutorial:', this.querySelector('h5').textContent);
            }
        });
    });
    
    // Add hover effects for tutorial category cards
    const categoryCards = document.querySelectorAll('.tutorial-category-card');
    categoryCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Enhanced Download Functions
function enhanceDownloadSection() {
    const downloadSection = document.querySelector('#download');
    if (!downloadSection) return;
    
    // Add download progress tracking
    const downloadButtons = downloadSection.querySelectorAll('.btn-download');
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const downloadType = this.dataset.type;
            const fileSize = this.dataset.size;
            
            // Show download progress
            showDownloadProgress(downloadType, fileSize);
        });
    });
}

function showDownloadProgress(type, size) {
    // Create progress modal
    const modal = document.createElement('div');
    modal.className = 'download-progress-modal';
    modal.innerHTML = `
        <div class="download-progress-content">
            <h4>Downloading ${type}</h4>
            <div class="progress">
                <div class="progress-bar" role="progressbar" style="width: 0%"></div>
            </div>
            <p class="mt-2">Preparing download...</p>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Simulate download progress
    let progress = 0;
    const progressBar = modal.querySelector('.progress-bar');
    const progressText = modal.querySelector('p');
    
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            progressText.textContent = 'Download complete!';
            
            setTimeout(() => {
                document.body.removeChild(modal);
            }, 1000);
        }
        
        progressBar.style.width = progress + '%';
        progressText.textContent = `Downloading... ${Math.round(progress)}%`;
    }, 200);
}

// Initialize all new functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize existing functionality
    incrementPageViews();
    initSmoothScrolling();
    initAnimations();
    
    // Initialize new functionality
    initializeTutorials();
    enhanceDownloadSection();
    
    // Draw initial visualizations
    drawWaveform();
    updateDataVisualization();
    
    // Add event listeners for interactive elements
    const featureSelect = document.getElementById('featureSelect');
    const timeRangeSelect = document.getElementById('timeRangeSelect');
    const magnitudeSelect = document.getElementById('magnitudeSelect');
    
    if (featureSelect) featureSelect.addEventListener('change', updateDataVisualization);
    if (timeRangeSelect) timeRangeSelect.addEventListener('change', updateDataVisualization);
    if (magnitudeSelect) magnitudeSelect.addEventListener('change', updateDataVisualization);
});

// Add CSS for download progress modal
const style = document.createElement('style');
style.textContent = `
    .download-progress-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
    }
    
    .download-progress-content {
        background: white;
        padding: 2rem;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        text-align: center;
        min-width: 300px;
    }
    
    .download-progress-content h4 {
        margin-bottom: 1rem;
        color: var(--primary-color);
    }
    
    .progress {
        height: 20px;
        border-radius: 10px;
        background: #e9ecef;
        overflow: hidden;
    }
    
    .progress-bar {
        height: 100%;
        background: var(--gradient-primary);
        transition: width 0.3s ease;
    }
`;
document.head.appendChild(style); 