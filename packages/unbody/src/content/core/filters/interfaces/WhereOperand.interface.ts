import { WhereOperator } from '../enums'
import { IWhereGeoRange } from './WhereGeoRange.interface'
import { INearObject } from './NearObject.interface'

export interface IWhereOperand {
  operator?: WhereOperator
  path: string[] | string
  operands?: IWhereOperand[]
  nearObject?: INearObject
  valueGeoRange?: IWhereGeoRange
  valueNumber?: number
  valueBoolean?: boolean
  valueString?: string
  valueText?: string
  valueDate?: string
  valueInt?: number
}
