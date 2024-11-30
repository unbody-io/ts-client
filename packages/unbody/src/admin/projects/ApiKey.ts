import { ProjectApiKeyEntity } from '../entities'
import { ProjectApiKeys } from './ProjectApiKeys'

export class ApiKey {
  id!: string
  key!: string
  name!: string
  createdAt!: Date
  updatedAt!: Date
  expirationDate?: Date

  constructor(private _projectApiKeys: ProjectApiKeys) {}

  save = async () => this._projectApiKeys.save(this).then((res) => res.apiKey)

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      createdAt: this.createdAt?.toJSON(),
      updatedAt: this.updatedAt?.toJSON(),
      expirationDate: this.expirationDate?.toJSON(),
    }
  }

  static fromJSON(
    projectApiKeys: ProjectApiKeys,
    data: Partial<ProjectApiKeyEntity> | Partial<ApiKey>,
    instance?: ApiKey,
  ) {
    const key =
      (instance && instance instanceof ApiKey && instance) ||
      new ApiKey(projectApiKeys)

    if (data.id) key.id = data.id
    if (data.name) key.name = data.name
    if (data.key) key.key = data.key
    if (data.createdAt) key.createdAt = new Date(data.createdAt)
    if (data.updatedAt) key.updatedAt = new Date(data.updatedAt)
    if (data.expirationDate) key.expirationDate = new Date(data.expirationDate)

    return key as ApiKey
  }
}
