import React, { memo } from 'react';
import { useParams } from 'react-router-dom';

const PostPage = memo(() => {
  const { slug } = useParams();

  console.log('PostPage: slug =', slug);

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-white">Post Page</h1>
        <p className="text-gray-300">Slug: {slug}</p>
        <p className="text-gray-300">Component is rendering!</p>
      </div>
    </div>
  );
});

PostPage.displayName = 'PostPage';

export default PostPage;
