import {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios'

export type EndpointCallback<T> = (params: {
  params: T
  url: string
  endpoint: string
  config: AxiosRequestConfig

  setParam: (key: string, value: any) => void
  setParams: (params: Record<string, any>) => void
  setData: (key: string, value: any) => void
  setBody: (body: Record<string, any>) => void
  setHeader: (key: string, value: string) => void
  setHeaders: (headers: Record<string, any>) => void
}) => void

export const Methods = {
  GET: 'get' as 'get',
  POST: 'post' as 'post',
  PUT: 'put' as 'put',
  PATCH: 'patch' as 'patch',
  DELETE: 'delete' as 'delete',
} as const

type Method = (typeof Methods)[keyof typeof Methods]

export type EndpointDefinition<
  T extends Record<string, any> = Record<string, any>,
  R = any,
> = {
  path: string
  method: Method
  params?: T
  response?: R
  callback?: EndpointCallback<T>
}

type EndpointDefinitions = {
  [key: string]: EndpointDefinition<any>
}

export type ClientType<T extends EndpointDefinitions> = T extends never
  ? never
  : {
      [K in keyof T]: (
        params: T[K]['params'] extends undefined ? {} : T[K]['params'],
        options?: AxiosRequestConfig,
      ) => Promise<
        AxiosResponse<
          T[K]['response'] extends undefined ? any : T[K]['response']
        >
      >
    } & {
      axios: AxiosInstance
    }

export class Client {
  constructor(
    public axios: AxiosInstance,
    private endpoints: EndpointDefinitions,
  ) {
    this._createEndpoints()
  }

  private _createEndpoints() {
    Object.entries(this.endpoints).forEach(([key, definition]) => {
      const _this = this as any

      _this[key] = (params: any, options: AxiosRequestConfig = {}) => {
        return this._request.bind(this)(
          definition.method,
          definition.path,
          params,
          options,
          definition.callback,
        )
      }
    })
  }

  private async _request<T>(
    method: 'get' | 'post' | 'put' | 'patch' | 'delete',
    url: string,
    params: Record<string, any> = {},
    options: AxiosRequestConfig = {},
    callback?: EndpointCallback<any>,
  ) {
    let formattedUrl = url.replace(/{(\w+)}/g, (_, key) => {
      if (!params[key]) {
        const error = new AxiosError(
          `Missing parameter: ${key}`,
          '0',
          undefined,
          null,
          undefined,
        )
        ;(error as any).data = {
          statusCode: -1,
          errorCode: '',
          error: error.message,
        }

        throw error
      }

      return params[key]
    })

    let config: AxiosRequestConfig = {
      method,
      url: formattedUrl,
      ...options,
      params: {
        ...(options.params || {}),
      },
      data: {},
      headers: {},
    }

    if (callback)
      callback({
        config: config,
        endpoint: url,
        url: formattedUrl,
        params: params,
        setParam: (key, value) => {
          config.params[key] = value
        },
        setParams: (params) => {
          config.params = params
        },
        setBody: (body) => {
          config.data = body
        },
        setData: (key, value) => {
          config.data[key] = value
        },
        setHeader: (key, value) => {
          config.headers![key] = value
        },
        setHeaders: (headers) => {
          config.headers = headers
        },
      })

    config = {
      ...config,
      params: {
        ...config.params,
        ...(options.params || {}),
      },
      data: {
        ...(config.data || {}),
        ...(options.data || {}),
      },
      headers: {
        ...config.headers,
        ...(options.headers || {}),
      },
    }

    return this.axios.request<T>(config)
  }
}
