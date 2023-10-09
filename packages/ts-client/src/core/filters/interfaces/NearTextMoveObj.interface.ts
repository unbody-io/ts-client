export interface INearTextMoveObj {
  concepts?: string[]
  objects?: Array<{
    id?: string
    beacon?: string
  }>
  force?: number
}
