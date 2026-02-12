# OG Image Instructions

## Quick Setup

For best SEO results, create an Open Graph image at `public/og-image.png` with the following specifications:

### Image Specifications
- **Size**: 1200x630 pixels (recommended by Facebook/Twitter)
- **Format**: PNG or JPG
- **File Size**: Under 1MB
- **Content**: Should include:
  - Your name: "Abenezer Tilahun"
  - Title: "Software Engineer"
  - Location: "Addis Ababa, Ethiopia"
  - Optional: Tech stack icons (React, TypeScript, etc.)
  - Optional: Your photo or professional avatar

### Quick Creation Options

1. **Canva** (Recommended for beginners):
   - Go to canva.com
   - Search for "Open Graph" template
   - Customize with your details
   - Export as PNG

2. **Figma**:
   - Create a 1200x630px frame
   - Design your image
   - Export as PNG

3. **Online Tools**:
   - https://www.opengraph.xyz/
   - https://www.bannerbear.com/

### Alternative: Use a Generator
```bash
# If you have ImageMagick installed, run:
convert -size 1200x630 xc:#1a1a1a \
  -font Arial-Bold -pointsize 72 -fill white \
  -annotate +100+250 "Abenezer Tilahun" \
  -pointsize 48 -fill "#00ff00" \
  -annotate +100+350 "Software Engineer" \
  -pointsize 36 -fill gray \
  -annotate +100+420 "Addis Ababa, Ethiopia" \
  public/og-image.png
```

## Current Status
The meta tags in `index.html` are already configured to use `https://abeno.me/og-image.png`. 
Once you add the image file to the `public/` folder and rebuild, it will be automatically served.
