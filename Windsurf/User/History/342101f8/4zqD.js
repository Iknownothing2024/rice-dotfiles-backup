// Array of background images from /assets/Pics directory
// This avoids client-side directory scanning for better performance
export const backgroundImages = [
  '/Pics/gallery1.jpeg',
  '/Pics/gallery2.jpeg',
  '/Pics/gallery3.jpeg',
  '/Pics/gallery4.jpeg',
  '/Pics/gallery5.jpeg',
  '/Pics/gallery6.png',
  '/Pics/gallery7.jpeg',
  '/Pics/gallery8.jpeg',
  '/Pics/max.png',
  '/Pics/【哲风壁纸】WLOP-人物.png',
  '/Pics/【哲风壁纸】WLOP-人物与狮子.png',
  '/Pics/【哲风壁纸】WLOP-人物插画.png',
  '/Pics/【哲风壁纸】WLOP-美女-鬼刀.png',
  '/Pics/【哲风壁纸】WLOP-露背写真.png',
  '/Pics/【哲风壁纸】云-伊斯梅尔·因乔格鲁.png',
  '/Pics/【哲风壁纸】伊斯梅尔·因乔格鲁-城堡.png',
  '/Pics/【哲风壁纸】动漫画风-鬼刀风铃.png',
  '/Pics/【哲风壁纸】动漫画风鬼刀风铃.png',
  '/Pics/【哲风壁纸】场景艺术-素描艺术品.png',
  '/Pics/【哲风壁纸】日落-海边-海鸥.png',
  '/Pics/鬼刀风铃.png'
];

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
      console.warn(`Failed to load background image: ${src}`);
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
