import {
  IAggregateDate,
  IAggregateGroupBy,
  IAggregateMeta,
  IAggregateReference,
  IAggregateString,
} from './fields'

export interface IAggregateWebPage {
  originalName?: IAggregateString

  url?: IAggregateString
  title?: IAggregateString
  description?: IAggregateString
  locale?: IAggregateString
  type?: IAggregateString
  keywords?: IAggregateString
  properties?: IAggregateString

  text?: IAggregateString
  html?: IAggregateString

  blocks?: IAggregateReference

  document?: IAggregateReference

  createdAt?: IAggregateDate
  modifiedAt?: IAggregateDate

  path?: IAggregateString
  pathString?: IAggregateString
  remoteId?: IAggregateString
  sourceId?: IAggregateString

  // auto-generated
  autoSummary?: IAggregateString
  autoKeywords?: IAggregateString
  autoTopics?: IAggregateString
  autoEntities?: IAggregateString

  meta?: IAggregateMeta
  groupedBy?: IAggregateGroupBy
}
