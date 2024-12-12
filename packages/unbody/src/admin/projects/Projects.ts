import { ProjectClient } from '../clients'
import { ListProjectsParams } from '../endpoints'
import { Project } from './Project'

export class Projects {
  constructor(public client: ProjectClient) {}

  ref = (params: Partial<Project> = {}) => {
    return Project.fromJSON(this, params)
  }

  get = async (project: { id: string } | Project) => {
    if (!project.id) throw new Error('Project ID is required')

    const { projects } = await this.list({
      filter: {
        id: project.id,
      },
    })

    if (projects.length === 0) {
      throw new Error('Project not found')
    }

    const _project = projects[0]

    if (project instanceof Project) {
      return Project.fromJSON(this, _project, project)
    }

    return _project
  }

  save = async (project: Project) => {
    if (project.id) {
      await this.client
        .patch({
          projectId: project.id,
          body: {
            name: project.name,
          },
        })
        .then((res) => {
          const data = res.data!.data!

          return {
            res,
            project: Project.fromJSON(this, data, project),
          }
        })
    }

    return this.client
      .create({
        body: {
          name: project.name,
          settings: project.settings,
        },
      })
      .then(async (res) => {
        return {
          res,
          project: Project.fromJSON(
            this,
            await this.get({ id: res.data!.data!.id }),
            project,
          ),
        }
      })
  }

  list = async (params: ListProjectsParams) => {
    const res = await this.client.list(params)
    const data = res.data!.data

    const projects = data.projects.map((proj) => Project.fromJSON(this, proj))
    const pagination = data.pagination

    return {
      res,
      projects,
      pagination,
    }
  }

  delete = async (project: { id: string } | Project) =>
    this.client
      .delete({
        projectId: project.id,
      })
      .then((res) => ({
        res,
      }))
}
