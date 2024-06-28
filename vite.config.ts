import path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { PrimeVueResolver } from '@primevue/auto-import-resolver'
import UnoCSS from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    vue(),
    UnoCSS(),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
      ],
      dts: 'src/auto-imports.d.ts',
      dirs: [
        'src/composables',
        'src/stores',
      ],
      vueTemplate: true,
    }),
    Components({
      extensions: ['vue', 'md'],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [
        PrimeVueResolver(),
      ],
      dts: 'src/components.d.ts',
    }),
  ],
})
