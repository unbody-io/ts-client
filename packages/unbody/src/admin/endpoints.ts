import { EndpointDefinition, Methods } from './base'
import { ApiResponsePayload, buildQuery, QueryFilter } from './common'
import {
  AdminApiKeyEntity,
  IndexingJobEntity,
  ProjectApiKeyEntity,
  ProjectEntity,
  ProjectWebhookEntity,
  SourceEntity,
} from './entities'

export type PaginationRequestParams = {
  sort?:
    | {
        field: string
        order: 'asc' | 'desc'
      }
    | {
        field: string
        order: 'asc' | 'desc'
      }[]
  limit?: number
  offset?: number
}

export type PaginationResPayload = {
  total: number
  count: number
  limit: number
  offset: number
}

export type PaginationRes = {
  pagination: PaginationResPayload
}

export type CreateAdminApiKeyParams = {
  body: {
    name: string
    expiresAfter?: string
  }
}

export type CreateAdminApiKeyResPayload = AdminApiKeyEntity

export type DeleteAdminApiKeyParams = {
  id: string
}

export type DeleteAdminApiResPayload = {
  id: string
}

export type ListProjectsParams = {
  filter?: QueryFilter<
    Pick<
      ProjectEntity,
      | 'id'
      | 'name'
      | 'state'
      | 'pausedAt'
      | 'restoredAt'
      | 'createdAt'
      | 'updatedAt'
    >
  >
} & PaginationRequestParams

export type ListProjectResPayload = {
  projects: ProjectEntity[]
} & PaginationRes

export type CreateProjectParams = {
  body: {
    name: string
    settings: Record<string, any>
  }
}

export type CreateProjectResPayload = {
  id: string
  name: string
  state: string
}

export type PatchProjectParams = {
  projectId: string

  body: {
    name?: string
  }
}

export type PatchProjectResPayload = ProjectEntity

export type DeleteProjectParams = {
  projectId: string
}

export type DeleteProjectResPayload = ProjectEntity

export type CreateProjectApiKeyParams = {
  projectId: string

  body: {
    name: string
    expiresAfter?: string
  }
}

export type CreateProjectApiKeyResPayload = ProjectApiKeyEntity

export type DeleteProjectApiKeyParams = {
  projectId: string
  id: string
}

export type DeleteProjectApiKeyResPayload = {
  id: string
}

export type RestoreProjectParams = {
  projectId: string
}

export type RestoreProjectResPayload = ProjectEntity

export type ListProjectWebhooksParams = {
  projectId: string

  filter?: QueryFilter<
    Pick<ProjectWebhookEntity, 'id' | 'createdAt' | 'updatedAt'>
  >
} & PaginationRequestParams

export type ListProjectWebhooksResPayload = {
  webhooks: ProjectWebhookEntity[]
} & PaginationRes

export type CreateProjectWebhookParams = {
  projectId: string

  body: {
    url: string
  }
}

export type CreateProjectWebhookResPayload = {
  webhook: ProjectWebhookEntity
}

export type DeleteProjectWebhookParams = {
  projectId: string
  webhookId: string
}

export type DeleteProjectWebhookResPayload = ProjectWebhookEntity

export type InitializeSourceParams = {
  projectId: string
  sourceId: string
}

export type InitializeSourceResPayload = {}

export type UpdateSourceParams = {
  projectId: string
  sourceId: string
}

export type UpdateSourceResPayload = {}

export type RebuildSourceParams = {
  projectId: string
  sourceId: string
}

export type ListSourceIndexingJobsParams = {
  projectId: string
  sourceId: string

  filter?: QueryFilter<
    Pick<
      IndexingJobEntity,
      | 'id'
      | 'type'
      | 'status'
      | 'failedCount'
      | 'queuedCount'
      | 'processedCount'
      | 'processingCount'
      | 'scheduledAt'
      | 'startedAt'
      | 'finishedAt'
      | 'createdAt'
      | 'updatedAt'
    >
  >
} & PaginationRequestParams

export type ListSourceIndexingJobsResPayload = {
  jobs: Omit<
    IndexingJobEntity,
    'processing' | 'processed' | 'failed' | 'queued'
  >[]
} & PaginationRes

export type GetSourceIndexingJobParams = {
  projectId: string
  sourceId: string
  jobId: string
}

export type GetSourceIndexingJobResPayload = {
  job: IndexingJobEntity
}

export type RebuildSourceResPayload = {}

export type ListProjectSourcesParams = {
  projectId: string

  filter?: QueryFilter<
    Pick<
      SourceEntity,
      | 'id'
      | 'name'
      | 'initialized'
      | 'state'
      | 'type'
      | 'pausedAt'
      | 'restoredAt'
      | 'createdAt'
      | 'updatedAt'
    >
  >
} & PaginationRequestParams

export type ListProjectSourcesResPayload = {
  sources: SourceEntity[]
} & PaginationRes

export type CreateSourceParams = {
  projectId: string

  body: {
    name?: string
    provider: string
  }
}

export type CreateSourceResPayload = {
  id: string
}

export type PatchSourceParams = {
  projectId: string
  sourceId: string

  body: {
    name?: string
  }
}

export type PatchSourceResPayload = SourceEntity

export type DeleteSourceParams = {
  projectId: string
  sourceId: string
}

export type DeleteSourceResPayload = {}

export const endpoints = {
  apiKeys: {
    create: {
      path: '/api-keys',
      method: Methods.POST,
      params: {} as CreateAdminApiKeyParams,
      response: {} as ApiResponsePayload<CreateAdminApiKeyResPayload>,
      callback: function ({ params, setBody }) {
        setBody(params.body)
      },
    } as EndpointDefinition<
      CreateAdminApiKeyParams,
      ApiResponsePayload<CreateAdminApiKeyResPayload>
    >,
    delete: {
      method: Methods.DELETE,
      path: '/api-keys/',
      params: {} as DeleteAdminApiKeyParams,
      response: {} as ApiResponsePayload<DeleteAdminApiResPayload>,
      callback: ({ params, setBody }) => {
        setBody({ id: params.id })
      },
    } as EndpointDefinition<
      DeleteAdminApiKeyParams,
      ApiResponsePayload<DeleteAdminApiResPayload>
    >,
  },
  projects: {
    list: {
      method: Methods.GET,
      path: '/projects',
      params: {} as ListProjectsParams,
      response: {} as ApiResponsePayload<ListProjectResPayload>,
      callback: buildQuery,
    } as EndpointDefinition<
      ListProjectsParams,
      ApiResponsePayload<ListProjectResPayload>
    >,
    create: {
      method: Methods.POST,
      path: '/projects',
      params: {} as CreateProjectParams,
      response: {} as ApiResponsePayload<CreateProjectResPayload>,
      callback: ({ params, setBody }) => {
        setBody(params.body)
      },
    } as EndpointDefinition<
      CreateProjectParams,
      ApiResponsePayload<CreateProjectResPayload>
    >,
    patch: {
      method: Methods.PATCH,
      path: '/projects/{projectId}',
      params: {} as PatchProjectParams,
      response: {} as ApiResponsePayload<PatchProjectResPayload>,
      callback: ({ params, setBody }) => {
        setBody(params.body)
      },
    } as EndpointDefinition<
      PatchProjectParams,
      ApiResponsePayload<PatchProjectResPayload>
    >,
    delete: {
      method: Methods.DELETE,
      path: '/projects/{projectId}',
      params: {} as DeleteProjectParams,
      response: {} as ApiResponsePayload<DeleteProjectResPayload>,
    } as EndpointDefinition<
      DeleteProjectParams,
      ApiResponsePayload<DeleteProjectResPayload>
    >,
    createApiKey: {
      method: Methods.POST,
      path: '/projects/{projectId}/api-keys',
      params: {} as CreateProjectApiKeyParams,
      response: {} as ApiResponsePayload<CreateProjectApiKeyResPayload>,
      callback: ({ params, setBody }) => {
        setBody(params.body)
      },
    } as EndpointDefinition<
      CreateProjectApiKeyParams,
      ApiResponsePayload<CreateProjectApiKeyResPayload>
    >,
    deleteApiKey: {
      method: Methods.DELETE,
      path: '/projects/{projectId}/api-keys',
      params: {} as DeleteProjectApiKeyParams,
      response: {} as ApiResponsePayload<DeleteProjectApiKeyResPayload>,
      callback: ({ params, setBody }) => {
        setBody({ id: params.id })
      },
    } as EndpointDefinition<
      DeleteProjectApiKeyParams,
      ApiResponsePayload<DeleteProjectApiKeyResPayload>
    >,
    listWebhooks: {
      method: Methods.GET,
      path: '/projects/{projectId}/webhooks',
      params: {} as ListProjectWebhooksParams,
      response: {} as ApiResponsePayload<ListProjectWebhooksResPayload>,
      callback: buildQuery,
    } as EndpointDefinition<
      ListProjectWebhooksParams,
      ApiResponsePayload<ListProjectWebhooksResPayload>
    >,
    createWebhook: {
      method: Methods.POST,
      path: '/projects/{projectId}/webhooks',
      params: {} as CreateProjectWebhookParams,
      response: {} as ApiResponsePayload<CreateProjectWebhookResPayload>,
      callback: ({ params, setBody }) => {
        setBody(params.body)
      },
    } as EndpointDefinition<
      CreateProjectWebhookParams,
      ApiResponsePayload<CreateProjectWebhookResPayload>
    >,
    deleteWebhook: {
      method: Methods.DELETE,
      path: '/projects/{projectId}/webhooks/{webhookId}',
      params: {} as DeleteProjectWebhookParams,
      response: {} as ApiResponsePayload<DeleteProjectWebhookResPayload>,
    } as EndpointDefinition<
      DeleteProjectWebhookParams,
      ApiResponsePayload<DeleteProjectWebhookResPayload>
    >,
    listSources: {
      method: Methods.GET,
      path: '/projects/{projectId}/sources',
      params: {} as ListProjectSourcesParams,
      response: {} as ApiResponsePayload<ListProjectSourcesResPayload>,
      callback: buildQuery,
    } as EndpointDefinition<
      ListProjectSourcesParams,
      ApiResponsePayload<ListProjectSourcesResPayload>
    >,
    createSource: {
      method: Methods.POST,
      path: '/projects/{projectId}/sources',
      params: {} as CreateSourceParams,
      response: {} as ApiResponsePayload<CreateSourceResPayload>,
      callback: ({ params, setBody }) => {
        setBody(params.body)
      },
    } as EndpointDefinition<
      CreateSourceParams,
      ApiResponsePayload<CreateSourceResPayload>
    >,
    patchSource: {
      method: Methods.PATCH,
      path: '/projects/{projectId}/sources/{sourceId}',
      params: {} as PatchSourceParams,
      response: {} as ApiResponsePayload<PatchSourceResPayload>,
      callback: ({ params, setBody }) => {
        setBody(params.body)
      },
    } as EndpointDefinition<
      PatchSourceParams,
      ApiResponsePayload<PatchSourceResPayload>
    >,
    deleteSource: {
      method: Methods.DELETE,
      path: '/projects/{projectId}/sources/{sourceId}',
      params: {} as DeleteSourceParams,
      response: {} as ApiResponsePayload<DeleteSourceResPayload>,
    } as EndpointDefinition<
      DeleteSourceParams,
      ApiResponsePayload<DeleteSourceResPayload>
    >,
    initializeSource: {
      method: Methods.POST,
      path: '/projects/{projectId}/sources/{sourceId}/indexing/init',
      params: {} as InitializeSourceParams,
      response: {} as ApiResponsePayload<InitializeSourceResPayload>,
    } as EndpointDefinition<
      InitializeSourceParams,
      ApiResponsePayload<InitializeSourceResPayload>
    >,
    updateSource: {
      method: Methods.POST,
      path: '/projects/{projectId}/sources/{sourceId}/indexing/update',
      params: {} as UpdateSourceParams,
      response: {} as ApiResponsePayload<UpdateSourceResPayload>,
    } as EndpointDefinition<
      UpdateSourceParams,
      ApiResponsePayload<UpdateSourceResPayload>
    >,
    rebuildSource: {
      method: Methods.POST,
      path: '/projects/{projectId}/sources/{sourceId}/indexing/rebuild',
      params: {} as RebuildSourceParams,
      response: {} as ApiResponsePayload<RebuildSourceResPayload>,
    } as EndpointDefinition<
      RebuildSourceParams,
      ApiResponsePayload<RebuildSourceResPayload>
    >,
    listJobs: {
      method: Methods.GET,
      path: '/projects/{projectId}/sources/{sourceId}/indexing/jobs',
      params: {} as ListSourceIndexingJobsParams,
      response: {} as ApiResponsePayload<ListSourceIndexingJobsResPayload>,
      callback: buildQuery,
    } as EndpointDefinition<
      ListSourceIndexingJobsParams,
      ApiResponsePayload<ListSourceIndexingJobsResPayload>
    >,
    getJob: {
      method: Methods.GET,
      path: '/projects/{projectId}/sources/{sourceId}/indexing/jobs/{jobId}',
      params: {} as GetSourceIndexingJobParams,
      response: {} as ApiResponsePayload<GetSourceIndexingJobResPayload>,
    } as EndpointDefinition<
      GetSourceIndexingJobParams,
      ApiResponsePayload<GetSourceIndexingJobResPayload>
    >,
  },
}
