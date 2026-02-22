import React from 'react';
import MaxrenjianImage from '../assets/Maxrenjian.jpg';

const Blog = () => {
  return (
    <div className="flex min-h-svh ml-32 pt-16">
      {/* Sidebar */}
      <aside className="w-80 bg-gray-800 p-6">
        {/* Profile Section */}
        <div className="mb-8">
          <img
            src={MaxrenjianImage}
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

        {/* Social Links */}
        <div className="mb-6">
          <div className="flex gap-0 justify-center">
            <a
              href="https://github.com/Iknownothing2024"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded flex items-center justify-center hover:bg-gray-600 transition-colors"
            >
              <img src="/github.svg" alt="GitHub" className="w-6 h-6" />
            </a>
            <a
              href="https://space.bilibili.com/3690981192894512?spm_id_from=333.1007.0.0"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded flex items-center justify-center hover:bg-gray-600 transition-colors"
            >
              <img src="/bilibili-fill.svg" alt="Bilibili" className="w-6 h-6" />
            </a>
            <a
              href="https://www.zhihu.com/people/a-29-28-45"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded flex items-center justify-center hover:bg-gray-600 transition-colors"
            >
              <img src="/zhihu-line.svg" alt="Zhihu" className="w-6 h-6" />
            </a>
            <a
              href="https://x.com/zhengdeng404"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded flex items-center justify-center hover:bg-gray-600 transition-colors"
            >
              <img src="/x.svg" alt="X" className="w-6 h-6" />
            </a>
            <a
              href="https://linux.do/u/hitomichan/summary"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded flex items-center justify-center hover:bg-gray-600 transition-colors"
            >
              <img src="/linuxDo.svg" alt="LinuxDo" className="w-6 h-6" />
            </a>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>
          
          {/* Blog posts will be displayed here when available */}
        </div>
      </main>
    </div>
  );
};

export default Blog;
