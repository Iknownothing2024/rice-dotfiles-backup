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
          <div style={{ color: 'white' }}>
            <h1>Post Page</h1>
            <p>Slug: {slug}</p>
            <p>This is a minimal test to verify the component renders.</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default PostPage;
