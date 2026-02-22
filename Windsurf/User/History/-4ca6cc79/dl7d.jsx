import React, { memo, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';

// Lazy load components for better performance
const Navbar = lazy(() => import('./components/Navbar').then(module => ({ default: module.default })));
const MainPage = lazy(() => import('./components/MainPage').then(module => ({ default: module.default })));
const BlogArticle = lazy(() => import('./components/BlogArticle').then(module => ({ default: module.default })));
const PostPage = lazy(() => import('../pages/PostPage').then(module => ({ default: module.default })));
const ImageDetail = lazy(() => import('./components/ImageDetail').then(module => ({ default: module.default })));
const About = lazy(() => import('./components/About').then(module => ({ default: module.default })));
const Gallery = lazy(() => import('./components/Gallery').then(module => ({ default: module.default })));
const Footer = lazy(() => import('./components/Footer').then(module => ({ default: module.default })));

// Loading component for lazy loaded routes
const RouteLoading = memo(() => (
  <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mb-4" aria-hidden="true" />
      <p className="text-gray-300">Loading...</p>
    </div>
  </div>
));

RouteLoading.displayName = 'RouteLoading';

const App = memo(() => {
  return (
    <ErrorBoundary>
      <Router>
        <div className="min-h-screen bg-gray-900 text-white">
          <Suspense fallback={<RouteLoading />}>
            <Navbar />
          </Suspense>
          
          <ErrorBoundary>
            <Suspense fallback={<RouteLoading />}>
              <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/blog/:id" element={<BlogArticle />} />
                <Route path="/posts/:slug" element={<PostPage />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/gallery/:id" element={<ImageDetail />} />
                <Route path="/about" element={<About />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
          
          <Suspense fallback={<RouteLoading />}>
            <Footer />
          </Suspense>
        </div>
      </Router>
    </ErrorBoundary>
  );
});

App.displayName = 'App';

export default App;
