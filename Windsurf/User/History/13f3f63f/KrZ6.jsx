import React, { memo, useState, useEffect } from 'react';
import Sidebar from './Sidebar';

const ShitHitomiSays = memo(() => {
  const [entries, setEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadEntries = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Try to fetch a directory listing or use known files as fallback
        let markdownFiles = [];
        
        try {
          // First, try to get a list of files by attempting to fetch common date patterns
          const currentYear = new Date().getFullYear();
          const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
          const days = Array.from({length: 31}, (_, i) => String(i + 1).padStart(2, '0'));
          
          // Generate potential filenames for the current year
          for (const month of months) {
            for (const day of days) {
              const filename = `${currentYear}-${month}-${day}.md`;
              try {
                const response = await fetch(`/posts/shitsays/${filename}`);
                if (response.ok) {
                  markdownFiles.push(filename);
                }
              } catch {
                // File doesn't exist, continue
              }
            }
          }
        } catch {
          // Fallback to known files if automatic discovery fails
          markdownFiles = [
            '2026-02-04.md'
          ];
        }
        
        const parsedEntries = await Promise.all(
          markdownFiles.map(async (filename) => {
            try {
              const path = `/posts/shitsays/${filename}`;
              
              // Fetch the markdown file
              const response = await fetch(path);
              if (!response.ok) {
                throw new Error(`Failed to fetch ${filename}`);
              }
              const text = await response.text();
              
              // Simple frontmatter parsing
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
        setError('Failed to load entries');
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
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">shitHitomiSays</h1>
            <p className="text-gray-300/80 text-lg">一些胡言乱语，一些无意义的思考</p>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-12">
              <p className="text-gray-400/80 text-lg">加载中...</p>
              <p className="text-gray-300/80 text-lg">正在读取日记条目</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-12">
              <p className="text-red-400/80 text-lg">错误</p>
              <p className="text-gray-300/80 text-lg">{error}</p>
            </div>
          )}

          {/* Entries List */}
          {!isLoading && !error && (
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
                  <div className="text-gray-200/90 leading-relaxed">
                    <p className="whitespace-pre-wrap">
                      {entry.content}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          )}
          
          {!isLoading && !error && entries.length === 0 && (
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
