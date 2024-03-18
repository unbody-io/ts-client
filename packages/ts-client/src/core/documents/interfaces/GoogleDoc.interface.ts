import { IMention, IToc } from './fields'
import { IImageBlock } from './ImageBlock.interface'
import { ITextBlock } from './TextBlock.interface'
import { StringArrayField, StringField, NumberField, DateField } from '../types'

export interface IGoogleDoc {
  blocks?: { ImageBlock?: IImageBlock; TextBlock?: ITextBlock }
  createdAt?: DateField
  html?: StringField
  mimeType?: StringField
  modifiedAt?: DateField
  originalName?: StringField
  path?: StringArrayField
  pathString?: StringField
  remoteId?: StringField
  slug?: StringField
  size?: NumberField
  sourceId?: StringField
  subtitle?: StringField
  summary?: StringField
  tags?: StringArrayField
  text?: StringField
  title?: StringField
  toc?: StringArrayField<IToc>
  mentions?: StringArrayField<IMention>

  // auto-generated
  autoSummary?: StringField
  autoKeywords?: StringArrayField
  autoTopics?: StringArrayField
  autoEntities?: StringArrayField
}
