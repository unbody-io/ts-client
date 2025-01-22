import { DateField, StringArrayField, StringField } from '../types'
import { IBeacon } from './Beacon.interface'
import { IImageBlock } from './ImageBlock.interface'
import { ITextBlock } from './TextBlock.interface'
import { IWebsite } from './Website.interface'

export interface IWebPage {
  originalName?: StringField

  url?: StringField
  title?: StringField
  description?: StringField
  locale?: StringField
  type?: StringField
  keywords?: StringArrayField
  properties?: StringField

  text?: StringField
  html?: StringField

  blocks?: {
    ImageBlock?: IImageBlock[]
    TextBlock?: ITextBlock[]

    Beacon?: IBeacon[]
  }

  document?: {
    Website?: IWebsite[]

    Beacon?: IBeacon[]
  }

  createdAt?: DateField
  modifiedAt?: DateField

  path?: StringField
  pathString?: StringField
  remoteId?: StringField
  sourceId?: StringField

  // auto-generated
  autoSummary?: StringField
  autoKeywords?: StringArrayField
  autoTopics?: StringArrayField
  autoEntities?: StringArrayField

  __typename?: 'WebPage'
}
