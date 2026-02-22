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
        reaction: true,
        emoji: [
          'https://cdn.jsdelivr.net/gh/walinejs/emojis@latest/weibo',
          'https://cdn.jsdelivr.net/gh/walinejs/emojis@latest/qq',
        ],
        dark: false, // 禁用暗黑模式，使用浅色主题
        login: 'enable',
      });

      setIsInitialized(true);
    } catch (error) {
      console.error('Error initializing Waline:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggle = () => {
    const newState = !isExpanded;
    setIsExpanded(newState);
    
    if (newState && !isInitialized) {
      initializeWaline();
    }
  };

  useEffect(() => {
    if (isExpanded && !isInitialized) {
      initializeWaline();
    }
  }, [isExpanded]);

  useEffect(() => {
    return () => {
      if (walineInstanceRef.current?.destroy) {
        try {
          walineInstanceRef.current.destroy();
        } catch (error) {
          console.warn('Error destroying Waline instance:', error);
        }
      }
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
      {/* 扩大按钮区域 */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-3">
          <motion.button
            onClick={handleToggle}
            className="group relative flex items-center justify-center gap-3 px-8 py-4 text-base font-medium transition-all duration-300 rounded-2xl"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            disabled={isLoading}
            style={{
              background: 'rgba(255, 255, 255, 0.25)',
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              border: '1px solid rgba(255, 255, 255, 0.5)',
              boxShadow: `
                0 8px 32px rgba(0, 0, 0, 0.08),
                inset 0 1px 0 rgba(255, 255, 255, 0.6)
              `,
              color: '#4b5563',
              minWidth: '200px'
            }}
          >
            {/* 玻璃质感边框效果 */}
            <div 
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 100%)',
                mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                maskComposite: 'exclude',
                WebkitMaskComposite: 'xor',
                padding: '1px'
              }}
            />
            
            {isLoading && (
              <svg 
                className="animate-spin h-5 w-5" 
                style={{ color: '#6b7280' }} 
                fill="none" 
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            )}
            
            <svg 
              className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            
            <span className="font-semibold tracking-wide">
              {isLoading ? '正在加载...' : isExpanded ? '收起评论' : '展开评论'}
            </span>
            
            <span className="px-3 py-1 text-sm rounded-full bg-white/50 border border-white/60 text-gray-600">
              {isExpanded ? '−' : '+'}
            </span>
          </motion.button>
          
          {/* 辅助信息 */}
          <div 
            className="hidden sm:block text-sm px-4 py-2 rounded-xl"
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              color: '#6b7280'
            }}
          >
            <span className="font-medium text-gray-600">评论</span>
            <span className="mx-2 opacity-50">•</span>
            <span>Powered by Waline</span>
          </div>
        </div>
        
        {/* 额外的操作按钮 */}
        {isInitialized && isExpanded && (
          <motion.button
            className="px-4 py-2 text-sm rounded-xl transition-colors"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              color: '#4b5563'
            }}
            whileHover={{
              background: 'rgba(255, 255, 255, 0.3)',
              scale: 1.05
            }}
          >
            🎯 订阅评论
          </motion.button>
        )}
      </div>

      {/* 扩大评论区域 */}
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
              className="mt-6 relative"
            >
              {/* 加载遮罩 */}
              {isLoading && (
                <div 
                  className="absolute inset-0 flex items-center justify-center rounded-2xl z-10"
                  style={{
                    background: 'rgba(255, 255, 255, 0.7)',
                    backdropFilter: 'blur(8px)'
                  }}
                >
                  <div className="text-center">
                    <div 
                      className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 mx-auto mb-4"
                      style={{ borderColor: '#9ca3af' }}
                    ></div>
                    <p className="text-gray-500 font-medium">正在加载评论...</p>
                  </div>
                </div>
              )}
              
              {/* 针对浅色背景的样式 */}
              <style jsx global>{`
                .waline-container {
                  --waline-theme-color: #6366f1;
                  --waline-active-color: #4f46e5;
                  --waline-bg-color: transparent;
                  --waline-bg-color-light: rgba(255, 255, 255, 0.5);
                  --waline-border-color: rgba(0, 0, 0, 0.08);
                  --waline-text-color: #374151;
                  --waline-info-text-color: #6b7280;
                  --waline-border: 1px solid var(--waline-border-color);
                }

                /* 主容器 - 浅色毛玻璃 */
                .wl-panel {
                  background: rgba(255, 255, 255, 0.7) !important;
                  backdrop-filter: blur(20px) saturate(200%) !important;
                  -webkit-backdrop-filter: blur(20px) saturate(200%) !important;
                  border: 1px solid rgba(255, 255, 255, 0.4) !important;
                  border-radius: 1.5rem !important;
                  box-shadow: 
                    0 10px 40px rgba(0, 0, 0, 0.08),
                    0 2px 8px rgba(0, 0, 0, 0.03),
                    inset 0 1px 0 rgba(255, 255, 255, 0.8) !important;
                  overflow: hidden !important;
                  padding: 2rem !important;
                }

                /* 头部区域 */
                .wl-header {
                  padding: 1.5rem 0 !important;
                  background: linear-gradient(
                    to bottom,
                    rgba(255, 255, 255, 0.6),
                    transparent
                  ) !important;
                }

                /* 编辑器 */
                .wl-editor {
                  background: rgba(255, 255, 255, 0.6) !important;
                  border: 1px solid rgba(0, 0, 0, 0.08) !important;
                  border-radius: 1rem !important;
                  transition: all 0.2s ease !important;
                }

                .wl-editor:focus-within {
                  background: rgba(255, 255, 255, 0.8) !important;
                  border-color: rgba(99, 102, 241, 0.3) !important;
                  box-shadow: 
                    0 0 0 4px rgba(99, 102, 241, 0.1),
                    0 2px 8px rgba(0, 0, 0, 0.05) !important;
                }

                /* 输入框 */
                .wl-input {
                  background: transparent !important;
                  color: #374151 !important;
                  font-size: 15px !important;
                  font-weight: 450 !important;
                }

                .wl-input::placeholder {
                  color: #9ca3af !important;
                  opacity: 0.7 !important;
                }

                /* 提交按钮 */
                .wl-btn {
                  background: linear-gradient(
                    135deg,
                    rgba(99, 102, 241, 0.9),
                    rgba(79, 70, 229, 0.9)
                  ) !important;
                  border: none !important;
                  border-radius: 0.875rem !important;
                  font-weight: 600 !important;
                  color: white !important;
                  transition: all 0.2s ease !important;
                  box-shadow: 
                    0 2px 12px rgba(99, 102, 241, 0.25),
                    inset 0 1px 0 rgba(255, 255, 255, 0.3) !important;
                }

                .wl-btn:hover {
                  transform: translateY(-1px) !important;
                  box-shadow: 
                    0 4px 20px rgba(99, 102, 241, 0.35),
                    inset 0 1px 0 rgba(255, 255, 255, 0.3) !important;
                }

                /* 评论项 */
                .wl-item {
                  background: rgba(255, 255, 255, 0.4) !important;
                  border: 1px solid rgba(0, 0, 0, 0.04) !important;
                  border-radius: 1rem !important;
                  margin-bottom: 1rem !important;
                  transition: all 0.2s ease !important;
                  padding: 1.25rem !important;
                }

                .wl-item:hover {
                  background: rgba(255, 255, 255, 0.6) !important;
                  box-shadow: 
                    0 4px 12px rgba(0, 0, 0, 0.05),
                    0 1px 0 rgba(255, 255, 255, 0.8) !important;
                  transform: translateY(-1px) !important;
                }

                /* 昵称 */
                .wl-nick {
                  color: #6366f1 !important;
                  font-weight: 600 !important;
                  font-size: 15px !important;
                }

                /* 时间 */
                .wl-time {
                  color: #9ca3af !important;
                  font-size: 13px !important;
                }

                /* 内容 */
                .wl-content {
                  color: #4b5563 !important;
                  line-height: 1.7 !important;
                  font-size: 15px !important;
                }

                .wl-content a {
                  color: #6366f1 !important;
                  text-decoration: none !important;
                  font-weight: 500 !important;
                }

                .wl-content a:hover {
                  text-decoration: underline !important;
                }

                /* 排序按钮 */
                .wl-sort {
                  border-bottom: 1px solid rgba(0, 0, 0, 0.06) !important;
                  padding-bottom: 1rem !important;
                  margin-bottom: 1.5rem !important;
                }

                .wl-sort button {
                  color: #6b7280 !important;
                  background: transparent !important;
                  border: none !important;
                  padding: 0.5rem 1rem !important;
                  font-size: 14px !important;
                }

                .wl-sort button:hover,
                .wl-sort button.active {
                  color: #6366f1 !important;
                  background: rgba(99, 102, 241, 0.08) !important;
                  border-radius: 0.5rem !important;
                }

                /* 分页 */
                .wl-page-button {
                  background: rgba(255, 255, 255, 0.6) !important;
                  border: 1px solid rgba(0, 0, 0, 0.08) !important;
                  border-radius: 0.75rem !important;
                  color: #6b7280 !important;
                  transition: all 0.2s ease !important;
                }

                .wl-page-button:hover {
                  background: rgba(99, 102, 241, 0.08) !important;
                  border-color: #6366f1 !important;
                  color: #6366f1 !important;
                }

                .wl-page-button.active {
                  background: linear-gradient(135deg, #6366f1, #4f46e5) !important;
                  border-color: transparent !important;
                  color: white !important;
                  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3) !important;
                }

                /* 数量显示 */
                .wl-count {
                  color: #6b7280 !important;
                  font-size: 14px !important;
                  margin-bottom: 1.5rem !important;
                  padding: 0.5rem 1rem !important;
                  background: rgba(255, 255, 255, 0.4) !important;
                  border-radius: 0.75rem !important;
                  display: inline-block !important;
                  border: 1px solid rgba(0, 0, 0, 0.04) !important;
                }

                /* 回复按钮 */
                .wl-btn-reply {
                  color: #6366f1 !important;
                  background: rgba(99, 102, 241, 0.1) !important;
                  border: 1px solid rgba(99, 102, 241, 0.2) !important;
                  border-radius: 0.5rem !important;
                  padding: 0.25rem 0.75rem !important;
                  font-size: 12px !important;
                  transition: all 0.2s ease !important;
                }

                .wl-btn-reply:hover {
                  background: rgba(99, 102, 241, 0.2) !important;
                  transform: translateY(-1px) !important;
                }

                /* 响应式调整 */
                @media (max-width: 768px) {
                  .wl-panel {
                    padding: 1.5rem !important;
                    border-radius: 1.25rem !important;
                  }
                  
                  .wl-header {
                    padding: 1rem 0 !important;
                  }
                  
                  .wl-item {
                    padding: 1rem !important;
                  }
                }
              `}</style>
              
              {/* 扩大评论容器 */}
              <div 
                ref={walineContainerRef}
                className="waline-container"
                style={{
                  width: '100%',
                  maxWidth: '100%',
                  margin: '0 auto'
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Comments;