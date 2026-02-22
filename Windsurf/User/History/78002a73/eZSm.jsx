import React, { useEffect, useRef, useState } from 'react';
import { init } from '@waline/client';
import { motion, AnimatePresence } from 'framer-motion';

const Comments = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const walineContainerRef = useRef(null);
  const walineInstanceRef = useRef(null);

  // 简化初始化函数
  const initializeWaline = () => {
    if (!walineContainerRef.current || isInitialized) return;

    try {
      walineInstanceRef.current = init({
        el: walineContainerRef.current,
        serverURL: 'https://hitomiwaline.vercel.app/',
        path: window.location.pathname,
        // 禁用所有非核心功能
        imageUploader: false,      // 禁用图片上传
        search: false,             // 禁用搜索
        reaction: false,           // 禁用表情反应
        emoji: false,              // 禁用emoji
        preview: false,            // 禁用实时预览
        // 简化登录选项
        login: 'force',            // 仅显示登录按钮
        // 禁用不必要的meta信息
        meta: ['nick', 'mail'],    // 只保留昵称和邮箱
        requiredMeta: ['nick'],    // 仅昵称必填
        // 页面导航相关
        pageview: false,           // 禁用页面浏览量
        // 评论排序
        commentSorting: 'latest',  // 固定为最新排序
        // 禁用通知相关
        notification: false,
        // 禁用复制功能
        copyRight: false,
      });

      setIsInitialized(true);
    } catch (error) {
      console.error('Error initializing Waline:', error);
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
            background: 'rgba(30, 41, 59, 0.6)',
            borderColor: 'rgba(255, 255, 255, 0.1)',
            color: '#e2e8f0',
          }}
        >
          {isExpanded ? 'Hide' : 'Show'} Comments
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
              <style>{`
                /* 基础样式重置 */
                :root {
                  --waline-theme-color: #60a5fa;
                  --waline-bg-color: transparent;
                }
                
                /* 主容器 - 深色透明玻璃 */
                .wl-panel {
                  background: rgba(15, 23, 42, 0.4) !important;
                  backdrop-filter: blur(12px) !important;
                  border: 1px solid rgba(255, 255, 255, 0.05) !important;
                  border-radius: 12px !important;
                  padding: 20px !important;
                }
                
                /* 头部区域简化 */
                .wl-header {
                  padding: 0 !important;
                  margin-bottom: 16px !important;
                }
                
                /* 评论列表区域 */
                .wl-comment {
                  padding: 0 !important;
                }
                
                /* 评论项 - 简洁透明 */
                .wl-item {
                  background: transparent !important;
                  border: none !important;
                  border-bottom: 1px solid rgba(255, 255, 255, 0.05) !important;
                  padding: 16px 0 !important;
                  margin: 0 !important;
                }
                
                .wl-item:last-child {
                  border-bottom: none !important;
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
                }
                
                /* 评论内容 */
                .wl-content {
                  color: #cbd5e1 !important;
                  line-height: 1.6 !important;
                  font-size: 14px !important;
                }
                
                /* 编辑器区域 */
                .wl-editor {
                  background: rgba(30, 41, 59, 0.5) !important;
                  border: 1px solid rgba(255, 255, 255, 0.08) !important;
                  border-radius: 8px !important;
                  margin-bottom: 12px !important;
                }
                
                .wl-editor textarea {
                  background: transparent !important;
                  color: #e2e8f0 !important;
                  font-size: 14px !important;
                  padding: 12px !important;
                  min-height: 80px !important;
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
                  background: rgba(30, 41, 59, 0.5) !important;
                  border: 1px solid rgba(255, 255, 255, 0.08) !important;
                  border-radius: 6px !important;
                  color: #e2e8f0 !important;
                  padding: 8px 12px !important;
                  font-size: 13px !important;
                }
                
                /* 提交按钮 */
                .wl-btn {
                  background: rgba(96, 165, 250, 0.8) !important;
                  border: none !important;
                  border-radius: 6px !important;
                  color: white !important;
                  font-weight: 500 !important;
                  padding: 8px 20px !important;
                  font-size: 13px !important;
                  transition: background 0.2s !important;
                }
                
                .wl-btn:hover {
                  background: rgba(96, 165, 250, 1) !important;
                }
                
                /* 隐藏所有不需要的元素 */
                .wl-image,               /* 图片上传按钮 */
                .wl-emoji,               /* emoji按钮 */
                .wl-sort,                /* 排序选项 */
                .wl-reaction,            /* 表情反应 */
                .wl-gif,                 /* GIF相关 */
                .wl-search,              /* 搜索框 */
                .wl-info,                /* 额外信息 */
                .wl-actions,             /* 操作按钮 */
                .wl-preview,             /* 预览区域 */
                .wl-copyright,           /* 版权信息 */
                .wl-login,               /* 登录区域（只保留按钮） */
                .wl-login:not(.wl-btn) { /* 但保留登录按钮本身 */
                  display: none !important;
                }
                
                /* 登录按钮样式 */
                .wl-btn-login {
                  background: rgba(255, 255, 255, 0.1) !important;
                  border: 1px solid rgba(255, 255, 255, 0.15) !important;
                  color: #94a3b8 !important;
                  padding: 6px 16px !important;
                  margin-left: 8px !important;
                }
                
                .wl-btn-login:hover {
                  background: rgba(255, 255, 255, 0.15) !important;
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
                
                .wl-page-button {
                  background: rgba(255, 255, 255, 0.05) !important;
                  border: none !important;
                  border-radius: 4px !important;
                  color: #94a3b8 !important;
                  padding: 4px 8px !important;
                  min-width: 28px !important;
                  font-size: 12px !important;
                }
                
                .wl-page-button.active {
                  background: rgba(96, 165, 250, 0.2) !important;
                  color: #60a5fa !important;
                }
                
                /* 隐藏评论数量 */
                .wl-count {
                  display: none !important;
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