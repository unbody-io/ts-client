import { EndpointCallback } from './base'

export type ApiResponsePayload<T> = {
  data: T
  message: string
  statusCode: number
}

export type ApiResponseError = {
  error: string
  errors?: string[]
  errorCode: string
  statusCode: number
}

export type QueryFilter<T = any> = Record<string, any>

export type PaginationRequestParams = {
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

export const buildFilterQuery = (filter: QueryFilter) => {
  const filters: any = []

  for (const key in filter) {
    const value = filter[key]

    if (typeof value === 'object') {
      const op = Object.keys(value)[0]
      const val = value[op]
      filters.push({
        field: key,
        operator: op.slice(1),
        value: val,
      })
    } else {
      filters.push({
        field: key,
        operator: 'eq',
        value,
      })
    }
  }

  return filters
}

export const buildQuery = (ctx: Parameters<EndpointCallback<any>>[0]) => {
  const { params = {} } = ctx

  if (params.filter) ctx.setParam('filter', buildFilterQuery(params.filter))

  if (params.limit) ctx.setParam('limit', params.limit)
  if (params.offset) ctx.setParam('offset', params.offset)

  if (params.sort)
    ctx.setParam(
      'sort',
      Array.isArray(params.sort) ? params.sort : [params.sort],
    )
}

export const settle = async <R, E = Error>(
  promise: (() => Promise<R>) | Promise<R>,
): Promise<[R, undefined] | [undefined, E]> => {
  try {
    const result: R =
      typeof promise === 'function' ? await promise() : await promise
    return [result, undefined]
  } catch (error) {
    return [undefined, error as E]
  }
}

export const settleSync = <R, E = Error>(
  func: () => R,
): [R | undefined, E | undefined] => {
  try {
    return [func(), undefined]
  } catch (error) {
    return [undefined, error as E]
  }
}
