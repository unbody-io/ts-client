import { EnumType } from 'json-to-graphql-query'
import { AnyObject } from '../../../types'
import { isInteger } from '../../../utils'
import { isCollectionType } from '../../documents/utils'
import {
  IWhereGeoRange,
  WhereCompareOperator,
  WhereLogicalOperator,
  WhereOperator,
  WhereOperators,
} from '../../filters'

export class WhereParamsAdapter<TDocumentType extends AnyObject> {
  adapt(params: TDocumentType | WhereLogicalOperator<TDocumentType>): any {
    if (params instanceof WhereLogicalOperator) {
      const operator = {
        ...params,
        operands: params.operands
          .map((params) => this.adapt(params))
          .filter(Boolean),
      }

      if (operator.operands.length === 0) return null

      return operator
    }
    return this.composeOperands(
      Object.entries(params).map(([key, value]) => {
        if (
          value &&
          typeof value === 'object' &&
          !(value instanceof WhereOperators) &&
          !(value instanceof WhereCompareOperator) &&
          Object.keys(value).some((vk) => isCollectionType(vk))
        ) {
          return this.composeCrossReferenceParam({ key, value })
        }

        if (value instanceof WhereCompareOperator)
          return this.composeParam({ key, ...value })

        return this.composeParam({
          key,
          ...WhereOperators.prototype.Equal(value),
        })
      }),
    )
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

  private composeCrossReferenceParam(param: { key: any; value: any }) {
    return this.composeOperands(
      Object.entries(param.value).map(([prop, params]) => {
        const adapted = this.adapt(params as any)
        if (adapted instanceof WhereLogicalOperator)
          adapted.operands.forEach(
            (operation) => (operation.path = [param.key, prop, operation.path]),
          )
        else
          adapted.path = [
            param.key,
            prop,
            ...(Array.isArray(adapted.path) ? adapted.path : [adapted.path]),
          ]
        return adapted
      }),
    ).filter(Boolean)
  }

  private composeOperands(operands: any[]) {
    if (operands.length === 0) return null
    if (operands.length === 1) return operands[0]
    else
      return new WhereLogicalOperator({
        operator: new EnumType(WhereOperator.And),
        operands,
      })
  }
}
