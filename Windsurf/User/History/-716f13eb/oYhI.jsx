import React, { memo } from 'react';
import PostMeta from './PostMeta';

const PostCard = memo(({ post, className = "" }) => {
  if (!post) return null;

  const { title, excerpt, slug, date, author } = post;

  return (
    <article className={`post-card bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:transform hover:scale-105 ${className}`}>
      <a 
        href={`/posts/${slug}`} 
        className="block group"
        aria-label={`Read post: ${title}`}
      >
        <h2 className="post-card__title text-xl font-semibold mb-3 text-white group-hover:text-primary-400 transition-colors line-clamp-2">
          {title}
        </h2>
        
        <p className="post-card__excerpt text-gray-300 mb-4 leading-relaxed line-clamp-3">
          {excerpt}
        </p>
        
        <div className="post-card__meta">
          <PostMeta date={date} author={author} />
        </div>
        
        <div className="mt-4 flex items-center text-primary-400 group-hover:text-primary-300 transition-colors">
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
    </article>
  );
});

PostCard.displayName = 'PostCard';

export default PostCard;
