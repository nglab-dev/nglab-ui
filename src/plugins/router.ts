import router from '@/router'

export const install: UserPlugin = (app) => {
  app.use(router)
}
