import { EnumType } from 'json-to-graphql-query'
import { IWhereGeoRange } from '../filters/interfaces/WhereGeoRange.interface'
import { assignProperties } from '../../utils'

export class WhereCompareOperator {
  operator: EnumType
  path?: string[] | string
  valueInt?: number
  valueNumber?: number
  valueGeoRange?: IWhereGeoRange
  valueBoolean?: boolean
  valueDate?: string
  valueText?: string
  valueString?: string

  constructor(props: WhereCompareOperator) {
    assignProperties(props, this)
  }
}
