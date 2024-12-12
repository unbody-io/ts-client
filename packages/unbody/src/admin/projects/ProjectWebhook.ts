import { ProjectWebhookEntity } from '../entities'
import { ProjectWebhooks } from './ProjectWebhooks'

export class ProjectWebhook {
  id!: string
  url!: string
  projectId!: string
  createdAt!: Date
  updatedAt!: Date

  constructor(private _projectWebhooks: ProjectWebhooks) {}

  save = async () => this._projectWebhooks.save(this).then((res) => res.webhook)

  toJSON() {
    return {
      id: this.id,
      url: this.url,
      projectId: this.projectId,
      createdAt: this.createdAt?.toJSON(),
      updatedAt: this.updatedAt?.toJSON(),
    }
  }

  static fromJSON(
    projectWebhooks: ProjectWebhooks,
    data: Partial<ProjectWebhookEntity> | Partial<ProjectWebhook>,
    instance?: ProjectWebhook,
  ) {
    const webhook =
      (instance && instance instanceof ProjectWebhook && instance) ||
      new ProjectWebhook(projectWebhooks)

    if (data.id) webhook.id = data.id
    if (data.url) webhook.url = data.url
    if (data.projectId) webhook.projectId = data.projectId
    if (data.createdAt) webhook.createdAt = new Date(data.createdAt)
    if (data.updatedAt) webhook.updatedAt = new Date(data.updatedAt)

    return webhook as ProjectWebhook
  }
}
