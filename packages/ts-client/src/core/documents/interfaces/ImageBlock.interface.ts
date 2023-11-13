import { IGoogleDoc } from './GoogleDoc.interface'
import { IGoogleCalendarEvent } from './GoogleCalendarEvent.interface'
import { IBeacon } from './Beacon.interface'
import { StringArrayField, StringField, NumberField, DateField } from '../types'

export interface IImageBlock {
  document?: {
    GoogleDoc?: IGoogleDoc
    GoogleCalendarEvent?: IGoogleCalendarEvent
    Beacon?: IBeacon
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
  classNames?: StringArrayField
}
