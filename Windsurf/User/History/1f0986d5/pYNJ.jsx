import React, { memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';

// Dynamic import of all images from /src/assets/pics/
const importImages = () => {
  const images = import.meta.glob('/src/assets/Pics/*.{png,jpg,jpeg}', { eager: true });
  
  return Object.entries(images).map(([path, module], index) => {
    // Extract filename from path and remove extension
    const filename = path.split('/').pop()?.split('.')[0] || `image-${index}`;
    
    return {
      id: filename,
      title: filename.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      description: `Image: ${filename}`,
      imagePath: module.default,
    };
  });
};

const ImageCard = memo(({ image }) => (
  <Link to={`/gallery/${image.id}`} className="block group">
    <div className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 cursor-pointer aspect-[4/3]">
      <img 
        src={image.imagePath} 
        alt={image.title} 
        className="w-full h-full object-cover group-hover:brightness-110 transition-all duration-300" 
        loading="lazy"
      />
    </div>
  </Link>
));

ImageCard.displayName = 'ImageCard';

const Gallery = memo(() => {
  // Dynamically generate gallery images from assets folder
  const galleryImages = useMemo(() => {
    try {
      const images = importImages();
      return images;
    } catch (error) {
      console.error('Error loading images from assets folder:', error);
      return [];
    }
  }, []);

  return (
    <div className="min-h-screen pt-16">
      <Sidebar />
      
      {/* Main Content */}
      <main className="ml-96 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-12 text-white">图像馆</h1>
          
          {/* Error handling for empty gallery */}
          {galleryImages.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No images found in the gallery.</p>
              <p className="text-gray-500 text-sm mt-2">
                Add images to /src/assets/pics/ to see them here.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryImages.map((image) => (
                <ImageCard key={image.id} image={image} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
});

Gallery.displayName = '图像馆';

export default Gallery;
