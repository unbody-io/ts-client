import { ProjectClient } from '../clients'
import { ApiKey } from './ApiKey'
import { Project } from './Project'

export class ProjectApiKeys {
  constructor(public client: ProjectClient, private project: Project) {}

  ref = (params: Partial<ApiKey>) => {
    return ApiKey.fromJSON(this, { ...params })
  }

  save = async (apiKey: ApiKey) => {
    if (apiKey.id) throw new Error('Cannot update an existing API Key.')

    return this.client
      .createApiKey({
        projectId: this.project.id,
        body: {
          name: apiKey.name,
        },
      })
      .then((res) => {
        const data = res.data!.data!

        return {
          res,
          apiKey: ApiKey.fromJSON(this, data, apiKey),
        }
      })
  }

  delete = async (apiKey: { id: string } | ApiKey) => {
    return this.client
      .deleteApiKey({
        id: apiKey.id,
        projectId: this.project.id,
      })
      .then((res) => ({ res }))
  }
}
