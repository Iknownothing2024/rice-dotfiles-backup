import React, { useEffect, useRef, useState } from 'react';
import { init } from '@waline/client';
import { motion, AnimatePresence } from 'framer-motion';
import '@waline/client/dist/waline.css';

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
      walineInstance.current = init({
  el: containerRef.current,
  serverURL: 'https://hitomiwaline.vercel.app/',
  path: window.location.pathname,
  
  // 核心：关闭那些破坏简洁感的扩展功能
  imageUploader: false, // 关掉大大的 Browse
  search: false,        // 关掉 GIF 搜索
  
  // 保持默认表情包（或者选一个官方推荐的）
  emoji: [
    '//unpkg.com/@waline/emojis@1.1.0/tieba',
  ],
  
  // 确保开启暗黑模式自动跟随（如果你的项目支持）
  dark: 'auto', 
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
