import { WhereOperators } from '../../../filters'

export type StringArrayField<Type = string> =
  | Array<Type>
  | ReturnType<typeof WhereOperators.prototype.Equal<Array<Type>>>
  | ReturnType<typeof WhereOperators.prototype.NotEqual<Array<Type>>>
  | ReturnType<typeof WhereOperators.prototype.ContainsAny<Type>>
  | ReturnType<typeof WhereOperators.prototype.ContainsAll<Type>>
  | ReturnType<typeof WhereOperators.prototype.IsNull>
  | ReturnType<typeof WhereOperators.prototype.Like>
