// Dynamic import of all background images from /src/assets/Pics/RandomBackgroundPics/directory
// Uses Vite's import.meta.glob to automatically detect image files
const imageModules = import.meta.glob('/src/assets/Pics/RandomBackgroundPics/*.{jpeg,jpg,png,webp}', { 
  eager: true, 
  query: '?url', 
  import: 'default' 
});

// Extract file paths from imported modules
export const backgroundImages = Object.values(imageModules);

// Get a random background image
export const getRandomBackgroundImage = () => {
  const randomIndex = Math.floor(Math.random() * backgroundImages.length);
  return backgroundImages[randomIndex];
};

// Preload an image with error handling
export const preloadBackgroundImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(src);
    img.onerror = () => {
      // Fallback to a default image or reject
      reject(new Error(`Failed to load image: ${src}`));
    };
    img.src = src;
  });
};

// Get multiple random images for preloading
export const getRandomBackgroundImages = (count = 3) => {
  const shuffled = [...backgroundImages].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
