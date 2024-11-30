import axios from 'axios'
import { AdminKeys } from './admin-keys/AdminKeys'
import { Clients } from './clients'
import { UNBODY_ADMIN_API_BASE_URL } from './constants'
import { Projects } from './projects/Projects'

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

export class UnbodyAdmin {
  public projects: Projects
  public adminKeys: AdminKeys

  constructor(public config: Config) {
    const _axios = axios.create({
      baseURL: config.baseURL || UNBODY_ADMIN_API_BASE_URL,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })

    _axios.interceptors.request.use((config) => {
      if (this.config.auth.adminKey)
        config.headers.set('Authorization', this.config.auth.adminKey)
      else if (this.config.auth.username && this.config.auth.password)
        config.auth = {
          username: this.config.auth.username,
          password: this.config.auth.password,
        }
      else if (this.config.auth.accessToken)
        config.headers.set(
          'Authorization',
          `${
            (this.config.auth.accessToken.startsWith('Bearer ')
              ? ''
              : 'Bearer ') + this.config.auth.accessToken
          }`,
        )

      if (this.config.baseURL && this.config.baseURL !== config.baseURL)
        config.baseURL = this.config.baseURL

      return config
    })

    const clients = new Clients(_axios)
    this.projects = new Projects(clients.projects)
    this.adminKeys = new AdminKeys(clients.adminKeys)
  }
}
