# Benjamin Bahurel - Portfolio Website

A modern, responsive portfolio website showcasing projects in microengineering, robotics, control systems, and machine learning.

## Overview

This portfolio website presents my work across various domains including:
- **Robotics & Control**: Autonomous mobile robotics, MPC controllers, embedded systems
- **Machine Learning**: Deep learning models, reinforcement learning, predictive maintenance
- **Microfabrication**: Cleanroom processes, nanofluidic devices
- **Software Development**: Full-stack applications, mobile apps, simulations

## Features

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Interactive Project Modals**: Detailed project descriptions with images and links
- **Filter System**: Filter projects by category (Software, Hardware, Mechanical, Personal)
- **Course Catalog**: EPFL course listings with direct links to course pages
- **Smooth Navigation**: Scroll-based active section highlighting
- **Modern UI**: Dark theme with smooth animations and transitions

## Project Structure

```
Portfolio/
├── index.html          # Main HTML file
├── styles.css          # Stylesheet
├── script.js           # JavaScript functionality
├── PROJECTS/          # Project assets and documents
│   ├── Embedded Systems/
│   ├── Deep Learning/
│   ├── Mobile Robotics/
│   └── ...
├── PERSONNAL PROJECTS/ # Personal project assets
│   ├── ML4PM/
│   └── Semester Project 2/
└── SKILLS/            # Resume and CV files
```

## Getting Started

### Local Development

1. Clone or download this repository
2. Open `Portfolio/index.html` in your web browser
3. For best results, use a local web server (see below)

### Using a Local Web Server

Due to browser security restrictions, some features (like loading local images) work better when served through a web server:

**Python 3:**
```bash
cd Portfolio
python3 -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

**Node.js (using http-server):**
```bash
npm install -g http-server
cd Portfolio
http-server
```

**VS Code Live Server:**
- Install the "Live Server" extension
- Right-click on `index.html` and select "Open with Live Server"

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS variables and animations
- **JavaScript (ES6+)**: Interactive functionality
- **Font Awesome**: Icons
- **Google Fonts**: Inter font family

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Customization

### Adding a New Project

1. Add a project card in the `#projects` section:
```html
<article class="project-card" data-category="software" data-modal="modal-project-name">
  <div class="project-media" style="--bg: url('./path/to/cover.png');"></div>
  <div class="project-body">
    <h3>Project Title</h3>
    <p>Project description</p>
    <ul class="tag-list">
      <li>tag1</li>
      <li>tag2</li>
    </ul>
  </div>
</article>
```

2. Add the corresponding modal in the `.project-modals` section with the same `id="modal-project-name"`

3. Add project images to the `PROJECTS/` directory

### Modifying Styles

- Main color scheme is defined in CSS variables at the top of `styles.css`
- Modify `--accent`, `--bg`, `--text`, etc. to change the theme

## License

© 2025 Benjamin Bahurel. All rights reserved.

## Contact

- **Email**: benjamin.bahurel@gmail.com
- **LinkedIn**: [Benjamin Bahurel](https://fr.linkedin.com/in/benjamin-bahurel-862736390)
- **GitHub**: [BenBahu](https://github.com/BenBahu)

