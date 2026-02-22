import React, { memo } from 'react';
import Sidebar from './Sidebar';

// Import all markdown files using Vite's import.meta.glob
const shitsaysModules = import.meta.glob('/posts/shitsays/*.md', { eager: true });

// Parse and process all entries at build time
const processShitsaysEntries = () => {
  const entries = Object.entries(shitsaysModules).map(([path, module]) => {
    // Extract filename from path
    const filename = path.split('/').pop().replace('.md', '');
    
    // Get the raw content
    const content = module.default || module;
    
    // Parse frontmatter
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
    const match = content.match(frontmatterRegex);
    
    if (match) {
      const frontmatterText = match[1];
      const bodyContent = match[2];
      
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
        id: filename,
        date: frontmatter.date || filename,
        author: frontmatter.author || 'Unknown',
        content: bodyContent.trim()
      };
    } else {
      // No frontmatter, treat entire file as content
      return {
        id: filename,
        date: filename,
        author: 'Unknown',
        content: content.trim()
      };
    }
  });
  
  // Sort by date (newest first)
  return entries.sort((a, b) => new Date(b.date) - new Date(a.date));
};

// Process entries once at module level
const shitsaysEntries = processShitsaysEntries();

const ShitHitomiSays = memo(() => {
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

          {/* Entries List */}
          <div className="space-y-6">
            {shitsaysEntries.map((entry) => (
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
          
          {shitsaysEntries.length === 0 && (
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
