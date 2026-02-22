import React from 'react';
import Navbar from './components/Navbar';
import Blog from './components/Blog';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <Blog />
    </div>
  );
}

export default App;
