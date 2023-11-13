import { WhereOperators } from '../../../filters'

export type DateField =
  | Date
  | ReturnType<typeof WhereOperators.prototype.Equal<Date>>
  | ReturnType<typeof WhereOperators.prototype.NotEqual<Date>>
  | ReturnType<typeof WhereOperators.prototype.IsNull>
  | ReturnType<typeof WhereOperators.prototype.GreaterThan<Date>>
  | ReturnType<typeof WhereOperators.prototype.GreaterThanEqual<Date>>
  | ReturnType<typeof WhereOperators.prototype.LessThan<Date>>
  | ReturnType<typeof WhereOperators.prototype.LessThanEqual<Date>>
