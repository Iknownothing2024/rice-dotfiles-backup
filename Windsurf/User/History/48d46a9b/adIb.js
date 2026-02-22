import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import blogPlugin from './vite-plugin-blog.js';

export default defineConfig({
  plugins: [
    react(),
    blogPlugin()
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '/Pics': resolve(__dirname, 'src/assets/Pics'),
    },
  },
  publicDir: 'public',
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          icons: ['lucide-react'],
          markdown: ['react-markdown', 'remark-gfm', 'rehype-highlight'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    assetsInlineLimit: 4096,
    copyPublicDir: true,
    assetsDir: 'assets',
  },
  server: {
    fs: {
      allow: ['..'],
    },
    // Enable HMR for markdown files
    watch: {
      ignored: ['!**/posts/**'],
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'react-markdown', 'remark-gfm', 'rehype-highlight'],
  },
  // Define custom loader for markdown files in development
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
  },
});
