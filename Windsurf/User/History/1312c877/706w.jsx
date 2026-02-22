import React from 'react';
import { useParams } from 'react-router-dom';

const BlogArticle = () => {
  const { id } = useParams();

  const blogPosts = [
    {
      id: 1,
      title: "Understanding Modern Web Development",
      date: "2024-12-28",
      views: 1234,
      content: `
        <p>Web development has evolved significantly over the past decade. From simple static HTML pages to complex single-page applications, the landscape has changed dramatically. Modern frameworks like React, Vue, and Angular have revolutionized how we build user interfaces.</p>
        
        <p>One of the most significant shifts has been the move toward component-based architecture. This approach allows developers to create reusable, maintainable code that scales with application complexity. React's virtual DOM and component lifecycle have set the standard for modern web development.</p>
        
        <h3>Key Technologies</h3>
        <ul>
          <li><strong>React:</strong> Component-based UI library with virtual DOM</li>
          <li><strong>TypeScript:</strong> Type-safe JavaScript for better code quality</li>
          <li><strong>Modern CSS:</strong> Tailwind CSS, CSS-in-JS solutions</li>
          <li><strong>Build Tools:</strong> Vite, Webpack for bundling</li>
        </ul>
        
        <p>The future of web development looks exciting with emerging technologies like WebAssembly, progressive web apps, and AI-assisted development. Staying current with these trends is essential for modern developers.</p>
      `,
      tags: ["web", "development", "react"]
    },
    {
      id: 2,
      title: "The Art of Minimalist Design",
      date: "2024-12-25",
      views: 892,
      content: `
        <p>Minimalist design is more than just a trend—it's a philosophy that emphasizes simplicity, clarity, and purpose. In web design, this means removing unnecessary elements and focusing on what truly matters: the content and user experience.</p>
        
        <p>The principles of minimalist design include:</p>
        <ul>
          <li><strong>White Space:</strong> Giving elements room to breathe</li>
          <li><strong>Simple Color Palettes:</strong> Limited, harmonious colors</li>
          <li><strong>Clean Typography:</strong> Readable fonts with proper hierarchy</li>
          <li><strong>Functional Design:</strong> Form follows function</li>
        </ul>
        
        <p>When applied correctly, minimalist design can improve user engagement, reduce cognitive load, and create a more elegant user experience. It's particularly effective for content-heavy websites where readability is paramount.</p>
      `,
      tags: ["design", "minimalism", "ui"]
    },
    {
      id: 3,
      title: "Dark Theme Best Practices",
      date: "2024-12-20",
      views: 2156,
      content: `
        <p>Dark themes have become increasingly popular, offering users an alternative to traditional light interfaces. When implemented correctly, they can reduce eye strain and improve readability in low-light environments.</p>
        
        <h3>Best Practices for Dark Themes</h3>
        <ul>
          <li><strong>High Contrast:</strong> Ensure text remains readable against dark backgrounds</li>
          <li><strong>Avoid Pure Black:</strong> Use dark grays instead of #000000</li>
          <li><strong>Consistent Shadows:</strong> Subtle shadows for depth and hierarchy</li>
          <li><strong>Test Accessibility:</strong> Verify WCAG compliance with contrast checkers</li>
        </ul>
        
        <p>Implementation should consider user preferences, allowing toggling between light and dark modes. CSS custom properties make this implementation more maintainable and performant.</p>
      `,
      tags: ["design", "dark-theme", "css"]
    },
    {
      id: 4,
      title: "Performance Optimization Techniques",
      date: "2024-12-15",
      views: 1567,
      content: `
        <p>Web performance directly impacts user experience, SEO rankings, and conversion rates. Optimizing performance should be a fundamental consideration in web development, not an afterthought.</p>
        
        <h3>Key Optimization Areas</h3>
        <ul>
          <li><strong>Image Optimization:</strong> WebP format, lazy loading, responsive images</li>
          <li><strong>Code Splitting:</strong> Load only what's needed, when needed</li>
          <li><strong>Caching Strategies:</strong> Browser caching, CDN delivery</li>
          <li><strong>Bundle Size:</strong> Tree shaking, minification, compression</li>
        </ul>
        
        <p>Tools like Lighthouse, WebPageTest, and Chrome DevTools can help identify performance bottlenecks. Regular monitoring and optimization should be part of the development workflow.</p>
      `,
      tags: ["performance", "optimization", "javascript"]
    }
  ];

  const post = blogPosts.find(p => p.id === parseInt(id));

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-900 text-white py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Blog Post Not Found</h1>
            <p className="text-gray-300 text-lg">The blog post you're looking for doesn't exist.</p>
            <a href="/" className="text-primary-400 hover:text-primary-300 underline">
              ← Back to all posts
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12">
      <div className="max-w-4xl mx-auto px-6">
        <article className="bg-gray-800 rounded-lg p-8 border border-gray-700">
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4 text-white">{post.title}</h1>
            
            <div className="flex items-center gap-6 text-sm text-gray-400 mb-8">
              <div className="flex items-center gap-2">
                <span>📅</span>
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>👁️</span>
                <span>{post.views} views</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-700 text-gray-300 text-sm rounded-full border border-gray-600"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </header>
          
          <div 
            className="prose prose-invert max-w-none text-gray-300 leading-relaxed text-lg"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </div>
    </div>
  );
};

export default BlogArticle;
