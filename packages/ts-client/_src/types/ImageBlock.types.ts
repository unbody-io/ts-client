import { BaseObjectWithRef } from './BaseObject.types'
import { GoogleDoc } from './GoogleDoc.types'
import { UnbodyDocumentTypeNames } from './UnbodyDocumentTypeNames.types'
import { GoogleCalendarEvent } from './GoogleCalendarEvent.types'

export interface ImageBlock
  extends BaseObjectWithRef<GoogleDoc | GoogleCalendarEvent> {
  __typename: UnbodyDocumentTypeNames.ImageBlock
  alt: string
  createdAt: string
  ext: string
  height: number
  mimeType: string
  modifiedAt: string
  order: number
  originalName: string
  path: string[]
  pathstring: string
  remoteId: string
  size: number
  sourceId: string
  url: string
  width: number
  classNames: string[]
}
