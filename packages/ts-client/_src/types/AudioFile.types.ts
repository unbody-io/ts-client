import { UnbodyDocumentTypeNames } from './UnbodyDocumentTypeNames.types'
import { GoogleCalendarEvent } from './GoogleCalendarEvent.types'
import { GoogleDoc } from './GoogleDoc.types'
import { BaseObjectWithRef } from './BaseObject.types'

export interface AudioFile
  extends BaseObjectWithRef<GoogleDoc | GoogleCalendarEvent> {
  duration: number
  ext: string
  mimeType: string
  order: number
  originalName: string
  remoteId: string
  size: number
  sourceId: string
  url: string
  __typename: UnbodyDocumentTypeNames.AudioFile
}
