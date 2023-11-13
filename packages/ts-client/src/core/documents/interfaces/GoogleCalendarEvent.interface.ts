import { IImageBlock } from './ImageBlock.interface'
import {
  StringArrayField,
  StringField,
  NumberField,
  DateField,
  BooleanField,
} from '../types'

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
  attachments: StringArrayField<IImageBlock>
}
