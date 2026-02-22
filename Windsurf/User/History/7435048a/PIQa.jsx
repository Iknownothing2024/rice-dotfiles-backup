import React from 'react';

const PostMeta = ({ date, author }) => {
  return (
    <div className="post-meta">
      <span className="post-meta__date">{date}</span>
      <span className="post-meta__author">by {author}</span>
    </div>
  );
};

export default PostMeta;
