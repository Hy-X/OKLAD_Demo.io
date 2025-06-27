# OKLAD Dataset - GitHub Pages Website

A modern, responsive GitHub Pages website for showcasing your dataset with comprehensive documentation, demonstrations, and download capabilities.

## 🌟 Features

- **Modern Design**: Clean, professional interface with smooth animations
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile devices
- **Interactive Elements**: Demo sections with loading animations and interactive charts
- **Comprehensive Sections**: 
  - Dataset description and statistics
  - Compilation methodology
  - Usage instructions with code examples
  - Interactive demonstrations
  - Citation guidelines
  - Download options
- **SEO Optimized**: Meta tags and structured content for better search visibility
- **Accessibility**: Keyboard navigation and screen reader friendly
- **Page View Counter**: Track website visits (localStorage based)

## 📁 File Structure

```
OKLAD_Github_Page/
├── index.html          # Main website file
├── styles.css          # Custom CSS styles
├── script.js           # JavaScript functionality
├── README.md           # This file
└── .gitignore          # Git ignore file
```

## 🚀 Quick Start

1. **Clone or Download**: Get the files to your local machine
2. **Customize Content**: Update the dataset information in `index.html`
3. **Deploy**: Push to GitHub and enable GitHub Pages

### Local Development

To test the website locally:

```bash
# Using Python (if installed)
python -m http.server 8000

# Using Node.js (if installed)
npx serve .

# Using PHP (if installed)
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## 🎨 Customization Guide

### 1. Update Dataset Information

Edit `index.html` to replace placeholder content with your actual dataset information:

#### Basic Information
- Dataset name and description
- Statistics and metrics
- File sizes and formats

#### Content Sections
- **Data Description**: Update the overview, structure, and statistics
- **Compilation Method**: Describe your data collection and preprocessing steps
- **Usage Instructions**: Provide specific code examples for your dataset
- **Demonstrations**: Add real visualizations and analysis examples
- **Citation**: Update with your name and correct URLs

### 2. Customize Styling

Edit `styles.css` to match your brand:

```css
:root {
    --primary-color: #your-color;      /* Main brand color */
    --gradient-primary: linear-gradient(135deg, #color1 0%, #color2 100%);
    --border-radius: 10px;             /* Corner roundness */
}
```

### 3. Add Real Dataset Files

Replace the placeholder download functionality in `script.js`:

```javascript
function downloadDataset(format) {
    // Replace with actual file download logic
    const fileUrls = {
        'csv': 'https://your-domain.com/dataset.csv',
        'json': 'https://your-domain.com/dataset.json',
        'complete': 'https://your-domain.com/dataset.zip'
    };
    
    window.open(fileUrls[format], '_blank');
}
```

### 4. Add Real Demonstrations

Replace the demo placeholders with actual visualizations:

```javascript
function loadDemo() {
    // Add Chart.js or D3.js visualizations
    // Example with Chart.js:
    const ctx = document.getElementById('demoChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Your', 'Actual', 'Data', 'Labels'],
            datasets: [{
                label: 'Your Dataset',
                data: [12, 19, 3, 5],
                backgroundColor: 'rgba(13, 110, 253, 0.8)'
            }]
        }
    });
}
```

## 📊 Adding Page Analytics

### Google Analytics
Add to the `<head>` section of `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### GitHub Pages Analytics
Enable in your repository settings under Pages > Analytics.

## 🔧 Advanced Customization

### Adding New Sections

1. Add navigation link in the navbar
2. Create new section with unique ID
3. Add corresponding CSS styles
4. Update JavaScript if needed

### Custom JavaScript Functions

Add new interactive features in `script.js`:

```javascript
// Example: Add a data preview function
function previewData() {
    const previewModal = document.createElement('div');
    previewModal.className = 'modal fade';
    previewModal.innerHTML = `
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Dataset Preview</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <!-- Add your data preview content -->
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(previewModal);
    new bootstrap.Modal(previewModal).show();
}
```

### Adding External Libraries

For advanced visualizations, add libraries to `index.html`:

```html
<!-- Chart.js for charts -->
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<!-- D3.js for advanced visualizations -->
<script src="https://d3js.org/d3.v7.min.js"></script>

<!-- Plotly for interactive plots -->
<script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
```

## 📱 Mobile Optimization

The website is already mobile-responsive, but you can further customize:

```css
/* Custom mobile styles */
@media (max-width: 576px) {
    .hero-section .display-4 {
        font-size: 1.8rem;
    }
    
    .feature-card {
        margin-bottom: 1rem;
    }
}
```

## 🚀 Deployment

### GitHub Pages

1. Push your code to a GitHub repository
2. Go to Settings > Pages
3. Select source branch (usually `main` or `master`)
4. Your site will be available at `https://username.github.io/repository-name`

### Custom Domain

1. Add a `CNAME` file to your repository with your domain
2. Configure DNS settings with your domain provider
3. Update GitHub Pages settings with your custom domain

## 📈 Performance Optimization

### Image Optimization
- Use WebP format for images
- Compress images before uploading
- Use lazy loading for large images

### Code Optimization
- Minify CSS and JavaScript for production
- Use CDN links for external libraries
- Enable gzip compression on your server

## 🔍 SEO Best Practices

1. **Meta Tags**: Already included in the HTML
2. **Structured Data**: Add JSON-LD schema for datasets
3. **Sitemap**: Create a sitemap.xml file
4. **Robots.txt**: Add robots.txt file

Example structured data:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Dataset",
  "name": "OKLAD Dataset",
  "description": "A comprehensive dataset for research",
  "url": "https://your-domain.com",
  "creator": {
    "@type": "Person",
    "name": "Your Name"
  },
  "license": "https://creativecommons.org/licenses/by/4.0/",
  "distribution": [
    {
      "@type": "DataDownload",
      "encodingFormat": "CSV",
      "contentUrl": "https://your-domain.com/dataset.csv"
    }
  ]
}
</script>
```

## 🐛 Troubleshooting

### Common Issues

1. **Images not loading**: Check file paths and ensure images are in the repository
2. **JavaScript errors**: Check browser console for errors
3. **Styling issues**: Clear browser cache and check CSS syntax
4. **Mobile display problems**: Test on different devices and screen sizes

### Browser Compatibility

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Full support

## 📄 License

This template is provided under the MIT License. Feel free to modify and use for your projects.

## 🤝 Contributing

If you find bugs or have suggestions for improvements:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For questions or support:
- Create an issue in the repository
- Check the documentation above
- Review the code comments for guidance

---

**Happy coding! 🎉**

*This website template is designed to make your dataset accessible and professional. Customize it to match your specific needs and branding.* 