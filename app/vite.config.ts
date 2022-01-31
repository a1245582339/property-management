import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
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
