import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: /^~/, replacement: '' },
      { find: '@', replacement: path.resolve(__dirname, 'src') },
    ],
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        additionalData: `@import "${path.resolve(
          __dirname,
          'node_modules/antd/dist/antd.variable.less'
        )}";`,
      },
    },
  },
  server: {
    proxy: {
      // '^/api_*': {
      //   target: 'https://qcsi7o.api.cloudendpoint.cn',
      //   changeOrigin: true,
      // },
      '/api': {
        target: 'http://127.0.0.1:7001',
        changeOrigin: true,
      },
    },
  },
})
