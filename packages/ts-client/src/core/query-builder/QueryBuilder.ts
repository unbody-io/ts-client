import { DocumentType } from '../documents'
import {
  IAsk,
  IBm25,
  IGroup,
  IGroupBy,
  IHybrid,
  INearObject,
  INearText,
  INearVector,
  SortType,
  WhereOperators,
} from '../filters'
import { excludeProperty } from '../../utils'
import { EnumType, jsonToGraphQLQuery } from 'json-to-graphql-query'
import { AxiosInstance } from 'axios'
import { QueryBuilderOptions } from './interfaces'
import { WhereParamsAdapter } from './adapters'
import { ObjectPath } from './types'

export class QueryBuilder<TDocumentType> {
  protected query: { [key: string]: any } = { __args: {} }
  protected queryType: string
  protected documentType: DocumentType
  protected httpClient: AxiosInstance
  protected whereParamsAdapter: WhereParamsAdapter<TDocumentType>

  constructor({ httpClient, queryType, documentType }: QueryBuilderOptions) {
    this.httpClient = httpClient
    this.queryType = queryType
    this.documentType = documentType
    this.whereParamsAdapter = new WhereParamsAdapter<TDocumentType>()
  }

  where<TThis>(this: TThis, params: TDocumentType): Omit<TThis, 'where'>
  where<TThis>(
    this: TThis,
    callback:
      | TDocumentType
      | ((
          operator: WhereOperators<TDocumentType>,
        ) =>
          | TDocumentType
          | ReturnType<
              | WhereOperators<TDocumentType>['And']
              | WhereOperators<TDocumentType>['Or']
            >),
  ): Omit<TThis, 'where'>
  where<TThis>(this: TThis, params: TDocumentType): Omit<TThis, 'where'> {
    // @ts-ignore
    const { query, whereParamsAdapter } = this
    if (typeof params === 'function') {
      const callback = params as Function
      const { prototype } = WhereOperators<TDocumentType>
      query.__args.where = whereParamsAdapter.adapt(callback(prototype))
    } else {
      query.__args.where = whereParamsAdapter.adapt(params)
    }
    excludeProperty('where', this)
    return this
  }

  ask<TThis>(this: TThis, params: IAsk<TDocumentType>): Omit<TThis, 'ask'>
  ask<TThis>(
    this: TThis,
    question: IAsk<TDocumentType>['question'] | IAsk<TDocumentType>,
    properties?: IAsk<TDocumentType>['properties'],
  ): Omit<TThis, 'ask'> {
    // @ts-ignore
    const { query } = this
    if (typeof query === 'object' && !Array.isArray(query))
      query.__args.ask = question
    else
      query.__args.ask = {
        question,
        ...(properties?.length ? { properties } : {}),
      }
    if (!query._additional) query._additional = { answer: { result: true } }
    excludeProperty('ask', this)
    return this
  }

  bm25<TThis>(this: TThis, params: IBm25<TDocumentType>): Omit<TThis, 'bm25'>
  bm25<TThis>(
    this: TThis,
    query: IBm25<TDocumentType>['query'] | IBm25<TDocumentType>,
    properties?: IBm25<TDocumentType>['properties'],
  ): Omit<TThis, 'bm25'> {
    // @ts-ignore
    const { query: thisQuery } = this
    if (typeof query === 'object' && !Array.isArray(query))
      thisQuery.__args.bm25 = query
    else
      thisQuery.__args.bm25 = {
        query,
        ...(properties?.length ? { properties } : {}),
      }
    excludeProperty('bm25', this)
    return this
  }

  group<TThis>(this: TThis, params: IGroup): Omit<TThis, 'group'>
  group<TThis>(
    this: TThis,
    force: IGroup['force'] | IGroup,
    type?: IGroup['type'],
  ): Omit<TThis, 'group'> {
    // @ts-ignore
    const { query } = this
    if (typeof force === 'object' && !Array.isArray(force))
      query.__args.group = force
    else
      query.__args.group = {
        force,
        ...(type ? { type: new EnumType(type) } : {}),
      }
    excludeProperty('group', this)
    return this
  }

  groupBy<TThis>(this: TThis, params: IGroupBy): Omit<TThis, 'groupBy'>
  groupBy<TThis>(
    this: TThis,
    path: IGroupBy['path'] | IGroupBy,
    groups?: IGroupBy['groups'],
    objectsPerGroup?: IGroupBy['objectsPerGroup'],
  ): Omit<TThis, 'groupBy'> {
    // @ts-ignore
    const { query } = this
    if (typeof path === 'object' && !Array.isArray(path))
      query.__args.groupBy = path
    query.__args.groupBy = {
      path,
      ...(groups ? { groups } : {}),
      ...(objectsPerGroup ? { objectsPerGroup } : {}),
    }
    excludeProperty('groupBy', this)
    return this
  }

  hybrid<TThis>(
    this: TThis,
    params: IHybrid<TDocumentType>,
  ): Omit<TThis, 'hybrid'>
  hybrid<TThis>(
    this: TThis,
    query: IHybrid<TDocumentType>['query'] | IHybrid<TDocumentType>,
    properties?: IHybrid<TDocumentType>['properties'],
    alpha?: IHybrid<TDocumentType>['alpha'],
  ): Omit<TThis, 'hybrid'> {
    // @ts-ignore
    const { query: thisQuery } = this
    if (typeof query === 'object' && !Array.isArray(query))
      thisQuery.__args.hybrid = query
    else
      thisQuery.__args.hybrid = {
        query,
        ...(properties ? { properties } : {}),
        ...(alpha ? { alpha } : {}),
      }
    excludeProperty('hybrid', this)
    return this
  }

  nearText<TThis>(this: TThis, params: INearText): Omit<TThis, 'nearText'>
  nearText<TThis>(
    this: TThis,
    concepts: INearText['concepts'] | INearText,
    distance?: INearText['distance'],
  ): Omit<TThis, 'nearText'> {
    // @ts-ignore
    const { query } = this
    if (typeof concepts === 'object' && !Array.isArray(concepts))
      query.__args.nearText = concepts
    else
      query.__args.nearText = {
        concepts,
        ...(distance ? { distance } : {}),
      }
    excludeProperty('nearText', this)
    return this
  }

  nearObject<TThis>(
    this: TThis,
    params: INearObject,
  ): Omit<TThis, 'nearObject'> {
    // @ts-ignore
    const { query } = this
    query.__args.nearObject = params
    excludeProperty('nearObject', this)
    return this
  }

  nearVector<TThis>(this: TThis, params: INearVector): Omit<TThis, 'nearVector'>
  nearVector<TThis>(
    this: TThis,
    vector: INearVector['vector'] | INearVector,
    distance?: INearVector['distance'],
  ): Omit<TThis, 'nearVector'> {
    // @ts-ignore
    const { query } = this
    if (typeof vector === 'object' && !Array.isArray(vector))
      query.__args.nearVector = vector
    else
      query.__args.nearText = {
        vector,
        ...(distance ? { distance } : {}),
      }
    excludeProperty('nearVector', this)
    return this
  }

  sort<TThis>(
    this: TThis,
    path: string | string[],
    order: keyof typeof SortType,
  ): Omit<TThis, 'sort'> {
    // @ts-ignore
    const { query } = this
    query.__args.sort = { order, ...(path ? { path } : {}) }
    excludeProperty('sort', this)
    return this
  }

  limit<TThis>(this: TThis, limit: number): Omit<TThis, 'limit'> {
    // @ts-ignore
    const { query } = this
    query.__args.limit = limit
    excludeProperty('limit', this)
    return this
  }

  offset<TThis>(this: TThis, offset: number): Omit<TThis, 'offset'> {
    // @ts-ignore
    const { query } = this
    query.__args.offset = offset
    if (!query._additional) query._additional = {}
    excludeProperty('offset', this)
    return this
  }

  select<TThis>(
    this: TThis,
    ...args: ObjectPath<TDocumentType>[]
  ): Omit<TThis, 'select'> {
    // @ts-ignore
    const { query } = this
    const documentTypes = Object.values(DocumentType) as string[]
    args.forEach((path) => {
      let parentKey: string = null,
        select: { [key: string]: any } = {}
      const pathArray = path.split('.')
      if (pathArray.length === 1) query[pathArray[0]] = true
      pathArray.reduce((select, key, currentIndex) => {
        if (!parentKey) select[key] = true
        else if (documentTypes.includes(key)) {
          select[parentKey] = {
            __on: {
              __typeName: key,
              ...Object.fromEntries(
                pathArray
                  .splice(++currentIndex, pathArray.length)
                  .map((key) => [key, true]),
              ),
            },
          }
        } else select[parentKey] = { [key]: true }
        parentKey = key
        return select
      }, select)
      Object.assign(query, select)
    })
    excludeProperty('select', this)
    return this
  }

  getGraphQuery({ pretty } = { pretty: false }) {
    return jsonToGraphQLQuery(
      { query: { [this.queryType]: { [this.documentType]: this.query } } },
      { pretty },
    )
  }

  exec() {
    return this.httpClient.post('', { query: this.getGraphQuery() })
  }
}
