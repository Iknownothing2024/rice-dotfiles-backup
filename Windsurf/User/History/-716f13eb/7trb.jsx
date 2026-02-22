import React from 'react';

const PostCard = ({ post }) => {
  return (
    <div className="post-card">
      <a href={`/posts/${post.slug}`} className="post-card__link">
        <h2 className="post-card__title">{post.title}</h2>
        <p className="post-card__excerpt">{post.excerpt}</p>
        <div className="post-card__meta">
          {/* PostMeta component will go here */}
        </div>
      </a>
    </div>
  );
};

export default PostCard;
