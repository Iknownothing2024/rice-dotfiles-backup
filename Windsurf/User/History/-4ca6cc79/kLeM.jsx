import React, { memo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import MainPage from './components/MainPage';
import BlogArticle from './components/BlogArticle';
import ImageDetail from './components/ImageDetail';
import About from './components/About';
import Gallery from './components/Gallery';
import Footer from './components/Footer';

const App = memo(() => (
  <Router>
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/blog/:id" element={<BlogArticle />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/gallery/:id" element={<ImageDetail />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </div>
  </Router>
));

App.displayName = 'App';

export default App;
