import { AxiosInstance, AxiosResponse } from 'axios'
import { EnumType, jsonToGraphQLQuery } from 'json-to-graphql-query'
import { UNBODY_GRAPHQL_API_ENDPOINT } from '../../constants'
import { AnyObject } from '../../types'
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

export class QueryBuilder<TDocumentType extends AnyObject, R> {
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
  ): TThis
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
  ): TThis
  where<TThis>(
    this: TThis,
    params: DocumentFilterType<TDocumentType, true>,
  ): TThis {
    // @ts-ignore
    const { query, whereParamsAdapter } = this

    if (!params) {
      if (query.__args.where) delete query.__args.where

      return this
    }

    if (typeof params === 'function') {
      const callback = params as Function
      const { prototype } = WhereOperators<TDocumentType>
      query.__args.where = whereParamsAdapter.adapt(callback(prototype))
    } else {
      query.__args.where = whereParamsAdapter.adapt(params)
    }

    if (!query.__args.where) delete query.__args.where

    return this
  }

  bm25<TThis>(this: TThis, params: IBm25<TDocumentType>): TThis
  bm25<TThis>(
    this: TThis,
    query: IBm25<TDocumentType>['query'],
    properties?: IBm25<TDocumentType>['properties'],
  ): TThis
  bm25<TThis>(
    this: TThis,
    query: IBm25<TDocumentType>['query'] | IBm25<TDocumentType>,
    properties?: IBm25<TDocumentType>['properties'],
  ): TThis {
    // @ts-ignore
    this.removeSearchOperators()

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

    return this
  }

  group<TThis>(this: TThis, params: IGroup): TThis
  group<TThis>(
    this: TThis,
    force: IGroup['force'],
    type?: IGroup['type'],
  ): TThis
  group<TThis>(
    this: TThis,
    force: IGroup['force'] | IGroup,
    type?: IGroup['type'],
  ): TThis {
    // @ts-ignore
    const { query } = this
    if (typeof force === 'object' && !Array.isArray(force))
      query.__args.group = {
        force: force.force,
        type: new EnumType(force.type),
      }
    else
      query.__args.group = {
        force,
        ...(type ? { type: new EnumType(type) } : {}),
      }

    return this
  }

  groupBy<TThis>(this: TThis, params: IGroupBy): TThis
  groupBy<TThis>(
    this: TThis,
    params: IGroupBy['path'],
    groups?: IGroupBy['groups'],
    objectsPerGroup?: IGroupBy['objectsPerGroup'],
  ): TThis
  groupBy<TThis>(
    this: TThis,
    params: IGroupBy['path'] | IGroupBy,
    groups?: IGroupBy['groups'],
    objectsPerGroup?: IGroupBy['objectsPerGroup'],
  ): TThis {
    // @ts-ignore
    const { query } = this

    if (typeof params === 'string' || Array.isArray(params)) {
      query.__args.groupBy = {
        path: params,
        ...(groups ? { groups } : {}),
        ...(objectsPerGroup ? { objectsPerGroup } : {}),
      }
    } else if (typeof params === 'object') {
      query.__args.groupBy = params
    }

    return this
  }

  hybrid<TThis>(this: TThis, params: IHybrid<TDocumentType>): TThis
  hybrid<TThis>(
    this: TThis,
    query: IHybrid<TDocumentType>['query'],
    properties?: IHybrid<TDocumentType>['properties'],
    alpha?: IHybrid<TDocumentType>['alpha'],
  ): TThis
  hybrid<TThis>(
    this: TThis,
    query: IHybrid<TDocumentType>['query'] | IHybrid<TDocumentType>,
    properties?: IHybrid<TDocumentType>['properties'],
    alpha?: IHybrid<TDocumentType>['alpha'],
  ): TThis {
    // @ts-ignore
    this.removeSearchOperators()

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

    if (thisQuery.__args.hybrid.fusionType) {
      thisQuery.__args.hybrid.fusionType = new EnumType(
        thisQuery.__args.hybrid.fusionType,
      )
    }

    return this
  }

  nearText<TThis>(this: TThis, params: INearText): TThis
  nearText<TThis>(
    this: TThis,
    concepts: INearText['concepts'],
    distance?: INearText['distance'],
  ): TThis
  nearText<TThis>(
    this: TThis,
    concepts: INearText['concepts'] | INearText,
    distance?: INearText['distance'],
  ): TThis {
    // @ts-ignore
    this.removeSearchOperators()

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

    return this
  }

  nearImage<TThis>(this: TThis, params: INearImage): TThis
  nearImage<TThis>(
    this: TThis,
    image: INearImage['image'],
    distance?: INearImage['distance'],
  ): TThis
  nearImage<TThis>(
    this: TThis,
    image: INearImage['image'] | INearImage,
    distance?: INearImage['distance'],
  ): TThis {
    // @ts-ignore
    this.removeSearchOperators()

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

    return this
  }

  nearObject<TThis>(this: TThis, params: INearObject): TThis
  nearObject<TThis>(
    this: TThis,
    id: INearObject['id'],
    distance?: INearObject['distance'],
  ): TThis
  nearObject<TThis>(
    this: TThis,
    id: INearObject['id'] | INearObject,
    distance?: INearObject['distance'],
  ): TThis {
    // @ts-ignore
    this.removeSearchOperators()

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

    return this
  }

  nearVector<TThis>(this: TThis, params: INearVector): TThis
  nearVector<TThis>(
    this: TThis,
    vector: INearVector['vector'] | INearVector,
    distance?: INearVector['distance'],
  ): TThis {
    // @ts-ignore
    removeSearchOperators()

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

    return this
  }

  sort<TThis>(
    this: TThis,
    path: string | string[],
    order: keyof typeof SortType,
  ) {
    // @ts-ignore
    const { query } = this
    query.__args.sort = {
      order: new EnumType(order),
      ...(path ? { path } : {}),
    }
    return this
  }

  limit<TThis>(this: TThis, limit: number): TThis {
    // @ts-ignore
    const { query } = this
    query.__args.limit = limit

    return this
  }

  offset<TThis>(this: TThis, offset: number): TThis {
    // @ts-ignore
    const { query } = this
    query.__args.offset = offset
    if (!query._additional) query._additional = {}

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

  exec = async <T = R>(): Promise<AxiosResponse<T>> => {
    return this.httpClient
      .post(UNBODY_GRAPHQL_API_ENDPOINT, { query: this.getGraphQuery() })
      .then(this._resolveResData)
  }

  protected _resolveResData = (res: AxiosResponse): AxiosResponse => ({
    ...res,
    data: {
      ...this.resolveResData(res),
      _original: res.data,
    },
  })

  protected resolveResData = (res: AxiosResponse) => {
    return {
      payload: res.data?.data?.[this.queryType]?.[this.documentType],
    }
  }

  protected removeSearchOperators() {
    // @ts-ignore
    const { query } = this

    delete query?.__args?.ask
    delete query?.__args?.bm25
    delete query?.__args?.hybrid
    delete query?.__args?.nearText
    delete query?.__args?.nearImage
    delete query?.__args?.nearObject
    delete query?.__args?.nearVector
    delete query?._additional?.score
    delete query?._additional?.answer
    delete query?._additional?.certainty
    delete query?._additional?.distance
  }
}
