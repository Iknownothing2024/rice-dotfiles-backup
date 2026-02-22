import React, { memo, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import Sidebar from './Sidebar';

// 1. 同步 Gallery 的逻辑：递归读取所有子文件夹下的图片并打平(Flatten)
const fetchAllImages = () => {
  // 使用 /*/* 来匹配子文件夹下的图片
  const images = import.meta.glob('/src/assets/Pics/*/*.{png,jpg,jpeg}', { eager: true });
  
  return Object.entries(images).map(([path, module], index) => {
    const parts = path.split('/');
    // 获取文件名作为 ID
    const filename = parts.pop()?.split('.')[0] || `image-${index}`;
    // 获取文件夹名作为分类
    const folderName = parts[parts.length - 1]; 
    
    return {
      id: filename,
      title: filename.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      imagePath: module.default,
      category: folderName
    };
  });
};

const RelatedImageCard = memo(({ image }) => (
  <Link to={`/gallery/${image.id}`} className="block group">
    <div className="bg-gray-800/40 backdrop-blur-sm rounded-lg overflow-hidden border border-gray-700/30 aspect-[4/3] transition-all duration-300 group-hover:border-blue-500/50 shadow-lg">
      <img 
        src={image.imagePath} 
        alt={image.title}
        className="w-full h-full object-cover group-hover:scale-110 group-hover:brightness-110 transition-all duration-500"
        loading="lazy"
      />
    </div>
  </Link>
));

RelatedImageCard.displayName = 'RelatedImageCard';

const ImageDetail = memo(() => {
  const { id } = useParams();
  
  // 获取全量图片数据
  const allImages = useMemo(() => {
    try {
      return fetchAllImages();
    } catch (error) {
      console.error('Failed to glob images:', error);
      return [];
    }
  }, []);

  // 根据 URL 中的 ID 查找对应的图片对象
  const image = useMemo(() => allImages.find(img => img.id === id), [allImages, id]);

  // 获取推荐图片（排除当前图片，随机取3张）
  const relatedImages = useMemo(() => {
    if (!image) return [];
    const others = allImages.filter(img => img.id !== id);
    return [...others].sort(() => Math.random() - 0.5).slice(0, 3);
  }, [allImages, id, image]);

  // 4. 处理 404 情况：使用更符合你项目调性的蓝色系警告布局
  if (!image) {
    return (
      <div className="min-h-screen pt-16 bg-[#0a0a0a]">
        <Sidebar />
        <main className="ml-96 p-8 flex items-center justify-center min-h-[80vh]">
          <div className="text-center animate-fade-in">
            <h1 className="text-8xl font-bold text-blue-500/10 absolute left-1/2 -translate-x-1/2 -translate-y-12 select-none">404</h1>
            <div className="relative z-10">
              <p className="text-blue-400 text-xl font-medium mb-6">探测到未知的维度碎片</p>
              <Link 
                to="/" 
                className="px-6 py-2 border border-blue-500/50 text-blue-400 hover:bg-blue-500/10 transition-all rounded-full"
              >
                ← 返回图像馆
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      <Sidebar />
      {/* Main Content */}
      <main className="ml-96 p-8">
        <div className="max-w-5xl mx-auto">
          {/* Top Navigation */}
          <div className="mb-8 flex items-center justify-between">
            <Link 
              to="/" 
              className="group flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors"
            >
              <span className="text-xl group-hover:-translate-x-1 transition-transform">←</span>
              <span className="text-sm tracking-widest uppercase">Back to Collection</span>
            </Link>
            <span className="text-xs text-gray-600 tracking-widest uppercase">
              Category: <span className="text-gray-400">{image.category}</span>
            </span>
          </div>

          {/* Image Detail Display Section */}
          <div className="space-y-12">
            {/* Main Image View */}
            <div className="relative group">
               {/* 背景装饰光晕 */}
               <div className="absolute -inset-4 bg-blue-500/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
               
               <div className="relative bg-gray-900/40 backdrop-blur-md rounded-2xl p-4 border border-gray-800 shadow-2xl overflow-hidden">
                  <img 
                    src={image.imagePath} 
                    alt={image.title}
                    className="w-full h-auto max-h-[70vh] object-contain rounded-lg mx-auto"
                    loading="eager"
                  />
               </div>
            </div>

            {/* Info Bar */}
            <div className="flex flex-col gap-2 border-l-2 border-blue-500/30 pl-6">
              <h1 className="text-3xl font-light text-white tracking-tight uppercase">
                {image.title}
              </h1>
            </div>

            {/* Related/Next Suggestions */}
            <section className="pt-12 border-t border-gray-800/50">
              <h3 className="text-xs font-bold text-gray-500 tracking-[0.2em] uppercase mb-6">
                Explore More
              </h3>
              <div className="grid grid-cols-3 gap-6">
                {relatedImages.map((img) => (
                  <RelatedImageCard key={img.id} image={img} />
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
});

ImageDetail.displayName = 'ImageDetail';

export default ImageDetail;