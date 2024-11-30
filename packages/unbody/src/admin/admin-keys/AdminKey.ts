import { AdminApiKeyEntity } from '../entities'
import { AdminKeys } from './AdminKeys'

export class AdminKey {
  id!: string
  key!: string
  name!: string
  createdAt!: Date
  updatedAt!: Date
  expirationDate?: Date

  constructor(private _adminKeys: AdminKeys) {}

  // save = async () => this._adminKeys.save(this).then((res) => res.apiKey)

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      key: this.key,
      createdAt: this.createdAt?.toJSON(),
      updatedAt: this.updatedAt?.toJSON(),
      expirationDate: this.expirationDate?.toJSON(),
    }
  }

  static fromJSON(
    projectApiKeys: AdminKeys,
    data: Partial<AdminApiKeyEntity> | Partial<AdminKey>,
    instance?: AdminKey,
  ) {
    const key =
      (instance && instance instanceof AdminKey && instance) ||
      new AdminKey(projectApiKeys)

    if (data.id) key.id = data.id
    if (data.name) key.name = data.name
    if (data.key) key.key = data.key
    if (data.createdAt) key.createdAt = new Date(data.createdAt)
    if (data.updatedAt) key.updatedAt = new Date(data.updatedAt)
    if (data.expirationDate) key.expirationDate = new Date(data.expirationDate)

    return key as AdminKey
  }
}
