import React, { useState } from 'react';
import { Search, Github, Linkedin, Calendar, Eye, Tag, Archive, Radio, ExternalLink } from 'lucide-react';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const blogPosts = [
    {
      id: 1,
      title: "Understanding Modern Web Development",
      date: "2024-12-28",
      views: 1234,
      excerpt: "Exploring the latest trends and technologies in web development, from React to modern CSS frameworks.",
      tags: ["web", "development", "react"]
    },
    {
      id: 2,
      title: "The Art of Minimalist Design",
      date: "2024-12-25",
      views: 892,
      excerpt: "How less can be more in modern web design. Principles of minimalist design and their applications.",
      tags: ["design", "minimalism", "ui"]
    },
    {
      id: 3,
      title: "Dark Theme Best Practices",
      date: "2024-12-20",
      views: 2156,
      excerpt: "Creating effective dark themes that are both beautiful and accessible for modern applications.",
      tags: ["design", "dark-theme", "css"]
    },
    {
      id: 4,
      title: "Performance Optimization Techniques",
      date: "2024-12-15",
      views: 1567,
      excerpt: "Advanced techniques for optimizing web application performance and user experience.",
      tags: ["performance", "optimization", "javascript"]
    }
  ];

  const filteredPosts = blogPosts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-80 bg-gray-800 p-6 border-r border-gray-700">
        {/* Profile Section */}
        <div className="mb-8">
          <img
            src="/src/assets/Maxrenjian.jpg"
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
          />
          <h2 className="text-xl font-bold text-center mb-2">人見広介</h2>
          <p className="text-gray-400 text-sm text-center mb-4">
            没有天赋，没有才能，什么都没有
            <br/>
            只想重开到2019~2020
          </p>
          
          <div className="flex justify-around text-center mb-6">
            <div>
              <div className="text-2xl font-bold text-primary-400">42</div>
              <div className="text-xs text-gray-500">Posts</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary-400">128</div>
              <div className="text-xs text-gray-500">Tags</div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 pl-10 text-white placeholder-gray-400 focus:outline-none focus:border-primary-500"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
          </div>
        </div>

        {/* Social Links */}
        <div className="mb-6">
          <div className="flex gap-3 justify-center">
            <a
              href="https://github.com/Iknownothing2024"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center hover:bg-gray-600 transition-colors"
            >
              <Github size={16} className="text-gray-300" />
            </a>
            <a
              href="https://bilibili.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center hover:bg-gray-600 transition-colors"
            >
              <ExternalLink size={16} className="text-gray-300" />
            </a>
            <a
              href="https://zhihu.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center hover:bg-gray-600 transition-colors"
            >
              <ExternalLink size={16} className="text-gray-300" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center hover:bg-gray-600 transition-colors"
            >
              <ExternalLink size={16} className="text-gray-300" />
            </a>
            <a
              href="https://linux.do"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center hover:bg-gray-600 transition-colors"
            >
              <ExternalLink size={16} className="text-gray-300" />
            </a>
          </div>
        </div>

        {/* Broadcast Section */}
        <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
          <div className="flex items-center gap-3 mb-3">
            <Radio className="text-primary-400" size={20} />
            <span className="font-semibold text-primary-400">广播((()))往事</span>
          </div>
          <p className="text-xs text-gray-400">
            Broadcasting memories and thoughts from the digital realm.
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>
          
          <div className="space-y-6">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-colors"
              >
                <h2 className="text-xl font-bold mb-3 text-white hover:text-primary-400 transition-colors cursor-pointer">
                  {post.title}
                </h2>
                
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye size={14} />
                    <span>{post.views} views</span>
                  </div>
                </div>
                
                <p className="text-gray-300 mb-4 leading-relaxed">
                  {post.excerpt}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-700 text-gray-300 text-xs rounded-full border border-gray-600"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400">No posts found matching your search.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Blog;
