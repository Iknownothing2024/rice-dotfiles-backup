import React, { memo, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';

// 1. 配置文件夹名称到中文显示名称的映射
const CATEGORY_MAP = {
  'AnimeCharacter': '动漫角色',
  'BrightAnimeScene': '明快',
  'Guidao': '鬼刀风铃',
  'Scenery': '二次元景色',
  'SolemnScenery': '肃穆景色'
};

// 2. 动态导入并按文件夹分组
const importAndGroupImages = () => {
  // 注意这里的 glob 模式变为 */*，以获取下一级目录
  const rawImages = import.meta.glob('/src/assets/Pics/*/*.{png,jpg,jpeg}', { eager: true });
  
  const groups = {};

  Object.entries(rawImages).forEach(([path, module]) => {
    // 路径示例: /src/assets/Pics/AnimeCharacter/001.jpg
    const parts = path.split('/');
    // 获取文件夹名称 (倒数第二个元素)
    const folderName = parts[parts.length - 2]; 
    
    // 如果这个文件夹不在我们的映射表中，可以选择跳过或归为 "其他"
    // 这里我们只处理定义好的组
    const displayName = CATEGORY_MAP[folderName];
    
    if (displayName) {
      if (!groups[displayName]) {
        groups[displayName] = [];
      }

      const filename = parts.pop()?.split('.')[0] || 'unknown';
      
      groups[displayName].push({
        id: filename, // 保持原有的 ID 逻辑
        title: filename.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        imagePath: module.default,
        category: displayName
      });
    }
  });

  return groups;
};

// 复用原本的 ImageCard (展示单张图片详情)
const ImageCard = memo(({ image }) => (
  <Link to={`/gallery/${image.id}`} className="block group">
    <div className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 cursor-pointer aspect-[4/3]">
      <img 
        src={image.imagePath} 
        alt={image.title} 
        className="w-full h-full object-cover group-hover:brightness-110 transition-all duration-300" 
        loading="lazy"
      />
    </div>
    {/* 可选：显示图片名称 */}
    <p className="mt-2 text-gray-400 text-sm truncate">{image.title}</p>
  </Link>
));

ImageCard.displayName = 'ImageCard';

// 新增：CategoryCard (展示分类组预览)
// 点击这个卡片会切换到该组的图片列表
const CategoryCard = memo(({ title, coverImage, onClick, count }) => (
  <div onClick={onClick} className="block group cursor-pointer">
    {/* 封面容器：模拟相册堆叠效果 */}
    <div className="relative">
      {/* 装饰性背景层，模拟堆叠感 */}
      <div className="absolute top-0 left-0 w-full h-full bg-gray-700 rounded-lg transform translate-x-2 translate-y-2 opacity-50 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform"></div>
      
      <div className="relative bg-gray-800 rounded-lg overflow-hidden hover:transform hover:-translate-y-1 transition-all duration-300 aspect-[4/3] border-2 border-gray-700 group-hover:border-white/20">
        {coverImage ? (
          <img 
            src={coverImage.imagePath} 
            alt={title} 
            className="w-full h-full object-cover group-hover:brightness-110 transition-all duration-300" 
            loading="lazy"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-gray-500">
            No Cover
          </div>
        )}
        
        {/* 悬浮覆盖层显示名称 */}
<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90 
                group-hover:from-blue-900/60 transition-all duration-500 flex flex-col justify-end p-4">
   <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
     {title}
   </h3>
   <p className="text-xs text-gray-300">{count} 张照片</p>
</div>
      </div>
    </div>
  </div>
));

CategoryCard.displayName = 'CategoryCard';

const Gallery = memo(() => {
  // 状态：当前选中的分类。如果为 null，则显示分类列表；如果有值，则显示该分类下的图片。
  const [activeCategory, setActiveCategory] = useState(null);

  // 初始化数据
  const groupedImages = useMemo(() => {
    try {
      return importAndGroupImages();
    } catch (error) {
      console.error('Error loading images:', error);
      return {};
    }
  }, []);

  // 获取所有可用的分类名称（Object keys）
  const categories = Object.keys(groupedImages);

  // 处理返回逻辑
  const handleBack = () => setActiveCategory(null);

  return (
    <div className="min-h-screen pt-16">
      <Sidebar />
      
      {/* Main Content */}
      <main className="ml-96 p-8">
        <div className="max-w-6xl mx-auto">
          
          {/* 这里删除了原本的 H1 标题 */}

          {/* 视图逻辑分支 */}
          {!activeCategory ? (
            /* === 视图 1: 分类列表 (预览模式) === */
            categories.length === 0 ? (
               <div className="text-center py-12 text-gray-500">暂无图集数据</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                {categories.map((categoryName) => {
                  const imagesInGroup = groupedImages[categoryName];
                  // 取第一张图作为封面，如果没有图则 undefined
                  const cover = imagesInGroup.length > 0 ? imagesInGroup[0] : null;
                  
                  return (
                    <CategoryCard 
                      key={categoryName}
                      title={categoryName}
                      count={imagesInGroup.length}
                      coverImage={cover}
                      onClick={() => setActiveCategory(categoryName)}
                    />
                  );
                })}
              </div>
            )
          ) : (
            /* === 视图 2: 具体分类的照片墙 === */
            <div className="animate-fade-in">
              {/* 顶部导航栏：显示当前分类名 + 返回按钮 */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-700">
                <h2 className="text-3xl font-bold text-white tracking-wide">
                  {activeCategory}
                </h2>
                <button 
                  onClick={handleBack}
                  className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-800 hover:bg-gray-700 rounded-md transition-colors flex items-center gap-2"
                >
                  <span>← 返回图集</span>
                </button>
              </div>

              {/* 原逻辑的 ImageCard 瀑布流/网格 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {groupedImages[activeCategory].map((image) => (
                  <ImageCard key={image.id} image={image} />
                ))}
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
});

Gallery.displayName = 'Gallery'; // 改回英文显示名，或者根据需要调整

export default Gallery;