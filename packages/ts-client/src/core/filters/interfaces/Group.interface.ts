import { GroupType } from '../enums'

export interface IGroup {
  force: number
  type: keyof typeof GroupType
}
