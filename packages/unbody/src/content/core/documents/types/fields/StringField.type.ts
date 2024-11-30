import { WhereOperators } from '../../../filters'

export type StringField =
  | string
  | ReturnType<typeof WhereOperators.prototype.Equal<string>>
  | ReturnType<typeof WhereOperators.prototype.NotEqual<string>>
  | ReturnType<typeof WhereOperators.prototype.ContainsAny<string>>
  | ReturnType<typeof WhereOperators.prototype.ContainsAll<string>>
  | ReturnType<typeof WhereOperators.prototype.IsNull>
  | ReturnType<typeof WhereOperators.prototype.Like>
