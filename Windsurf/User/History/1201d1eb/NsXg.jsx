import React from 'react';
import { useParams } from 'react-router-dom';
import PostMeta from '../components/blog/PostMeta';
import { blogPosts } from '../src/constants/data.js';

const PostPage = ({ post }) => {
  const { slug } = useParams();
  const postData = blogPosts.find(p => p.slug === slug);

  if (!postData) {
    return (
      <div className="min-h-screen bg-gray-900 text-white py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
            <p className="text-gray-300 text-lg">The blog post you're looking for doesn't exist.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <article className="post-page">
      <header className="post-page__header">
        <h1 className="post-page__title">{postData.title}</h1>
        <PostMeta date={postData.date} author={postData.author} />
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
