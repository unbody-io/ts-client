import {
  BooleanField,
  DateField,
  NumberField,
  StringArrayField,
  StringField,
} from '../types'
import { IBeacon } from './Beacon.interface'
import { IImageBlock } from './ImageBlock.interface'

export interface IGoogleCalendarEvent {
  createdAt: DateField
  creatorDisplayName: StringField
  creatorEmail: StringField
  creatorId: StringField
  creatorSelf: BooleanField
  descriptionHtml: StringField
  descriptionText: StringField
  end: DateField
  htmlLink: StringField
  location: StringField
  organizerDisplayName: StringField
  organizerEmail: StringField
  organizerId: StringField
  organizerSelf: BooleanField
  recurrence: StringArrayField
  slug: StringField
  remoteId: StringField
  sequence: NumberField
  sourceId: StringField
  start: DateField
  status: StringField
  summary: StringField
  title: StringField
  updatedAt: DateField
  modifiedAt: DateField

  attachments: {
    ImageBlock?: IImageBlock[]

    Beacon?: IBeacon[]
  }

  __typename?: 'GoogleCalendarEvent'
}
