import { createProdMockServer } from 'vite-plugin-mock/client'

const modules = import.meta.glob(['../../mock/*.ts', '!../../mock/(base).ts'], { eager: true })

const mockModules: any[] = []
Object.keys(modules).forEach((key) => {
  if (key.includes('/_'))
    return
  // @ts-expect-error unkown
  mockModules.push(...modules[key].default)
})

export const install: UserPlugin = (_app) => {
  if (import.meta.env.MODE === 'production') {
    createProdMockServer(mockModules)
  }
}
