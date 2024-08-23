import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    ['fcc', 'flex items-center justify-center'],
    ['row', 'flex flex-row'],
    ['icon-btn', 'p-1 inline-block cursor-pointer select-none transition duration-200 ease-in-out hover:opacity-100 hover:text-[var(--el-color-primary)] text-2xl c-[var(--el-text-color-primary)]'],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetTypography(),
    presetIcons(),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  safelist: [
    'prose',
    'prose-sm',
    'm-auto',
    'text-left',
  ],

})
