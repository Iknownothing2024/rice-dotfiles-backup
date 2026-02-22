import React from 'react';

const BlogPost = () => {
  return (
    <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
      <h2 className="text-3xl font-bold mb-6 text-white">Blog Post Title</h2>
      
      <div className="flex items-center gap-6 text-sm text-gray-400 mb-6">
        <div className="flex items-center gap-2">
          <span>📅</span>
          <span>January 12, 2026</span>
        </div>
        <div className="flex items-center gap-2">
          <span>👁️</span>
          <span>5 min read</span>
        </div>
      </div>
      
      <div className="prose prose-invert max-w-none">
        <p className="text-gray-300 text-lg leading-relaxed mb-4">
          This is a single blog post with basic layout. The content would go here, providing detailed information about the topic.
        </p>
        <p className="text-gray-300 text-lg leading-relaxed mb-4">
          The blog post would contain the main content, images, and other elements that make up a complete article.
        </p>
        <p className="text-gray-300 text-lg leading-relaxed">
          This layout provides a clean reading experience with proper spacing and typography.
        </p>
      </div>
      
      <div className="mt-8 pt-6 border-t border-gray-700">
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-gray-700 text-gray-300 text-sm rounded-full border border-gray-600">
            #blog
          </span>
          <span className="px-3 py-1 bg-gray-700 text-gray-300 text-sm rounded-full border border-gray-600">
            #article
          </span>
          <span className="px-3 py-1 bg-gray-700 text-gray-300 text-sm rounded-full border border-gray-600">
            #content
          </span>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
