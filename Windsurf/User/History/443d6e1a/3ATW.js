import { useState, useEffect } from 'react';

export const useMarkdownContent = (filePath) => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // In development, use fetch for HMR support
        if (import.meta.env.DEV) {
          const response = await fetch(filePath);
          if (!response.ok) {
            throw new Error(`Failed to fetch ${filePath}: ${response.status}`);
          }
          const text = await response.text();
          setContent(text);
        } else {
          // In production, could use import for better performance
          const module = await import(filePath);
          setContent(module.default);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [filePath]);

  return { content, loading, error };
};
