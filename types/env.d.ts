declare module '*.vue' {
  import type { defineComponent } from './vue'

  const Component: ReturnType<typeof defineComponent>
  export default Component
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

interface ImportMetaEnv {
  readonly VITE_APP_NAME: string
  readonly VITE_PUBLIC_PATH: string
  readonly VITE_API_BASE_URL: string
  readonly VITE_ROUTE_MODE: string
}
