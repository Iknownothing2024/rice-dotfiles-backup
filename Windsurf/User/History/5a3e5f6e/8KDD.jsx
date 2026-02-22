import { Link } from 'react-router-dom';

const NotFound = ({ message = "你访问的页面消失在次元缝隙中了" }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
      <div className="relative z-10">
        <h2 className="text-8xl font-bold text-gray-300 mb-4">404</h2>
        <p className="text-gray-300 mb-8 text-lg">{message}</p>
        <Link 
          to="/" 
          className="px-8 py-3 text-gray-400 hover:text-white transition-colors duration-700 ease-in-out"
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