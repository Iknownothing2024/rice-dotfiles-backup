import React, { memo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Background from './components/Background';
import Navbar from './components/Navbar';
import MainPage from './components/MainPage';
import BlogArticle from './components/BlogArticle';
import PostPage from './pages/PostPage';
import ImageDetail from './components/ImageDetail';
import About from './components/About';
import Gallery from './components/Gallery';
import Tags from './components/Tags';
import Footer from './components/Footer';
import MusicPlayer from './components/MusicPlayer';
import ErrorBoundary from './components/ErrorBoundary';

const App = memo(() => (
  <Router>
    <div className="min-h-screen text-white relative">
      <Background />
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/blog/:id" element={<BlogArticle />} />
        <Route path="/posts/:slug" element={<PostPage />} />
        <Route path="/tags" element={<Tags />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/gallery/:id" element={<ImageDetail />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
      <MusicPlayer />
    </div>
  </Router>
));

App.displayName = 'App';

export default App;
