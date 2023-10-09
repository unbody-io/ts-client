import { FootnoteItem, MentionItem, TocItem } from './Fragments.types'
import { ImageBlock } from './ImageBlock.types'
import { TextBlock } from './TextBlock.types'
import { GoogleDoc } from './GoogleDoc.types'

export type GoogleDocEnhanced = GoogleDoc & {
  toc: Array<TocItem>
  mentions: Array<MentionItem>
  blocks: Array<ImageBlock | TextBlockEnhanced>
}

export type TextBlockEnhanced = TextBlock & {
  footnotes: Array<FootnoteItem>
  document?: Array<GoogleDocEnhanced>
}

export type ImageBlockEnhanced = ImageBlock & {
  blurhash?: string
  placeholderBase64?: string
}
