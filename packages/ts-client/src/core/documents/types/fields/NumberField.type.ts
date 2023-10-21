import { WhereOperators } from '../../../filters'

export type NumberField =
  | number
  | ReturnType<typeof WhereOperators.prototype.Equal<number>>
  | ReturnType<typeof WhereOperators.prototype.NotEqual<number>>
  | ReturnType<typeof WhereOperators.prototype.ContainsAny<number>>
  | ReturnType<typeof WhereOperators.prototype.ContainsAll<number>>
  | ReturnType<typeof WhereOperators.prototype.IsNull>
  | ReturnType<typeof WhereOperators.prototype.GreaterThan>
  | ReturnType<typeof WhereOperators.prototype.GreaterThanEqual>
  | ReturnType<typeof WhereOperators.prototype.LessThan>
  | ReturnType<typeof WhereOperators.prototype.LessThanEqual>
