import React, { useEffect, useRef } from 'react';
import { init } from '@waline/client';

const Comments = () => {
  const walineContainerRef = useRef(null);
  const walineInstanceRef = useRef(null);

  useEffect(() => {
    if (!walineContainerRef.current) return;

    // Initialize Waline with default configuration
    walineInstanceRef.current = init({
      el: walineContainerRef.current,
      serverURL: import.meta.env.VITE_WALINE_SERVER_URL || 'https://hitomiwaline.vercel.app/',
      path: window.location.pathname,
      dark: 'auto', // Support system theme preference
    });

    // Cleanup function to prevent duplicate comment boxes
    return () => {
      if (walineInstanceRef.current) {
        walineInstanceRef.current.destroy();
        walineInstanceRef.current = null;
      }
    };
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div className="max-w-4xl mx-auto my-8">
      <div ref={walineContainerRef} />
    </div>
  );
};

export default Comments;