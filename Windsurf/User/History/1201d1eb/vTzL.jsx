import React from 'react';

const PostPage = ({ post }) => {
  return (
    <article className="post-page">
      <header className="post-page__header">
        <h1 className="post-page__title">{post.title}</h1>
        {/* PostMeta component will go here */}
      </header>
      
      <main className="post-page__content">
        {/* Post content will be rendered here */}
      </main>
      
      <footer className="post-page__footer">
        {/* Tags, related posts */}
      </footer>
    </article>
  );
};

export default PostPage;
