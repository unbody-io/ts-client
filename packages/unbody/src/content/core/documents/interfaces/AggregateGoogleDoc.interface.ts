import {
  IAggregateDate,
  IAggregateGroupBy,
  IAggregateMeta,
  IAggregateNumber,
  IAggregateReference,
  IAggregateString,
} from './fields'

export interface IAggregateGoogleDoc {
  meta: IAggregateMeta
  blocks: IAggregateReference
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

  // auto-generated
  autoSummary?: IAggregateString
  autoKeywords?: IAggregateString
  autoTopics?: IAggregateString
  autoEntities?: IAggregateString
}
