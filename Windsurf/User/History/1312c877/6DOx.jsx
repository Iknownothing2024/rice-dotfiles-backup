import React, { memo } from 'react';
import { useParams, Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { blogPosts } from '../constants/data';

const BlogArticle = memo(() => {
  const { id } = useParams();

  const post = blogPosts.find(p => p.id === parseInt(id));

  if (!post) {
    return (
      <div className="min-h-screen pt-16">
        <Sidebar />
        
        {/* Main Content */}
        <main className="ml-96 p-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4 text-white">Blog Post Not Found</h1>
              <p className="text-gray-300 text-lg mb-6">The blog post you're looking for doesn't exist.</p>
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
                  <span>{post.views || 0} views</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {(post.tags || []).map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-700 text-gray-300 text-sm rounded-full border border-gray-600"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </header>
            
            <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed text-lg">
              <p className="text-gray-300">
                {post.excerpt || 'This blog post is currently under construction. Check back soon for the full content.'}
              </p>
            </div>
          </article>
        </div>
      </main>
    </div>
  );
});

BlogArticle.displayName = 'BlogArticle';

export default BlogArticle;
