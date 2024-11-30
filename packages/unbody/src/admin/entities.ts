export const ProjectState = {
  Created: 'created' as 'created',
  Initializing: 'initializing' as 'initializing',
  Initialized: 'initialized' as 'initialized',
  Paused: 'paused' as 'paused',
  Pausing: 'pausing' as 'pausing',
  Restoring: 'restoring' as 'restoring',
} as const

export type ProjectState = (typeof ProjectState)[keyof typeof ProjectState]

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

export const SourceState = {
  Idle: 'idle',
  Initializing: 'initializing',
  Updating: 'updating',
  Deleting: 'deleting',
  Paused: 'paused',
}

export type SourceState = (typeof SourceState)[keyof typeof SourceState]

export const SourceType = {
  GoogleDrive: 'google_drive',
  GoogleCalendar: 'google_calendar',
  Discord: 'discord',
  GithubBranch: 'github_branch',
  GithubIssues: 'github_issues',
  PushApi: 'push_api',
}

export type SourceType = (typeof SourceType)[keyof typeof SourceType]

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
