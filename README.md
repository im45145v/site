# Ashish Mala - Portfolio Website

Personal portfolio website for Ashish Mala - builder, community leader, and hackathon enthusiast.

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Features

- Clean, modern design
- Responsive layout
- Dark mode support
- Expandable project details
- Smooth animations
- Accessible components
- Static export ready

## Structure

- `/app` - Next.js app directory with pages and layouts
- `/components` - React components for each section
- `/public` - Static assets

## Deployment

The site is configured for static export and can be deployed to various platforms.

### GitHub Pages (Automatic)

A GitHub Actions workflow is included for automatic deployment to GitHub Pages:

1. Go to repository Settings → Pages
2. Set Source to "GitHub Actions"
3. Push to `main` branch to trigger deployment

The site will be available at: `https://im45145v.github.io/site`

### Manual Deployment

Build command: `npm run build`  
Output directory: `out`

Can also be deployed to:
- Vercel: Connect repository and deploy
- Netlify: Connect repository or drag & drop `out` folder
- Any static hosting: Upload contents of `out` folder
