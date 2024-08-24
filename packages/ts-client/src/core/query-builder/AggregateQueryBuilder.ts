import { AnyObject } from '../../types'
import { IAggregateAsk, INearText } from '../filters'
import { objectPathToQueryAdapter } from './adapters'
import { DEFAULT_SELECTED_FIELDS } from './DefaultSelectedFields'
import { QueryBuilderOptions } from './interfaces'
import { QueryBuilder } from './QueryBuilder'
import { SearchQuery } from './SearchQuery'
import { SimilarQuery } from './SimilarQuery'
import { ObjectPath } from './types'

export class AggregateQueryBuilder<
  TDocumentType extends AnyObject,
  TAggregateDocumentType,
> extends QueryBuilder<TDocumentType, any> {
  public search: SearchQuery<
    TDocumentType,
    any,
    AggregateQueryBuilder<TDocumentType, TAggregateDocumentType>
  >
  public similar: SimilarQuery<
    TDocumentType,
    any,
    AggregateQueryBuilder<TDocumentType, TAggregateDocumentType>
  >

  constructor({ httpClient, queryType, documentType }: QueryBuilderOptions) {
    super({ httpClient, queryType, documentType })
    this.selectedFields = DEFAULT_SELECTED_FIELDS[`Aggregate${documentType}`]

    this.search = new SearchQuery(this)
    this.similar = new SimilarQuery(this)
  }

  // @ts-ignore
  ask<TThis>(this: TThis, params: IAggregateAsk<TDocumentType>): TThis
  ask<TThis>(
    this: TThis,
    question: IAggregateAsk<TDocumentType>['question'],
    objectLimit: IAggregateAsk<TDocumentType>['objectLimit'],
    properties?: IAggregateAsk<TDocumentType>['properties'],
  ): TThis
  ask<TThis>(
    this: TThis,
    question:
      | IAggregateAsk<TDocumentType>['question']
      | IAggregateAsk<TDocumentType>,
    objectLimit: IAggregateAsk<TDocumentType>['objectLimit'],
    properties?: IAggregateAsk<TDocumentType>['properties'],
  ): TThis {
    // @ts-ignore
    this.removeSearchOperators()

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

    return this
  }

  nearText<TThis>(this: TThis, params: INearText): TThis
  nearText<TThis>(
    this: TThis,
    concepts: INearText['concepts'],
    certainty?: INearText['certainty'],
  ): TThis
  nearText<TThis>(
    this: TThis,
    concepts: INearText['concepts'] | INearText,
    certainty?: INearText['certainty'],
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
        ...(certainty ? { certainty } : {}),
      }
    query._additional.certainty = true
    query._additional.distance = true

    return this
  }

  select<TThis>(
    this: TThis,
    ...args: ObjectPath<TAggregateDocumentType>[]
  ): TThis {
    // @ts-ignore
    this.selectedFields = objectPathToQueryAdapter(args)
    return this
  }
}
