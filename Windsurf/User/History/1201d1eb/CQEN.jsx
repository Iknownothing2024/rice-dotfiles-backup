import React from 'react';
import { useParams } from 'react-router-dom';

const PostPage = () => {
  const { slug } = useParams();

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-4">Post Page</h1>
        <p className="text-gray-300">Slug: {slug}</p>
        <p className="text-gray-300">This is a test to see if the component loads properly.</p>
      </div>
    </div>
  );
};

export default PostPage;
