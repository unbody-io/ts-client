import { WhereOperators } from '../../../filters'

export type BooleanField =
  | boolean
  | ReturnType<typeof WhereOperators.prototype.Equal<boolean>>
  | ReturnType<typeof WhereOperators.prototype.NotEqual<boolean>>
  | ReturnType<typeof WhereOperators.prototype.IsNull>
