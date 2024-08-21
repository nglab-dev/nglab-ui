import { createHead } from '@vueuse/head'

const head = createHead()

export const install: UserPlugin = (app) => {
  app.use(head)
}
