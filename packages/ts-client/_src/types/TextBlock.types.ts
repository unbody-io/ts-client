import { UnbodyDocumentTypeNames } from './UnbodyDocumentTypeNames.types'
import { FootnoteItem } from './Fragments.types'
import { BaseObjectWithRef } from './BaseObject.types'
import { GoogleDoc } from './GoogleDoc.types'

export interface TextBlock extends BaseObjectWithRef<GoogleDoc> {
  __typename: UnbodyDocumentTypeNames.TextBlock
  footnotes: string | Array<FootnoteItem>
  html: string
  order: number
  remoteId: string
  sourceId: string
  tagName: string
  text: string
  classNames: string[]
}
