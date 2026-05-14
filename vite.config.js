import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Worldcup History',
        short_name: 'WCHistory',
        description: 'Kho báu lịch sử bóng đá thế giới',
        theme_color: '#13072e',
        background_color: '#13072e',
        icons: [
          {
            src: 'https://cdn-icons-png.flaticon.com/512/861/861512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
})
