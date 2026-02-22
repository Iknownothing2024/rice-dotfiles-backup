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
      meta: ['nick', 'mail'], // Only nickname and email fields
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
        /* Uniform glassmorphism theme for Waline */
        :root {
          --waline-bgcolor: transparent !important;
          --waline-bgcolor-light: rgba(15, 23, 42, 0.4) !important;
          --waline-border-color: rgba(255, 255, 255, 0.1) !important;
          --waline-theme-color: #60a5fa !important;
          --waline-active-color: #3b82f6 !important;
        }
        
        /* Main container - uniform glassmorphism */
        .wl-panel {
          background: rgba(15, 23, 42, 0.4) !important;
          backdrop-filter: blur(12px) !important;
          -webkit-backdrop-filter: blur(12px) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          border-radius: 12px !important;
          padding: 24px !important;
          color: #e5e7eb !important;
        }
        
        /* Input fields - compact uniform glassmorphism */
        .wl-input,
        .wl-meta-input {
          background: rgba(15, 23, 42, 0.4) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          border-radius: 6px !important;
          color: #e5e7eb !important;
          padding: 8px 12px !important;
          height: 36px !important;
          font-size: 13px !important;
          max-width: none !important;
          margin: 0 !important;
        }
        
        /* Label spacing */
        .wl-meta label {
          margin-right: 15px !important;
          color: #e5e7eb !important;
        }
        
        .wl-input::placeholder,
        .wl-meta-input::placeholder {
          color: #e5e7eb !important;
          opacity: 0.7 !important;
        }
        
        .wl-input:focus,
        .wl-meta-input:focus {
          outline: none !important;
          border-color: rgba(96, 165, 250, 0.5) !important;
          box-shadow: 0 0 0 2px rgba(96, 165, 250, 0.1) !important;
        }
        
        /* Editor textarea - full width uniform glassmorphism */
        .wl-editor {
          background: rgba(15, 23, 42, 0.4) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          border-radius: 8px !important;
          color: #e5e7eb !important;
          width: 100% !important;
          max-width: none !important;
          margin: 0 !important;
        }
        
        .wl-editor textarea {
          background: transparent !important;
          color: #e5e7eb !important;
          padding: 16px !important;
          min-height: 180px !important;
          resize: vertical !important;
          width: 100% !important;
          font-size: 14px !important;
        }
        
        .wl-editor textarea::placeholder {
          color: #e5e7eb !important;
          opacity: 0.7 !important;
        }
        
        /* Comment items - matching glassmorphism style */
        .wl-card,
        .wl-item {
          background: rgba(0, 0, 0, 0.2) !important;
          backdrop-filter: blur(12px) !important;
          -webkit-backdrop-filter: blur(12px) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          border-radius: 8px !important;
          color: #e5e7eb !important;
          padding: 16px !important;
          margin-bottom: 12px !important;
        }
        
        /* Separator between editor and comments */
        .wl-editor + .wl-list,
        .wl-preview + .wl-list {
          border-top: 1px solid rgba(255, 255, 255, 0.1) !important;
          margin-top: 20px !important;
          padding-top: 20px !important;
        }
        
        /* Button spacing */
        .wl-actions {
          gap: 12px !important;
        }
        
        .wl-btn {
          margin-left: 12px !important;
        }
        
        /* Icon spacing in editor toolbar */
        .wl-editor .wl-icons button,
        .wl-editor .wl-preview button {
          margin: 0 4px !important;
          padding: 4px !important;
        }
        
        /* Text colors - consistent gray-200 */
        .wl-nick,
        .wl-link,
        .wl-content,
        .wl-header {
          color: #e5e7eb !important;
        }
        
        .wl-time,
        .wl-meta {
          color: #e5e7eb !important;
          opacity: 0.8 !important;
        }
        
        /* Submit button - compact glassmorphism style */
        .wl-btn {
          background: rgba(96, 165, 250, 0.2) !important;
          border: 1px solid rgba(96, 165, 250, 0.3) !important;
          border-radius: 8px !important;
          color: #e5e7eb !important;
          padding: 4px 12px !important;
          font-size: 12px !important;
          font-weight: 640 !important;
          transition: all 0.2s ease !important;
          height: 32px !important;
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
        
        /* Additional unwanted components to hide */
        .wl-text-number,
        .wl-meta-head,
        .wl-user {
          display: none !important;
        }
        
        /* Comment items - uniform glassmorphism style */
        .wl-card,
        .wl-item {
          background: rgba(15, 23, 42, 0.4) !important;
          backdrop-filter: blur(12px) !important;
          -webkit-backdrop-filter: blur(12px) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          border-radius: 12px !important;
          color: #e5e7eb !important;
          padding: 20px !important;
          margin-bottom: 16px !important;
        }
        
        /* Flat glass design - remove layered shadows and varying shades */
        .wl-head,
        .wl-meta,
        .wl-content,
        .wl-quote {
          background: transparent !important;
          box-shadow: none !important;
          color: #e5e7eb !important;
        }
        
        /* Quote styling with subtle left border */
        .wl-quote {
          border-left: 3px solid rgba(96, 165, 250, 0.5) !important;
          padding-left: 16px !important;
          margin: 12px 0 !important;
        }
        
        /* Text colors - uniform gray-200 */
        .wl-nick,
        .wl-link,
        .wl-content,
        .wl-header {
          color: #e5e7eb !important;
        }
        
        .wl-time,
        .wl-meta {
          color: #e5e7eb !important;
          opacity: 0.8 !important;
        }
        
        /* Pagination - uniform theme */
        .wl-page-button {
          background: rgba(15, 23, 42, 0.4) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          border-radius: 4px !important;
          color: #e5e7eb !important;
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