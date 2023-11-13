import { AdditionalProps, DocumentType } from '../documents'
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
import { WhereParamsAdapter, objectPathToQueryAdapter } from './adapters'
import { ObjectPath } from './types'

export class QueryBuilder<TDocumentType> {
  protected query: { [key: string]: any } = { __args: {}, _additional: {} }
  protected queryType: string
  protected documentType: DocumentType
  protected httpClient: AxiosInstance
  protected whereParamsAdapter: WhereParamsAdapter<TDocumentType>
  protected _additional = {}

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
    question: IAsk<TDocumentType>['question'],
    properties?: IAsk<TDocumentType>['properties'],
  ): Omit<TThis, 'ask'>
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
    query._additional.answer = {
      result: true,
      property: true,
      hasAnswer: true,
      endPosition: true,
      startPosition: true,
    }
    excludeProperty('ask', this)
    return this
  }

  bm25<TThis>(this: TThis, params: IBm25<TDocumentType>): Omit<TThis, 'bm25'>
  bm25<TThis>(
    this: TThis,
    query: IBm25<TDocumentType>['query'],
    properties?: IBm25<TDocumentType>['properties'],
  ): Omit<TThis, 'bm25'>
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
    thisQuery._additional.score = true
    excludeProperty('bm25', this)
    return this
  }

  group<TThis>(this: TThis, params: IGroup): Omit<TThis, 'group'>
  group<TThis>(
    this: TThis,
    force: IGroup['force'],
    type?: IGroup['type'],
  ): Omit<TThis, 'group'>
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
    path: IGroupBy['path'],
    groups?: IGroupBy['groups'],
    objectsPerGroup?: IGroupBy['objectsPerGroup'],
  ): Omit<TThis, 'groupBy'>
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
    query: IHybrid<TDocumentType>['query'],
    properties?: IHybrid<TDocumentType>['properties'],
    alpha?: IHybrid<TDocumentType>['alpha'],
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
    thisQuery._additional.score = true
    excludeProperty('hybrid', this)
    return this
  }

  nearText<TThis>(this: TThis, params: INearText): Omit<TThis, 'nearText'>
  nearText<TThis>(
    this: TThis,
    concepts: INearText['concepts'],
    distance?: INearText['distance'],
  ): Omit<TThis, 'nearText'>
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
    query._additional.certainty = true
    query._additional.distance = true
    excludeProperty('nearText', this)
    return this
  }

  nearObject<TThis>(this: TThis, params: INearObject): Omit<TThis, 'nearObject'>
  nearObject<TThis>(
    this: TThis,
    id: INearObject['id'],
    distance?: INearObject['distance'],
  ): Omit<TThis, 'nearObject'>
  nearObject<TThis>(
    this: TThis,
    id: INearObject['id'] | INearObject,
    distance?: INearObject['distance'],
  ): Omit<TThis, 'nearObject'> {
    // @ts-ignore
    const { query } = this
    if (typeof id === 'object' && !Array.isArray(id)) query.__args.nearText = id
    else
      query.__args.nearText = {
        id,
        ...(distance ? { distance } : {}),
      }
    query._additional.certainty = true
    query._additional.distance = true
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
    query._additional.certainty = true
    query._additional.distance = true
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
    const select = objectPathToQueryAdapter(args)
    Object.assign(query, select)
    excludeProperty('select', this)
    return this
  }

  additional<TThis>(
    this: TThis,
    ...args: ObjectPath<AdditionalProps>[]
  ): Omit<TThis, 'additional'> {
    // @ts-ignore
    const { _additional } = this
    const additional = objectPathToQueryAdapter(args)
    Object.assign(_additional, additional)
    excludeProperty('additional', this)
    return this
  }

  getGraphQuery({ pretty } = { pretty: false }) {
    // Assign _additional to query._additional to ensure that the order of .additional does not have any effect
    Object.assign(this.query._additional, this._additional)
    return jsonToGraphQLQuery(
      { query: { [this.queryType]: { [this.documentType]: this.query } } },
      { pretty },
    )
  }

  exec() {
    return this.httpClient.post('', { query: this.getGraphQuery() })
  }
}
