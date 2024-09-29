export type ProjectEntity = {
  id: string
  name: string
  ownerId: string
  state: string
  settings: Record<string, any>
  pausedAt?: string
  restoredAt?: string
  createdAt: string
  updatedAt: string
}

export type AdminApiKeyEntity = {
  id: string
  key: string
  name: string
  createdAt: string
  updatedAt: string
  expirationDate?: string
}

export type ProjectApiKeyEntity = {
  id: string
  key: string
  name: string
  projectId: string
  createdAt: string
  updatedAt: string
  expirationDate?: string
}

export type ProjectWebhookEntity = {
  id: string
  url: string
  projectId: string
  createdAt: string
  updatedAt: string
}

export type SourceEntity = {
  id: string
  projectId: string
  ownerId: string

  state: string
  type: string

  statRecords: number
  custom: Record<string, any>

  pausedAt?: string
  restoredAt?: string
  createdAt: string
  updatedAt: string
}
