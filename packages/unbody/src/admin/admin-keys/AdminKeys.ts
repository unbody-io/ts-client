import { AdminKeyClient } from '../clients'
import { AdminKey } from './AdminKey'

export class AdminKeys {
  constructor(public client: AdminKeyClient) {}

  ref = (params: Partial<AdminKey>) => {
    return AdminKey.fromJSON(this, { ...params })
  }

  save = async (adminKey: AdminKey) => {
    if (adminKey.id) throw new Error('Cannot update an existing Admin Key.')

    return this.client
      .create({
        body: {
          name: adminKey.name,
        },
      })
      .then(async (res) => {
        return {
          res,
          adminKey: AdminKey.fromJSON(this, res.data!.data, adminKey),
        }
      })
  }

  delete = async (adminKey: { id: string } | AdminKey) =>
    this.client
      .delete({
        id: adminKey.id,
      })
      .then((res) => ({
        res,
      }))
}
