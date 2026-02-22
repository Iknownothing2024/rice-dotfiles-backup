import React from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

function PostPage() {
  const { slug } = useParams();
  
  return (
    <div className="min-h-screen pt-16">
      <Sidebar />
      
      {/* Main Content */}
      <main className="ml-96 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
            <h1 className="text-3xl font-bold text-white mb-4">Post Page</h1>
            <p className="text-gray-300 mb-2">Slug: {slug}</p>
            <p className="text-gray-400">
              This page is currently under construction. The Markdown functionality has been decommissioned.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default PostPage;
