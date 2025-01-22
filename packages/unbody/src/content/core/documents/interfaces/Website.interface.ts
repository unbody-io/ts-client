import { DateField, StringArrayField, StringField } from '../types'
import { IBeacon } from './Beacon.interface'
import { IWebPage } from './WebPage.interface'

export interface IWebsite {
  url?: StringField
  title?: StringField
  description?: StringField
  locale?: StringField
  type?: StringField
  keywords?: StringArrayField
  properties?: StringField

  createdAt?: DateField
  modifiedAt?: DateField

  path?: StringField
  pathString?: StringField
  remoteId?: StringField
  sourceId?: StringField

  pages?: {
    WebPage?: IWebPage[]

    Beacon?: IBeacon[]
  }

  // auto-generated
  autoSummary?: StringField
  autoKeywords?: StringArrayField
  autoTopics?: StringArrayField
  autoEntities?: StringArrayField

  __typename?: 'Website'
}
