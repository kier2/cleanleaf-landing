# CleanLeaf Landing Page: Project Rules

## Tech Stack
- **Language:** Vanilla HTML5, CSS3 (Modern), Vanilla JS (ES6).
- **Hosting:** Vercel Static (No build step).

## Design & Branding
- **Primary Color:** #3c4151 
- **Secondary Color:** #F4F7F2
- **Accent Color:** #f7f8f5
- **Typography:** Use Google Fonts: 'Montserrat' for headings, 'Open Sans' for body.
- **Vibe:** Clean, organic, premium, and sustainable.

## API & Backend (Phase 1: Setup)
- **Endpoint:** `/api/submit`
- **File:** `/api/submit.js`
- **Status:** Placeholder only. Returns `{ success: true }` but does not forward data yet.
- **Vercel:** `vercel.json` must handle the rewrite from `/api/submit` to `/api/submit.js`.

## Code Standards
- **File Paths:** Always use relative paths (e.g., `./assets/css/style.css`).
- **CSS:** Use CSS Variables for colors. Use Flexbox/Grid for layouts. Mobile-first responsive design is mandatory.
- **JS:** Use the Fetch API for form submissions. Add a "Loading" state and "Success" message to the form.

## Directory Structure
- /index.html
- /assets/css/style.css
- /assets/js/main.js
- /assets/img/ (for microgreen images)

## Setup Requirements
- Create /api/submit.js as a placeholder Serverless Function (Vercel).
- Create index.html, assets/css/style.css, and assets/js/main.js.
- vercel.json must include rewrites for /api/submit.

## Form Behavior (Pre-Integration Phase)
- The form should NOT send data to any external URL yet.
- In assets/js/main.js, the form should validate the input and console.log() the data.
- Show a "Success Message" on the UI after clicking submit, but do not trigger a real fetch to a webhook.