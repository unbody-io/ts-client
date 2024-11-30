import {
  IAggregateGroupBy,
  IAggregateMeta,
  IAggregateNumber,
  IAggregateReference,
  IAggregateString,
} from './fields'

export interface IAggregateSpreadsheet {
  name?: IAggregateString
  order?: IAggregateNumber
  remoteId?: IAggregateString
  sourceId?: IAggregateString

  header?: IAggregateReference
  rows?: IAggregateReference
  document?: IAggregateReference

  // auto-generated
  autoSummary?: IAggregateString
  autoKeywords?: IAggregateString
  autoTopics?: IAggregateString
  autoEntities?: IAggregateString

  meta?: IAggregateMeta
  groupedBy?: IAggregateGroupBy
}
