import { FusionTypeEnum } from '../enums/FusionType.enum'

export interface IHybrid {
  query?: string
  alpha?: number
  vector?: number[]
  fusionType?: keyof typeof FusionTypeEnum
}
