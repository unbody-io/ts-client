export const ProjectStates = {
  Created: 'created' as 'created',
  Initializing: 'initializing' as 'initializing',
  Initialized: 'initialized' as 'initialized',
  Paused: 'paused' as 'paused',
  Pausing: 'pausing' as 'pausing',
  Restoring: 'restoring' as 'restoring',
} as const

export type ProjectState = (typeof ProjectStates)[keyof typeof ProjectStates]

export type ProjectEntity = {
  id: string
  name: string
  ownerId: string
  state: ProjectState
  settings: Record<string, any>
  pausedAt?: Date
  restoredAt?: Date
  createdAt: Date
  updatedAt: Date
}

export type AdminApiKeyEntity = {
  id: string
  key: string
  name: string
  createdAt: Date
  updatedAt: Date
  expirationDate?: Date
}

export type ProjectApiKeyEntity = {
  id: string
  key: string
  name: string
  projectId: string
  createdAt: Date
  updatedAt: Date
  expirationDate?: Date
}

export type ProjectWebhookEntity = {
  id: string
  url: string
  projectId: string
  createdAt: Date
  updatedAt: Date
}

export const SourceStates = {
  Idle: 'idle' as 'idle',
  Initializing: 'initializing' as 'initializing',
  Updating: 'updating' as 'updating',
  Deleting: 'deleting' as 'deleting',
  Paused: 'paused' as 'paused',
}

export type SourceState = (typeof SourceStates)[keyof typeof SourceStates]

export const SourceTypes = {
  GoogleDrive: 'google_drive' as 'google_drive',
  GoogleCalendar: 'google_calendar' as 'google_calendar',
  Discord: 'discord' as 'discord',
  GithubBranch: 'github_branch' as 'github_branch',
  GithubIssues: 'github_issues' as 'github_issues',
  PushApi: 'push_api' as 'push_api',
}

export type SourceType = (typeof SourceTypes)[keyof typeof SourceTypes]

export type SourceEntity = {
  id: string
  projectId: string
  ownerId: string
  name: string

  type: SourceType
  state: SourceState
  initialized: boolean

  statRecords: number
  custom: Record<string, any>

  pausedAt?: Date
  restoredAt?: Date
  createdAt: Date
  updatedAt: Date
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
