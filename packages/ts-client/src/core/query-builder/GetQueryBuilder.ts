import { QueryBuilder } from './QueryBuilder'
import { ObjectPath } from './types'
import { objectPathToQueryAdapter } from './adapters'
import { excludeProperty } from '../../utils'
import { AdditionalProps } from '../documents'
import { QueryBuilderOptions } from './interfaces'
import { DEFAULT_SELECTED_FIELDS } from './DefaultSelectedFields'

export class GetQueryBuilder<
  TDocumentType,
> extends QueryBuilder<TDocumentType> {
  protected additionalFields = {}

  constructor({ httpClient, queryType, documentType }: QueryBuilderOptions) {
    super({ httpClient, queryType, documentType })
    this.selectedFields = DEFAULT_SELECTED_FIELDS[documentType]
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
    // Assign additionalFields to query.additionalFields to ensure that the order of .additional does not have any effect
    Object.assign(this.query.additionalFields, this.additionalFields)
    return super.getGraphQuery({ pretty })
  }
}
