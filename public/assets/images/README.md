# 📸 Image Assets

This folder contains all images for your portfolio website.

## Required Images

### 1. profile.jpg (Main Profile Photo)
- **Location**: `/public/assets/images/profile.jpg`
- **Recommended Size**: 400x400px (square)
- **Format**: JPG, PNG, or WEBP
- **Usage**: Your main character photo on the profile page

### 2. Optional Images

You can add more images as needed:
- `background.webp` - Background image for sections
- `favicon.ico` - Browser tab icon
- Other decorative elements

## Image Guidelines

### Size Optimization
- Keep images under 500KB when possible
- Use WEBP format for best compression
- Tools to optimize:
  - [TinyPNG](https://tinypng.com/)
  - [Squoosh](https://squoosh.app/)
  - ImageOptim (Mac)

### Recommended Dimensions
- **Profile Photo**: 400x400px
- **Background Images**: 1920x1080px
- **Icons**: 64x64px or 128x128px

## How to Add Your Images

1. Place your images in this folder: `/public/assets/images/`
2. Name your profile photo exactly: `profile.jpg` (or update the path in `CharacterSheet.vue`)
3. Images will be automatically served from `/assets/images/` in the browser

## Example Usage in Code

```vue
<!-- In Vue component -->
<img src="/assets/images/profile.jpg" alt="Your Name" />
```

```css
/* In CSS */
background-image: url('/assets/images/background.webp');
```

## Current Status

- ⚠️ **No images uploaded yet**
- The site uses placeholder images from `via.placeholder.com`
- Replace placeholders with your actual images before deployment

## Tips

- Use a professional headshot for best results
- Consider the Fallout/retro aesthetic
- You can add a sepia or green filter for the theme
- Test images on both desktop and mobile

---

**Ready to add your images?** Just drop them in this folder and update any references in the code!
