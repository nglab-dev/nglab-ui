import { createHead } from '@unhead/vue'

export const install: UserPlugin = (app) => {
  const head = createHead()
  app.use(head)
}
