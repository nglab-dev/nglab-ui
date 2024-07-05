import { CacheKey } from '@/utils/constants'

export const userToken = useStorage<string>(CacheKey.TOKEN, '')
