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
        // 禁用所有非核心功能 - Double-Insurance
        imageUploader: false,        // 禁用图片上传
        search: false,               // 禁用搜索
        reaction: false,             // 禁用表情反应
        emoji: false,                // 禁用emoji
        preview: false,              // 禁用实时预览
        login: 'disable',            // 禁用登录功能
        pageview: false,             // 禁用页面浏览量
        copyright: false,            // 禁用版权信息
        pageSize: 5,                 // 限制每页评论数
        // 移除其他可能的功能
        mathTagSupport: false,       // 禁用数学公式
        highlighter: false,          // 禁用代码高亮
        texRenderer: false,          // 禁用TeX渲染
        dark: false,                 // 禁用暗色模式切换
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
        >
          {isExpanded ? '收起评论' : '展开评论'}
        </motion.button>
      </div>

    </div>
  );
};

export default Comments;