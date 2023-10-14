import { EnumType } from 'json-to-graphql-query'
import { WhereOperator } from '../filters'
import { WhereCompareOperator } from './WhereCompareOperator'
import { WhereLogicalOperator } from './WhereLogicalOperator'
import { IWhereCompareOperatorArgs } from './interfaces'

export const WhereOperators = {
  And(
    ...args: (WhereLogicalOperator | WhereCompareOperator)[]
  ): WhereLogicalOperator {
    return new WhereLogicalOperator({
      operator: new EnumType(WhereOperator.And),
      operands: args,
    })
  },
  Or(
    ...args: (WhereLogicalOperator | WhereCompareOperator)[]
  ): WhereLogicalOperator {
    return new WhereLogicalOperator({
      operator: new EnumType(WhereOperator.Or),
      operands: args,
    })
  },
  Equal(params: IWhereCompareOperatorArgs): WhereCompareOperator {
    return new WhereCompareOperator({
      operator: new EnumType(WhereOperator.Equal),
      ...params,
    })
  },
  NotEqual(params: IWhereCompareOperatorArgs) {
    return { operator: new EnumType(WhereOperator.NotEqual), ...params }
  },
  WithinGeoRange(params: Pick<IWhereCompareOperatorArgs, 'valueGeoRange'>) {
    return { operator: new EnumType(WhereOperator.WithinGeoRange), ...params }
  },
  GreaterThan(params: IWhereCompareOperatorArgs) {
    return { operator: new EnumType(WhereOperator.GreaterThan), ...params }
  },
  LessThan(params: IWhereCompareOperatorArgs) {
    return { operator: new EnumType(WhereOperator.LessThan), ...params }
  },
  LessThanEqual(params: IWhereCompareOperatorArgs) {
    return { operator: new EnumType(WhereOperator.LessThanEqual), ...params }
  },
  IsNull(params: Pick<IWhereCompareOperatorArgs, 'valueBoolean'>) {
    return { operator: new EnumType(WhereOperator.IsNull), ...params }
  },
  ContainsAny(params: IWhereCompareOperatorArgs) {
    return { operator: new EnumType(WhereOperator.ContainsAny), ...params }
  },
  ContainsAll(params: IWhereCompareOperatorArgs) {
    return { operator: new EnumType(WhereOperator.ContainsAll), ...params }
  },
  Like(params: IWhereCompareOperatorArgs) {
    return { operator: new EnumType(WhereOperator.Like), ...params }
  },
  GreaterThanEqual(params: IWhereCompareOperatorArgs) {
    return { operator: new EnumType(WhereOperator.GreaterThanEqual), ...params }
  },
}
