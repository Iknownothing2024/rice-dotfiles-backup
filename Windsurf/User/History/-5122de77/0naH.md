# Markdown Blog System Documentation

## Architecture Overview

This blog system uses a build-time approach to convert Markdown files into React-compatible data, enabling fully static deployment while maintaining dynamic React components.

### Data Flow

```
/posts/*.md → Vite Plugin → Virtual Module → React Components
```

1. **Build Time**: Markdown files are processed with frontmatter parsing
2. **Virtual Module**: Generated data is available as `virtual:blog-data`
3. **Runtime**: Components import and consume the processed data

## File Structure

```
personal-website/
├── posts/                          # Markdown files
│   ├── getting-started-with-react.md
│   └── modern-javascript-features.md
├── src/
│   ├── data/
│   │   └── blog.js                 # Blog data interface
│   ├── components/
│   │   ├── MainPage.jsx            # Blog listing
│   │   ├── BlogArticle.jsx         # Single post renderer
│   │   └── Sidebar.jsx             # Glassmorphism sidebar
│   ├── pages/
│   │   └── PostPage.jsx            # Alternative post renderer
│   └── styles/
│       └── highlight.css           # Syntax highlighting
├── vite-plugin-blog.js             # Custom Vite plugin
└── vite.config.js                  # Updated configuration
```

## Key Components

### 1. Vite Plugin (`vite-plugin-blog.js`)

Processes Markdown files at build time:
- Extracts frontmatter (title, date, author, tags, etc.)
- Calculates reading time
- Generates virtual module with blog data
- Supports hot module replacement in development

### 2. Blog Data Interface (`src/data/blog.js`)

Provides clean API for components:
```javascript
import { posts, getPost, getLatestPosts } from '../data/blog';

// Get all posts
const allPosts = posts;

// Get specific post
const post = getPost('getting-started-with-react');

// Get latest 5 posts
const latest = getLatestPosts(5);
```

### 3. MainPage Component

Displays blog post listings with:
- Post metadata (date, author, reading time, tags)
- Excerpts with "Read more" links
- Responsive grid layout
- Hover effects and transitions

### 4. BlogArticle Component

Renders individual posts with:
- Full Markdown content with syntax highlighting
- Custom styled components (code blocks, blockquotes, links)
- Metadata display
- Navigation back to blog listing

## Markdown File Format

Each Markdown file should include frontmatter:

```markdown
---
title: "Post Title"
date: "2024-01-15"
author: "Author Name"
excerpt: "Brief description for listings"
tags: ["tag1", "tag2"]
summary: "Optional summary field"
---

# Post Content

Your Markdown content here...
```

### Supported Frontmatter Fields

- `title` (required): Post title
- `date` (required): Publication date (YYYY-MM-DD)
- `author` (required): Author name
- `excerpt` (optional): Description for blog listings
- `tags` (optional): Array of tags
- `summary` (optional): Alternative to excerpt

### Markdown Features

- **GitHub Flavored Markdown**: Tables, strikethrough, task lists
- **Syntax Highlighting**: Code blocks with language detection
- **Custom Components**: Styled blockquotes, links, and code blocks
- **Math Support**: Can be added with remark-math plugin

## Routing

Posts are accessible via:
- `/posts/:slug` - Main blog article route
- `/posts/:slug` - Alternative post page route

The slug is derived from the filename (without `.md` extension).

## Build Process

### Development
```bash
npm run dev
```
- Hot module replacement for Markdown changes
- Virtual module updates automatically
- Fast refresh for content edits

### Production Build
```bash
npm run build
```
- Markdown files processed at build time
- Static HTML/CSS/JS output
- Ready for deployment to Nginx, GitHub Pages, etc.

## Deployment

The system generates fully static files suitable for:

- **GitHub Pages**: Push `dist/` folder to gh-pages branch
- **Netlify**: Connect repository and auto-deploy on push
- **Vercel**: Import repository and deploy
- **Nginx**: Serve `dist/` folder as static files

## Customization

### Adding New Post Features

1. **Frontmatter Fields**: Add to `vite-plugin-blog.js` processing
2. **Component Updates**: Modify `MainPage.jsx` or `BlogArticle.jsx`
3. **Styling**: Update CSS classes or Tailwind configuration

### Syntax Highlighting

Edit `src/styles/highlight.css` to customize:
- Code block colors
- Language-specific highlighting
- Theme variations

### Content Styling

Modify ReactMarkdown components in `BlogArticle.jsx`:
```javascript
components={{
  h1: ({children}) => <h1 className="custom-title">{children}</h1>,
  // Add more custom components...
}}
```

## Performance Optimizations

- **Build-time Processing**: No runtime Markdown parsing
- **Code Splitting**: Markdown dependencies in separate chunk
- **Static Generation**: Pre-rendered HTML for fast loading
- **Lazy Loading**: Images and content load as needed

## Future Enhancements

### Planned Features

1. **Search Functionality**: Client-side search across posts
2. **Tag Filtering**: Filter posts by tags
3. **RSS Feed**: Generate RSS XML feed
4. **Image Optimization**: Automatic image processing
5. **Comments**: Integration with comment systems
6. **Analytics**: Page view tracking

### Extension Points

- **Custom Markdown Plugins**: Add remark/rehype plugins
- **Content Sources**: Support other content formats
- **Dynamic Routes**: Generate additional route types
- **API Endpoints**: Create JSON API for blog data

## Troubleshooting

### Common Issues

1. **Build Errors**: Check Markdown syntax and frontmatter
2. **Missing Posts**: Verify files in `/posts/` directory
3. **Styling Issues**: Ensure Tailwind CSS is properly configured
4. **Syntax Highlighting**: Check highlight.js CSS import

### Development Tips

- Use `console.log(posts)` in browser to debug data
- Check Network tab for virtual module loading
- Verify Markdown files have proper frontmatter
- Test with different content types (code blocks, tables, etc.)

## Dependencies

### Core Libraries
- `react-markdown`: Markdown rendering
- `remark-gfm`: GitHub Flavored Markdown
- `rehype-highlight`: Syntax highlighting
- `gray-matter`: Frontmatter parsing

### Development Tools
- `vite-plugin-markdown`: Alternative plugin option
- `@tailwindcss/typography**: Typography utilities
- `highlight.js`: Syntax highlighting themes
