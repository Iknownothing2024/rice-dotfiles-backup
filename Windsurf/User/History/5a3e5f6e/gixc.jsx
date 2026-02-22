import { Link } from 'react-router-dom';

const NotFound = ({ message = "你访问的页面消失在次元缝隙中了" }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
      <div className="relative z-10">
        <h2 className="text-4xl font-bold text-white mb-4">404</h2>
        <p className="text-gray-400 mb-8 text-lg">{message}</p>
        
        <Link 
          to="/" 
          className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full 
                     transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.4)]"
        >
          回到主页
        </Link>
      </div>

      {/* 装饰性背景 */}
      <div className="mt-12 opacity-30">
        <div className="w-64 h-64 rounded-full bg-blue-900/20 blur-3xl"></div>
      </div>
    </div>
  );
};

export default NotFound;