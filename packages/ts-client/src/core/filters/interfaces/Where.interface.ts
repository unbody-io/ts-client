import { WhereOperator } from '../enums'
import { IWhereGeoRange } from './WhereGeoRange.interface'

export interface IWhere {
  path?: string[] | string
  operator: WhereOperator
  operands: IWhere[]
  valueInt?: number
  valueNumber?: number
  valueGeoRange?: IWhereGeoRange
  valueBoolean?: boolean
  valueDate?: string
  valueText?: string
  valueString?: string
}
