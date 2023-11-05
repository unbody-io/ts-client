import { QueryBuilder } from './QueryBuilder'
import { ObjectPath } from './types'
import { objectPathToQueryAdapter } from './adapters'
import { excludeProperty } from '../../utils'
import { DEFAULT_SELECTED_FIELDS } from './DefaultSelectedFields'
import { QueryBuilderOptions } from './interfaces'
import { IAggregateAsk } from '../filters'
import { INearText } from '../filters'

export class AggregateQueryBuilder<
  TDocumentType,
  TAggregateDocumentType,
> extends QueryBuilder<TDocumentType> {
  constructor({ httpClient, queryType, documentType }: QueryBuilderOptions) {
    super({ httpClient, queryType, documentType })
    this.selectedFields = DEFAULT_SELECTED_FIELDS[`Aggregate${documentType}`]
  }

  // @ts-ignore
  ask<TThis>(
    this: TThis,
    params: IAggregateAsk<TDocumentType>,
  ): Omit<TThis, 'ask'>
  ask<TThis>(
    this: TThis,
    question: IAggregateAsk<TDocumentType>['question'],
    objectLimit: IAggregateAsk<TDocumentType>['objectLimit'],
    properties?: IAggregateAsk<TDocumentType>['properties'],
  ): Omit<TThis, 'ask'>
  ask<TThis>(
    this: TThis,
    question:
      | IAggregateAsk<TDocumentType>['question']
      | IAggregateAsk<TDocumentType>,
    objectLimit: IAggregateAsk<TDocumentType>['objectLimit'],
    properties?: IAggregateAsk<TDocumentType>['properties'],
  ): Omit<TThis, 'ask'> {
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

  nearText<TThis>(this: TThis, params: INearText): Omit<TThis, 'nearText'>
  nearText<TThis>(
    this: TThis,
    concepts: INearText['concepts'],
    certainty?: INearText['certainty'],
  ): Omit<TThis, 'nearText'>
  nearText<TThis>(
    this: TThis,
    concepts: INearText['concepts'] | INearText,
    certainty?: INearText['certainty'],
  ): Omit<TThis, 'nearText'> {
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
    excludeProperty('nearText', this)
    return this
  }

  select<TThis>(
    this: TThis,
    ...args: ObjectPath<TAggregateDocumentType>[]
  ): Omit<TThis, 'select'> {
    // @ts-ignore
    this.selectedFields = objectPathToQueryAdapter(args)
    excludeProperty('select', this)
    return this
  }
}
