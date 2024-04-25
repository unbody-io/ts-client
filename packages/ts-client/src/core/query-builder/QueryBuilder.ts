import { AxiosInstance, AxiosResponse } from 'axios'
import { EnumType, jsonToGraphQLQuery } from 'json-to-graphql-query'
import { AnyObject } from '../../types'
import { excludeProperty } from '../../utils'
import { DocumentType } from '../documents'
import {
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
import { INearImage } from '../filters/interfaces/NearImage.interface'
import { DocumentFilterType } from '../filters/types'
import { WhereParamsAdapter } from './adapters'
import { QueryBuilderOptions } from './interfaces'
import { SearchOperatorMethods } from './types/QueryMethods.type'

export class QueryBuilder<TDocumentType> {
  protected query: AnyObject = { __args: {}, _additional: {} }
  protected queryType: string
  protected documentType: DocumentType
  protected httpClient: AxiosInstance
  protected whereParamsAdapter: WhereParamsAdapter<TDocumentType>
  protected selectedFields = {}
  protected additionalFields = {}

  constructor({ httpClient, queryType, documentType }: QueryBuilderOptions) {
    this.httpClient = httpClient
    this.queryType = queryType
    this.documentType = documentType
    this.whereParamsAdapter = new WhereParamsAdapter<TDocumentType>()
  }

  where<TThis>(
    this: TThis,
    params: DocumentFilterType<TDocumentType, true>,
  ): Omit<TThis, 'where'>
  where<TThis>(
    this: TThis,
    callback:
      | DocumentFilterType<TDocumentType, true>
      | ((
          operator: WhereOperators<DocumentFilterType<TDocumentType, true>>,
        ) =>
          | DocumentFilterType<TDocumentType, true>
          | ReturnType<
              | WhereOperators<DocumentFilterType<TDocumentType, true>>['And']
              | WhereOperators<DocumentFilterType<TDocumentType, true>>['Or']
            >),
  ): Omit<TThis, 'where'>
  where<TThis>(
    this: TThis,
    params: DocumentFilterType<TDocumentType, true>,
  ): Omit<TThis, 'where'> {
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

  bm25<TThis>(
    this: TThis,
    params: IBm25<TDocumentType>,
  ): Omit<TThis, SearchOperatorMethods>
  bm25<TThis>(
    this: TThis,
    query: IBm25<TDocumentType>['query'],
    properties?: IBm25<TDocumentType>['properties'],
  ): Omit<TThis, SearchOperatorMethods>
  bm25<TThis>(
    this: TThis,
    query: IBm25<TDocumentType>['query'] | IBm25<TDocumentType>,
    properties?: IBm25<TDocumentType>['properties'],
  ): Omit<TThis, SearchOperatorMethods> {
    // @ts-ignore
    const { query: thisQuery, additionalFields } = this
    if (typeof query === 'object' && !Array.isArray(query))
      thisQuery.__args.bm25 = query
    else
      thisQuery.__args.bm25 = {
        query,
        ...(properties?.length ? { properties } : {}),
      }
    additionalFields.score = true
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
  ): Omit<TThis, SearchOperatorMethods>
  hybrid<TThis>(
    this: TThis,
    query: IHybrid<TDocumentType>['query'],
    properties?: IHybrid<TDocumentType>['properties'],
    alpha?: IHybrid<TDocumentType>['alpha'],
  ): Omit<TThis, SearchOperatorMethods>
  hybrid<TThis>(
    this: TThis,
    query: IHybrid<TDocumentType>['query'] | IHybrid<TDocumentType>,
    properties?: IHybrid<TDocumentType>['properties'],
    alpha?: IHybrid<TDocumentType>['alpha'],
  ): Omit<TThis, SearchOperatorMethods> {
    // @ts-ignore
    const { query: thisQuery, additionalFields } = this
    if (typeof query === 'object' && !Array.isArray(query))
      thisQuery.__args.hybrid = query
    else
      thisQuery.__args.hybrid = {
        query,
        ...(properties ? { properties } : {}),
        ...(alpha ? { alpha } : {}),
      }
    additionalFields.score = true
    excludeProperty('hybrid', this)
    return this
  }

  nearText<TThis>(
    this: TThis,
    params: INearText,
  ): Omit<TThis, SearchOperatorMethods>
  nearText<TThis>(
    this: TThis,
    concepts: INearText['concepts'],
    distance?: INearText['distance'],
  ): Omit<TThis, SearchOperatorMethods>
  nearText<TThis>(
    this: TThis,
    concepts: INearText['concepts'] | INearText,
    distance?: INearText['distance'],
  ): Omit<TThis, SearchOperatorMethods> {
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

  nearImage<TThis>(
    this: TThis,
    params: INearImage,
  ): Omit<TThis, SearchOperatorMethods>
  nearImage<TThis>(
    this: TThis,
    image: INearImage['image'],
    distance?: INearImage['distance'],
  ): Omit<TThis, SearchOperatorMethods>
  nearImage<TThis>(
    this: TThis,
    image: INearImage['image'] | INearImage,
    distance?: INearImage['distance'],
  ): Omit<TThis, SearchOperatorMethods> {
    // @ts-ignore
    const { query } = this
    if (typeof image === 'object') query.__args.nearImage = image
    else
      query.__args.nearImage = {
        image,
        ...(distance ? { distance } : {}),
      }

    query._additional.certainty = true
    query._additional.distance = true
    excludeProperty('nearImage', this)

    return this
  }

  nearObject<TThis>(
    this: TThis,
    params: INearObject,
  ): Omit<TThis, SearchOperatorMethods>
  nearObject<TThis>(
    this: TThis,
    id: INearObject['id'],
    distance?: INearObject['distance'],
  ): Omit<TThis, SearchOperatorMethods>
  nearObject<TThis>(
    this: TThis,
    id: INearObject['id'] | INearObject,
    distance?: INearObject['distance'],
  ): Omit<TThis, SearchOperatorMethods> {
    // @ts-ignore
    const { query } = this
    if (typeof id === 'object' && !Array.isArray(id))
      query.__args.nearObject = id
    else
      query.__args.nearObject = {
        id,
        ...(distance ? { distance } : {}),
      }
    query._additional.certainty = true
    query._additional.distance = true
    excludeProperty('nearObject', this)
    return this
  }

  nearVector<TThis>(
    this: TThis,
    params: INearVector,
  ): Omit<TThis, SearchOperatorMethods>
  nearVector<TThis>(
    this: TThis,
    vector: INearVector['vector'] | INearVector,
    distance?: INearVector['distance'],
  ): Omit<TThis, SearchOperatorMethods> {
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
    query.__args.sort = {
      order: new EnumType(order),
      ...(path ? { path } : {}),
    }
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

  getGraphQuery({ pretty } = { pretty: false }) {
    this.query = { ...this.query, ...this.selectedFields }
    return jsonToGraphQLQuery(
      { query: { [this.queryType]: { [this.documentType]: this.query } } },
      { pretty },
    )
  }

  getJsonQuery() {
    this.query = { ...this.query, ...this.selectedFields }
    return { [this.queryType]: { [this.documentType]: this.query } }
  }

  exec = async <T = any>(): Promise<AxiosResponse<T>> => {
    return this.httpClient
      .post('', { query: this.getGraphQuery() })
      .then(this._resolveResData)
  }

  protected _resolveResData = (res: AxiosResponse): AxiosResponse => ({
    ...res,
    data: {
      ...this.resovleResData(res),
      _original: res.data,
    },
  })

  protected resovleResData = (res: AxiosResponse) => {
    return {
      payload: res.data?.data?.[this.queryType]?.[this.documentType],
    }
  }
}
