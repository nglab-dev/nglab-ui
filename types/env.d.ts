declare module '*.vue' {
  import type { defineComponent } from './vue'

  const Component: ReturnType<typeof defineComponent>
  export default Component
}

declare global {
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
}

declare interface ImportMetaEnv {
  readonly VITE_PUBLIC_PATH: string
  readonly VITE_BASE_URL: string
}
