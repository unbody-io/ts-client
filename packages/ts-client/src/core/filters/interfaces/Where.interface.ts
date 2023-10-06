import { WhereOperator } from '../enums'
import { IWhereGeoRange } from './WhereGeoRange.interface'
import { IWhereOperand } from './WhereOperand.interface'

export interface IWhere {
  path?: string[] | string
  valueInt?: number
  valueNumber?: number
  valueGeoRange?: IWhereGeoRange
  operator?: WhereOperator
  operands?: IWhereOperand[]
  valueBoolean?: boolean
  valueDate?: string
  valueText?: string
  valueString?: string
}
