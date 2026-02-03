# Quick Deployment Guide

## GitHub Pages Setup

1. **Enable GitHub Pages**
   - Go to: Settings → Pages
   - Source: Select "GitHub Actions"
   - Save

2. **Deploy**
   - The workflow will automatically run on push to `main` branch
   - Or manually trigger from Actions tab
   - Site will be live at: https://im45145v.github.io/site

## Vercel Setup

1. **Import Project**
   - Go to vercel.com
   - Click "Add New" → "Project"
   - Import this repository

2. **Configure**
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `out`
   - Install Command: `npm install`

3. **Deploy**
   - Click Deploy
   - Site will be live at: your-project.vercel.app

## Netlify Setup

1. **Import Project**
   - Go to netlify.com
   - Click "Add new site" → "Import an existing project"
   - Connect to Git and select this repository

2. **Configure**
   - Build command: `npm run build`
   - Publish directory: `out`

3. **Deploy**
   - Click Deploy
   - Site will be live at: your-project.netlify.app

## Local Testing

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# The static site will be in the 'out' directory
```

## Custom Domain

After deployment, you can add a custom domain:
- GitHub Pages: Settings → Pages → Custom domain
- Vercel: Project Settings → Domains
- Netlify: Site Settings → Domain management

## Environment Variables

This site doesn't require any environment variables. All content is static.
