import { IGoogleDoc } from './GoogleDoc.interface'
import { IGoogleCalendarEvent } from './GoogleCalendarEvent.interface'
import { IBeacon } from './Beacon.interface'
import { StringField, NumberField } from '../types'

export interface IAudioFile {
  document: {
    GoogleDoc: IGoogleDoc
    GoogleCalendarEvent: IGoogleCalendarEvent
    Beacon: IBeacon
  }
  duration: NumberField
  ext: StringField
  mimeType: StringField
  order: NumberField
  originalName: StringField
  remoteId: StringField
  size: NumberField
  sourceId: StringField
  url: StringField
}
