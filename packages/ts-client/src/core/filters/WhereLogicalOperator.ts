import { EnumType } from 'json-to-graphql-query'
import { assignProperties } from '../../utils'

export class WhereLogicalOperator<TDocumentType> {
  operands: (TDocumentType | WhereLogicalOperator<TDocumentType>)[]
  operator: EnumType

  constructor(props: WhereLogicalOperator<TDocumentType>) {
    assignProperties(props, this)
  }
}
