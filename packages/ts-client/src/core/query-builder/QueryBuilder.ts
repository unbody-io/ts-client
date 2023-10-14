import { DocumentType } from '../documents'
import { WhereOperator } from '../filters'
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

  getGraphQuery({ pretty } = { pretty: false }) {
    return jsonToGraphQLQuery(
      { query: { [this.queryType]: { [this.documentType]: this.query } } },
      { pretty },
    )
  }
}
