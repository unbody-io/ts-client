import {
  IAggregateDate,
  IAggregateGroupBy,
  IAggregateMeta,
  IAggregateNumber,
  IAggregateReference,
  IAggregateString,
} from './fields'

export interface IAggregateTextDocument {
  meta: IAggregateMeta
  blocks: IAggregateReference
  createdAt: IAggregateDate
  groupedBy: IAggregateGroupBy
  html: IAggregateString
  authors: IAggregateString
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
  description: IAggregateString
  tags: IAggregateString
  text: IAggregateString
  title: IAggregateString
  toc: IAggregateString
}
