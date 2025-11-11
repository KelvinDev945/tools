# Tools & Resources

A searchable GitHub Pages site for organizing and discovering tools, documentation, and resources.

## Features

- **Search Functionality**: Search pages by title in real-time
- **Tag Filtering**: Filter content by categories and tags
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Jekyll-Powered**: Static site generator with easy content management

## Getting Started

### Prerequisites

- Ruby 2.7 or higher
- Bundler

### Local Development

1. Install dependencies:
   ```bash
   bundle install
   ```

2. Run the Jekyll server:
   ```bash
   bundle exec jekyll serve
   ```

3. Open your browser to `http://localhost:4000`

### Adding New Pages

Create a new markdown or HTML file in the `_pages/` directory with the following front matter:

```yaml
---
layout: page
title: Your Page Title
description: A brief description of the page
tags: [tag1, tag2, tag3]
---

Your content here...
```

## GitHub Pages Deployment

This site is configured to deploy automatically to GitHub Pages when pushed to the master branch.

1. Go to your repository Settings > Pages
2. Set Source to "Deploy from a branch"
3. Select branch: `master` and folder: `/ (root)`
4. Save and wait for deployment

## Project Structure

```
.
├── _config.yml          # Jekyll configuration
├── _layouts/            # Page layouts
├── _includes/           # Reusable components
├── _pages/              # Content pages
├── assets/              # CSS, JS, images
│   ├── css/
│   └── js/
├── index.html           # Homepage with search
└── README.md            # This file
```

## License

MIT
