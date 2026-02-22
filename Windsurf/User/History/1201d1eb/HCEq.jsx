import React, { Suspense } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import PostMeta from '../components/blog/PostMeta';
import ErrorBoundary from '../components/ErrorBoundary';
import { useMarkdownContent } from '../hooks/useMarkdownContent';

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

  // Extract frontmatter from markdown content
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  const frontmatter = frontmatterMatch ? frontmatterMatch[1] : '';
  const markdownContent = content.replace(/^---\n[\s\S]*?\n---\n/, '');

  // Parse frontmatter (simple implementation)
  const frontmatterData = {};
  if (frontmatter) {
    frontmatter.split('\n').forEach(line => {
      const [key, ...valueParts] = line.split(':');
      if (key && valueParts.length > 0) {
        const value = valueParts.join(':').trim().replace(/^["']|["']$/g, '');
        frontmatterData[key.trim()] = value;
      }
    });
  }

  return (
    <ErrorBoundary>
      <article className="post-page min-h-screen bg-gray-900 text-white py-12">
        <div className="max-w-4xl mx-auto px-6">
          <header className="post-page__header mb-8">
            <h1 className="text-4xl font-bold mb-4 text-white">{frontmatterData.title || 'Untitled Post'}</h1>
            <PostMeta date={frontmatterData.date} author={frontmatterData.author} />
          </header>
          
          <main className="post-page__content">
            <Suspense fallback={<div>Loading content...</div>}>
              <div className="prose prose-invert max-w-none">
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  className="text-gray-300 leading-relaxed"
                  components={{
                    h1: ({children}) => <h1 className="text-3xl font-bold mb-6 text-white">{children}</h1>,
                    h2: ({children}) => <h2 className="text-2xl font-bold mb-4 text-white mt-8">{children}</h2>,
                    h3: ({children}) => <h3 className="text-xl font-bold mb-3 text-white mt-6">{children}</h3>,
                    p: ({children}) => <p className="text-gray-300 mb-4 leading-relaxed">{children}</p>,
                    code: ({inline, children}) => 
                      inline ? 
                        <code className="bg-gray-800 px-1 py-0.5 rounded text-primary-400">{children}</code> :
                        <pre className="bg-gray-800 p-4 rounded-lg overflow-x-auto mb-4">
                          <code className="text-primary-400">{children}</code>
                        </pre>,
                    ul: ({children}) => <ul className="list-disc list-inside mb-4 text-gray-300">{children}</ul>,
                    li: ({children}) => <li className="mb-2">{children}</li>,
                  }}
                >
                  {markdownContent}
                </ReactMarkdown>
              </div>
            </Suspense>
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
    </ErrorBoundary>
  );
};

export default PostPage;
