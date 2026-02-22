import React, { memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { posts, getAllTags, getPostsByTag } from '../data/blog';

const Tags = memo(() => {
  // Get all unique tags and their post counts
  const tagsWithCounts = useMemo(() => {
    const allTags = getAllTags();
    return allTags.map(tag => ({
      name: tag,
      count: getPostsByTag(tag).length,
      posts: getPostsByTag(tag)
    })).sort((a, b) => b.count - a.count); // Sort by post count (descending)
  }, []);

  return (
    <div className="min-h-screen pt-16">
      <Sidebar />
      
      {/* Main Content */}
      <main className="ml-96 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {tagsWithCounts.map((tag) => (
              <div key={tag.name} className="bg-gray-800/40 backdrop-blur-sm rounded-lg p-6 border border-gray-700/30 hover:border-gray-600/50 transition-all duration-300 hover:transform hover:scale-105">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <h2 className="text-xl font-semibold text-white">#{tag.name}</h2>
                    <span className="px-3 py-1 bg-primary-500/20 text-primary-400 text-sm rounded-full border border-primary-500/30">
                      {tag.count} {tag.count === 1 ? 'post' : 'posts'}
                    </span>
                  </div>
                </div>
                
                {/* Show recent posts for this tag */}
                {tag.posts.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium text-gray-300/80 mb-2">Recent posts:</h3>
                    {tag.posts.slice(0, 3).map((post) => (
                      <Link
                        key={post.slug}
                        to={`/posts/${post.slug}`}
                        className="block group"
                      >
                        <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors">
                          <div className="flex-1">
                            <h4 className="text-white font-medium group-hover:text-primary-400 transition-colors">
                              {post.title}
                            </h4>
                            <div className="flex items-center gap-4 text-xs text-gray-300/70 mt-1">
                              <span>{post.date}</span>
                              <span>{post.author}</span>
                              <span>{post.readingTime} min</span>
                            </div>
                          </div>
                          <svg 
                            className="w-4 h-4 text-gray-400 group-hover:text-primary-400 transition-colors transform group-hover:translate-x-1" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
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
                    ))}
                    
                    {tag.posts.length > 3 && (
                      <div className="text-center pt-2">
                        <span className="text-sm text-gray-300/70">
                          And {tag.posts.length - 3} more posts...
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {tagsWithCounts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-300/80 text-lg">No tags found. Add some tags to your blog posts!</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
});

Tags.displayName = 'Tags';

export default Tags;
