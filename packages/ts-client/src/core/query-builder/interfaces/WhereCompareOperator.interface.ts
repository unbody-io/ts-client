import { IWhere } from '../../filters'

export interface IWhereCompareOperatorArgs
  extends Omit<IWhere, 'operator' | 'operands'> {
  path: string[] | string
}
