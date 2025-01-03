// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ["@nuxtjs/supabase"],

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

  compatibilityDate: "2025-01-03"
})