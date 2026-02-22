import React from 'react';
import PostMeta from '../components/blog/PostMeta';

const PostPage = ({ post }) => {
  return (
    <article className="post-page">
      <header className="post-page__header">
        <h1 className="post-page__title">{post.title}</h1>
        <PostMeta date={post.date} author={post.author} />
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
