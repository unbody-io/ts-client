import {
  IAggregateGroupBy,
  IAggregateMeta,
  IAggregateNumber,
  IAggregateReference,
  IAggregateString,
} from './fields'

export interface IAggregateCsvRow {
  csv?: IAggregateString
  columns?: IAggregateString
  order?: IAggregateNumber
  remoteId?: IAggregateString
  sourceId?: IAggregateString
  document?: IAggregateReference

  meta?: IAggregateMeta
  groupedBy?: IAggregateGroupBy
}
