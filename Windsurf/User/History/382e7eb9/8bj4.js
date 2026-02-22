import { useState, useEffect } from 'react';
import { getRandomBackgroundImage, preloadBackgroundImage, getRandomBackgroundImages } from '../utils/backgroundImages';

export const useRandomBackground = () => {
  const [backgroundImage, setBackgroundImage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBackground = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Get a random background image
        const randomImage = getRandomBackgroundImage();
        
        // Preload the image to ensure it loads properly
        await preloadBackgroundImage(randomImage);
        
        setBackgroundImage(randomImage);
      } catch (err) {
        console.error('Error loading background image:', err);
        setError(err.message);
        
        // Fallback to a simple gradient background
        setBackgroundImage('');
      } finally {
        setIsLoading(false);
      }
    };

    loadBackground();
  }, []);

  return {
    backgroundImage,
    isLoading,
    error,
    hasBackground: !!backgroundImage && !error
  };
};
