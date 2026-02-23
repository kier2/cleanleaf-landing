# CleanLeaf Microgreens - Landing Page

A clean, organic, and premium landing page for CleanLeaf Microgreens built with vanilla HTML, CSS, and JavaScript.

## Features

- 🌱 Fully responsive, mobile-first design
- ✨ Clean and organic aesthetic
- 📝 Registration form with loading states and success message
- 🎨 Custom color palette and typography
- ⚡ Fast-loading, no build step required
- 🚀 Ready for Vercel deployment

## Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS Variables, Flexbox, and Grid
- **Vanilla JavaScript (ES6)** - Form handling and interactions
- **Google Fonts** - Montserrat & Open Sans

## Color Palette

- **Primary:** #3c4151 
- **Secondary:** #F4F7F2
- **Accent:** #f7f8f5

## Directory Structure

```
cleanleaf-landing/
├── index.html
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── main.js
│   └── img/
│       └── (add your microgreen images here)
├── CLAUDE.md
└── README.md
```

## Local Development

Simply open `index.html` in your browser. No build step required!

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve

# Or just open the file
open index.html
```

## Deployment to Vercel

1. Push this repository to GitHub
2. Connect your GitHub repo to Vercel
3. Vercel will automatically detect this as a static site
4. Deploy!

Alternatively, use the Vercel CLI:

```bash
npm i -g vercel
vercel
```

## Form Integration

The form is currently set up with a simulated submission. To integrate with a real backend:

1. Open `assets/js/main.js`
2. Replace the simulated fetch call with your actual API endpoint
3. Update the endpoint URL in the commented section

Example:
```javascript
const response = await fetch('/api/signup', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
});
```

## Adding Images

Place your microgreen images in the `assets/img/` folder and update the placeholders in `index.html`.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

© 2026 CleanLeaf Microgreens. All rights reserved.
