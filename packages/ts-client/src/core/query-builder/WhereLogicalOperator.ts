import { EnumType } from 'json-to-graphql-query'
import { WhereCompareOperator } from './WhereCompareOperator'
import { assignProperties } from '../../utils'

export class WhereLogicalOperator {
  operands: (WhereCompareOperator | WhereLogicalOperator)[]
  operator: EnumType

  constructor(props: WhereLogicalOperator) {
    assignProperties(props, this)
  }
}
