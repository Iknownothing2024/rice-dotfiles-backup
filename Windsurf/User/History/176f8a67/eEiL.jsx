import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import MaxrenjianImage from '../assets/Maxrenjian.jpg';
import { blogPosts } from '../constants/data';

const Sidebar = memo(() => (
  <aside className="w-80 bg-gray-800 p-6 rounded-lg">
    {/* Profile Section */}
    <div className="mb-8">
      <img
        src={MaxrenjianImage}
        alt="Profile"
        className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
        loading="lazy"
      />
      <h2 className="text-xl font-bold text-center mb-2">人見広介</h2>
      <p className="text-gray-400 text-sm text-center mb-4">
        没有天赋，没有才能，什么都没有
        <br />
        只想重开到2019~2020
      </p>
      
      <div className="flex justify-around text-center mb-6">
        <div>
          <div className="text-2xl font-bold text-primary-400">{blogPosts.length}</div>
          <div className="text-xs text-gray-500">Posts</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-primary-400">0</div>
          <div className="text-xs text-gray-500">Tags</div>
        </div>
      </div>
    </div>

    {/* Social Links */}
    <div className="mb-6">
      <div className="flex gap-0 justify-center">
        {[
          { url: "https://github.com/Iknownothing2024", icon: "/github.svg" },
          { url: "https://space.bilibili.com/3690981192894512?spm_id_from=333.1007.0.0", icon: "/bilibili-fill.svg" },
          { url: "https://www.zhihu.com/people/a-29-28-45", icon: "/zhihu-line.svg" },
          { url: "https://x.com/zhengdeng404", icon: "/x.svg" },
          { url: "https://linux.do/u/hitomichan/summary", icon: "/linuxDo.svg" }
        ].map((social, index) => (
          <a
            key={index}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded flex items-center justify-center hover:bg-gray-600 transition-colors"
          >
            <img src={social.icon} alt={social.url} className="w-6 h-6" loading="lazy" />
          </a>
        ))}
      </div>
    </div>
  </aside>
));

Sidebar.displayName = 'Sidebar';

const MainPage = memo(() => (
  <div className="flex min-h-[512px] ml-32 pt-16">
    <Sidebar />
    
    {/* Main Content */}
    <main className="flex-1 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>
        
        <div className="space-y-6">
          {blogPosts.map((post) => (
            <div key={post.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h2 className="text-2xl font-bold mb-4 text-white">{post.title}</h2>
              <p className="text-gray-300 mb-4">{post.excerpt}</p>
              <Link to={`/posts/${post.slug}`} className="text-primary-400 hover:text-primary-300">
                Read more
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  </div>
));

MainPage.displayName = 'MainPage';

export default MainPage;
