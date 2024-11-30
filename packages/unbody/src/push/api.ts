import axios from 'axios'
import { Client, ClientType } from './base'
import { UNBODY_PUSH_API_BASE_URL } from './constants'
import { endpoints } from './endpoints'

export type AuthOptions = {
  /**
   * Bearer token
   */
  accessToken?: string

  /**
   * API key
   */
  apiKey?: string
}

export type Config = {
  baseURL?: string

  projectId: string
  sourceId: string
  auth: AuthOptions
}

export class UnbodyPushAPI {
  public records: ClientType<(typeof endpoints)['records']>
  public files: ClientType<(typeof endpoints)['files']>

  constructor(public config: Config) {
    const client = axios.create({
      baseURL: config.baseURL || UNBODY_PUSH_API_BASE_URL,
      headers: {
        'x-project-id': config.projectId,
        'x-source-id': config.sourceId,
      },
    })

    client.interceptors.request.use((config) => {
      if (this.config.auth.apiKey) {
        config.headers.set('Authorization', this.config.auth.apiKey)
      } else if (this.config.auth.accessToken)
        config.headers.set(
          'Authorization',
          `${
            (this.config.auth.accessToken.startsWith('Bearer ')
              ? ''
              : 'Bearer ') + this.config.auth.accessToken
          }`,
        )

      config.baseURL = this.config.baseURL || UNBODY_PUSH_API_BASE_URL

      return config
    })

    this.records = new Client(client, endpoints.records) as any
    this.files = new Client(client, endpoints.files) as any
  }

  public auth = (credentials: AuthOptions) => {
    this.config.auth.accessToken = credentials.accessToken
    this.config.auth.apiKey = credentials.apiKey

    return this
  }
}
