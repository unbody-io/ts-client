import { EnumType } from 'json-to-graphql-query'
import { WhereOperator } from './enums'
import { WhereCompareOperator } from './WhereCompareOperator'
import { WhereLogicalOperator } from './WhereLogicalOperator'
import { IWhereGeoRange } from './interfaces'

export abstract class WhereOperators<TDocumentType = any> {
  And(
    ...args: (WhereLogicalOperator<TDocumentType> | TDocumentType)[]
  ): WhereLogicalOperator<TDocumentType> {
    return new WhereLogicalOperator({
      operator: new EnumType(WhereOperator.And),
      operands: args,
    })
  }

  Or(
    ...args: (WhereLogicalOperator<TDocumentType> | TDocumentType)[]
  ): WhereLogicalOperator<TDocumentType> {
    return new WhereLogicalOperator({
      operator: new EnumType(WhereOperator.Or),
      operands: args,
    })
  }

  Equal<Type>(value: Type): WhereCompareOperator<Type> {
    return new WhereCompareOperator({
      operator: new EnumType(WhereOperator.Equal),
      value,
    })
  }

  NotEqual<Type>(value: Type): WhereCompareOperator<Type> {
    return new WhereCompareOperator({
      operator: new EnumType(WhereOperator.NotEqual),
      value,
    })
  }

  WithinGeoRange(value: IWhereGeoRange): WhereCompareOperator<IWhereGeoRange> {
    return new WhereCompareOperator({
      operator: new EnumType(WhereOperator.WithinGeoRange),
      value,
    })
  }

  GreaterThan<Type>(value: Type): WhereCompareOperator<Type> {
    return new WhereCompareOperator({
      operator: new EnumType(WhereOperator.GreaterThan),
      value,
    })
  }

  LessThan<Type>(value: Type): WhereCompareOperator<Type> {
    return new WhereCompareOperator({
      operator: new EnumType(WhereOperator.LessThan),
      value,
    })
  }

  LessThanEqual<Type>(value: Type): WhereCompareOperator<Type> {
    return new WhereCompareOperator({
      operator: new EnumType(WhereOperator.LessThanEqual),
      value,
    })
  }

  IsNull(value: boolean): WhereCompareOperator<boolean> {
    return new WhereCompareOperator({
      operator: new EnumType(WhereOperator.IsNull),
      value,
    })
  }

  ContainsAny<Type>(...value: Array<Type>): WhereCompareOperator<Array<Type>> {
    return new WhereCompareOperator({
      operator: new EnumType(WhereOperator.ContainsAny),
      value,
    })
  }

  ContainsAll<Type>(value: Type): WhereCompareOperator<Type> {
    return new WhereCompareOperator({
      operator: new EnumType(WhereOperator.ContainsAll),
      value,
    })
  }

  Like(value: string): WhereCompareOperator<string> {
    return new WhereCompareOperator({
      operator: new EnumType(WhereOperator.Like),
      value,
    })
  }

  GreaterThanEqual<Type>(value: Type): WhereCompareOperator<Type> {
    return new WhereCompareOperator({
      operator: new EnumType(WhereOperator.GreaterThanEqual),
      value,
    })
  }
}
