import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/postcss' // 1. 플러그인 가져오기

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // 2. 여기에 추가
  ],
})