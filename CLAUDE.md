# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **personal portfolio and blog website** built with [Hugo](https://gohugo.io/), a static site generator. The site showcases blog posts, projects, and tutorials with a clean, SEO-friendly static HTML output. No build tools, databases, or runtime dependencies are required—everything is pre-compiled to static files.

## Core Architecture

### Directory Structure

- **`content/`** - Markdown source files organized by content type:
  - `blogpost/` - Blog articles
  - `project/` - Project showcases
  - `tutorial/` - Technical tutorials

  Each file has YAML front matter (title, date, tags, etc.) and Markdown body.

- **`layouts/`** - Hugo Go templates for rendering:
  - `[content-type]/single.html` - Type-specific templates (e.g., `blogpost/single.html`)
  - `_default/single.html` - Fallback template
  - `chrome/` - Reusable partial components (header, footer, navigation)
  - `shortcodes/` - Custom content extensions (footnotes, carousels, code blocks)
  - `indexes/` - Archive and listing page templates

- **`static/`** - Static assets:
  - `css/` - Stylesheets
  - `js/` - JavaScript files
  - `img/` - Images

- **`public/`** - Generated output (do not edit directly)

- **`config.yaml`** - Hugo configuration (site metadata, base URL, content type mappings)

### How It Works

1. Hugo reads content files (Markdown + YAML front matter) from `content/`
2. Maps content to a content type based on directory (e.g., `content/blogpost/foo.md` → type `blogpost`)
3. Applies the corresponding layout template (`layouts/blogpost/single.html`)
4. Processes Hugo shortcodes (custom content extensions)
5. Renders Go templates with content context variables
6. Generates static HTML files to `public/`

**Template Hierarchy** (Hugo loads templates in this order):
```
layouts/[content-type]/single.html  (most specific)
↓
layouts/_default/single.html        (fallback)
```

### Frontend Stack

- **jQuery** - DOM manipulation and event handling
- **Semantic UI** - Component framework and styling
- **bxSlider** - Image carousels (used in project pages)
- **Fancybox** - Lightbox galleries
- **Highlight.js** - Code syntax highlighting
- **Font Awesome** - Icon library

Custom shortcodes enable rich content (footnotes, carousels, code blocks) without modifying templates.

## Development Commands

### Build and Preview

```bash
# Start development server (watches for changes, rebuilds on save)
hugo server

# Build for production (output to public/)
hugo

# Build and include draft/future content
hugo -D

# Build with verbose output
hugo -v
```

The development server runs on `http://localhost:1313/` by default.

### Adding Content

```bash
# Create new blog post
hugo new blogpost/my-post.md

# Create new project
hugo new project/my-project.md

# Create new tutorial
hugo new tutorial/my-tutorial.md
```

Hugo will create a Markdown file with front matter populated from archetypes (if they exist).

## Common Development Tasks

### Adding a Blog Post

1. Create file: `content/blogpost/my-post.md`
2. Add YAML front matter:
   ```yaml
   ---
   title: "Post Title"
   date: 2025-11-09
   tags: ["tag1", "tag2"]
   draft: false
   description: "Brief description for SEO"
   ---
   ```
3. Write Markdown content
4. Use shortcodes for special content (see below)

### Using Shortcodes

- **Footnotes** - `{{< footnote "text" >}}` creates an interactive footnote
- **Code blocks with preview** - `{{< codeblockwithsyntax >}}` for syntax-highlighted code
- **Responsive carousels** - `{{< responsiveslides >}}` for image galleries

See `layouts/shortcodes/` for implementation details.

### Image Carousels

Use the `responsiveslides` shortcode or add images with Fancybox styling:
```html
<a href="/img/fullsize.jpg" class="fancybox">
  <img src="/img/thumb.jpg" alt="Description">
</a>
```

The page JavaScript will automatically apply Fancybox lightbox behavior.

## Key Files and Locations

- **Homepage** - `layouts/index.html`
- **Blog post layout** - `layouts/blogpost/single.html`
- **Project layout** - `layouts/project/single.html`
- **Blog listing/archive** - `layouts/indexes/blogpost.html`
- **Common components** - `layouts/chrome/` (header, footer, navigation, lists)
- **Main stylesheet** - `static/css/style.css`
- **Configuration** - `config.yaml`

## Content Front Matter Reference

Standard YAML front matter fields:

```yaml
---
title: "Page Title"                    # Required
date: 2025-11-09                       # Required, publish date
description: "SEO description"         # Optional, shown in listings
tags: ["tag1", "tag2"]                 # Optional, for taxonomy pages
categories: ["category"]               # Optional, alternative taxonomy
draft: false                           # Optional, set true to hide from published site
---
```

## Important Notes

- **Do not edit `public/`** - This directory is auto-generated and overwritten by `hugo` command
- **Draft posts** - Set `draft: true` in front matter to hide from production builds
- **Base URL** - Currently configured to `//www.josiahgaskin.com/` in `config.yaml`
- **Git ignores** - `.DS_Store`, `scripts/`, and `public/` are excluded from version control
- **Hugo version** - Currently using Hugo v0.152.2+extended

## Testing and Verification

Always test locally before deploying:

```bash
# Run development server and verify changes
hugo server

# Build production version and check output
hugo
ls -la public/  # Verify files were generated
```

Visit `http://localhost:1313/` to see the live preview with auto-reload enabled.
