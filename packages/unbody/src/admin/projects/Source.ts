import { ListSourceIndexingJobsParams } from '../endpoints'
import { SourceEntity, SourceState, SourceType } from '../entities'
import { ProjectSources } from './ProjectSources'

export class Source {
  static State = SourceState
  static Type = SourceType

  public id!: string
  public name!: string
  public ownerId!: string
  public projectId!: string
  public state!: SourceState
  public custom: Record<string, any> = {}
  public initialized!: boolean
  public statRecords!: number
  public type!: SourceType
  public pausedAt?: Date
  public restoredAt?: Date
  public createdAt!: Date
  public updatedAt!: Date

  constructor(private _projectSources: ProjectSources) {}

  save = async () => this._projectSources.save(this).then((res) => res.source)

  initialize = async () => this._projectSources.initialize(this)

  update = async () => this._projectSources.update(this)

  rebuild = async () => this._projectSources.rebuild(this)

  listJobs = async (
    params: Omit<ListSourceIndexingJobsParams, 'projectId' | 'sourceId'>,
  ) =>
    this._projectSources.listJobs({
      sourceId: this.id,
      ...params,
    })

  getJob = async (params: { id: string }) =>
    this._projectSources.getJob({
      sourceId: this.id,
      jobId: params.id,
    })

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      ownerId: this.ownerId,
      projectId: this.projectId,
      type: this.type,
      state: this.state,
      initialized: this.initialized,
      custom: this.custom,
      pausedAt: this.pausedAt?.toJSON(),
      restoredAt: this.restoredAt?.toJSON(),
      createdAt: this.createdAt?.toJSON(),
      updatedAt: this.updatedAt?.toJSON(),
    }
  }

  static fromJSON(
    projectSources: ProjectSources,
    data: Partial<SourceEntity> | Partial<Source>,
    instance?: Source,
  ) {
    const source =
      (instance && instance instanceof Source && instance) ||
      new Source(projectSources)

    if (data.id) source.id = data.id
    if (data.name) source.name = data.name
    if (data.projectId) source.projectId = data.projectId
    if (data.type) source.type = data.type
    if (data.ownerId) source.ownerId = data.ownerId
    if (data.state) source.state = data.state as SourceState
    if (data.custom) source.custom = data.custom
    if (data.statRecords) source.statRecords = data.statRecords

    if (data.pausedAt)
      source.pausedAt = data.pausedAt ? new Date(data.pausedAt) : undefined
    if (data.restoredAt)
      source.restoredAt = data.restoredAt
        ? new Date(data.restoredAt)
        : undefined
    if (data.createdAt)
      source.createdAt =
        typeof data.createdAt === 'string'
          ? new Date(data.createdAt)
          : data.createdAt
    if (data.updatedAt)
      source.updatedAt =
        typeof data.updatedAt === 'string'
          ? new Date(data.updatedAt)
          : data.updatedAt

    return source as Source
  }
}
