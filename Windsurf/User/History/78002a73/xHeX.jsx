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
    <div className="max-w-full mx-auto my-16 px-0">
      <div ref={walineContainerRef} />
      <style>{`
        /* Dark glassmorphism theme for Waline */
        :root {
          --waline-bgcolor: transparent !important;
          --waline-bgcolor-light: rgba(0, 0, 0, 0.2) !important;
          --waline-border-color: rgba(255, 255, 255, 0.1) !important;
          --waline-theme-color: #60a5fa !important;
          --waline-active-color: #3b82f6 !important;
        }
        
        /* Main container - dark glassmorphism */
        .wl-panel {
          background: rgba(0, 0, 0, 0.2) !important;
          backdrop-filter: blur(12px) !important;
          -webkit-backdrop-filter: blur(12px) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          border-radius: 12px !important;
          padding: 24px !important;
          color: #e2e8f0 !important;
        }
        
        /* Input fields - dark glassmorphism */
        .wl-input,
        .wl-meta-input {
          background: rgba(0, 0, 0, 0.2) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          border-radius: 8px !important;
          color: #e2e8f0 !important;
          padding: 12px !important;
        }
        
        .wl-input::placeholder,
        .wl-meta-input::placeholder {
          color: #9ca3af !important;
        }
        
        .wl-input:focus,
        .wl-meta-input:focus {
          outline: none !important;
          border-color: rgba(96, 165, 250, 0.5) !important;
          box-shadow: 0 0 0 2px rgba(96, 165, 250, 0.1) !important;
        }
        
        /* Editor textarea - dark glassmorphism */
        .wl-editor {
          background: rgba(0, 0, 0, 0.2) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          border-radius: 8px !important;
          color: #e2e8f0 !important;
        }
        
        .wl-editor textarea {
          background: transparent !important;
          color: #e2e8f0 !important;
          padding: 16px !important;
          min-height: 120px !important;
          resize: vertical !important;
        }
        
        .wl-editor textarea::placeholder {
          color: #9ca3af !important;
        }
        
        /* Comment cards - dark glassmorphism */
        .wl-card,
        .wl-item {
          background: rgba(0, 0, 0, 0.15) !important;
          border: 1px solid rgba(255, 255, 255, 0.05) !important;
          border-radius: 8px !important;
          color: #e2e8f0 !important;
          padding: 16px !important;
          margin-bottom: 12px !important;
        }
        
        /* Submit button - glassmorphism style */
        .wl-btn {
          background: rgba(96, 165, 250, 0.2) !important;
          border: 1px solid rgba(96, 165, 250, 0.3) !important;
          border-radius: 6px !important;
          color: #e2e8f0 !important;
          padding: 10px 24px !important;
          font-weight: 500 !important;
          transition: all 0.2s ease !important;
        }
        
        .wl-btn:hover {
          background: rgba(96, 165, 250, 0.3) !important;
          border-color: rgba(96, 165, 250, 0.5) !important;
          transform: translateY(-1px) !important;
        }
        
        /* Hide unwanted elements */
        .wl-upload,
        .wl-upload *,
        input[type="file"],
        .wl-gif-popup,
        .wl-search,
        .wl-power,
        .wl-powered {
          display: none !important;
        }
        
        /* Text colors for better visibility */
        .wl-nick,
        .wl-link,
        .wl-content {
          color: #e2e8f0 !important;
        }
        
        .wl-time,
        .wl-meta {
          color: #9ca3af !important;
        }
        
        /* Pagination - dark theme */
        .wl-page-button {
          background: rgba(255, 255, 255, 0.05) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          border-radius: 4px !important;
          color: #e2e8f0 !important;
          padding: 6px 12px !important;
          margin: 0 2px !important;
        }
        
        .wl-page-button:hover {
          background: rgba(255, 255, 255, 0.1) !important;
        }
        
        .wl-page-button.active {
          background: rgba(96, 165, 250, 0.3) !important;
          border-color: rgba(96, 165, 250, 0.5) !important;
        }
        
        /* Loading and empty states */
        .wl-loading,
        .wl-empty {
          color: #9ca3af !important;
          text-align: center !important;
          padding: 40px 0 !important;
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
          .wl-panel {
            padding: 16px !important;
            margin: 0 8px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Comments;