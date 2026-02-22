import React, { useEffect, useRef, useState } from 'react';
import { init } from '@waline/client';
import { motion, AnimatePresence } from 'framer-motion';

const Comments = ({ path = window.location.pathname }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const walineContainerRef = useRef(null);
  const walineInstanceRef = useRef(null);

  const initializeWaline = () => {
    if (!walineContainerRef.current || isInitialized) return;

    // Check if server URL is available
    const serverURL = import.meta.env.VITE_WALINE_SERVER_URL;
    if (!serverURL) {
      console.error('Waline server URL not found in environment variables');
      return;
    }

    try {
      // Initialize Waline with error handling
      const walineInstance = init({
        el: walineContainerRef.current,
        serverURL: serverURL,
        path: path,
        dark: true,
        meta: ['nick', 'mail'],
        requiredMeta: ['nick'],
        lang: 'zh-CN',
        pageview: false, // Disable pageview counter
        comment: true, // Enable comment loading for submit functionality
        emoji: [
          '//unpkg.com/@waline/emojis@1.1.0/bilibili',
          '//unpkg.com/@waline/emojis@1.1.0/qq',
          '//unpkg.com/@waline/emojis@1.1.0/tieba',
        ],
      });

      walineInstanceRef.current = walineInstance;
      setIsInitialized(true);
      
    } catch (error) {
      console.error('Error initializing Waline:', error);
      // Show error message to user
      if (walineContainerRef.current) {
        walineContainerRef.current.innerHTML = `
          <div style="color: #9ca3af; text-align: center; padding: 20px; font-size: 14px;">
            Comments are temporarily unavailable. Please try again later.
          </div>
        `;
      }
    }
  };

  useEffect(() => {
    if (isExpanded && !isInitialized) {
      initializeWaline();
    }

    // Cleanup function
    return () => {
      if (walineInstanceRef.current && typeof walineInstanceRef.current.destroy === 'function') {
        try {
          walineInstanceRef.current.destroy();
          walineInstanceRef.current = null;
          setIsInitialized(false);
        } catch (error) {
          console.warn('Error destroying Waline instance:', error);
        }
      }
    };
  }, [isExpanded]); // Remove isInitialized from dependencies to prevent infinite loop

  return (
    <div className="w-full">
      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors duration-200 border border-gray-600/30 rounded-full hover:border-gray-500/50 bg-gray-800/20 backdrop-blur-sm"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <svg 
          className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
        {isExpanded ? 'Hide Comments' : 'Show Comments'}
      </motion.button>

      {/* Collapsible Comments Container */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ 
              opacity: { duration: 0.2 },
              height: { duration: 0.3, ease: 'easeInOut' }
            }}
            className="overflow-hidden"
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="mt-4"
            >
              <style>{`
                /* Minimal Waline Overrides */
                .waline-container {
                  --waline-bg-color: transparent !important;
                  --waline-bg-color-light: transparent !important;
                  --waline-bg-color-hover: rgba(255, 255, 255, 0.05) !important;
                  --waline-border-color: rgba(255, 255, 255, 0.1) !important;
                  --waline-color: #e5e7eb !important;
                  --waline-info-color: #9ca3af !important;
                  --waline-text-color: #e5e7eb !important;
                  --waline-theme-color: #8b5cf6 !important;
                  --waline-active-color: #a78bfa !important;
                  --waline-font-size: 14px !important;
                  --waline-widget-margin: 4px !important;
                }

                /* Base Container */
                .waline-container {
                  background: transparent !important;
                  border: none !important;
                  padding: 0 !important;
                  margin: 0 !important;
                }

                /* Editor - Transparent with thin border */
                .waline-container .wl-editor {
                  background: transparent !important;
                  border: 1px solid rgba(255, 255, 255, 0.1) !important;
                  border-radius: 12px !important;
                  margin-bottom: 8px !important;
                }

                .waline-container .wl-editor textarea {
                  background: transparent !important;
                  color: #e5e7eb !important;
                  font-size: 14px !important;
                  padding: 8px 12px !important;
                }

                .waline-container .wl-editor textarea::placeholder {
                  color: #9ca3af !important;
                }

                /* Meta Inputs - Transparent with thin border */
                .waline-container .wl-meta-input {
                  background: transparent !important;
                  border: 1px solid rgba(255, 255, 255, 0.1) !important;
                  border-radius: 20px !important;
                  color: #e5e7eb !important;
                  font-size: 13px !important;
                  padding: 6px 12px !important;
                }

                .waline-container .wl-meta-input:focus {
                  border-color: #8b5cf6 !important;
                  outline: none !important;
                }

                /* Submit Button - Minimal style */
                .waline-container .wl-btn {
                  background: rgba(139, 92, 246, 0.2) !important;
                  border: 1px solid rgba(139, 92, 246, 0.3) !important;
                  border-radius: 20px !important;
                  color: #8b5cf6 !important;
                  font-size: 12px !important;
                  font-weight: 500 !important;
                  padding: 6px 16px !important;
                  transition: all 0.2s ease !important;
                }

                .waline-container .wl-btn:hover {
                  background: rgba(139, 92, 246, 0.3) !important;
                  border-color: rgba(139, 92, 246, 0.5) !important;
                }

                /* Comment Items - Minimal styling */
                .waline-container .wl-item {
                  background: transparent !important;
                  border: none !important;
                  border-radius: 0 !important;
                  padding: 8px 0 !important;
                  margin-bottom: 4px !important;
                  border-bottom: 1px solid rgba(255, 255, 255, 0.05) !important;
                }

                .waline-container .wl-nick {
                  color: white !important;
                  font-weight: 600 !important;
                  font-size: 13px !important;
                  background-color: transparent !important;
                }
                .waline-container .wl-mail {
                  background-color: transparent !important;
                }

                .waline-container .wl-time {
                  color: #9ca3af !important;
                  font-size: 11px !important;
                }

                .waline-container .wl-content {
                  color: #e5e7eb !important;
                  line-height: 1.5 !important;
                  font-size: 14px !important;
                }

                .waline-container .wl-content a {
                  color: #8b5cf6 !important;
                  text-decoration: none !important;
                }

                .waline-container .wl-content a:hover {
                  text-decoration: underline !important;
                }

                /* Navigation - Minimal */
                .waline-container .wl-sort {
                  border-bottom: 1px solid rgba(255, 255, 255, 0.05) !important;
                  margin-bottom: 8px !important;
                }

                .waline-container .wl-sort button {
                  color: #9ca3af !important;
                  border: none !important;
                  background: transparent !important;
                  font-size: 11px !important;
                  padding: 2px 6px !important;
                }

                .waline-container .wl-sort button:hover,
                .waline-container .wl-sort button.active {
                  color: #8b5cf6 !important;
                }

                /* Pagination - Minimal */
                .waline-container .wl-page-button {
                  background: transparent !important;
                  border: 1px solid rgba(255, 255, 255, 0.1) !important;
                  border-radius: 15px !important;
                  color: #9ca3af !important;
                  font-size: 11px !important;
                  padding: 4px 10px !important;
                }

                .waline-container .wl-page-button:hover {
                  border-color: #8b5cf6 !important;
                  color: #8b5cf6 !important;
                }

                .waline-container .wl-page-button.active {
                  background: rgba(139, 92, 246, 0.2) !important;
                  border-color: #8b5cf6 !important;
                  color: #8b5cf6 !important;
                }

                /* Loading and Empty States */
                .waline-container .wl-loading,
                .waline-container .wl-empty {
                  color: #9ca3af !important;
                  text-align: center !important;
                  padding: 12px !important;
                  font-size: 12px !important;
                }

                .waline-container .wl-count {
                  color: #9ca3af !important;
                  font-size: 11px !important;
                  margin-bottom: 8px !important;
                }
              `}</style>
              
              <div 
                ref={walineContainerRef}
                className="waline-container"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Comments;
