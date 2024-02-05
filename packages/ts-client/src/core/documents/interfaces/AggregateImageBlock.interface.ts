import {
  IAggregateDate,
  IAggregateReference,
  IAggregateGroupBy,
  IAggregateMeta,
  IAggregateNumber,
  IAggregateString,
} from './fields'

export interface IAggregateImageBlock {
  meta: IAggregateMeta
  document: IAggregateReference
  groupedBy: IAggregateGroupBy
  alt: IAggregateString
  createdAt: IAggregateDate
  ext: IAggregateString
  height: IAggregateNumber
  mimeType: IAggregateString
  modifiedAt: IAggregateDate
  order: IAggregateNumber
  originalName: IAggregateString
  path: IAggregateString
  pathString: IAggregateString
  remoteId: IAggregateString
  size: IAggregateNumber
  sourceId: IAggregateString
  url: IAggregateString
  width: IAggregateNumber
}
