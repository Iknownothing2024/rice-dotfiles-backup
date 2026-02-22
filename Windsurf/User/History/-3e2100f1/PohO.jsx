import React, { memo, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
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
      imagePath: module.default,
    };
  });
};

const RelatedImageCard = memo(({ image }) => (
  <Link key={image.id} to={`/gallery/${image.id}`} className="block group">
    <div className="bg-gray-800/40 backdrop-blur-sm rounded-lg overflow-hidden hover:bg-gray-800/60 transition-all duration-300 border border-gray-700/30 aspect-[4/3]">
      <img 
        src={image.imagePath} 
        alt={image.title}
        className="w-full h-full object-cover group-hover:brightness-110 transition-all duration-300"
        loading="lazy"
      />
    </div>
  </Link>
));

RelatedImageCard.displayName = 'RelatedImageCard';

const ImageDetail = memo(() => {
  const { id } = useParams();
  
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

  const image = galleryImages.find(img => img.id === id);

  if (!image) {
    return (
      <div className="min-h-screen pt-16">
        <Sidebar />
        
        {/* Main Content */}
        <main className="ml-96 p-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-800/40 backdrop-blur-sm rounded-lg p-8 border border-gray-700/30 text-center">
              <h1 className="text-4xl font-bold mb-4 text-white">404</h1>
              <p className="text-gray-200 text-lg mb-6">不存在的图像</p>
              <Link to="/gallery" className="text-primary-400 hover:text-primary-300 underline">
                ← 返回
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Randomized selection of 3 related images, excluding current image
  const relatedImages = useMemo(() => {
    // Filter out current image
    const availableImages = galleryImages.filter(img => img.id !== image.id);
    
    // If fewer than 3 images available, return all available images
    if (availableImages.length <= 3) {
      return availableImages;
    }
    
    // Fisher-Yates shuffle algorithm for true randomness
    const shuffled = [...availableImages];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    // Return first 3 images from shuffled array
    return shuffled.slice(0, 3);
  }, [galleryImages, image.id]);

  return (
    <div className="min-h-screen pt-16">
      <Sidebar />

      {/* Main Content */}
      <main className="ml-96 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Navigation */}
          <div className="mb-6">
            <Link 
              to="/gallery" 
              className="text-primary-400 hover:text-primary-300 transition-colors inline-flex items-center gap-2"
            >
              ← 返回
            </Link>
          </div>

          {/* Image Detail */}
          <div className="bg-gray-800/40 backdrop-blur-md rounded-lg overflow-hidden border border-gray-700/30 shadow-2xl">
            {/* Image Display */}
            <div className="p-8 flex justify-center items-center rounded-xl">
              <img 
                src={image.imagePath} 
                alt={image.title}
                className="max-w-full max-h-96 object-contain rounded-lg shadow-2xl"
                loading="eager"
              />
            </div>
            
            {/* Image Information - Minimalist Info Bar */}
            <div className="p-6">
              {/* Compact Header with Title */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                <h1 className="text-2xl font-bold text-white">{image.title}</h1>
              </div>
            </div>
            
            {/* Navigation to other images */}
            <div className="border-t border-gray-700/30 pt-6">
              <div className="grid grid-cols-3 gap-4">
                {relatedImages.map((img) => (
                  <RelatedImageCard key={img.id} image={img} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
});

ImageDetail.displayName = 'ImageDetail';

export default ImageDetail;
