import { EnumType } from 'json-to-graphql-query'
import { assignProperties } from '../../utils'

export class WhereCompareOperator<Type> {
  operator: EnumType
  value: Type

  constructor(props: WhereCompareOperator<Type>) {
    assignProperties(props, this)
  }
}
