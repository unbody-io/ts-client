import { IGoogleDoc } from './GoogleDoc.interface'
import { IDocumentWithRef } from './DocumentWithRef.interface'
import { DocumentType } from '../enums'
import { IFootnote } from './fields'
import { IBeacon } from './Beacon.interface'
export interface ITextBlock extends IDocumentWithRef<IGoogleDoc | IBeacon> {
  __typename: DocumentType.TextBlock
  footnotes: string | Array<IFootnote>
  html: string
  order: number
  remoteId: string
  sourceId: string
  tagName: string
  text: string
  classNames: string[]
}
