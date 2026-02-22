import React, { memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import MaxrenjianImage from '../assets/Maxrenjian.jpg';
import { posts, getAllTags } from '../data/blog';

const Sidebar = memo(() => {
  const socialLinks = useMemo(() => [
    { url: "https://github.com/Iknownothing2024", icon: "/github.svg", label: "GitHub" },
    { url: "https://space.bilibili.com/3690981192894512?spm_id_from=333.1007.0.0", icon: "/bilibili-fill.svg", label: "Bilibili" },
    { url: "https://www.zhihu.com/people/a-29-28-45", icon: "/zhihu-line.svg", label: "Zhihu" },
    { url: "https://x.com/zhengdeng404", icon: "/x.svg", label: "X" },
    { url: "https://linux.do/u/hitomichan/summary", icon: "/linuxDo.svg", label: "LinuxDo" }
  ], []);

  const uniqueTags = useMemo(() => getAllTags(), []);

  return (
    <aside className="fixed left-24 top-32 w-80 h-[calc(64vh-4rem)] bg-gray-800/15 backdrop-blur-md p-6 rounded-lg border border-gray-700/20 shadow-2xl overflow-y-auto">
      {/* Profile Section */}
      <div className="mb-8">
        <img
          src={MaxrenjianImage}
          alt="Profile"
          className="w-24 h-24 rounded-full mx-auto mb-4 object-cover ring-2 ring-gray-600/30"
          loading="lazy"
        />
        <h2 className="text-xl font-bold text-center mb-2 text-white">人見広介</h2>
        <p className="text-gray-200/70 text-sm text-center mb-4">
          没有天赋，没有才能，什么都没有
          <br />
          只想重开到2019~2020
        </p>
        
        <div className="flex justify-around text-center mb-6">
          <Link 
            to="/"
            className="group cursor-pointer hover:scale-105 transition-all duration-300"
            aria-label="View all posts"
          >
            <div className="text-2xl font-bold text-primary-400 group-hover:text-primary-300">{posts.length}</div>
            <div className="text-xs text-gray-300/70 group-hover:text-gray-200">Posts</div>
          </Link>
          <Link 
            to="/tags"
            className="group cursor-pointer hover:scale-105 transition-all duration-300"
            aria-label="View all tags"
          >
            <div className="text-2xl font-bold text-primary-400 group-hover:text-primary-300">{uniqueTags.length}</div>
            <div className="text-xs text-gray-300/70 group-hover:text-gray-200">Tags</div>
          </Link>
        </div>
      </div>

      {/* Social Links */}
      <div className="mb-6">
        <div className="flex gap-0 justify-center">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded flex items-center justify-center hover:bg-gray-700/30 transition-all duration-300 hover:scale-110"
              aria-label={social.label}
            >
              <img 
                src={social.icon} 
                alt={social.label} 
                className="w-6 h-6 filter brightness-75 hover:brightness-100 transition-all duration-300" 
                loading="lazy" 
              />
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
});

Sidebar.displayName = 'Sidebar';

export default Sidebar;
