import { ProjectClient } from '../clients'
import { ListProjectSourcesParams } from '../endpoints'
import { Project } from './Project'
import { Source } from './Source'

export class ProjectSources {
  constructor(public client: ProjectClient, private project: Project) {}

  new = (
    params: Omit<Partial<Source>, 'type'> & Required<Pick<Source, 'type'>>,
  ) => {
    return Source.fromJSON(this, { ...params, projectId: this.project.id })
  }

  get = async (source: { id: string } | Source) => {
    if (!source.id) throw new Error('Source ID is required')

    const { sources } = await this.list({
      filter: {
        id: source.id,
      },
    })

    if (sources.length === 0) {
      throw new Error('Source not found')
    }

    const _source = sources[0]

    if (source instanceof Source) {
      return Source.fromJSON(this, _source, source)
    }

    return _source
  }

  save = async (source: Source) => {
    if (source.id) {
      return this.client
        .patchSource({
          projectId: this.project.id,
          sourceId: source.id,
          body: {
            name: source.name,
          },
        })
        .then((res) => {
          const data = res.data!.data!

          return {
            res,
            source: Source.fromJSON(this, data, source),
          }
        })
    }

    return this.client
      .createSource({
        projectId: this.project.id,
        body: {
          name: source.name,
          provider: source.type,
        },
      })
      .then((res) => {
        const data = res.data!.data!

        return {
          res,
          source: Source.fromJSON(this, data, source),
        }
      })
  }

  list = async (params: Omit<ListProjectSourcesParams, 'projectId'>) => {
    return this.client
      .listSources({
        projectId: this.project.id,
        ...params,
      })
      .then((res) => {
        const { pagination, sources } = res.data!.data

        return {
          res,
          pagination,
          sources: sources.map((source) => Source.fromJSON(this, source)),
        }
      })
  }

  delete = async (source: { id: string } | Source) => {
    return this.client
      .deleteSource({
        projectId: this.project.id,
        sourceId: source.id,
      })
      .then((res) => ({ res }))
  }

  initialize = async (source: { id: string } | Source) =>
    this.client
      .initializeSource({
        projectId: this.project.id,
        sourceId: source.id,
      })
      .then((res) => ({ res }))

  update = async (source: { id: string } | Source) =>
    this.client
      .updateSource({
        projectId: this.project.id,
        sourceId: source.id,
      })
      .then((res) => ({ res }))

  rebuild = async (source: { id: string } | Source) =>
    this.client
      .rebuildSource({
        projectId: this.project.id,
        sourceId: source.id,
      })
      .then((res) => ({ res }))
}
