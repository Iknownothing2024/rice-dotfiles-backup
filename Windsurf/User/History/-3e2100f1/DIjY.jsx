import React from 'react';
import { useParams, Link } from 'react-router-dom';
import MaxrenjianImage from '../assets/Maxrenjian.jpg';

const ImageDetail = () => {
  const { id } = useParams();

  const galleryImages = [
    {
      id: 1,
      title: "Railway and girl",
      description: "my default wallpaper",
      category: "Anime",
      date: "2024-12-28",
      tags: ["railway", "anime", "girl"],
      imagePath: "/src/assets/Pics/gallery1.jpeg"
    },
    {
      id: 2,
      title: "Mountain landscape",
      description: "Just a random pic I found in internet for a very long time",
      category: "Nature",
      date: "2024-12-25",
      tags: ["mountain", "landscape", "nature"],
      imagePath: "/src/assets/Pics/gallery2.jpeg"
    },
    {
      id: 3,
      title: "Droomer",
      description: "the only way to survive",
      category: "Anime",
      date: "2024-12-20",
      tags: ["droomer", "survival", "anime"],
      imagePath: "/src/assets/Pics/gallery3.jpeg"
    },
    {
      id: 4,
      title: "Meditation in a forest",
      description: "理想中的异世界生活",
      category: "Anime",
      date: "2024-12-18",
      tags: ["meditation", "forest", "fantasy"],
      imagePath: "/src/assets/Pics/gallery4.jpeg"
    },
    {
      id: 5,
      title: "原野鸟居",
      description: "found it on internet for a very long time",
      category: "Japanese",
      date: "2024-12-15",
      tags: ["torii", "japanese", "traditional"],
      imagePath: "/src/assets/Pics/gallery5.jpeg"
    },
    {
      id: 6,
      title: "Summer Coast",
      description: "Ideal Life",
      category: "Nature",
      date: "2024-12-12",
      tags: ["summer", "coast", "ideal"],
      imagePath: "/src/assets/Pics/gallery6.png"
    },
    {
      id: 7,
      title: "异世界牌坊",
      description: "don't know what to describe it",
      category: "Fantasy",
      date: "2024-12-10",
      tags: ["fantasy", "gate", "another-world"],
      imagePath: "/src/assets/Pics/gallery7.jpeg"
    },
    {
      id: 8,
      title: "Anime Countryside Scene",
      description: "A great life I wish",
      category: "Anime",
      date: "2024-12-08",
      tags: ["countryside", "anime", "peaceful"],
      imagePath: "/src/assets/Pics/gallery8.jpeg"
    },
    {
      id: 9,
      title: "Anime Girl in a subway",
      description: "one of my wallpapers",
      category: "Anime",
      date: "2024-12-05",
      tags: ["subway", "anime-girl", "wallpaper"],
      imagePath: "/src/assets/Pics/max.png"
    }
  ];

  const image = galleryImages.find(img => img.id === parseInt(id));

  if (!image) {
    return (
      <div className="min-h-screen bg-gray-900 text-white py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Image Not Found</h1>
            <p className="text-gray-300 text-lg mb-6">The image you're looking for doesn't exist.</p>
            <Link to="/gallery" className="text-primary-400 hover:text-primary-300 underline">
              ← Back to Gallery
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[512px] ml-32 pt-16">
      {/* Sidebar - Same as MainPage */}
      <aside className="w-80 bg-gray-800 p-6 rounded-lg">
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
            <br />
            只想重开到2019~2020
          </p>
          
          <div className="flex justify-around text-center mb-6">
            <div>
              <div className="text-2xl font-bold text-primary-400">{galleryImages.length}</div>
              <div className="text-xs text-gray-500">Images</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary-400">3</div>
              <div className="text-xs text-gray-500">Categories</div>
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
        <div className="max-w-6xl mx-auto">
          {/* Navigation */}
          <div className="mb-6">
            <Link 
              to="/gallery" 
              className="text-primary-400 hover:text-primary-300 transition-colors inline-flex items-center gap-2"
            >
              ← Back to Gallery
            </Link>
          </div>

          {/* Image Detail */}
          <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
            {/* Image Display */}
            <div className="bg-gray-900 p-8 flex justify-center items-center">
              <img 
                src={image.imagePath} 
                alt={image.title}
                className="max-w-full max-h-96 object-contain rounded-lg shadow-2xl"
              />
            </div>
            
            {/* Image Information */}
            <div className="p-8">
              <header className="mb-6">
                <h1 className="text-3xl font-bold mb-4 text-white">{image.title}</h1>
                
                <div className="flex items-center gap-6 text-sm text-gray-400 mb-4">
                  <div className="flex items-center gap-2">
                    <span>📅</span>
                    <span>{image.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>🏷️</span>
                    <span>{image.category}</span>
                  </div>
                </div>
              </header>
              
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-white">Description</h2>
                <p className="text-gray-300 text-lg leading-relaxed">
                  {image.description}
                </p>
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-white">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {image.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-700 text-gray-300 text-sm rounded-full border border-gray-600"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Navigation to other images */}
              <div className="border-t border-gray-700 pt-6">
                <h3 className="text-lg font-semibold mb-4 text-white">Other Images</h3>
                <div className="grid grid-cols-3 gap-4">
                  {galleryImages.filter(img => img.id !== image.id).slice(0, 3).map((img) => (
                    <Link
                      key={img.id}
                      to={`/gallery/${img.id}`}
                      className="block group"
                    >
                      <div className="bg-gray-700 rounded-lg overflow-hidden hover:bg-gray-600 transition-colors">
                        <img 
                          src={img.imagePath} 
                          alt={img.title}
                          className="w-full h-24 object-cover"
                        />
                        <div className="p-2">
                          <p className="text-sm text-gray-300 group-hover:text-white transition-colors">
                            {img.title}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ImageDetail;
