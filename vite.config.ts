import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server:{
      host: '0.0.0.0',
    proxy:{
      "/api":{
        // target: "http://192.168.210.46:5200",
        target: "http://127.0.0.1:5000",
        // target: "http://rpfcsw.natappfree.cc",
        changeOrigin: true,
      },
    }
  }
})
