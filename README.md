# Ashish Malla — Personal Portfolio

A funky, expressive, internet-native portfolio website.

**Personality-first, credibility-backed.**  
**Playful chaos with a system underneath.**

## Features

- 🎨 **Funky Design** - Asymmetric layouts, bold colors, playful typography
- ✨ **Micro-interactions** - Custom cursor, hover effects, scroll animations
- 🎭 **Easter Eggs** - Username lore reveal, Konami code secret, console messages
- 📱 **Responsive** - Works beautifully on all devices
- ♿ **Accessible** - Respects reduced motion preferences, proper focus states
- 🚀 **Fast** - Pure HTML, CSS, and vanilla JavaScript (no frameworks)
- 📄 **JSON-driven** - Content managed via data.json file
- 🔒 **Non-selectable text** - Clean presentation
- 🔄 **Username font** - Gajraj One font where "4" looks like "h"

## Structure

```
site/
├── index.html          # Main page
├── styles.css          # All styles
├── script.js           # Interactions
├── data.json           # Content data (editable)
├── pages/
│   ├── speaking.html   # Speaking & organizing details
│   └── community.html  # Community work details
├── assets/
│   ├── images/         # Event photos, profile pic
│   └── logos/          # Community logos
└── README.md
```

## Sections

1. **Hero** - Profile image, animated intro with terminal effect
2. **About** - Activity cards, bio, roles marquee
3. **Community** - Current & past roles, stats, highlights
4. **Speaking** - Talks, workshops, organizing history
5. **Easter Eggs** - Music, K-dramas, username lore reveal
6. **Contact** - Email, socials, Leave a Note wall link

## Easter Eggs

- 🔄 Hover over the logo to see it rotate 180°
- ⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️BA - Try the Konami code
- 🖥️ Check the browser console
- 🤓 Click the "certified internet nerd" badge
- 🔮 The username "IM45145V" → rotate 180° → "Ashish"

## Tech Stack

- HTML5
- CSS3 (Custom properties, Grid, Flexbox, Animations)
- Vanilla JavaScript (ES6+)
- Google Fonts (Space Grotesk, Gajraj One, Caveat, JetBrains Mono)

## Customization

### Adding Images

1. Add profile photo: `assets/images/profile.jpg`
2. Add event photos: `assets/images/`
3. Add community logos: `assets/logos/`

### Updating Content

Edit `data.json` to update:
- Profile information
- Education
- Activities
- Communities
- Speaking events
- Contact links

### Social Links

Update the contact links in `index.html`:
- Email
- LinkedIn
- Twitter
- GitHub
- Wall (wall.im45145v.dev)

## Running Locally

Simply open `index.html` in your browser, or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve

# Using PHP
php -S localhost:8000
```

## License

© 2024 Ashish Malla
