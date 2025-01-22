import {
  IAggregateDate,
  IAggregateGroupBy,
  IAggregateMeta,
  IAggregateReference,
  IAggregateString,
} from './fields'

export interface IAggregateWebsite {
  url?: IAggregateString
  title?: IAggregateString
  description?: IAggregateString
  locale?: IAggregateString
  type?: IAggregateString
  keywords?: IAggregateString
  properties?: IAggregateString

  createdAt?: IAggregateDate
  modifiedAt?: IAggregateDate

  path?: IAggregateString
  pathString?: IAggregateString
  remoteId?: IAggregateString
  sourceId?: IAggregateString

  pages?: IAggregateReference

  // auto-generated
  autoSummary?: IAggregateString
  autoKeywords?: IAggregateString
  autoTopics?: IAggregateString
  autoEntities?: IAggregateString

  meta?: IAggregateMeta
  groupedBy?: IAggregateGroupBy
}
