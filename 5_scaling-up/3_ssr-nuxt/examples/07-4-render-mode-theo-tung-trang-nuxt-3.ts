// nuxt.config.ts — chọn chế độ tổng thể
export default defineNuxtConfig({
  ssr: true,      // false → SPA (CSR) thuần
  routeRules: {
    '/': { prerender: true },                        // SSG
    '/products/**': { swr: 600 },                    // SSR + cache 10 phút
    '/admin/**': { ssr: false },                     // CSR cho dashboard
  },
})
