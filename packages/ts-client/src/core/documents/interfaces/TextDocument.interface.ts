import { DateField, StringArrayField, StringField } from '../types'
import { IBeacon } from './Beacon.interface'
import { IImageBlock } from './ImageBlock.interface'
import { ITextBlock } from './TextBlock.interface'
import { IMention, IToc } from './fields'

export interface ITextDocument {
  blocks?: {
    ImageBlock?: IImageBlock[]
    TextBlock?: ITextBlock[]

    Beacon?: IBeacon[]
  }

  createdAt?: DateField
  html?: StringField
  mimeType?: StringField
  modifiedAt?: DateField
  originalName?: StringField
  path?: StringArrayField
  pathString?: StringField
  remoteId?: StringField
  sourceId?: StringField
  subtitle?: StringField
  description?: StringField
  tags?: StringArrayField
  text?: StringField
  title?: StringField
  properties?: StringField
  toc?: StringArrayField<IToc>
  authors?: StringArrayField<IMention>

  // auto-generated
  autoSummary?: StringField
  autoKeywords?: StringArrayField
  autoTopics?: StringArrayField
  autoEntities?: StringArrayField

  __typename?: 'TextDocument'
}
