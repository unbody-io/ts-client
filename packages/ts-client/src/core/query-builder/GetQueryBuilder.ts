import { excludeProperty } from '../../utils'
import { AdditionalProps } from '../documents'
import { IAsk, INearText } from '../filters'
import { IGenerate } from '../filters/interfaces/Generate.interface'
import { DEFAULT_SELECTED_FIELDS } from './DefaultSelectedFields'
import { QueryBuilder } from './QueryBuilder'
import { objectPathToQueryAdapter } from './adapters'
import { QueryBuilderOptions } from './interfaces'
import { ObjectPath } from './types'

export class GetQueryBuilder<
  TDocumentType,
> extends QueryBuilder<TDocumentType> {
  protected additionalFields = {}

  constructor({ httpClient, queryType, documentType }: QueryBuilderOptions) {
    super({ httpClient, queryType, documentType })
    this.selectedFields = DEFAULT_SELECTED_FIELDS[documentType]
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

  generate<TThis>(
    this: TThis,
    type: 'singleResult',
    prompt: IGenerate['singleResult']['prompt'],
  ): Omit<TThis, 'generate'>
  generate<TThis>(
    this: TThis,
    type: 'groupedResult',
    prompt: IGenerate['groupedResult']['task'],
    properties?: IGenerate['groupedResult']['properties'],
  ): Omit<TThis, 'generate'>
  generate<TThis>(
    this: TThis,
    type: 'groupedResult' | 'singleResult',
    prompt:
      | IGenerate['groupedResult']['task']
      | IGenerate['singleResult']['prompt'],
    properties?: IGenerate['groupedResult']['properties'],
  ): Omit<TThis, 'generate'> {
    // @ts-ignore
    const { query } = this

    if (type === 'singleResult') {
      query._additional.generate = {
        __args: {
          singleResult: {
            prompt,
          },
        },
        singleResult: true,
      }
    } else {
      query._additional.generate = {
        __args: {
          groupedResult: {
            task: prompt,
            properties,
          },
        },
        groupedResult: true,
      }
    }

    excludeProperty('generate', this)
    return this
  }

  select<TThis>(
    this: TThis,
    ...args: ObjectPath<TDocumentType>[]
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
}
