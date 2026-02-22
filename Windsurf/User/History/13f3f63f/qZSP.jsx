import React, { memo, useState, useEffect, useMemo } from 'react';
import Sidebar from './Sidebar';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

// Cache for entries to avoid refetching
let entriesCache = null;
let cacheTimestamp = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Optimized frontmatter parser
const parseFrontmatter = (text) => {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = text.match(frontmatterRegex);
  
  if (!match) {
    return {
      frontmatter: {},
      content: text.trim()
    };
  }
  
  const frontmatterText = match[1];
  const content = match[2];
  const frontmatter = {};
  
  // More efficient frontmatter parsing
  frontmatterText.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim();
      const value = line.slice(colonIndex + 1).trim().replace(/^["']|["']$/g, '');
      frontmatter[key] = value;
    }
  });
  
  return { frontmatter, content: content.trim() };
};

// Optimized entry parser
const parseEntry = (filename, text) => {
  try {
    const { frontmatter, content } = parseFrontmatter(text);
    return {
      id: filename.replace('.md', ''),
      date: frontmatter.date || filename.replace('.md', ''),
      author: frontmatter.author || 'Unknown',
      content
    };
  } catch (error) {
    console.error(`Error parsing ${filename}:`, error);
    return null;
  }
};

const ShitHitomiSays = memo(() => {
  const [entries, setEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadEntries = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Check cache first
        const now = Date.now();
        if (entriesCache && cacheTimestamp && (now - cacheTimestamp < CACHE_DURATION)) {
          setEntries(entriesCache);
          setIsLoading(false);
          return;
        }
        
        // Fetch index with timeout
        const indexController = new AbortController();
        const indexTimeout = setTimeout(() => indexController.abort(), 5000);
        
        const indexResponse = await fetch('/shitsays/index.json', {
          signal: indexController.signal
        });
        clearTimeout(indexTimeout);
        
        if (!indexResponse.ok) {
          throw new Error('Failed to fetch shitsays index');
        }
        
        const shitsaysFiles = await indexResponse.json();
        
        // Batch fetch with concurrency control
        const BATCH_SIZE = 5;
        const parsedEntries = [];
        
        for (let i = 0; i < shitsaysFiles.length; i += BATCH_SIZE) {
          const batch = shitsaysFiles.slice(i, i + BATCH_SIZE);
          const batchPromises = batch.map(async (filename) => {
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 3000);
            
            try {
              const response = await fetch(`/shitsays/${filename}`, {
                signal: controller.signal
              });
              clearTimeout(timeout);
              
              if (!response.ok) {
                throw new Error(`Failed to fetch ${filename}`);
              }
              
              const text = await response.text();
              return parseEntry(filename, text);
            } catch (err) {
              console.error(`Error fetching ${filename}:`, err);
              return null;
            }
          });
          
          const batchResults = await Promise.all(batchPromises);
          parsedEntries.push(...batchResults.filter(entry => entry !== null));
        }
        
        // Sort entries by date (newest first) - more efficient sorting
        parsedEntries.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateB - dateA;
        });
        
        // Update cache
        entriesCache = parsedEntries;
        cacheTimestamp = now;
        
        setEntries(parsedEntries);
      } catch (err) {
        console.error('Error loading entries:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadEntries();
  }, []);

  // Memoized entries to prevent unnecessary re-renders
  const sortedEntries = useMemo(() => entries, [entries]);

  return (
    <div className="min-h-screen pt-16">
      <Sidebar />
      
      {/* Main Content */}
      <main className="ml-96 p-8">
        <div className="max-w-4xl mx-auto">
          {/* Error State */}
          {error && (
            <div className="text-center py-12">
              <p className="text-red-400 text-lg mb-2">Error loading diary</p>
              <p className="text-gray-300/80 text-sm">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
              >
                Retry
              </button>
            </div>
          )}

          {/* Loading State */}
          {isLoading && !error && (
            <div className="text-center py-12">
              <p className="text-gray-400/80 text-lg">加载中...</p>
              <p className="text-gray-300/80 text-lg">正在读取日记条目</p>
            </div>
          )}

          {/* Entries List */}
          {!isLoading && !error && (
            <div className="space-y-6">
              {sortedEntries.map((entry) => (
                <div key={entry.id}>
                  <article className="bg-gray-800/40 backdrop-blur-sm rounded-lg p-6 border border-gray-700/30 hover:border-gray-600/50 transition-all duration-300">
                    <header className="mb-4">
                      <h2 className="text-lg font-semibold mb-3 text-primary-400">
                        {entry.date}
                      </h2>
                      {entry.author && entry.author !== 'Unknown' && (
                        <p className="text-sm text-gray-400/80">
                          作者: {entry.author}
                        </p>
                      )}
                    </header>
                    <div className="prose prose-invert prose-lg max-w-none">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeHighlight]}
                        components={{
                          // Custom styling for code blocks
                          code: ({node, inline, className, children, ...props}) => {
                            const match = /language-(\w+)/.exec(className || '');
                            return !inline && match ? (
                              <pre className="bg-gray-900/80 rounded-lg p-4 overflow-x-auto">
                                <code className={className} {...props}>
                                  {children}
                                </code>
                              </pre>
                            ) : (
                              <code className="bg-gray-700/40 px-1 py-0.5 rounded text-sm text-gray-200" {...props}>
                                {children}
                              </code>
                            );
                          },
                          // Custom styling for blockquotes
                          blockquote: ({children}) => (
                            <blockquote className="border-l-4 border-primary-500/60 pl-4 italic text-gray-200">
                              {children}
                            </blockquote>
                          ),
                          // Custom styling for links
                          a: ({href, children}) => (
                            <a 
                              href={href} 
                              className="text-primary-400 hover:text-primary-300 underline"
                              target={href.startsWith('http') ? '_blank' : '_self'}
                              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                            >
                              {children}
                            </a>
                          ),
                          // Custom styling for paragraphs
                          p: ({children}) => (
                            <p className="text-gray-200 leading-relaxed">
                              {children}
                            </p>
                          ),
                          // Custom styling for headings
                          h1: ({children}) => (
                            <h1 className="text-3xl font-bold text-white mb-4">
                              {children}
                            </h1>
                          ),
                          h2: ({children}) => (
                            <h2 className="text-2xl font-semibold text-white mb-3">
                              {children}
                            </h2>
                          ),
                          h3: ({children}) => (
                            <h3 className="text-xl font-semibold text-white mb-2">
                              {children}
                            </h3>
                          ),
                          // Custom styling for lists
                          ul: ({children}) => (
                            <ul className="list-disc list-inside text-gray-200 mb-4">
                              {children}
                            </ul>
                          ),
                          ol: ({children}) => (
                            <ol className="list-decimal list-inside text-gray-200 mb-4">
                              {children}
                            </ol>
                          ),
                          li: ({children}) => (
                            <li className="mb-1">
                              {children}
                            </li>
                          ),
                        }}
                      >
                        {entry.content}
                      </ReactMarkdown>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          )}
          
          {/* Empty State */}
          {!isLoading && !error && sortedEntries.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400/80 text-lg">暂无日记</p>
              <p className="text-gray-300/80 text-lg">还没有写下任何东西</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
});

ShitHitomiSays.displayName = 'ShitHitomiSays';

export default ShitHitomiSays;
