import { DocumentType } from '../enums'
import { IDocumentWithRef } from './DocumentWithRef.interface'
import { IGoogleDoc } from './GoogleDoc.interface'
import { IGoogleCalendarEvent } from './GoogleCalendarEvent.interface'
import { IBeacon } from './Beacon.interface'

export interface IImageBlock
  extends IDocumentWithRef<IGoogleDoc | IGoogleCalendarEvent | IBeacon> {
  __typename: DocumentType.ImageBlock
  alt: string
  createdAt: string
  ext: string
  height: number
  mimeType: string
  modifiedAt: string
  order: number
  originalName: string
  path: string[]
  pathString: string
  remoteId: string
  size: number
  sourceId: string
  url: string
  width: number
  classNames: string[]
}
