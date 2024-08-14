import process from 'node:process'
import path from 'node:path'
import { type ConfigEnv, type UserConfigExport, loadEnv } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import UnoCSS from 'unocss/vite'
import VueDevTools from 'vite-plugin-vue-devtools'
import dayjs from 'dayjs'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import VueI18n from '@intlify/unplugin-vue-i18n/vite'

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfigExport => {
  const viteEnv = loadEnv(mode, process.cwd())
  const pathSrc = path.resolve(__dirname, 'src')

  const { VITE_PUBLIC_PATH } = viteEnv

  return {
    base: VITE_PUBLIC_PATH,
    resolve: {
      alias: {
        '@': `${pathSrc}/`,
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
        dts: 'types/auto-imports.d.ts',
        vueTemplate: true,
        dirs: [
          'src/composables',
        ],
        resolvers: [
          ElementPlusResolver(),

          // Auto import icon components
          // 自动导入图标组件
          IconsResolver({
            prefix: 'Icon',
          }),
        ],
      }),

      // https://github.com/antfu/unplugin-vue-components
      Components({
        dts: 'types/components.d.ts',
        resolvers: [
          // Auto register icon components
          // 自动注册图标组件
          IconsResolver({
            enabledCollections: ['mdi'],
          }),
          // Auto register Element Plus components
          // 自动导入 Element Plus 组件
          ElementPlusResolver(),
        ],
      }),

      // https://element-plus.org/
      ElementPlus({
        useSource: true,
      }),

      Icons({
        autoInstall: true,
      }),

      // https://unocss.dev/
      UnoCSS(),

      // https://github.com/intlify/bundle-tools/tree/main/packages/unplugin-vue-i18n
      VueI18n({
        runtimeOnly: true,
        compositionOnly: true,
        fullInstall: true,
        include: [path.resolve(__dirname, 'locales/**')],
      }),

      // https://devtools-next.vuejs.org/
      VueDevTools(),
    ],
    define: {
      __BUILD_TIME__: JSON.stringify(dayjs().format('YYYY/MM/DD HH:mm')),
    },
  }
}
