import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  // base: 'oil-cake.github.io',

  // 'https://github.com/oil-cake/oil-cake.github.io.git/'

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
