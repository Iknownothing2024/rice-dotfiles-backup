import React from 'react';
import Navbar from './components/Navbar';
import Blog from './components/Blog';
import About from './components/About';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <Blog />
      <About />
    </div>
  );
}

export default App;
