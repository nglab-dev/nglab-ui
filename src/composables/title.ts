export function usePageTitle() {
  const { currentRoute } = useRouter()
  const pageTitle = useTitle()

  watch(
    () => currentRoute.value.path,
    () => {
      const appTitle = import.meta.env.VITE_APP_NAME as string
      const route = unref(currentRoute)
      if (route.name === 'Redirect')
        return
      const title = route?.meta?.title as string
      pageTitle.value = title ? `${title} - ${appTitle}` : `${appTitle}`
    },
    {
      immediate: true,
    },
  )
}
