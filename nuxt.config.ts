import pkg from './package.json'

export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ["@nuxtjs/supabase", "@nuxtjs/mdc"],

  supabase: {
    redirect: false
  },

  css: ["bootstrap/dist/css/bootstrap.min.css"],

  plugins: [
    { src: "~/plugins/aos.ts", mode: "client", ssr: false }
  ],

  app: {
    head: {
      title: "Kabeng RPL / SMKN 4 Tasikmalaya.",
      meta: [{
        name: "description",
        content: "Catatan Inventaris Alat/Bahan Praktik RPL / Kepala Bengkel RPL SMKN 4 Tasikmalaya"
      }],
      script: [{
        src: "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js",
      }]
    },
  },
  runtimeConfig: {
    public: {
      appVersion: pkg.version,
      author: pkg.author,
    }
  },

  compatibilityDate: "2025-01-03"
})
