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
      description: `Image: ${filename}`,
      imagePath: module.default,
      date: new Date().toLocaleDateString(),
      category: 'Gallery',
      tags: ['image', filename],
    };
  });
};

const RelatedImageCard = memo(({ image }) => (
  <Link key={image.id} to={`/gallery/${image.id}`} className="block group">
    <div className="bg-gray-800/40 backdrop-blur-sm rounded-lg overflow-hidden hover:bg-gray-800/60 transition-all duration-300 border border-gray-700/30">
      <img 
        src={image.imagePath} 
        alt={image.title}
        className="w-full h-24 object-cover"
        loading="lazy"
      />
      <div className="p-2">
        <p className="text-sm text-gray-200 group-hover:text-white transition-colors">
          {image.title}
        </p>
      </div>
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
              <h1 className="text-4xl font-bold mb-4 text-white">Image Not Found</h1>
              <p className="text-gray-200 text-lg mb-6">The image you're looking for doesn't exist.</p>
              <Link to="/gallery" className="text-primary-400 hover:text-primary-300 underline">
                ← Back to Gallery
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const relatedImages = galleryImages.filter(img => img.id !== image.id).slice(0, 3);

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
              ← Back to Gallery
            </Link>
          </div>

          {/* Image Detail */}
          <div className="bg-gray-800/40 backdrop-blur-md rounded-lg overflow-hidden border border-gray-700/30 shadow-2xl">
            {/* Image Display */}
            <div className="bg-gray-800/40 backdrop-blur-md p-8 flex justify-center items-center border-b border-gray-700/30">
              <img 
                src={image.imagePath} 
                alt={image.title}
                className="max-w-full max-h-96 object-contain rounded-lg shadow-2xl"
                loading="eager"
              />
            </div>
            
            {/* Image Information */}
            <div className="p-8">
              <header className="mb-6">
                <h1 className="text-3xl font-bold mb-4 text-white">{image.title}</h1>
                
                <div className="flex items-center gap-6 text-sm text-gray-200 mb-4">
                  <div className="flex items-center gap-2">
                    <span>{image.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>🏷️</span>
                    <span>{image.category}</span>
                  </div>
                </div>
              </header>
              
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-white">Description</h2>
                <p className="text-gray-200 text-lg leading-relaxed">
                  {image.description}
                </p>
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-white">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {image.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-700/40 text-gray-200 text-sm rounded-full border border-gray-600/30 backdrop-blur-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Navigation to other images */}
              <div className="border-t border-gray-700/30 pt-6">
                <h3 className="text-lg font-semibold mb-4 text-white">Other Images</h3>
                <div className="grid grid-cols-3 gap-4">
                  {relatedImages.map((img) => (
                    <RelatedImageCard key={img.id} image={img} />
                  ))}
                </div>
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
