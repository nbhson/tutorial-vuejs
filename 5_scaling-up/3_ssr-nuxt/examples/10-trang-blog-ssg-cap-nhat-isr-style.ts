// nuxt.config.ts
routeRules: { '/blog/**': { swr: 3600 } }   // HTML cache 1h, làm mới ngầm
