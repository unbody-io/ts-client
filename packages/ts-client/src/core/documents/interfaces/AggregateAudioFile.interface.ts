import { DocumentType } from '../enums'
import {
  IAggregateDocument,
  IAggregateGroupBy,
  IAggregateMeta,
  IAggregateNumber,
  IAggregateString,
} from './fields'

export interface IAggregateAudioFile {
  __typename: DocumentType.AudioFile
  meta: IAggregateMeta
  document: IAggregateDocument
  groupedBy: IAggregateGroupBy
  duration: IAggregateNumber
  ext: IAggregateString
  mimeType: IAggregateString
  order: IAggregateNumber
  originalName: IAggregateString
  remoteId: IAggregateString
  size: IAggregateNumber
  sourceId: IAggregateString
  url: IAggregateString
}
