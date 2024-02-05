import {
  IAggregateGroupBy,
  IAggregateMeta,
  IAggregateNumber,
  IAggregateReference,
  IAggregateString,
} from './fields'

export interface IAggregateSubtitleEntry {
  document: IAggregateReference
  text: IAggregateString
  start: IAggregateNumber
  end: IAggregateNumber
  order: IAggregateNumber
  sourceId: IAggregateString
  remoteId: IAggregateString

  groupedBy: IAggregateGroupBy
  meta: IAggregateMeta
}
