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

export const IndexingJobStatus = {
  Scheduled: 'scheduled' as 'scheduled',
  Running: 'running' as 'running',
  Finished: 'finished' as 'finished',
  Cancelled: 'cancelled' as 'cancelled',
}

export type IndexingJobStatus =
  (typeof IndexingJobStatus)[keyof typeof IndexingJobStatus]

export const IndexingJobType = {
  Init: 'init' as 'init',
  Update: 'update' as 'update',
}

export type IndexingJobType =
  (typeof IndexingJobType)[keyof typeof IndexingJobType]

export type IndexingJobEntity = {
  id: string
  projectId: string
  sourceId: string
  type: IndexingJobType
  status: IndexingJobStatus
  processingCount: number
  processedCount: number
  failedCount: number
  queuedCount: number
  scheduledAt: Date
  processing: string[]
  failed: string[]
  queued: string[]
  processed: string[]
  startedAt: Date
  finishedAt: Date
  cancellationDetails?: {
    reason: string
  } | null
  createdAt: Date
  updatedAt: Date
}
