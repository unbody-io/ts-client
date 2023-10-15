import { DocumentType } from '../enums'
import { IImageBlock } from './ImageBlock.interface'
import { IDocument } from './Document.interface'

export interface IGoogleCalendarEvent extends IDocument {
  __typename: DocumentType.GoogleCalendarEvent
  createdAt: string
  creatorDisplayName: string
  creatorEmail: string
  creatorId: string
  creatorSelf: boolean
  descriptionHtml: string
  descriptionText: string
  end: string
  htmlLink: string
  location: string
  organizerDisplayName: string
  organizerEmail: string
  organizerId: string
  organizerSelf: boolean
  recurrence: string[]
  slug: string
  remoteId: string
  sequence: number
  sourceId: string
  start: string
  status: string
  summary: string
  title: string
  updatedAt: string
  modifiedAt: string
  attachments: Array<IImageBlock>
}
