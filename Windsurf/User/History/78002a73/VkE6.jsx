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
