import React, { memo } from 'react';
import { useRandomBackground } from '../hooks/useRandomBackground';

const Background = memo(() => {
  const { backgroundImage, isLoading, error, hasBackground } = useRandomBackground();

  return (
    <>
      {/* Background Image Layer */}
      {hasBackground && !isLoading && (
        <img
          src={backgroundImage}
          alt="Background"
          className="fixed inset-0 w-full h-full object-cover object-[85%_center] -z-10"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            objectFit: 'cover',
            objectPosition: '50% center', // Ensure the character on the right is prioritized
            zIndex: -10,
            transition: 'opacity 0.8s ease-in-out',
            opacity: isLoading ? 0 : 1,
          }}
        />
      )}
      
      {/* Overlay/Mask Layer - Gradient from left to right for text readability */}
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'linear-gradient(to right, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.3) 40%, rgba(0, 0, 0, 0.1) 70%, transparent 100%)',
          zIndex: -9,
          pointerEvents: 'none',
        }}
      />
      
      {/* Fallback Gradient Background */}
      {(!hasBackground || isLoading) && (
        <div
          className="fixed inset-0 -z-10"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            zIndex: -10,
          }}
        />
      )}
    </>
  );
});

Background.displayName = 'Background';

export default Background;
