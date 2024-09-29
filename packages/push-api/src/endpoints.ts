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
    }
  | {
      form: any
    }

export type UploadFileResPayload = FileRecordEntity

export type DeleteFileParams = {
  id: string
}

export type DeleteFileResPayload = FileRecordEntity

export const endpoints = {
  records: {
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
    upload: {
      path: '/data/files',
      method: Methods.POST,
      params: {} as UploadFileParams,
      response: {} as ApiResponsePayload<UploadFileResPayload>,
      callback: function ({ params, setBody }) {
        if ('form' in params) setBody(params.form)
        else {
          const form = toFormData({})
          form.append('id', params.id)
          form.append('file', params.file)

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
