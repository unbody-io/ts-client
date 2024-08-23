import { AxiosResponse } from 'axios'
import { DeepRequired } from 'utility-types'
import { AnyObject } from '../../types'
import { excludeProperty } from '../../utils'
import { AdditionalProps, DocumentType } from '../documents'
import { IAsk, INearText } from '../filters'
import { INearImage } from '../filters/interfaces/NearImage.interface'
import { IRerank } from '../filters/interfaces/Rerank.interface'
import { GetQueryResult } from '../Unbody'
import { objectPathToQueryAdapter } from './adapters'
import { DEFAULT_SELECTED_FIELDS } from './DefaultSelectedFields'
import { createGenerateQuery, GenerateQuery } from './GenerateQuery'
import { QueryBuilderOptions } from './interfaces'
import { QueryBuilder } from './QueryBuilder'
import { SearchQuery } from './SearchQuery'
import { SimilarQuery } from './SimilarQuery'
import { ObjectPath } from './types'
import { SearchOperatorMethods } from './types/QueryMethods.type'

export class GetQueryBuilder<
  TDocumentType extends AnyObject,
> extends QueryBuilder<TDocumentType, GetQueryResult<TDocumentType>> {
  protected additionalFields = {}
  public search: SearchQuery<TDocumentType, any, GetQueryBuilder<TDocumentType>>
  public similar: SimilarQuery<
    TDocumentType,
    any,
    GetQueryBuilder<TDocumentType>
  >
  public generate: GenerateQuery<TDocumentType, GetQueryBuilder<TDocumentType>>
  public documentType: DocumentType

  constructor({ httpClient, queryType, documentType }: QueryBuilderOptions) {
    super({ httpClient, queryType, documentType })
    this.selectedFields = DEFAULT_SELECTED_FIELDS[documentType] || ['remoteId']

    this.documentType = documentType

    this.search = new SearchQuery(this)
    this.similar = new SimilarQuery(this)
    this.generate = createGenerateQuery(this)
  }

  ask<TThis>(
    this: TThis,
    params: IAsk<TDocumentType>,
  ): Omit<TThis, SearchOperatorMethods>
  ask<TThis>(
    this: TThis,
    question: IAsk<TDocumentType>['question'],
    properties?: IAsk<TDocumentType>['properties'],
  ): Omit<TThis, SearchOperatorMethods>
  ask<TThis>(
    this: TThis,
    question: IAsk<TDocumentType>['question'] | IAsk<TDocumentType>,
    properties?: IAsk<TDocumentType>['properties'],
  ): Omit<TThis, SearchOperatorMethods> {
    // @ts-ignore
    const { query } = this
    if (typeof question === 'object' && !Array.isArray(question))
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
    const { query, spellCheck } = this

    let withSpellCheck = false

    if (typeof concepts === 'object' && !Array.isArray(concepts)) {
      query.__args.nearText = concepts
      if (concepts.autocorrect) withSpellCheck = true
    } else
      query.__args.nearText = {
        concepts,
        ...(distance ? { distance } : {}),
      }
    query._additional.certainty = true
    query._additional.distance = true
    excludeProperty('nearText', this)

    // if (withSpellCheck) return spellCheck.bind(this)()

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

  autocut<TThis>(this: TThis, n: number): TThis {
    // @ts-ignore
    const { query: _query } = this
    _query.__args.autocut = n

    return this
  }

  rerank<TThis>(this: TThis, params: IRerank): Omit<TThis, 'rerank'>
  rerank<TThis>(
    this: TThis,
    query: IRerank['query'],
    property: IRerank['property'],
  ): Omit<TThis, 'rerank'>
  rerank<TThis>(
    this: TThis,
    query: IRerank['query'] | IRerank,
    property?: IRerank['property'],
  ): Omit<TThis, 'rerank'> {
    // @ts-ignore
    const { query: _query } = this
    if (typeof query === 'object')
      _query._additional.rerank = {
        score: true,
        __args: {
          ...query,
        },
      }
    else
      _query._additional.rerank = {
        score: true,
        __args: {
          query,
          property: property!,
        },
      }

    excludeProperty('rerank', this)
    return this
  }

  spellCheck<TThis>(this: TThis): Omit<TThis, 'spellCheck'> {
    // @ts-ignore
    const { query } = this

    query._additional.spellCheck = {
      changes: {
        corrected: true,
        original: true,
      },
      didYouMean: true,
      location: true,
      numberOfCorrections: true,
      originalText: true,
    }

    return this
  }

  select<TThis>(
    this: TThis,
    ...args: ObjectPath<DeepRequired<TDocumentType>>[]
  ): Omit<TThis, 'select'> {
    // @ts-ignore
    this.selectedFields = objectPathToQueryAdapter(args)
    excludeProperty('select', this)
    return this
  }

  additional<TThis>(
    this: TThis,
    ...args: ObjectPath<AdditionalProps>[]
  ): Omit<TThis, 'additional'> {
    // @ts-ignore
    const { additionalFields } = this
    const additional = objectPathToQueryAdapter(args)
    Object.assign(additionalFields, additional)
    excludeProperty('additional', this)
    return this
  }

  getGraphQuery({ pretty } = { pretty: false }) {
    // Assign additionalFields to query._additional to ensure that the order of .additional does not have any effect
    Object.assign(this.query._additional, this.additionalFields)
    return super.getGraphQuery({ pretty })
  }

  getJsonQuery(): { [p: string]: any } {
    Object.assign(this.query._additional, this.additionalFields)
    return super.getJsonQuery()
  }

  protected resolveResData = (res: AxiosResponse) => {
    const result: any = {
      payload: res.data?.data?.[this.queryType]?.[this.documentType],
    }

    if (this.query._additional.generate && result.payload) {
      const generateType = !!this.query._additional?.generate?.singleResult
        ? 'singleResult'
        : !!this.query._additional?.generate?.groupedResult
        ? 'groupedResult'
        : null

      if (generateType === 'singleResult') {
        result.generate = (result.payload || []).map((obj: any) => ({
          from: obj,
          result: obj?._additional?.generate?.singleResult,
          error: obj?._additional?.generate?.error,
          metadata: obj?._additional?.generate?.metadata,
        }))
      } else if (generateType === 'groupedResult') {
        result.generate = {
          from: result.payload,
          result: result.payload?.[0]?._additional?.generate?.groupedResult,
          error: result.payload?.[0]?._additional?.generate?.error,
          metadata: result.payload?.[0]?._additional?.generate?.metadata,
        }
      }
    }

    return result
  }
}
