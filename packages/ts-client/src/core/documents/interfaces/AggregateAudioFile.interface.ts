import {
  IAggregateGroupBy,
  IAggregateMeta,
  IAggregateNumber,
  IAggregateReference,
  IAggregateString,
} from './fields'

export interface IAggregateAudioFile {
  document: IAggregateReference
  assetId: IAggregateString
  blob: IAggregateString
  duration: IAggregateNumber
  ext: IAggregateString
  url: IAggregateString
  hlsUrl: IAggregateString
  mimeType: IAggregateString
  order: IAggregateNumber
  originalName: IAggregateString
  playbackId: IAggregateString
  files: IAggregateReference
  subtitles: IAggregateReference
  size: IAggregateNumber
  path: IAggregateString
  pathString: IAggregateString
  remoteId: IAggregateString
  sourceId: IAggregateString
  groupedBy: IAggregateGroupBy
  meta: IAggregateMeta
}
