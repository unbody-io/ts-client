import { DateField, NumberField, StringArrayField, StringField } from '../types'
import { IBeacon } from './Beacon.interface'
import { IDiscordMessage } from './DiscordMessage.interface'
import { IGoogleCalendarEvent } from './GoogleCalendarEvent.interface'
import { IGoogleDoc } from './GoogleDoc.interface'
import { ITextDocument } from './TextDocument.interface'

export interface IImageBlock {
  document?: {
    GoogleDoc?: IGoogleDoc[]
    TextDocument?: ITextDocument[]
    DiscordMessage?: IDiscordMessage[]
    GoogleCalendarEvent?: IGoogleCalendarEvent[]
    Beacon?: IBeacon[]
  }

  alt?: StringField
  createdAt?: DateField
  ext?: StringField
  height?: NumberField
  mimeType?: StringField
  modifiedAt?: DateField
  order?: NumberField
  originalName?: StringField
  path?: StringArrayField
  pathString?: StringField
  remoteId?: StringField
  size?: NumberField
  sourceId?: StringField
  url?: StringField
  width?: NumberField

  __typename?: 'ImageBlock'
}
