import { URL, fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { PrimeVueResolver } from '@primevue/auto-import-resolver'
import UnoCSS from 'unocss/vite'
import VueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  plugins: [
    // https://vuejs.org/
    Vue(),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        'vue-i18n',
        '@vueuse/head',
        '@vueuse/core',
        {
          'vue-router/auto': ['useRoute', 'useRouter'],
        },
      ],
      dts: 'src/auto-imports.d.ts',
      vueTemplate: true,
      dirs: [
        'src/composables',
        'src/stores',
      ],
    }),

    // https://github.com/antfu/unplugin-vue-components
    Components({
      dts: 'src/components.d.ts',
      resolvers: [
        PrimeVueResolver(),
      ],
    }),

    // https://unocss.dev/
    UnoCSS(),

    // https://devtools-next.vuejs.org/
    VueDevTools(),
  ],
  define: { 'process.env': {} },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          primevue: ['primevue/config', '@primevue/themes'],
          vue: ['vue', 'vue-router', 'pinia', '@vueuse/core', 'vue-i18n'],
        },
      },
    },
  },
})
