import { INearTextMoveObj } from './NearTextMoveObj.interface'

export interface INearText {
  moveTo?: INearTextMoveObj
  certainty?: number
  distance?: number
  moveAwayFrom?: INearTextMoveObj
  concepts: string[]
  autocorrect?: boolean
}
