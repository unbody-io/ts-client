import { ProjectClient } from '../clients'
import { Project } from './Project'
import { ProjectWebhook } from './ProjectWebhook'

export class ProjectWebhooks {
  constructor(public client: ProjectClient, private project: Project) {}

  new = (params: Required<Pick<ProjectWebhook, 'url'>>) => {
    return ProjectWebhook.fromJSON(this, { ...params })
  }

  get = async (webhook: { id: string } | ProjectWebhook) => {
    if (!webhook.id) throw new Error('Webhook ID is required')

    const { webhooks } = await this.list()

    const _webhook = webhooks.find((w) => w.id === webhook.id)

    if (!_webhook) {
      throw new Error('Webhook not found')
    }

    return ProjectWebhook.fromJSON(this, _webhook, webhook as ProjectWebhook)
  }

  save = async (webhook: ProjectWebhook) => {
    if (webhook.id)
      throw new Error('Cannot update an existing project webhook.')

    return this.client
      .createWebhook({
        projectId: this.project.id,
        body: {
          url: webhook.url,
        },
      })
      .then((res) => {
        const data = res.data!.data!

        return {
          res,
          apiKey: ProjectWebhook.fromJSON(this, data.webhook, webhook),
        }
      })
  }

  list = async () => {
    return this.client
      .listWebhooks({
        projectId: this.project.id,
      })
      .then((res) => {
        const data = res.data!.data!

        return {
          res,
          webhooks: data.webhooks.map((webhook) =>
            ProjectWebhook.fromJSON(this, webhook),
          ),
        }
      })
  }

  delete = async (webhook: { id: string } | ProjectWebhook) => {
    return this.client
      .deleteWebhook({
        projectId: this.project.id,
        webhookId: webhook.id,
      })
      .then((res) => ({ res }))
  }
}
