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
    ['fcb', 'flex items-center justify-between'],
    ['row', 'flex flex-row'],
    ['icon-btn', 'p-1 inline-block cursor-pointer select-none transition duration-200 ease-in-out hover:opacity-100 hover:text-[var(--el-color-primary)] text-2xl c-[var(--el-text-color-primary)]'],
    ['outline-box', 'relative p-1 outline-1 outline-solid outline-[var(--el-border-color)] cursor-pointer select-none text-2xl rd-sm'],
    ['outline-box-active', 'outline-2 outline-[var(--el-color-primary)]'],
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
