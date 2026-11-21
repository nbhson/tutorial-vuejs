// vitest.config.ts (hoặc thêm vào vite.config.ts)
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom',       // mô phỏng DOM cho component test
    globals: true,              // dùng describe/it không cần import
  },
})
