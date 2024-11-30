import { toFormData } from 'axios'
import { EndpointDefinition, Methods } from './base'
import { ApiResponsePayload } from './common'

export type DataRecordEntity = {
  id: string
  type: 'record'
  collection: string
  data: Record<string, any>
}

export type FileRecordEntity = {
  id: string
  type: 'file'
  collection: string
  contentType: string
}

export type RecordEntity = DataRecordEntity | FileRecordEntity

export type GetRecordParams = {
  id: string
}

export type GetRecordResPayload = RecordEntity

export type ListRecordsParams = {
  limit?: number
  offset?: number
  cursor?: string
  collection?: string
}

export type ListRecordsResPayload = {
  records: RecordEntity[]
  cursor: string
}

export type CreateRecordParams = {
  id: string
  collection: string
  payload: Record<string, any>
}

export type CreateRecordResPayload = RecordEntity

export type UpdateRecordParams = {
  id: string
  collection: string
  payload: Record<string, any>
}

export type UpdateRecordResPayload = RecordEntity

export type PatchRecordParams = {
  id: string
  collection: string
  payload: Record<string, any>
}

export type PatchRecordResPayload = RecordEntity

export type DeleteRecordParams = {
  id: string
  collection: string
}

export type DeleteRecordResPayload = DataRecordEntity

export type UploadFileParams =
  | {
      id: string
      file: any
      payload?: Record<string, any>
    }
  | {
      id: string
      url: string
      filename: string
      payload?: Record<string, any>
    }
  | {
      form: any
    }

export type UploadFileResPayload = FileRecordEntity

export type DeleteFileParams = {
  id: string
}

export type ListFilesParams = {
  limit?: number
  offset?: number
  cursor?: string
  sort?: 'asc' | 'desc'
}

export type ListFilesResPayload = {
  records: FileRecordEntity[]
  cursor: string
}

export type DeleteFileResPayload = FileRecordEntity

export const endpoints = {
  records: {
    get: {
      path: '/data/records/{id}',
      method: Methods.GET,
      params: {} as GetRecordParams,
      response: {} as ApiResponsePayload<GetRecordResPayload>,
    } as EndpointDefinition<
      GetRecordParams,
      ApiResponsePayload<GetRecordResPayload>
    >,
    list: {
      path: '/data/records',
      method: Methods.GET,
      params: {} as ListRecordsParams,
      response: {} as ApiResponsePayload<ListRecordsResPayload>,
      callback: function ({ params, setParams }) {
        setParams(params)
      },
    } as EndpointDefinition<
      ListRecordsParams,
      ApiResponsePayload<ListRecordsResPayload>
    >,
    create: {
      path: '/data/records',
      method: Methods.POST,
      params: {} as CreateRecordParams,
      response: {} as ApiResponsePayload<CreateRecordResPayload>,
      callback: function ({ params, setBody }) {
        setBody(params)
      },
    } as EndpointDefinition<
      CreateRecordParams,
      ApiResponsePayload<CreateRecordResPayload>
    >,
    update: {
      path: '/data/records',
      method: Methods.PUT,
      params: {} as UpdateRecordParams,
      response: {} as ApiResponsePayload<UpdateRecordResPayload>,
      callback: function ({ params, setBody }) {
        setBody(params)
      },
    } as EndpointDefinition<
      UpdateRecordParams,
      ApiResponsePayload<UpdateRecordResPayload>
    >,
    patch: {
      path: '/data/records',
      method: Methods.PATCH,
      params: {} as PatchRecordParams,
      response: {} as ApiResponsePayload<PatchRecordResPayload>,
      callback: function ({ params, setBody }) {
        setBody(params)
      },
    } as EndpointDefinition<
      PatchRecordParams,
      ApiResponsePayload<PatchRecordResPayload>
    >,
    delete: {
      path: '/data/records/{collection}/{id}',
      method: Methods.DELETE,
      params: {} as DeleteRecordParams,
      response: {} as ApiResponsePayload<DeleteRecordResPayload>,
    } as EndpointDefinition<
      DeleteRecordParams,
      ApiResponsePayload<DeleteRecordResPayload>
    >,
  },
  files: {
    list: {
      path: '/data/files',
      method: Methods.GET,
      params: {} as ListFilesParams,
      response: {} as ApiResponsePayload<ListFilesResPayload>,
      callback: function ({ params, setParams }) {
        setParams(params)
      },
    } as EndpointDefinition<
      ListFilesParams,
      ApiResponsePayload<ListFilesResPayload>
    >,
    upload: {
      path: '/data/files',
      method: Methods.POST,
      params: {} as UploadFileParams,
      response: {} as ApiResponsePayload<UploadFileResPayload>,
      callback: function ({ params, setBody }) {
        if ('form' in params && typeof params.form !== 'undefined')
          setBody(params.form)
        else if ('file' in params && typeof params.file !== 'undefined') {
          const form = toFormData({})
          form.append('id', params.id)
          form.append('payload', JSON.stringify(params.payload || {}))
          form.append('file', params.file)

          setBody(form)
        } else if ('url' in params && typeof params.url !== 'undefined') {
          const form = toFormData({})
          form.append('id', params.id)
          form.append('url', 'true')
          form.append('payload', JSON.stringify(params.payload || {}))
          form.append('file', params.url, params.filename)
          setBody(form)
        }
      },
    } as EndpointDefinition<
      UploadFileParams,
      ApiResponsePayload<UploadFileResPayload>
    >,
    delete: {
      path: '/data/files',
      method: Methods.DELETE,
      params: {} as DeleteFileParams,
      response: {} as ApiResponsePayload<DeleteFileResPayload>,
      callback: function ({ params, setBody }) {
        setBody(params)
      },
    } as EndpointDefinition<
      DeleteFileParams,
      ApiResponsePayload<DeleteFileResPayload>
    >,
  },
}
