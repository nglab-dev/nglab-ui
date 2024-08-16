import type { MockMethod } from 'vite-plugin-mock'
import type { requestParams } from './base'
import { getRequestToken, resultError, resultOk, userList } from './base'

const authMock: MockMethod[] = [
  {
    url: '/api/login',
    timeout: 200,
    method: 'post',
    response: ({
      body,
    }) => {
      const { username, password } = body
      const loginUser = userList.find(item => item.username === username && password === item.password)
      if (!loginUser)
        return resultError('Incorrect account or password!')
      return resultOk({
        token: `${username}-fake-token`,
      })
    },
  },
  {
    url: '/api/user',
    timeout: 200,
    method: 'get',
    response: (
      request: requestParams,
    ) => {
      const token = getRequestToken(request)
      const checkUser = userList.find(item => item.token === token)
      if (!checkUser)
        return resultError('The corresponding user information was not obtained!')

      return resultOk(checkUser)
    },
  },
  {
    url: '/api/menu',
    timeout: 200,
    method: 'get',
    response: () => {
      return resultOk([])
    },
  },
]

export default authMock
