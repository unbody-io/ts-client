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

type FilterOperators<T = any> = {
  $eq?: T
  $ne?: T
  $in?: Array<T>
  $nin?: Array<T>
  $null?: boolean
  $like?: string
  $gt?: T
  $gte?: T
  $lte?: T
  $lt?: T
}

type FieldFilterOperators<T = any> = T extends string
  ?
      | Pick<
          FilterOperators<string>,
          '$eq' | '$ne' | '$in' | '$nin' | '$null' | '$like'
        >
      | string
  : T extends Number
  ?
      | Pick<
          FilterOperators<number>,
          '$eq' | '$ne' | '$null' | '$gt' | '$gte' | '$lte' | '$lt'
        >
      | number
  : T extends Boolean
  ? Pick<FilterOperators<boolean>, '$eq' | '$ne' | '$null'> | boolean
  : T extends Date
  ?
      | Pick<FilterOperators<Date | string>, '$gt' | '$gte' | '$lte' | '$lt'>
      | Date
      | string
  : T | FilterOperators<T>

type FilterField<T> = FieldFilterOperators<T>

export type QueryFilter<T extends Record<string, any> = Record<string, any>> = {
  [K in keyof T]?: FilterField<T[K]>
}

export const buildFilterQuery = <
  T extends Record<string, any> = Record<string, any>,
>(
  filter: QueryFilter<T>,
) => {
  const filters: any = []

  for (const key in filter) {
    const value = filter[key]

    if (typeof value === 'object') {
      const op = Object.keys(value as any)[0]
      const val = (value as any)[op]
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
