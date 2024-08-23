import { storeToRefs } from 'pinia'
import { useAppStore } from '@/store'
import { mix } from '@/utils/color'
import { DEFAULT_PRIMARY_COLOR } from '@/constants/theme'

// these APIs are auto-imported from @vueuse/core
export const isDark = useDark()
// export const toggleDark = useToggle(isDark)
export const preferredDark = usePreferredDark()

export function useTheme() {
  const appStore = useAppStore()
  const { primaryColor } = storeToRefs(appStore)

  const setMenuTheme = () => {
    // TODO: use CSS variables instead of inline styles
    // const primaryColor = useCssVar('--el-color-primary', document.documentElement)
    // const isc = isDarkColor(color)
    const theme: Recordable = {
      '--el-menu-bg-color': isDark.value ? '#141414' : '#ffffff',
      '--el-menu-hover-bg-color': isDark.value ? '#000000' : '#cccccc',
      '--el-menu-active-bg-color': isDark.value ? '#000000' : 'var(--el-color-primary-light-9)',
      '--el-menu-text-color': '#333333',
      '--el-menu-active-color': 'var(--el-color-primary)',
      '--el-menu-hover-text-color': '#333333',
    }

    for (const [key, value] of Object.entries(theme)) {
      document.documentElement.style.setProperty(key, value)
    }
  }

  /**
   * Credit to [@hooray](https://github.com/hooray)
   * @see https://github.com/vuejs/vitepress/pull/2347
   */
  const toggleDark = (event: MouseEvent) => {
    // @ts-expect-error experimental API
    const isAppearanceTransition = document.startViewTransition
      && !window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!isAppearanceTransition) {
      isDark.value = !isDark.value
      return
    }

    const x = event.clientX
    const y = event.clientY
    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y),
    )
    // @ts-expect-error: Transition API
    const transition = document.startViewTransition(async () => {
      isDark.value = !isDark.value
      setMenuTheme()
      await nextTick()
    })
    transition.ready
      .then(() => {
        const clipPath = [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ]
        document.documentElement.animate(
          {
            clipPath: isDark.value
              ? [...clipPath].reverse()
              : clipPath,
          },
          {
            duration: 400,
            easing: 'ease-out',
            pseudoElement: isDark.value
              ? '::view-transition-old(root)'
              : '::view-transition-new(root)',
          },
        )
      })
  }

  const changePrimaryColor = (val: string) => {
    const el = document.documentElement
    const color = isDark.value ? '#000000' : '#ffffff'
    el.style.setProperty('--el-color-primary', val)
    const lightList = [3, 5, 7, 8, 9]
    lightList.forEach((v) => {
      el.style.setProperty(`--el-color-primary-light-${v}`, mix(color, val, v / 10))
    })
    el.style.setProperty(`--el-color-primary-dark-2`, mix(color, val, 0.2))
    primaryColor.value = val

    setMenuTheme()
  }

  const initTheme = () => {
    changePrimaryColor(primaryColor.value || DEFAULT_PRIMARY_COLOR)
  }

  return {
    toggleDark,
    changePrimaryColor,
    initTheme,
  }
}
