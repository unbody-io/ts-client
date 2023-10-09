import { DocumentType } from '../enums'
import { IDocumentWithRef } from './DocumentWithRef.interface'
import { IGoogleDoc } from './GoogleDoc.interface'
import { IGoogleCalendarEvent } from './GoogleCalendarEvent.interface'
import { IBeacon } from './Beacon.interface'

export interface IAudioFile
  extends IDocumentWithRef<IGoogleDoc | IGoogleCalendarEvent | IBeacon> {
  __typename: DocumentType.AudioFile
  duration: number
  ext: string
  mimeType: string
  order: number
  originalName: string
  remoteId: string
  size: number
  sourceId: string
  url: string
}
