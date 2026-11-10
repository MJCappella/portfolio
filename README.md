# Michael James — Portfolio

Personal portfolio website of **Michael James**, Full Stack Software Engineer specializing in Python, Angular, React, TypeScript, PHP/Laravel, PostgreSQL, and AWS Cloud.

Live version hosted on Netlify:  
👉 **[https://michaeljames.netlify.app](https://michaeljames.netlify.app)**

---

## 🏗️ Project Architecture & Modular Sections

The project has been refactored into clean, logical section modules located in the `sections/` directory:

```text
portfolio/
├── index.html                 # Master compiled website (ready for Netlify deployment & local browsing)
├── build.js                   # Node.js compiler assembling modular sections into index.html
├── package.json               # Build and preview scripts
├── sections/                  # Modular logical HTML components
│   ├── header.html            # Hero banner & social media channels
│   ├── navbar.html            # Sticky navigation bar
│   ├── about.html             # Bio & expertise breakdown
│   ├── resume.html            # Master tabbed resume container
│   ├── experience.html        # Redesigned professional experience timeline
│   ├── skills.html            # Redesigned domain skill clusters & chips
│   ├── education.html         # Redesigned university education & research
│   ├── stats.html             # Counter metrics (Years, Repos, Clients)
│   ├── services.html          # Full stack & AI engineering services
│   ├── portfolio.html         # Horizontal flowing project carousel
│   ├── contact.html           # Contact form & location-neutral channels
│   └── footer.html            # Copyright & credits
└── assets/
    ├── css/
    │   ├── michaeljames.css   # Main theme & carousel styles
    │   └── resume.css         # Redesigned experience, education & skills styling
    ├── js/
    │   └── michaeljames.js    # Horizontal carousel, tab switching & scroll
    ├── imgs/                  # Image assets & project thumbnails
    └── vendors/               # Bootstrap, jQuery, Themify icons
```

---

## ⚡ Development & Build Commands

### 1. Rebuild index.html from modular sections:
Whenever you modify any file in `sections/`, run:
```bash
npm run build
# OR directly:
node build.js
```

### 2. Preview locally:
```bash
npm start
# Opens a lightweight local HTTP server at http://localhost:8080
```
Or simply open `index.html` in your browser.
