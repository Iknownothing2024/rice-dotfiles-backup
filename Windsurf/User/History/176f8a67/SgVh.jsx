import React, { memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { blogPosts } from '../constants/data';

const MainPage = memo(() => {
  return (
    <div className="flex min-h-[512px] ml-32 pt-16">
      <Sidebar />
      
      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-white">Blog Posts</h1>
            <p className="text-gray-400 mt-2">
              Discover insights and tutorials on modern web development
            </p>
          </header>
          
          <div className="space-y-6">
            {blogPosts.map((post) => (
              <div key={post.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:transform hover:scale-105">
                <a 
                  href={`/posts/${post.slug}`} 
                  className="block group"
                  aria-label={`Read post: ${post.title}`}
                >
                  <h2 className="text-xl font-semibold mb-3 text-white group-hover:text-primary-400 transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  
                  <p className="text-gray-300 mb-4 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="text-sm text-gray-400 mb-4">
                    {post.date} • {post.author}
                  </div>
                  
                  <div className="flex items-center text-primary-400 group-hover:text-primary-300 transition-colors">
                    <span className="text-sm font-medium">Read more</span>
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
                </a>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
});

MainPage.displayName = 'MainPage';

export default MainPage;
