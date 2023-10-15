import { DocumentType } from '../documents'
import {
  GroupType,
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
import { IWhereCompareOperatorArgs, QueryBuilderOptions } from './interfaces'
import { WhereCompareOperator } from './WhereCompareOperator'
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

  where<TThis>(
    this: TThis,
    callback: (
      operator: typeof WhereOperators,
    ) => WhereCompareOperator | WhereLogicalOperator,
  ): Omit<TThis, 'where'>
  where<TThis>(
    this: TThis,
    params: IWhereCompareOperatorArgs,
  ): Omit<TThis, 'where'>
  where<TThis>(
    this: TThis,
    params: IWhereCompareOperatorArgs | ((operators: any) => {}),
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

  ask<TThis>(
    this: TThis,
    question: string,
    properties?: Array<keyof TDocumentType>,
  ): Omit<TThis, 'ask'> {
    // @ts-ignore
    const { query } = this
    query.__args.ask = {
      question,
      ...(properties?.length ? { properties } : {}),
    }
    if (!query._additional) query._additional = { answer: { result: true } }
    excludeProperty('ask', this)
    return this
  }

  bm25<TThis>(
    this: TThis,
    query: string,
    properties?: Array<keyof TDocumentType>,
  ): Omit<TThis, 'bm25'> {
    // @ts-ignore
    const { query: thisQuery } = this
    thisQuery.__args.bm25 = {
      query,
      ...(properties?.length ? { properties } : {}),
    }
    excludeProperty('bm25', this)
    return this
  }

  group<TThis>(
    this: TThis,
    force: number,
    type?: keyof typeof GroupType,
  ): Omit<TThis, 'group'> {
    // @ts-ignore
    const { query } = this
    query.__args.group = {
      force,
      ...(type ? { type: new EnumType(type) } : {}),
    }
    excludeProperty('group', this)
    return this
  }

  groupBy<TThis>(
    this: TThis,
    path: string,
    groups: number,
    objectsPerGroup: number,
  ): Omit<TThis, 'groupBy'> {
    // @ts-ignore
    const { query } = this
    query.__args.groupBy = { path, groups, objectsPerGroup }
    excludeProperty('groupBy', this)
    return this
  }

  hybrid<TThis>(this: TThis, params: IHybrid): Omit<TThis, 'hybrid'> {
    // @ts-ignore
    const { query } = this
    query.__args.hybrid = params
    excludeProperty('hybrid', this)
    return this
  }

  nearText<TThis>(this: TThis, params: INearText): Omit<TThis, 'nearText'> {
    // @ts-ignore
    const { query } = this
    query.__args.nearText = params
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

  nearVector<TThis>(
    this: TThis,
    params: INearVector,
  ): Omit<TThis, 'nearVector'> {
    // @ts-ignore
    const { query } = this
    query.__args.nearVector = params
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
