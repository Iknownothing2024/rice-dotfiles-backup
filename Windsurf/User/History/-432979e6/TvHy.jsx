import React, { memo } from 'react';
import { Heart } from 'lucide-react';

const Footer = memo(() => (
  <footer className="bg-gray-900 text-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-400 text-sm mb-4 md:mb-0">
          {new Date().getFullYear()}~互联网崩塌 All rights reserved.
        </p>
        <p className="text-gray-400 text-sm flex items-center gap-2">
          Made with <Heart className="text-red-500" size={16} />
        </p>
      </div>
    </div>
  </footer>
));

Footer.displayName = 'Footer';

export default Footer;
