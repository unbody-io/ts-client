import { AxiosInstance } from 'axios'
import { Client, ClientType } from './base'
import { endpoints } from './endpoints'

export class Clients {
  public adminKeys: AdminKeyClient
  public projects: ProjectClient

  constructor(private axios: AxiosInstance) {
    this.adminKeys = new Client(
      this.axios,
      endpoints.apiKeys,
    ) as any as AdminKeyClient

    this.projects = new Client(
      this.axios,
      endpoints.projects,
    ) as any as ProjectClient
  }
}

export type AdminKeyClient = ClientType<(typeof endpoints)['apiKeys']>
export type ProjectClient = ClientType<(typeof endpoints)['projects']>
