import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
        },
    },
    server: {
        host: '0.0.0.0',
        proxy: {
            "/api": {
                // target: "http://192.168.210.46:5200",
                target: "http://127.0.0.1:5000",
                // target: "http://xzqrff.natappfree.cc",
                changeOrigin: true,
            },
        }
    }
})
