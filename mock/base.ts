export function resultOk<T = any>(data: T, { msg = 'success' } = {}) {
  return {
    code: 0,
    msg,
    data,
  }
}

export function resultError(msg = 'Request failed', { code = -1, data = null } = {}) {
  return {
    code,
    msg,
    data,
  }
}

export function getRequestToken({ headers }: requestParams): string | undefined {
  return headers?.authorization
}

export interface requestParams {
  method: string
  body: any
  headers?: { authorization?: string }
  query: any
}

export const userList = [
  {
    id: '1',
    username: 'admin',
    token: 'admin-fake-token',
    nickname: 'Super Admin',
    homePath: '/dashboard/workplace',
    avatar: 'https://dummyimage.com/640x640/1c66c7/fff.png&text=admin',
    password: '123456',
    role: ['admin'],
  },
  {
    id: '2',
    username: 'test',
    token: 'test-fake-token',
    password: '123456',
    homePath: '/dashboard/workplace',
    nickname: 'test',
    avatar: 'https://dummyimage.com/640x640/1c66c7/fff.png&text=test',
    role: ['user'],
  },
]
