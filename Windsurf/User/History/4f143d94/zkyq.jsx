import React from 'react';
import { Calendar, Eye, Tag } from 'lucide-react';

const Blogs = () => {
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

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-8">你好世界</h1>
        <p className="text-gray-300 text-lg mb-8">
          你好世界
        </p>
        
        <div className="space-y-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-gray-800 rounded-lg p-8 border border-gray-700 hover:border-gray-600 transition-colors"
            >
              <h2 className="text-2xl font-bold mb-4 text-white hover:text-primary-400 transition-colors cursor-pointer">
                {post.title}
              </h2>
              
              <div className="flex items-center gap-6 text-sm text-gray-400 mb-4">
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye size={16} />
                  <span>{post.views} views</span>
                </div>
              </div>
              
              <p className="text-gray-300 mb-6 leading-relaxed text-lg">
                {post.excerpt}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-700 text-gray-300 text-sm rounded-full border border-gray-600"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;