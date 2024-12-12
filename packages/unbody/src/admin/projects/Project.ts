import { ProjectEntity, ProjectState, ProjectStates } from '../entities'
import { ProjectSettings } from '../project-settings'
import { ApiKey } from './ApiKey'
import { ProjectApiKeys } from './ProjectApiKeys'
import { Projects } from './Projects'
import { ProjectSources } from './ProjectSources'
import { ProjectWebhook } from './ProjectWebhook'
import { ProjectWebhooks } from './ProjectWebhooks'
import { Source } from './Source'

export class Project {
  static State = ProjectStates

  static Source = Source
  static ApiKey = ApiKey
  static Webhook = ProjectWebhook
  static Settings = ProjectSettings

  public id!: string
  public name!: string
  public ownerId!: string
  public state!: ProjectState
  public settings!: ProjectSettings
  public pausedAt?: Date
  public restoredAt?: Date
  public createdAt!: Date
  public updatedAt!: Date

  private _sources!: ProjectSources
  private _apiKeys!: ProjectApiKeys
  private _webhooks!: ProjectWebhooks

  constructor(private _projects: Projects) {}

  get sources() {
    if (!this._sources) {
      this._sources = new ProjectSources(this._projects.client, this)
    }

    return this._sources
  }

  get apiKeys() {
    if (!this._apiKeys) {
      this._apiKeys = new ProjectApiKeys(this._projects.client, this)
    }

    return this._apiKeys
  }

  get webhooks() {
    if (!this._webhooks) {
      this._webhooks = new ProjectWebhooks(this._projects.client, this)
    }

    return this._webhooks
  }

  save = async () => this._projects.save(this).then((res) => res.project)

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      ownerId: this.ownerId,
      state: this.state,
      settings: this.settings,
      pausedAt: this.pausedAt?.toJSON(),
      restoredAt: this.restoredAt?.toJSON(),
      createdAt: this.createdAt?.toJSON(),
      updatedAt: this.updatedAt?.toJSON(),
    }
  }

  static fromJSON(
    projects: Projects,
    data: Partial<ProjectEntity> | Partial<Project>,
    instance?: Partial<Project>,
  ) {
    const project =
      (instance && instance instanceof Project && instance) ||
      new Project(projects)

    if (data.id) project.id = data.id
    if (data.name) project.name = data.name
    if (data.ownerId) project.ownerId = data.ownerId
    if (data.state) project.state = data.state as ProjectState
    if (data.settings)
      project.settings =
        data.settings instanceof ProjectSettings
          ? data.settings
          : ProjectSettings.fromJSON(data.settings)
    if (data.pausedAt)
      project.pausedAt = data.pausedAt ? new Date(data.pausedAt) : undefined
    if (data.restoredAt)
      project.restoredAt = data.restoredAt
        ? new Date(data.restoredAt)
        : undefined
    if (data.createdAt)
      project.createdAt =
        typeof data.createdAt === 'string'
          ? new Date(data.createdAt)
          : data.createdAt
    if (data.updatedAt)
      project.updatedAt =
        typeof data.updatedAt === 'string'
          ? new Date(data.updatedAt)
          : data.updatedAt

    return project as Project
  }
}
