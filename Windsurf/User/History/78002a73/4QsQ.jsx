import React, { useEffect, useRef, useState } from 'react';
import { init } from '@waline/client';
import { motion, AnimatePresence } from 'framer-motion';

const Comments = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState(null);
  const walineContainerRef = useRef(null);
  const walineInstanceRef = useRef(null);

  // 简化初始化函数
  const initializeWaline = async () => {
    if (!walineContainerRef.current || isInitialized) return;

    setError(null); // 清除之前的错误
    
    try {
      walineInstanceRef.current = init({
        el: walineContainerRef.current,
        serverURL: 'https://hitomiwaline.vercel.app/',
        path: window.location.pathname || '/',
        lang: 'zh-CN',
        meta: ['nick', 'mail'],
        requiredMeta: ['nick'],
        imageUploader: false,
        search: false,
        reaction: false,
        emoji: false,
        preview: false,
        login: 'disable',
        pageview: false,
        copyright: false,
        pageSize: 5,
      });

      setIsInitialized(true);
    } catch (error) {
      console.error('Error initializing Waline:', error);
      setError('评论系统初始化失败，请刷新页面重试');
    }
  };

  // 展开/收起逻辑
  useEffect(() => {
    if (isExpanded && !isInitialized) {
      initializeWaline();
    }
    
    return () => {
      if (isExpanded && walineInstanceRef.current) {
        try {
          walineInstanceRef.current.destroy();
          setIsInitialized(false);
        } catch (error) {
          console.warn('Error destroying Waline:', error);
        }
      }
    };
  }, [isExpanded]);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-8">
      {/* 简洁的切换按钮 */}
      <div className="flex justify-center mb-6">
        <motion.button
          onClick={handleToggle}
          className="px-6 py-3 text-sm font-medium rounded-full transition-all duration-200 border backdrop-blur-md"
          whileTap={{ scale: 0.95 }}
          style={{
            background: 'rgba(0, 0, 0, 0.2)',
            borderColor: 'rgba(255, 255, 255, 0.2)',
            color: '#e2e8f0',
          }}
        >
          {isExpanded ? '收起评论' : '展开评论'}
        </motion.button>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              className="mt-2"
            >
              {/* 错误提示 */}
              {error && (
                <div className="mb-4 p-4 rounded-lg bg-red-900/20 border border-red-800/30">
                  <p className="text-red-300 text-sm">{error}</p>
                  <button
                    onClick={initializeWaline}
                    className="mt-2 px-3 py-1 text-xs bg-gray-800/30 hover:bg-gray-800/40 rounded border border-gray-700/30 transition-colors text-gray-300"
                  >
                    重试
                  </button>
                </div>
              )}
              
              <style>{`
                /* 基础样式重置 */
                :root {
                  --waline-bg-color: transparent;
                }
                
                /* 主容器 - 深色透明玻璃 */
                .wl-panel {
                  background: rgba(15, 23, 42, 0.4) !important;
                  backdrop-filter: blur(12px) !important;
                  -webkit-backdrop-filter: blur(12px) !important;
                  border: 1px solid rgba(255, 255, 255, 0.1) !important;
                  border-radius: 12px !important;
                  padding: 20px !important;
                }
                
                /* 移除排序组件 */
                .wl-sort {
                  display: none !important;
                }
                
                /* 移除图片上传和GIF相关元素 */
                .wl-image-upload,
                .wl-gif-group,
                .wl-image-upload + svg,
                .wl-gif-group + svg {
                  display: none !important;
                }
                
                /* 评论项 */
                .wl-item {
                  background: rgba(30, 41, 59, 0.3) !important;
                  border: 1px solid rgba(255, 255, 255, 0.05) !important;
                  border-radius: 8px !important;
                  margin-bottom: 12px !important;
                  padding: 16px !important;
                }
                
                /* 评论头信息 */
                .wl-user {
                  margin-bottom: 8px !important;
                }
                
                .wl-nick {
                  color: #94a3b8 !important;
                  font-weight: 500 !important;
                  font-size: 14px !important;
                }
                
                .wl-time {
                  color: #64748b !important;
                  font-size: 12px !important;
                  margin-left: 8px !important;
                }
                
                /* 评论内容 */
                .wl-content {
                  color: #cbd5e1 !important;
                  line-height: 1.6 !important;
                  font-size: 14px !important;
                }
                
                .wl-content p {
                  margin: 0.5em 0 !important;
                }
                
                /* 编辑器区域 */
                .wl-editor {
                  background: rgba(30, 41, 59, 0.4) !important;
                  border: 1px solid rgba(255, 255, 255, 0.1) !important;
                  border-radius: 8px !important;
                  margin-bottom: 12px !important;
                }
                
                .wl-editor textarea {
                  background: transparent !important;
                  color: #e2e8f0 !important;
                  font-size: 14px !important;
                  padding: 12px !important;
                  min-height: 80px !important;
                  resize: vertical !important;
                }
                
                .wl-editor textarea::placeholder {
                  color: #94a3b8 !important;
                }
                
                /* 输入框组 */
                .wl-meta {
                  display: flex !important;
                  gap: 8px !important;
                  margin-bottom: 12px !important;
                }
                
                .wl-meta-input {
                  flex: 1 !important;
                  background: rgba(30, 41, 59, 0.4) !important;
                  border: 1px solid rgba(255, 255, 255, 0.1) !important;
                  border-radius: 6px !important;
                  color: #e2e8f0 !important;
                  padding: 8px 12px !important;
                  font-size: 13px !important;
                }
                
                .wl-meta-input:focus {
                  outline: none !important;
                  border-color: rgba(255, 255, 255, 0.3) !important;
                }
                
                /* 提交按钮 - 半透明玻璃式 */
                .wl-btn {
                  background: rgba(255, 255, 255, 0.1) !important;
                  border: 1px solid rgba(255, 255, 255, 0.15) !important;
                  border-radius: 6px !important;
                  color: #e2e8f0 !important;
                  font-weight: 500 !important;
                  padding: 8px 20px !important;
                  font-size: 13px !important;
                  cursor: pointer !important;
                  backdrop-filter: blur(4px) !important;
                }
                
                .wl-btn:hover {
                  background: rgba(255, 255, 255, 0.15) !important;
                  border-color: rgba(255, 255, 255, 0.25) !important;
                }
                
                /* 隐藏不需要的元素 */
                .wl-gif,
                .wl-reaction,
                .wl-emoji-picker,
                .wl-preview,
                .wl-image,
                .wl-upload {
                  display: none !important;
                }
                
                /* 简化分页 */
                .wl-page {
                  display: flex !important;
                  justify-content: center !important;
                  gap: 4px !important;
                  margin-top: 16px !important;
                  padding-top: 16px !important;
                  border-top: 1px solid rgba(255, 255, 255, 0.05) !important;
                }
                
                /* 分页按钮 - 半透明玻璃式 */
                .wl-page-button {
                  background: rgba(255, 255, 255, 0.05) !important;
                  border: 1px solid rgba(255, 255, 255, 0.1) !important;
                  border-radius: 4px !important;
                  color: #94a3b8 !important;
                  padding: 4px 8px !important;
                  min-width: 28px !important;
                  font-size: 12px !important;
                  cursor: pointer !important;
                  backdrop-filter: blur(4px) !important;
                }
                
                .wl-page-button:hover {
                  background: rgba(255, 255, 255, 0.1) !important;
                  border-color: rgba(255, 255, 255, 0.2) !important;
                  color: #cbd5e1 !important;
                }
                
                .wl-page-button.active {
                  background: rgba(255, 255, 255, 0.15) !important;
                  border-color: rgba(255, 255, 255, 0.25) !important;
                  color: #e2e8f0 !important;
                }
                
                /* 加载状态 */
                .wl-loading {
                  color: #64748b !important;
                  text-align: center !important;
                  padding: 40px 0 !important;
                  font-size: 13px !important;
                }
                
                /* 空状态 */
                .wl-empty {
                  color: #64748b !important;
                  text-align: center !important;
                  padding: 40px 0 !important;
                  font-size: 13px !important;
                }
                
                /* 响应式调整 */
                @media (max-width: 640px) {
                  .wl-panel {
                    padding: 16px !important;
                    border-radius: 8px !important;
                  }
                  
                  .wl-meta {
                    flex-direction: column !important;
                    gap: 8px !important;
                  }
                  
                  .wl-meta-input {
                    width: 100% !important;
                  }
                  
                  .wl-editor textarea {
                    min-height: 60px !important;
                  }
                }
              `}</style>
              
              <div 
                ref={walineContainerRef}
                style={{
                  width: '100%',
                  minHeight: '200px'
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