import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server:{
      host: '0.0.0.0',
    proxy:{
      "/api/test":{
        // target: "http://192.168.210.46:5200",
        target: "http://127.0.0.1:5000",
        // target: "http://10.46.101.37:5200",
        // target: "http://10.47.206.52:5200",
        changeOrigin: true,
      },
    }
  }
})
