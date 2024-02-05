import { DateField, NumberField, StringArrayField, StringField } from '../types'
import { IImageBlock } from './ImageBlock.interface'
import { ITextBlock } from './TextBlock.interface'
import { IMention, IToc } from './fields'

export interface ITextDocument {
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
  description?: StringField
  tags?: StringArrayField
  text?: StringField
  title?: StringField
  properties?: StringField
  toc?: StringArrayField<IToc>
  authors?: StringArrayField<IMention>
}
