import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { galleryImages } from '../constants/data';

const ImageCard = memo(({ image }) => (
  <Link to={`/gallery/${image.id}`} className="block group">
    <div className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 cursor-pointer">
      <img 
        src={image.imagePath} 
        alt={image.title} 
        className="w-full h-64 object-cover group-hover:opacity-90 transition-opacity" 
        loading="lazy"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 text-white group-hover:text-primary-400 transition-colors">
          {image.title}
        </h3>
        <p className="text-gray-400 text-sm">{image.description}</p>
      </div>
    </div>
  </Link>
));

ImageCard.displayName = 'ImageCard';

const Gallery = memo(() => (
  <div className="min-h-screen bg-gray-900 text-white py-12">
    <div className="max-w-6xl mx-auto px-6">
      <h1 className="text-4xl font-bold mb-12 text-center">Gallery</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryImages.map((image) => (
          <ImageCard key={image.id} image={image} />
        ))}
      </div>
    </div>
  </div>
));

Gallery.displayName = 'Gallery';

export default Gallery;
