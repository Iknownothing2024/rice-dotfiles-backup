import React, { memo, useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

const ShitHitomiSays = memo(() => {
  const [entries, setEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadEntries = async () => {
      try {
        setIsLoading(true);
        
        // First, fetch the index to get available files
        const indexResponse = await fetch('/shitsays/index.json');
        if (!indexResponse.ok) {
          throw new Error('Failed to fetch shitsays index');
        }
        
        const shitsaysFiles = await indexResponse.json();
        
        const parsedEntries = await Promise.all(
          shitsaysFiles.map(async (filename) => {
            try {
              const response = await fetch(`/shitsays/${filename}`);
              if (!response.ok) {
                throw new Error(`Failed to fetch ${filename}`);
              }
              
              const text = await response.text();
              
              // Parse frontmatter
              const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
              const match = text.match(frontmatterRegex);
              
              if (match) {
                const frontmatterText = match[1];
                const content = match[2];
                
                // Parse frontmatter
                const frontmatter = {};
                frontmatterText.split('\n').forEach(line => {
                  const colonIndex = line.indexOf(':');
                  if (colonIndex > 0) {
                    const key = line.slice(0, colonIndex).trim();
                    const value = line.slice(colonIndex + 1).trim().replace(/^["']|["']$/g, '');
                    frontmatter[key] = value;
                  }
                });
                
                return {
                  id: filename.replace('.md', ''),
                  date: frontmatter.date || filename.replace('.md', ''),
                  author: frontmatter.author || 'Unknown',
                  content: content.trim()
                };
              } else {
                // No frontmatter, treat entire file as content
                return {
                  id: filename.replace('.md', ''),
                  date: filename.replace('.md', ''),
                  author: 'Unknown',
                  content: text.trim()
                };
              }
            } catch (err) {
              console.error(`Error parsing ${filename}:`, err);
              return null;
            }
          })
        );
        
        // Filter out null entries and sort by date (newest first)
        const validEntries = parsedEntries
          .filter(entry => entry !== null)
          .sort((a, b) => new Date(b.date) - new Date(a.date));

        setEntries(validEntries);
      } catch (err) {
        console.error('Error loading entries:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadEntries();
  }, []);

  return (
    <div className="min-h-screen pt-16">
      <Sidebar />
      
      {/* Main Content */}
      <main className="ml-96 p-8">
        <div className="max-w-4xl mx-auto">
          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-12">
              <p className="text-gray-400/80 text-lg">加载中...</p>
              <p className="text-gray-300/80 text-lg">正在读取日记条目</p>
            </div>
          )}

          {/* Entries List */}
          {!isLoading && (
            <div className="space-y-6">
              {entries.map((entry) => (
                <article key={entry.id} className="bg-gray-800/40 backdrop-blur-sm rounded-lg p-6 border border-gray-700/30 hover:border-gray-600/50 transition-all duration-300">
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
              ))}
            </div>
          )}
          
          {!isLoading && entries.length === 0 && (
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
