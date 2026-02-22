import React, { useEffect, useRef, useState } from 'react';
import { init } from '@waline/client';
import { motion, AnimatePresence } from 'framer-motion';

const Comments = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const walineContainerRef = useRef(null);
  const walineInstanceRef = useRef(null);

  const initializeWaline = () => {
    if (!walineContainerRef.current || isInitialized) return;

    try {
      walineInstanceRef.current = init({
        el: walineContainerRef.current,
        serverURL: 'https://hitomiwaline.vercel.app/',
        path: window.location.pathname,
        imageUploader: false,
        search: false,
      });

      setIsInitialized(true);
    } catch (error) {
      console.error('Error initializing Waline:', error);
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
  }, [isExpanded]);

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
                /* Glassmorphism Styling for Waline */
                :root {
                  --waline-bg-color: transparent !important;
                }

                /* Main Waline Panel */
                .wl-panel {
                  background: rgba(255, 255, 255, 0.1) !important;
                  backdrop-filter: blur(12px) !important;
                  -webkit-backdrop-filter: blur(12px) !important;
                  border: 1px solid rgba(255, 255, 255, 0.2) !important;
                  border-radius: 1rem !important;
                  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1) !important;
                }

                /* Editor Area */
                .wl-editor {
                  background: rgba(255, 255, 255, 0.05) !important;
                  border: 1px solid rgba(255, 255, 255, 0.1) !important;
                  border-radius: 0.5rem !important;
                }

                .wl-editor textarea {
                  background: transparent !important;
                  color: #e5e7eb !important;
                }

                .wl-editor textarea::placeholder {
                  color: #9ca3af !important;
                }

                /* Meta Input Fields */
                .wl-meta-input {
                  background: transparent !important;
                  border: 1px solid rgba(255, 255, 255, 0.1) !important;
                  border-radius: 0.5rem !important;
                  color: #e5e7eb !important;
                }

                .wl-meta-input:focus {
                  border-color: #8b5cf6 !important;
                  box-shadow: 0 0 0 2px rgba(139, 92, 246, 0.2) !important;
                }

                /* Submit Button */
                .wl-btn {
                  background: rgba(139, 92, 246, 0.8) !important;
                  border: 1px solid rgba(139, 92, 246, 0.3) !important;
                  border-radius: 0.5rem !important;
                  color: white !important;
                  font-weight: 500 !important;
                }

                .wl-btn:hover {
                  background: rgba(139, 92, 246, 1) !important;
                  border-color: rgba(139, 92, 246, 0.5) !important;
                  transform: translateY(-1px) !important;
                }

                /* Comment Items */
                .wl-item {
                  background: transparent !important;
                  border: 1px solid rgba(255, 255, 255, 0.05) !important;
                  border-radius: 0.5rem !important;
                  margin-bottom: 0.75rem !important;
                }

                .wl-nick {
                  background: transparent !important;
                  color: #8b5cf6 !important;
                  font-weight: 600 !important;
                }

                .wl-time {
                  color: #9ca3af !important;
                  font-size: 0.875rem !important;
                }

                .wl-content {
                  color: #e5e7eb !important;
                  line-height: 1.6 !important;
                }

                .wl-content a {
                  color: #8b5cf6 !important;
                  text-decoration: none !important;
                }

                .wl-content a:hover {
                  text-decoration: underline !important;
                }

                /* Navigation */
                .wl-sort {
                  border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
                }

                .wl-sort button {
                  color: #9ca3af !important;
                  background: transparent !important;
                  border: none !important;
                }

                .wl-sort button:hover,
                .wl-sort button.active {
                  color: #8b5cf6 !important;
                }

                /* Pagination */
                .wl-page-button {
                  background: transparent !important;
                  border: 1px solid rgba(255, 255, 255, 0.1) !important;
                  border-radius: 0.5rem !important;
                  color: #9ca3af !important;
                }

                .wl-page-button:hover {
                  background: rgba(255, 255, 255, 0.1) !important;
                  border-color: #8b5cf6 !important;
                  color: #8b5cf6 !important;
                }

                .wl-page-button.active {
                  background: rgba(139, 92, 246, 0.8) !important;
                  border-color: #8b5cf6 !important;
                  color: white !important;
                }

                /* Loading and Empty States */
                .wl-loading,
                .wl-empty {
                  color: #9ca3af !important;
                  text-align: center !important;
                }

                .wl-count {
                  color: #9ca3af !important;
                  margin-bottom: 1rem !important;
                }
              `}</style>
              
              <div 
                ref={walineContainerRef}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Comments;
