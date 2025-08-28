export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: false,                 // matikan SSR → full SPA
  app: {
    baseURL: '/',             // kalau di subfolder: '/namafolder/'
  },
  modules: ['@nuxtjs/tailwindcss'],
  css: ['@/assets/css/tailwind.css'],
})
