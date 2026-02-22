import React, { memo } from 'react';

const Footer = memo(() => (
  <footer className="bg-transparent text-white border-t border-white/5">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
      <div className="flex flex-col md:flex-row justify-center items-center gap-2 text-center">
        <p className="text-gray-300/80 text-xs">
          二零二六年-互联网崩塌 
        </p>
        <span className="text-gray-500/60 text-xs hidden md:inline">•</span>
        <p className="text-gray-300/80 text-xs">
          Copyleft © 2026 人見広介 CC BY-NC-ND 4.0 & AGPL-3.0
        </p>
      </div>
    </div>
  </footer>
));

Footer.displayName = 'Footer';

export default Footer;
