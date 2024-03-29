import {
  IAggregateDate,
  IAggregateGroupBy,
  IAggregateMeta,
  IAggregateReference,
  IAggregateString,
} from './fields'

export interface IAggregateSpreadsheetDocument {
  originalName?: IAggregateString
  mimeType?: IAggregateString
  createdAt?: IAggregateDate
  modifiedAt?: IAggregateDate
  slug?: IAggregateString
  path?: IAggregateString
  pathString?: IAggregateString
  remoteId?: IAggregateString
  sourceId?: IAggregateString
  sheets?: IAggregateReference

  // auto-generated
  autoSummary?: IAggregateString
  autoKeywords?: IAggregateString
  autoTopics?: IAggregateString
  autoEntities?: IAggregateString

  meta?: IAggregateMeta
  groupedBy?: IAggregateGroupBy
}
