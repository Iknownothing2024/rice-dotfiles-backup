// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // 重点在这里：告诉 Vite 哪些后缀名是静态资源
  assetsInclude: ['**/*.epub'], 
})