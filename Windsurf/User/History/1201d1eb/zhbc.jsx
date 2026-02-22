import React, { Suspense } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useMarkdownContent } from '../src/hooks/useMarkdownContent';

const PostPage = () => {
  const { slug } = useParams();
  const { content, loading, error } = useMarkdownContent(`/src/content/${slug}.md`);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
            <p className="text-gray-300 mt-4">Loading post...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4 text-red-400">Error Loading Post</h1>
            <p className="text-gray-300 text-lg">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen bg-gray-900 text-white py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
            <p className="text-gray-300 text-lg">The blog post you're looking for doesn't exist.</p>
          </div>
        </div>
      </div>
    );
  }

  // Simple frontmatter extraction
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  const frontmatter = frontmatterMatch ? frontmatterMatch[1] : '';
  const markdownContent = content.replace(/^---\n[\s\S]*?\n---\n/, '');

  // Simple frontmatter parsing
  const frontmatterData = {};
  if (frontmatter) {
    frontmatter.split('\n').forEach(line => {
      const [key, ...valueParts] = line.split(':');
      if (key && valueParts.length > 0) {
        let value = valueParts.join(':').trim();
        // Remove quotes
        value = value.replace(/^["']|["']$/g, '');
        
        // Handle arrays (like tags)
        if (value.startsWith('[') && value.endsWith(']')) {
          try {
            value = JSON.parse(value);
          } catch (e) {
            // If JSON parsing fails, keep as string
            value = value.slice(1, -1).split(',').map(v => v.trim().replace(/^["']|["']$/g, ''));
          }
        }
        
        frontmatterData[key.trim()] = value;
      }
    });
  }

  return (
    <article className="post-page min-h-screen bg-gray-900 text-white py-12">
      <div className="max-w-4xl mx-auto px-6">
        <header className="post-page__header mb-8">
          <h1 className="text-4xl font-bold mb-4 text-white">{frontmatterData.title || 'Untitled Post'}</h1>
          <div className="text-gray-400 text-sm">
            {frontmatterData.date} • {frontmatterData.author}
          </div>
        </header>
        
        <main className="post-page__content">
          <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {markdownContent}
            </ReactMarkdown>
          </div>
        </main>
        
        <footer className="post-page__footer mt-12 pt-8 border-t border-gray-700">
          {frontmatterData.tags && (
            <div className="flex flex-wrap gap-2">
              {frontmatterData.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-700 text-gray-300 text-sm rounded-full border border-gray-600"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </footer>
      </div>
    </article>
  );
};

export default PostPage;
