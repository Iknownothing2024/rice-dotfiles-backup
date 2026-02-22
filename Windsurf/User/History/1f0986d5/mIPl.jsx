import React from 'react';

const Gallery = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-12 text-center">Gallery</h1>
        
        {/* Unified Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
            <img src="/src/assets/Pics/gallery1.jpeg" alt="Railway ; girl" className="w-full h-64 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">Railway and girl</h3>
              <p className="text-gray-400 text-sm">my default wallpaper</p>
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
            <img src="/src/assets/Pics/gallery2.jpeg" alt="Forest Path" className="w-full h-64 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">Mountain landscape</h3>
              <p className="text-gray-400 text-sm">Just a random pic I found in internet for a very long time</p>
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
            <img src="/src/assets/Pics/gallery3.jpeg" alt="Ocean Waves" className="w-full h-64 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">Ocean Waves</h3>
              <p className="text-gray-400 text-sm">Peaceful ocean waves at dawn</p>
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
            <img src="/src/assets/Pics/gallery4.jpeg" alt="City Lights" className="w-full h-64 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">Meditation in a forest</h3>
              <p className="text-gray-400 text-sm">理想中的异世界生活</p>
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
            <img src="/src/assets/Pics/gallery5.jpeg" alt="torri" className="w-full h-64 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">原野鸟居</h3>
              <p className="text-gray-400 text-sm">found it on the internet for a very long time</p>
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
            <img src="/src/assets/Pics/gallery6.png" alt="Modern Architecture" className="w-full h-64 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">Modern Architecture</h3>
              <p className="text-gray-400 text-sm">Contemporary building design</p>
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
            <img src="/src/assets/Pics/gallery7.jpeg" alt="Color Splash" className="w-full h-64 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">Color Splash</h3>
              <p className="text-gray-400 text-sm">Vibrant abstract composition</p>
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
            <img src="/src/assets/Pics/gallery8.jpeg" alt="Geometric Patterns" className="w-full h-64 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">Geometric Patterns</h3>
              <p className="text-gray-400 text-sm">Mathematical beauty in art</p>
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
            <img src="/src/assets/Pics/max.png" alt="subway and anime girl" className="w-full h-64 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">Anime Girl in a subway</h3>
              <p className="text-gray-400 text-sm">one of my wallpapers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
