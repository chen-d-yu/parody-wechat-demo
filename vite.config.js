import { defineConfig } from 'vite';
import { resolve } from 'path';
import uni from '@dcloudio/vite-plugin-uni';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
    extensions: ['.mjs', '.js', '.jsx', '.json', '.vue'],
  },
  server: {
    proxy: {

    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  },
  css: {
    // css预处理器
    preprocessorOptions: {
      scss: {
        // additionalData: '@use "@/assets/styles/variables.scss";',
        javascriptEnabled: true
      }
    }
  }
});
