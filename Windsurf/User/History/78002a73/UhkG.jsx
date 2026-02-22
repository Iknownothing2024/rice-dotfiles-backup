import React, { useEffect, useRef, useState } from 'react';
import { init } from '@waline/client';
import { motion, AnimatePresence } from 'framer-motion';

const Comments = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const walineContainerRef = useRef(null);
  const walineInstanceRef = useRef(null);

  const initializeWaline = async () => {
    if (!walineContainerRef.current || isInitialized) return;
    
    setIsLoading(true);
    try {
      walineInstanceRef.current = init({
        el: walineContainerRef.current,
        serverURL: 'https://hitomiwaline.vercel.app/',
        path: window.location.pathname,
        imageUploader: false,
        search: false,
        // 添加更多配置选项
        reaction: true, // 启用表情反应
        emoji: [
          'https://cdn.jsdelivr.net/gh/walinejs/emojis@latest/weibo',
          'https://cdn.jsdelivr.net/gh/walinejs/emojis@latest/qq',
        ],
        dark: 'html[class="dark"]', // 暗黑模式支持
        login: 'enable', // 登录方式
      });

      setIsInitialized(true);
      console.log('Waline initialized successfully');
    } catch (error) {
      console.error('Error initializing Waline:', error);
      // 可以在这里添加错误处理UI
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggle = () => {
    const newState = !isExpanded;
    setIsExpanded(newState);
    
    // 如果展开且未初始化，则初始化
    if (newState && !isInitialized) {
      initializeWaline();
    }
  };

  useEffect(() => {
    // 仅在展开时初始化
    if (isExpanded && !isInitialized) {
      initializeWaline();
    }
  }, [isExpanded]);

  // 组件卸载时清理
  useEffect(() => {
    return () => {
      if (walineInstanceRef.current?.destroy) {
        try {
          walineInstanceRef.current.destroy();
          console.log('Waline instance destroyed');
        } catch (error) {
          console.warn('Error destroying Waline instance:', error);
        }
      }
    };
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* 按钮区域 */}
      <div className="flex items-center justify-between mb-4">
        <motion.button
          onClick={handleToggle}
          className="group flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-gray-300 hover:text-white transition-all duration-300 border border-gray-600/30 rounded-full hover:border-purple-500/50 bg-gradient-to-r from-gray-800/30 to-gray-900/20 backdrop-blur-sm hover:from-purple-900/20 hover:to-blue-900/20"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          disabled={isLoading}
        >
          {/* 加载动画 */}
          {isLoading && (
            <svg className="animate-spin h-4 w-4 text-purple-500" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          )}
          
          <svg 
            className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
          
          <span className="transition-colors duration-300">
            {isLoading ? 'Loading...' : isExpanded ? 'Hide Comments' : 'Show Comments'}
          </span>
          
          <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
            {isExpanded ? '−' : '+'}
          </span>
        </motion.button>
        
        {/* 评论数量显示（需要Waline支持） */}
        {isInitialized && (
          <div className="text-sm text-gray-400">
            <span className="text-purple-400 font-medium">Comments</span>
            <span className="mx-2">•</span>
            <span>Powered by Waline</span>
          </div>
        )}
      </div>

      {/* 评论容器 */}
      <AnimatePresence mode="wait">
        {isExpanded && (
          <motion.div
            key="comments-container"
            initial={{ opacity: 0, height: 0 }}
            animate={{ 
              opacity: 1, 
              height: 'auto',
              transition: {
                opacity: { duration: 0.3 },
                height: { duration: 0.4, ease: "easeInOut" }
              }
            }}
            exit={{ 
              opacity: 0, 
              height: 0,
              transition: {
                opacity: { duration: 0.2 },
                height: { duration: 0.3 }
              }
            }}
            className="overflow-hidden"
          >
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="mt-4 relative"
            >
              {/* 加载状态 */}
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900/80 backdrop-blur-sm rounded-xl z-10">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-500 mx-auto mb-3"></div>
                    <p className="text-gray-300">Loading comments...</p>
                  </div>
                </div>
              )}
              
              {/* 自定义样式 */}
              <style jsx global>{`
                .waline-container {
                  --waline-theme-color: #8b5cf6;
                  --waline-active-color: #7c3aed;
                  --waline-bg-color: transparent;
                  --waline-bg-color-light: rgba(30, 41, 59, 0.5);
                  --waline-border-color: rgba(255, 255, 255, 0.1);
                  --waline-text-color: #e5e7eb;
                  --waline-info-text-color: #9ca3af;
                  --waline-border: 1px solid var(--waline-border-color);
                }

                .wl-panel {
                  background: rgba(15, 23, 42, 0.7) !important;
                  backdrop-filter: blur(16px) saturate(180%) !important;
                  -webkit-backdrop-filter: blur(16px) saturate(180%) !important;
                  border: 1px solid rgba(255, 255, 255, 0.125) !important;
                  border-radius: 1.25rem !important;
                  box-shadow: 
                    0 4px 32px rgba(0, 0, 0, 0.2),
                    inset 0 1px 0 rgba(255, 255, 255, 0.05) !important;
                  overflow: hidden !important;
                }

                .wl-header {
                  padding: 1.5rem !important;
                  background: linear-gradient(
                    to bottom,
                    rgba(255, 255, 255, 0.03),
                    transparent
                  ) !important;
                }

                .wl-editor {
                  background: rgba(30, 41, 59, 0.5) !important;
                  border: 1px solid rgba(255, 255, 255, 0.1) !important;
                  border-radius: 0.75rem !important;
                  transition: all 0.2s ease !important;
                }

                .wl-editor:focus-within {
                  border-color: rgba(139, 92, 246, 0.5) !important;
                  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1) !important;
                }

                .wl-input {
                  background: transparent !important;
                  color: #e5e7eb !important;
                  font-size: 0.95rem !important;
                }

                .wl-input::placeholder {
                  color: #94a3b8 !important;
                }

                .wl-btn {
                  background: linear-gradient(
                    135deg,
                    rgba(139, 92, 246, 0.9),
                    rgba(124, 58, 237, 0.9)
                  ) !important;
                  border: 1px solid rgba(139, 92, 246, 0.3) !important;
                  border-radius: 0.75rem !important;
                  font-weight: 600 !important;
                  letter-spacing: 0.01em !important;
                  transition: all 0.2s ease !important;
                  box-shadow: 
                    0 2px 10px rgba(139, 92, 246, 0.2),
                    inset 0 1px 0 rgba(255, 255, 255, 0.1) !important;
                }

                .wl-btn:hover {
                  transform: translateY(-1px) !important;
                  box-shadow: 
                    0 4px 20px rgba(139, 92, 246, 0.3),
                    inset 0 1px 0 rgba(255, 255, 255, 0.1) !important;
                }

                .wl-item {
                  background: rgba(30, 41, 59, 0.3) !important;
                  border: 1px solid rgba(255, 255, 255, 0.05) !important;
                  border-radius: 0.75rem !important;
                  margin-bottom: 1rem !important;
                  transition: all 0.2s ease !important;
                }

                .wl-item:hover {
                  background: rgba(30, 41, 59, 0.5) !important;
                  border-color: rgba(139, 92, 246, 0.2) !important;
                }

                /* 响应式调整 */
                @media (max-width: 640px) {
                  .wl-panel {
                    border-radius: 1rem !important;
                    padding: 1rem !important;
                  }
                  
                  .wl-header {
                    padding: 1rem !important;
                  }
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