import React from 'react';
import { useParams } from 'react-router-dom';

function PostPage() {
  const { slug } = useParams();
  
  return (
    <div style={{ padding: '20px', color: 'white' }}>
      <h1>Post Page</h1>
      <p>Slug: {slug}</p>
      <p>This is a minimal test to verify the component renders.</p>
    </div>
  );
}

export default PostPage;
