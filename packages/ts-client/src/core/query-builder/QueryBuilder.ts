import { DocumentType, IGoogleDoc } from '../documents'
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
  WhereOperator,
} from '../filters'
import { excludeProperty } from '../../utils'
import { EnumType, jsonToGraphQLQuery } from 'json-to-graphql-query'
import { IDocument } from '../documents'
import { AxiosInstance } from 'axios'
import { QueryBuilderOptions } from './interfaces'
import { WhereLogicalOperator } from './WhereLogicalOperator'
import { WhereOperators } from './WhereOperators'

export class QueryBuilder<TDocumentType extends IDocument> {
  protected query: { [key: string]: any } = { __args: {} }
  protected queryType: string
  protected documentType: DocumentType
  protected httpClient: AxiosInstance

  constructor({ httpClient, queryType, documentType }: QueryBuilderOptions) {
    this.httpClient = httpClient
    this.queryType = queryType
    this.documentType = documentType
  }

  where<TThis>(this: TThis, params: IGoogleDoc): Omit<TThis, 'where'>
  where<TThis>(
    this: TThis,
    callback: (
      operator: typeof WhereOperators,
    ) => IGoogleDoc | WhereLogicalOperator,
  ): Omit<TThis, 'where'>
  where<TThis>(
    this: TThis,
    params:
      | IGoogleDoc
      | ((
          operators: typeof WhereOperators,
        ) => IGoogleDoc | WhereLogicalOperator),
  ): Omit<TThis, 'where'> {
    // @ts-ignore
    const { query } = this
    if (typeof params === 'function')
      query.__args.where = params(WhereOperators)
    else
      query.__args.where = {
        operator: new EnumType(WhereOperator.Equal),
        params,
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
    fields: Array<keyof TDocumentType>,
  ): Omit<TThis, 'select'> {
    // @ts-ignore
    const { query } = this
    fields.forEach((field: keyof TDocumentType) => (query[field] = true))
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
