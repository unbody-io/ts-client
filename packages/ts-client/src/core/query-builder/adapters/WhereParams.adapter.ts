import {
  IWhereGeoRange,
  WhereCompareOperator,
  WhereLogicalOperator,
  WhereOperator,
  WhereOperators,
} from '../../filters'
import { EnumType } from 'json-to-graphql-query'
import { isInteger } from '../../../utils'

export class WhereParamsAdapter<TDocumentType> {
  adapt(params: TDocumentType | WhereLogicalOperator<TDocumentType>): any {
    if (params instanceof WhereLogicalOperator) {
      return { ...params, operands: params.operands.map(this.adapt) }
    }
    const operations = Object.entries(params).map(([key, value]) => {
      if (value instanceof WhereCompareOperator)
        return this.composeParam({ key, ...value })
      return this.composeParam({
        key,
        ...WhereOperators.prototype.Equal(value),
      })
    })
    return operations.length === 1
      ? operations[0]
      : new WhereLogicalOperator({
          operator: new EnumType(WhereOperator.And),
          operands: operations,
        })
  }

  private adaptValue(val: string | Date | number | boolean | IWhereGeoRange) {
    const valueForTypeCheck = Array.isArray(val) ? val[0] : val
    if (val instanceof Date) return { valueDate: val }
    switch (typeof valueForTypeCheck) {
      case 'boolean':
        return { valueBoolean: new EnumType(val === true ? 'true' : 'false') }
      case 'string':
        return { valueText: val }
      case 'number':
        return isInteger(valueForTypeCheck)
          ? { valueInt: val }
          : { valueNumber: val }
      default:
        return { valueGeoRange: val }
    }
  }

  private composeParam(param: { operator: EnumType; key: string; value: any }) {
    return {
      operator: param.operator,
      path: param.key,
      ...this.adaptValue(param.value),
    }
  }
}
