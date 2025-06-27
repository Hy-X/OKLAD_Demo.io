# Logo Placement Guide

This directory contains all the logos used in the OKLAD Dataset website. Please follow the guidelines below for optimal display and performance.

## Directory Structure

```
assets/logos/
├── README.md                    # This file
├── institution-logo.png         # Main institution logo (color version)
├── institution-logo-white.png   # Institution logo (white version for dark backgrounds)
├── dataset-logo.png            # OKLAD dataset specific logo/brand
├── partner-logo-1.png          # Partner/collaborator logo 1
├── partner-logo-2.png          # Partner/collaborator logo 2
├── partner-logo-3.png          # Partner/collaborator logo 3
└── sponsor-logo-1.png          # Sponsor logo (if applicable)
```

## Logo Specifications

### Institution Logo
- **File**: `institution-logo.png`
- **Format**: PNG with transparent background
- **Recommended size**: 200x80px (minimum 100x40px)
- **Usage**: Navbar, footer, institutional affiliations section
- **Color version**: Use for light backgrounds
- **White version**: Use for dark backgrounds (automatically applied via CSS)

### Dataset Logo
- **File**: `dataset-logo.png`
- **Format**: PNG with transparent background
- **Recommended size**: 300x120px (minimum 200x80px)
- **Usage**: Hero section, main branding
- **Notes**: Should be visually distinct from institution logo

### Partner/Sponsor Logos
- **File**: `partner-logo-1.png`, `partner-logo-2.png`, etc.
- **Format**: PNG with transparent background
- **Recommended size**: 200x100px (minimum 150x75px)
- **Usage**: Institutional affiliations section
- **Notes**: Will be displayed in grayscale by default, color on hover

## Logo Placement Locations

### 1. Navigation Bar
- **Logo**: `institution-logo.png`
- **Location**: Left side of navbar
- **Size**: 40px height (responsive)
- **Effect**: White filter applied automatically

### 2. Hero Section
- **Logo**: `dataset-logo.png`
- **Location**: Above the main title
- **Size**: 80px max height (responsive)
- **Effect**: Drop shadow and hover animation

### 3. Institutional Affiliations Section
- **Logo**: `institution-logo.png`
- **Location**: Compilation method section
- **Size**: 50px height
- **Effect**: Standard display with institution name

### 4. Partner/Sponsor Section
- **Logos**: `partner-logo-*.png`
- **Location**: Institutional affiliations section
- **Size**: 60px height (responsive)
- **Effect**: Grayscale by default, color on hover

### 5. Footer
- **Logo**: `institution-logo-white.png`
- **Location**: Left side of footer
- **Size**: 30px height
- **Effect**: White version for dark background

## Image Format Guidelines

### PNG Format (Recommended)
- **Pros**: Supports transparency, lossless compression
- **Best for**: Logos with transparent backgrounds
- **File size**: Usually larger than JPG

### SVG Format (Alternative)
- **Pros**: Scalable, small file size, perfect for logos
- **Best for**: Simple logos, icons
- **Browser support**: Excellent

### JPG Format (Not Recommended for Logos)
- **Pros**: Small file size
- **Cons**: No transparency support, lossy compression
- **Avoid for**: Logos with transparent backgrounds

## Optimization Tips

### File Size Optimization
1. **Use PNG-8** for logos with limited colors
2. **Use PNG-24** for logos with gradients or many colors
3. **Compress images** using tools like TinyPNG or ImageOptim
4. **Target file size**: Under 50KB for most logos

### Quality Guidelines
1. **High resolution**: Start with 2x the display size
2. **Sharp edges**: Ensure crisp lines and text
3. **Transparent background**: Remove white/colored backgrounds
4. **Consistent branding**: Match your institution's style guide

## Responsive Design

The website automatically handles logo scaling for different screen sizes:

- **Desktop**: Full size logos
- **Tablet**: Slightly reduced sizes
- **Mobile**: Significantly reduced sizes
- **Print**: Logos hidden for clean printing

## Adding New Logos

1. **Place the logo file** in this directory
2. **Update the HTML** to reference the new logo
3. **Test responsiveness** on different screen sizes
4. **Optimize file size** if needed

## Example Logo Implementation

```html
<!-- Institution logo in navbar -->
<img src="assets/logos/institution-logo.png" alt="Institution Logo" class="institution-logo">

<!-- Dataset logo in hero section -->
<img src="assets/logos/dataset-logo.png" alt="OKLAD Dataset Logo" class="dataset-logo">

<!-- Partner logos -->
<div class="partner-logos">
    <img src="assets/logos/partner-logo-1.png" alt="Partner 1" class="partner-logo">
    <img src="assets/logos/partner-logo-2.png" alt="Partner 2" class="partner-logo">
</div>
```

## Troubleshooting

### Logo Not Displaying
1. Check file path is correct
2. Verify file exists in the assets/logos directory
3. Check file permissions
4. Ensure file format is supported

### Logo Too Large/Small
1. Adjust the CSS height/width properties
2. Check responsive breakpoints
3. Verify original image dimensions

### Logo Looks Blurry
1. Use higher resolution source image
2. Ensure PNG format for crisp edges
3. Check if image is being scaled up

### White Filter Issues
1. For dark backgrounds, use `institution-logo-white.png`
2. For light backgrounds, use `institution-logo.png`
3. CSS automatically applies white filter to dark backgrounds

## Contact

For logo-related questions or issues:
- Check this README first
- Review the CSS styles in `styles.css`
- Contact the development team if problems persist 