import { isArray, isString } from 'radash'
import { useUserStore } from '@/store'

export function useUserPermission() {
  const userStore = useUserStore()

  function hasPermission(permission: string[] | undefined) {
    if (!permission)
      return true

    if (!userStore.userInfo)
      return false

    const { roles } = userStore.userInfo

    if (isArray(permission)) {
      return permission.some(p => roles.includes(p))
    }

    if (isString(permission)) {
      return roles.includes(permission)
    }

    return false
  }

  return {
    hasPermission,
  }
}
