import app from '@/main'

export type QueryParams = Record<string, string | number>

export interface APIRequest<T> {
  path: APIPath
  method: string
  query?: QueryParams
  body?: T
  signal?: AbortSignal
  anonymous?: boolean
}

export interface APIResponse<T> {
  code: number
  msg: string
  data?: T
}

type APIPath = string & { __apiPath: never }

/**
 * Template literal to build API request paths. Example:
 *
 * ```ts
 * const req = path`/users/${userId}/packages/${packageName}`;
 * ```
 *
 * All parameters are encoded with `encodeURIComponent`. It is validated that
 * the path does not contain any ? or # characters.
 */
export function path(
  strings: TemplateStringsArray,
  ...params: string[]
): APIPath {
  let path = ''
  for (let i = 0; i < strings.length; i++) {
    path += strings[i]
    if (i < params.length) {
      path += encodeURIComponent(params[i])
    }
  }
  if (path.includes('?') || path.includes('#')) {
    throw new Error(
      'Path cannot contain ? or # characters, include query in APIRequest.query',
    )
  }
  return path as APIPath
}

interface APIOptions {
  token?: string | null
}

interface RequestOptions {
  signal?: AbortSignal
  anonymous?: boolean
}

export class API {
  _apiRoot: string
  _token: string | null

  constructor(apiRoot: string, { token }: APIOptions = {}) {
    this._apiRoot = apiRoot
    this._token = token ?? null
  }

  hasToken(): boolean {
    return this._token !== null
  }

  token(): string | null {
    return this._token
  }

  get<RespT = unknown>(
    path: APIPath,
    query?: QueryParams,
    opts?: RequestOptions,
  ): Promise<APIResponse<RespT>> {
    return this.request({
      method: 'GET',
      path,
      query,
      signal: opts?.signal,
      anonymous: opts?.anonymous,
    })
  }

  post<RespT = unknown, ReqT = unknown>(
    path: APIPath,
    body: ReqT,
    query?: QueryParams,
    opts?: RequestOptions,
  ): Promise<APIResponse<RespT>> {
    return this.request({
      method: 'POST',
      path,
      query,
      body,
      signal: opts?.signal,
      anonymous: opts?.anonymous,
    })
  }

  patch<RespT = unknown, ReqT = unknown>(
    path: APIPath,
    body: ReqT,
    query?: QueryParams,
    opts?: RequestOptions,
  ): Promise<APIResponse<RespT>> {
    return this.request({
      method: 'PATCH',
      path,
      query,
      body,
      signal: opts?.signal,
      anonymous: opts?.anonymous,
    })
  }

  delete<RespT = unknown>(
    path: APIPath,
    query?: QueryParams,
    opts?: RequestOptions,
  ): Promise<APIResponse<RespT>> {
    return this.request({
      method: 'DELETE',
      path,
      query,
      signal: opts?.signal,
      anonymous: opts?.anonymous,
    })
  }

  async request<RespT = unknown, ReqT = unknown>(
    req: APIRequest<ReqT>,
  ): Promise<APIResponse<RespT>> {
    const url = new URL(this._apiRoot + req.path)
    let result: APIResponse<RespT>
    for (const [key, value] of Object.entries(req.query ?? {})) {
      url.searchParams.append(key, String(value))
    }
    const headers = new Headers()
    if (this._token && !req.anonymous) {
      headers.append('Authorization', `Bearer ${this._token}`)
    }
    if (req.body) {
      headers.append('Content-Type', 'application/json')
    }
    try {
      const resp = await fetch(url.href, {
        method: req.method,
        headers,
        body: req.body ? JSON.stringify(req.body) : undefined,
        signal: req.signal,
      })
      if (resp.status === 200) {
        result = await resp.json()
        if (result.code !== 0) {
          app.config.globalProperties.$toast.add({ severity: 'error', summary: 'Error Message', detail: result.msg, life: 3000 })
        }
      }
      else {
        const body = await resp.text()
        try {
          const err = JSON.parse(body)
          result = {
            code: err.code,
            msg: err.message,
          }
        }
        catch {
          result = {
            code: 500,
            msg: `Failed to decode response. Body: ${body}`,
          }
        }
      }
    }
    catch (err) {
      console.error(err)
      result = {
        code: 500,
        msg: `Failed to make API call for ${req.path}`,
      }
    }
    return result
  }
}

const api = new API(import.meta.env.VITE_BASE_URL)

export { api }
