import { FusionTypeEnum } from '../enums/FusionType.enum'

export interface IHybrid<TDocumentType> {
  query?: string
  alpha?: number
  vector?: number[]
  fusionType?: keyof typeof FusionTypeEnum
  properties?: Array<keyof TDocumentType>
}
