import React, { memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { posts, getLatestPosts } from '../data/blog';

const MainPage = memo(() => {
  // Get the latest 5 posts for the homepage
  const latestPosts = useMemo(() => getLatestPosts(5), []);

  return (
    <div className="min-h-screen pt-16">
      <Sidebar />
      
      {/* Main Content */}
      <main className="ml-96 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {latestPosts.map((post) => (
              <article key={post.slug} className="bg-gray-800/40 backdrop-blur-sm rounded-lg p-6 border border-gray-700/30 hover:border-gray-600/50 transition-all duration-300 hover:transform hover:scale-105">
                <Link 
                  to={`/posts/${post.slug}`} 
                  className="block group"
                  aria-label={`Read post: ${post.title}`}
                >
                  <header className="mb-4">
                    <h2 className="text-xl font-semibold mb-3 text-white group-hover:text-primary-400 transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    
                    <div className="flex items-center gap-6 text-sm text-gray-300/80 mb-3">
                      <div className="flex items-center gap-2">
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>{post.author}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-700/40 text-gray-300 text-xs rounded-full border border-gray-600/30"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </header>
                  <div className="flex items-center text-primary-400 group-hover:text-primary-300 transition-colors mt-4">
                    <svg 
                      className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M9 5l7 7-7 7" 
                      />
                    </svg>
                  </div>
                </Link>
              </article>
            ))}
          </div>
          
          {latestPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400/80 text-lg">404</p>
              <p className="text-gray-300/80 text-lg">不存在博客文章</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
});

MainPage.displayName = 'MainPage';

export default MainPage;
