import { useState, useEffect, useCallback, useRef } from 'react';

// Cache for content to prevent unnecessary re-fetches
const contentCache = new Map();

export const useMarkdownContent = (filePath) => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);

  const loadContent = useCallback(async () => {
    // Cancel previous request if still pending
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller for this request
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    try {
      setLoading(true);
      setError(null);

      // Check cache first
      if (contentCache.has(filePath)) {
        const cachedContent = contentCache.get(filePath);
        setContent(cachedContent);
        setLoading(false);
        return;
      }

      // Fetch content with abort signal
      const response = await fetch(filePath, {
        signal: abortController.signal,
        headers: {
          'Cache-Control': 'no-cache',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch ${filePath}: ${response.status} ${response.statusText}`);
      }

      const text = await response.text();
      
      // Cache the content
      contentCache.set(filePath, text);
      setContent(text);
    } catch (err) {
      // Don't set error if request was aborted
      if (err.name !== 'AbortError') {
        setError(err.message);
        console.error(`Failed to load markdown content from ${filePath}:`, err);
      }
    } finally {
      setLoading(false);
      abortControllerRef.current = null;
    }
  }, [filePath]);

  useEffect(() => {
    loadContent();

    // Cleanup function
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [loadContent]);

  // Function to manually refresh content
  const refreshContent = useCallback(() => {
    contentCache.delete(filePath);
    loadContent();
  }, [filePath, loadContent]);

  return { 
    content, 
    loading, 
    error, 
    refreshContent 
  };
};
