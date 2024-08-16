import stores from '@/store'

export const install: UserPlugin = (app) => {
  app.use(stores)
}
