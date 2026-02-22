import React from 'react';
import PostMeta from './PostMeta';

const PostCard = ({ post }) => {
  return (
    <div className="post-card">
      <a href={`/posts/${post.slug}`} className="post-card__link">
        <h2 className="post-card__title">{post.title}</h2>
        <p className="post-card__excerpt">{post.excerpt}</p>
        <div className="post-card__meta">
          <PostMeta date={post.date} author={post.author} />
        </div>
      </a>
    </div>
  );
};

export default PostCard;
