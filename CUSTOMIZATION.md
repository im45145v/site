# Customization Guide

This guide helps you customize the portfolio website for your specific needs.

## Content Updates

### Personal Information
Update these files to change personal information:

**components/Hero.tsx**
- Main introduction text
- Educational background
- Current status

**components/WhatIDo.tsx**
- Activity descriptions
- Skills and focus areas

**components/Projects.tsx**
- Project titles and descriptions
- Expandable details (what/why/learned)
- Types (Community, Development, etc.)

**components/PersonalityLayer.tsx**
- Music preferences
- Shows and interests
- Username Easter egg (if applicable)

**components/Contact.tsx**
- Email address
- LinkedIn URL
- GitHub URL
- Twitter/X handle

### Metadata
Update SEO information in **app/layout.tsx**:
- Page title
- Description
- Keywords

## Styling Customization

### Colors
Edit **tailwind.config.ts** to change color scheme:
```typescript
colors: {
  primary: '#your-color',
  secondary: '#your-color',
}
```

Or update CSS variables in **app/globals.css**:
```css
:root {
  --background: #ffffff;
  --foreground: #171717;
}
```

### Fonts
Update font families in **app/globals.css**:
```css
body {
  font-family: 'Your Font', sans-serif;
}
```

### Animations
Adjust animation timing in **tailwind.config.ts**:
```typescript
animation: {
  'fade-in': 'fadeIn 0.6s ease-in',  // Change duration
  'slide-up': 'slideUp 0.6s ease-out',
}
```

## Adding Sections

### New Section Template
Create a new component in `components/` folder:

```typescript
'use client';

export default function NewSection() {
  return (
    <section id="new-section" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          Section Title
        </h2>
        {/* Your content here */}
      </div>
    </section>
  );
}
```

Then import and add to **app/page.tsx**:
```typescript
import NewSection from '@/components/NewSection';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* ... other sections ... */}
      <NewSection />
    </main>
  );
}
```

## Adding Images

1. Place images in `public/` folder
2. Import in your component:
```typescript
import Image from 'next/image';

<Image 
  src="/your-image.jpg" 
  alt="Description"
  width={800}
  height={600}
/>
```

## Analytics

To add analytics, edit **app/layout.tsx**:

```typescript
// Add to <head> section
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR-ID"></script>
<script dangerouslySetInnerHTML={{
  __html: `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'YOUR-ID');
  `
}} />
```

## Custom Domain

### GitHub Pages
1. Add a file `public/CNAME` with your domain
2. Go to Settings → Pages → Custom domain
3. Add your domain

### Vercel/Netlify
1. Go to project settings
2. Add custom domain
3. Update DNS records as instructed

## Environment-Specific Content

For different content in dev/prod:

```typescript
const isDev = process.env.NODE_ENV === 'development';

{isDev ? (
  <div>Development content</div>
) : (
  <div>Production content</div>
)}
```

## Testing Changes

```bash
# Development
npm run dev

# Build and test production
npm run build
npx serve out

# Lint
npm run lint
```

## Common Customizations

### Change Background Colors
Edit `components/WhatIDo.tsx` and `components/PersonalityLayer.tsx`:
- Change `bg-gray-50 dark:bg-gray-900` to your preferred colors

### Adjust Spacing
- Sections: Change `py-20` (padding vertical) in each section
- Content: Change `max-w-4xl` to `max-w-6xl` for wider content

### Remove Dark Mode
Remove dark mode classes (e.g., `dark:bg-gray-800`) throughout components.

### Add Social Proof
Add testimonials, endorsements, or statistics to any section.

## Need Help?

- Check Next.js docs: https://nextjs.org/docs
- Tailwind CSS docs: https://tailwindcss.com/docs
- React docs: https://react.dev

## Tips

1. Make small changes and test frequently
2. Use browser dev tools to inspect and experiment with styles
3. Keep the content authentic and personal
4. Update regularly with new projects and experiences
5. Test on multiple devices and browsers
