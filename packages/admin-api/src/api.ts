import axios from 'axios'
import { Client, ClientType } from './base'
import { UNBODY_ADMIN_API_BASE_URL } from './constants'
import { endpoints } from './endpoints'

export type AuthOptions = {
  /**
   * Base64 encoded Admin Key
   */
  adminKey?: string
  /**
   * Bearer token
   */
  accessToken?: string

  /**
   * Admin Key ID
   */
  username?: string
  /**
   * Admin Key Secret
   */
  password?: string
}

export type Config = {
  baseURL?: string
  auth: AuthOptions
}

export class UnbodyAdminAPI {
  public apiKeys: ClientType<(typeof endpoints)['apiKeys']>
  public projects: ClientType<(typeof endpoints)['projects']>

  constructor(public config: Config) {
    const client = axios.create({
      baseURL: config.baseURL || UNBODY_ADMIN_API_BASE_URL,
      ...(config.auth?.username && config.auth?.password
        ? {
            auth: {
              username: config.auth.username,
              password: config.auth.password,
            },
          }
        : {}),
      headers: {
        ...(config.auth?.adminKey
          ? {
              Authorization: config.auth.adminKey,
            }
          : {}),
        ...(config.auth?.accessToken
          ? {
              Authorization: `${
                (config.auth.accessToken.startsWith('Bearer ')
                  ? ''
                  : 'Bearer ') + config.auth.accessToken
              }`,
            }
          : {}),
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })

    this.apiKeys = new Client(client, endpoints.apiKeys) as any as ClientType<
      (typeof endpoints)['apiKeys']
    >

    this.projects = new Client(client, endpoints.projects) as any as ClientType<
      (typeof endpoints)['projects']
    >
  }
}
