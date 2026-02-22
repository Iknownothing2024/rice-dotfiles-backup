import React, { memo, useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useMarkdownContent } from '../src/hooks/useMarkdownContent';

// Memoized markdown components to prevent re-renders
const MarkdownComponents = memo(() => ({
  h1: ({ children }) => <h1 className="text-3xl font-bold mb-6 text-white">{children}</h1>,
  h2: ({ children }) => <h2 className="text-2xl font-bold mb-4 text-white mt-8">{children}</h2>,
  h3: ({ children }) => <h3 className="text-xl font-bold mb-3 text-white mt-6">{children}</h3>,
  p: ({ children }) => <p className="text-gray-300 mb-4 leading-relaxed">{children}</p>,
  code: ({ inline, children }) => 
    inline ? 
      <code className="bg-gray-800 px-1 py-0.5 rounded text-primary-400">{children}</code> :
      <pre className="bg-gray-800 p-4 rounded-lg overflow-x-auto mb-4">
        <code className="text-primary-400">{children}</code>
      </pre>,
  ul: ({ children }) => <ul className="list-disc list-inside mb-4 text-gray-300">{children}</ul>,
  li: ({ children }) => <li className="mb-2">{children}</li>,
}));

MarkdownComponents.displayName = 'MarkdownComponents';

// Memoized loading state
const LoadingState = memo(() => (
  <div className="min-h-screen bg-gray-900 text-white py-12">
    <div className="max-w-4xl mx-auto px-6">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500" aria-hidden="true" />
        <p className="text-gray-300 mt-4">Loading post...</p>
      </div>
    </div>
  </div>
));

LoadingState.displayName = 'LoadingState';

// Memoized error state
const ErrorState = memo(({ error }) => (
  <div className="min-h-screen bg-gray-900 text-white py-12">
    <div className="max-w-4xl mx-auto px-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-red-400">Error Loading Post</h1>
        <p className="text-gray-300 text-lg">{error}</p>
      </div>
    </div>
  </div>
));

ErrorState.displayName = 'ErrorState';

// Memoized not found state
const NotFoundState = memo(() => (
  <div className="min-h-screen bg-gray-900 text-white py-12">
    <div className="max-w-4xl mx-auto px-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
        <p className="text-gray-300 text-lg">The blog post you're looking for doesn't exist.</p>
      </div>
    </div>
  </div>
));

NotFoundState.displayName = 'NotFoundState';

// Memoized tags component
const PostTags = memo(({ tags }) => {
  if (!tags || !Array.isArray(tags) || tags.length === 0) return null;
  
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag, index) => (
        <span
          key={`${tag}-${index}`}
          className="px-3 py-1 bg-gray-700 text-gray-300 text-sm rounded-full border border-gray-600"
        >
          #{tag}
        </span>
      ))}
    </div>
  );
});

PostTags.displayName = 'PostTags';

const PostPage = () => {
  const { slug } = useParams();
  const { content, loading, error } = useMarkdownContent(`/src/content/${slug}.md`);

  // Memoized frontmatter parsing
  const frontmatterData = useMemo(() => {
    if (!content) return {};
    
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    const frontmatter = frontmatterMatch ? frontmatterMatch[1] : '';
    
    const data = {};
    if (frontmatter) {
      frontmatter.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split(':');
        if (key && valueParts.length > 0) {
          let value = valueParts.join(':').trim();
          value = value.replace(/^["']|["']$/g, '');
          
          // Handle arrays (like tags)
          if (value.startsWith('[') && value.endsWith(']')) {
            try {
              value = JSON.parse(value);
            } catch (e) {
              value = value.slice(1, -1).split(',').map(v => v.trim().replace(/^["']|["']$/g, ''));
            }
          }
          
          data[key.trim()] = value;
        }
      });
    }
    
    return data;
  }, [content]);

  // Memoized markdown content
  const markdownContent = useMemo(() => {
    if (!content) return '';
    return content.replace(/^---\n[\s\S]*?\n---\n/, '');
  }, [content]);

  // Memoized markdown components
  const markdownComponents = useMemo(() => MarkdownComponents(), []);

  // Conditional rendering with memoized components
  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;
  if (!content) return <NotFoundState />;

  return (
    <article className="post-page min-h-screen bg-gray-900 text-white py-12">
      <div className="max-w-4xl mx-auto px-6">
        <header className="post-page__header mb-8">
          <h1 className="text-4xl font-bold mb-4 text-white">
            {frontmatterData.title || 'Untitled Post'}
          </h1>
          <div className="text-gray-400 text-sm">
            {frontmatterData.date} • {frontmatterData.author}
          </div>
        </header>
        
        <main className="post-page__content">
          <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={markdownComponents}
            >
              {markdownContent}
            </ReactMarkdown>
          </div>
        </main>
        
        <footer className="post-page__footer mt-12 pt-8 border-t border-gray-700">
          <PostTags tags={frontmatterData.tags} />
        </footer>
      </div>
    </article>
  );
};

export default memo(PostPage);
