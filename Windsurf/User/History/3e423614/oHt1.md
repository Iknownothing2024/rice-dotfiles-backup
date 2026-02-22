# Waline Dark Glassmorphism Implementation

Waline comment system with custom dark glassmorphism styling to match site theme.

## Implementation Details

### Configuration
```javascript
walineInstanceRef.current = init({
  el: walineContainerRef.current,
  serverURL: import.meta.env.VITE_WALINE_SERVER_URL || 'https://hitomiwaline.vercel.app/',
  path: window.location.pathname,
  dark: 'auto', // Support system theme preference
  meta: ['nick', 'mail'], // Only nickname and email fields
});
```

### Component Structure
```jsx
import React, { useEffect, useRef } from 'react';
import { init } from '@waline/client';

const Comments = () => {
  const walineContainerRef = useRef(null);
  const walineInstanceRef = useRef(null);

  useEffect(() => {
    if (!walineContainerRef.current) return;

    // Initialize Waline with refined configuration
    walineInstanceRef.current = init({
      el: walineContainerRef.current,
      serverURL: import.meta.env.VITE_WALINE_SERVER_URL || 'https://hitomiwaline.vercel.app/',
      path: window.location.pathname,
      dark: 'auto', // Support system theme preference
      meta: ['nick', 'mail'], // Only nickname and email fields
    });

    // Cleanup function to prevent duplicate comment boxes
    return () => {
      if (walineInstanceRef.current) {
        walineInstanceRef.current.destroy();
        walineInstanceRef.current = null;
      }
    };
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div className="max-w-full mx-auto my-16 px-0">
      <div ref={walineContainerRef} />
      <style>{/* Refined CSS styles here */}</style>
    </div>
  );
};

export default Comments;
```

## Dark Glassmorphism Styling

### Layout & Width
- **Container**: `max-w-full mx-auto my-16 px-0` for full width layout
- **Responsive**: Mobile-friendly with proper padding adjustments
- **Spacing**: Consistent margins with site design

### Color Scheme
- **Background**: `rgba(0, 0, 0, 0.2)` - Dark semi-transparent
- **Borders**: `rgba(255, 255, 255, 0.1)` - Subtle white borders
- **Text**: `#e5e7eb` (Tailwind gray-200) - Light gray text for readability
- **Placeholder**: `#e5e7eb` with 0.7 opacity - Muted gray for placeholder text
- **Accent**: `#60a5fa` - Blue accent for interactive elements

### Glassmorphism Effects
- **Backdrop Blur**: `blur(12px)` for frosted glass effect
- **Webkit Support**: `-webkit-backdrop-filter` for browser compatibility
- **Transparency**: Layered opacity for depth
- **Border Radius**: Consistent rounded corners (6px-12px)

### Component Styling

#### Main Container (`.wl-panel`)
```css
.wl-panel {
  background: rgba(0, 0, 0, 0.2) !important;
  backdrop-filter: blur(12px) !important;
  -webkit-backdrop-filter: blur(12px) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  border-radius: 12px !important;
  padding: 24px !important;
  color: #e5e7eb !important;
}
```

#### Compact Input Fields (`.wl-input`, `.wl-meta-input`)
```css
.wl-input,
.wl-meta-input {
  background: rgba(0, 0, 0, 0.2) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  border-radius: 6px !important;
  color: #e5e7eb !important;
  padding: 8px 12px !important;
  height: 36px !important;
  font-size: 13px !important;
  max-width: none !important;
  margin: 0 !important;
}

.wl-input::placeholder,
.wl-meta-input::placeholder {
  color: #e5e7eb !important;
  opacity: 0.7 !important;
}
```

#### Full-Width Editor (`.wl-editor`)
```css
.wl-editor {
  background: rgba(0, 0, 0, 0.2) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  border-radius: 8px !important;
  color: #e5e7eb !important;
  width: 100% !important;
  max-width: none !important;
  margin: 0 !important;
}

.wl-editor textarea {
  background: transparent !important;
  color: #e5e7eb !important;
  padding: 16px !important;
  min-height: 100px !important;
  resize: vertical !important;
  width: 100% !important;
  font-size: 14px !important;
}
```

#### Compact Submit Button (`.wl-btn`)
```css
.wl-btn {
  background: rgba(96, 165, 250, 0.2) !important;
  border: 1px solid rgba(96, 165, 250, 0.3) !important;
  border-radius: 6px !important;
  color: #e5e7eb !important;
  padding: 4px 12px !important;
  font-size: 12px !important;
  font-weight: 500 !important;
  transition: all 0.2s ease !important;
  height: 32px !important;
}

.wl-btn:hover {
  background: rgba(96, 165, 250, 0.3) !important;
  border-color: rgba(96, 165, 250, 0.5) !important;
  transform: translateY(-1px) !important;
}
```

## Hidden Elements

### Unwanted UI Elements
The following elements are hidden for cleaner interface:
- `.wl-upload` - File upload buttons
- `.wl-upload *` - All upload-related elements
- `input[type="file"]` - File input fields
- `.wl-gif-popup` - GIF search popup
- `.wl-search` - Search functionality
- `.wl-power` - "Powered by Waline" text
- `.wl-powered` - Branding elements

```css
.wl-upload,
.wl-upload *,
input[type="file"],
.wl-gif-popup,
.wl-search,
.wl-power,
.wl-powered {
  display: none !important;
}
```

## Features

### Visual Effects
- **Dark Glassmorphism**: Frosted glass effect with dark backgrounds
- **Consistent Theme**: Matches site's dark/glassmorphism aesthetic
- **Hover States**: Interactive elements respond to user interaction
- **Focus States**: Clear visual feedback for form inputs
- **Responsive Design**: Mobile-friendly layout adjustments

### Functional Features
- **Full Width**: Takes up same horizontal space as BlogArticle content
- **Proper Cleanup**: Prevents memory leaks and duplicate instances
- **Environment Support**: Flexible server URL configuration
- **Theme Detection**: Automatic dark/light mode support
- **Clean Interface**: Unwanted elements hidden for minimal look

## Integration

### Usage in Components
```jsx
import Comments from './components/Comments';

// In your component
<Comments />
```

### Page Integration
- **MainPage**: Comments appear after posts list
- **BlogArticle**: Comments appear after article content
- **PostPage**: Comments appear after post content
- **Unique Threads**: Each page uses `window.location.pathname` for separate comment sections

## Benefits

### Visual Benefits
- **Seamless Integration**: Matches site's glassmorphism design
- **Better Readability**: Dark backgrounds with light text
- **Clean Interface**: Unwanted elements removed
- **Professional Look**: Consistent styling throughout

### Technical Benefits
- **Performance**: Efficient CSS with `!important` overrides
- **Maintainability**: Organized CSS structure
- **Browser Support**: Webkit prefixes for compatibility
- **Responsive**: Mobile-optimized layouts
