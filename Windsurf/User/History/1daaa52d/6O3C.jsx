import React, { memo } from 'react';
import { useRandomBackground } from '../hooks/useRandomBackground';

const Background = memo(() => {
  const { backgroundImage, isLoading, error, hasBackground } = useRandomBackground();

  const backgroundStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    zIndex: -1,
    transition: 'opacity 0.5s ease-in-out',
  };

  // If we have a valid background image, use it
  if (hasBackground) {
    backgroundStyle.backgroundImage = `url(${backgroundImage})`;
  } else {
    // Fallback gradient background
    backgroundStyle.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
  }

  // Add overlay for better text readability
  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: -1,
    pointerEvents: 'none',
  };

  return (
    <>
      {/* Background Image or Gradient */}
      <div 
        style={{
          ...backgroundStyle,
          opacity: isLoading ? 0 : 1,
        }}
      />
      
      {/* Dark Overlay for better text readability */}
      <div style={overlayStyle} />
      
      {/* Loading indicator (optional - can be removed for cleaner look) */}
      {isLoading && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            zIndex: -1,
          }}
        />
      )}
    </>
  );
});

Background.displayName = 'Background';

export default Background;
