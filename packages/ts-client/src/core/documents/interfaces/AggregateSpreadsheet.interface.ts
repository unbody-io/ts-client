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

  meta?: IAggregateMeta
  groupedBy?: IAggregateGroupBy
}
