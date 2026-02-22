import React, { memo } from 'react';
import { useParams, Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { getPost } from '../data/blog';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

const BlogArticle = memo(() => {
  const { slug } = useParams();
  const post = getPost(slug);

  if (!post) {
    return (
      <div className="min-h-screen pt-16">
        <Sidebar />
        
        {/* Main Content */}
        <main className="ml-96 p-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4 text-white">Blog Post Not Found</h1>
              <p className="text-gray-200/90 text-lg mb-6">The blog post you're looking for doesn't exist.</p>
              <Link to="/" className="text-primary-400 hover:text-primary-300 underline">
                ← Back to all posts
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      <Sidebar />
      
      {/* Main Content */}
      <main className="ml-96 p-8">
        <div className="max-w-4xl mx-auto">
          <article className="bg-gray-800/40 backdrop-blur-sm rounded-lg p-8 border border-gray-700/30">
            <header className="mb-8">
              <h1 className="text-4xl font-bold mb-4 text-white">{post.title}</h1>
              
              <div className="flex items-center gap-6 text-sm text-gray-300/80 mb-8">
                <div className="flex items-center gap-2">
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>{post.readingTime} min read</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-700/40 text-gray-300 text-sm rounded-full border border-gray-600/30"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </header>
            
            <div className="prose prose-invert prose-lg max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={{
                  // Custom styling for code blocks
                  code: ({node, inline, className, children, ...props}) => {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline && match ? (
                      <pre className="bg-gray-900/80 rounded-lg p-4 overflow-x-auto">
                        <code className={className} {...props}>
                          {children}
                        </code>
                      </pre>
                    ) : (
                      <code className="bg-gray-700/40 px-1 py-0.5 rounded text-sm" {...props}>
                        {children}
                      </code>
                    );
                  },
                  // Custom styling for blockquotes
                  blockquote: ({children}) => (
                    <blockquote className="border-l-4 border-primary-500/60 pl-4 italic text-gray-200/90">
                      {children}
                    </blockquote>
                  ),
                  // Custom styling for links
                  a: ({href, children}) => (
                    <a 
                      href={href} 
                      className="text-primary-400 hover:text-primary-300 underline"
                      target={href.startsWith('http') ? '_blank' : '_self'}
                      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      {children}
                    </a>
                  ),
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>
          </article>
        </div>
      </main>
    </div>
  );
});

BlogArticle.displayName = 'BlogArticle';

export default BlogArticle;
