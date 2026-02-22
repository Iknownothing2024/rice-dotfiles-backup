import React, { memo } from 'react';
import { useParams } from 'react-router-dom';
import { useMarkdownContent } from '../src/hooks/useMarkdownContent';

const PostPage = memo(() => {
  const { slug } = useParams();
  const { content, loading, error } = useMarkdownContent(`/src/content/${slug}.md`);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500" aria-hidden="true" />
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

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-white">Post Page</h1>
        <p className="text-gray-300">Slug: {slug}</p>
        <p className="text-gray-300">Content loaded successfully!</p>
        <p className="text-gray-300">Content length: {content.length}</p>
      </div>
    </div>
  );
});

PostPage.displayName = 'PostPage';

export default PostPage;
