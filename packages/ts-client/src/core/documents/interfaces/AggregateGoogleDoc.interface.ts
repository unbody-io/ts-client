import {
  IAggregateBlocks,
  IAggregateDate,
  IAggregateGroupBy,
  IAggregateMeta,
  IAggregateNumber,
  IAggregateString,
} from './fields'

export interface IAggregateGoogleDoc {
  meta: IAggregateMeta
  blocks: IAggregateBlocks
  createdAt: IAggregateDate
  groupedBy: IAggregateGroupBy
  html: IAggregateString
  mentions: IAggregateString
  mimeType: IAggregateString
  modifiedAt: IAggregateDate
  originalName: IAggregateString
  path: IAggregateString
  pathString: IAggregateString
  remoteId: IAggregateString
  size: IAggregateNumber
  slug: IAggregateString
  sourceId: IAggregateString
  subtitle: IAggregateString
  summary: IAggregateString
  tags: IAggregateString
  text: IAggregateString
  title: IAggregateString
  toc: IAggregateString
}
