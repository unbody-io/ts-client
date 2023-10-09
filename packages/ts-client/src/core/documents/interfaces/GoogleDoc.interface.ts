import { IDocument } from './Document.interface'
import { DocumentType } from '../enums'
import { IMention, IToc } from './fields'
import { IImageBlock } from './ImageBlock.interface'
import { ITextBlock } from './TextBlock.interface'

export interface IGoogleDoc extends IDocument {
  __typename: DocumentType.GoogleDoc
  blocks: Array<IImageBlock | ITextBlock>
  createdAt: string
  html: string
  mimeType: string
  modifiedAt: string
  originalName: string
  path: string[]
  pathString: string
  remoteId: string
  slug: string
  size: number
  sourceId: string
  subtitle: string
  summary: string
  tags: string[]
  text: string
  title: string
  toc: string | Array<IToc>
  mentions: Array<IMention>
}
