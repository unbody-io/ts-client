import {
  IAggregateDate,
  IAggregateNumber,
  IAggregateReference,
  IAggregateString,
} from './fields'
import { IAggregateBoolean } from './fields/common/AggregateBoolean.interface'

export interface IAggregateGoogleCalendarEvent {
  createdAt: IAggregateString
  creatorDisplayName: IAggregateString
  creatorEmail: IAggregateString
  creatorId: IAggregateString
  creatorSelf: IAggregateBoolean
  descriptionHtml: IAggregateString
  descriptionText: IAggregateString
  end: IAggregateDate
  htmlLink: IAggregateString
  location: IAggregateString
  organizerDisplayName: IAggregateString
  organizerEmail: IAggregateString
  organizerId: IAggregateString
  organizerSelf: IAggregateBoolean
  recurrence: IAggregateString
  slug: IAggregateString
  remoteId: IAggregateString
  sequence: IAggregateNumber
  sourceId: IAggregateString
  start: IAggregateDate
  status: IAggregateString
  summary: IAggregateString
  title: IAggregateString
  updatedAt: IAggregateDate
  attachments: IAggregateReference
}
