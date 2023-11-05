import {
  IAggregateDocument,
  IAggregateGroupBy,
  IAggregateMeta,
  IAggregateNumber,
  IAggregateString,
} from './fields'

export interface IAggregateTextBlock {
  meta: IAggregateMeta
  document: IAggregateDocument
  groupedBy: IAggregateGroupBy
  footnotes: IAggregateString
  html: IAggregateString
  order: IAggregateNumber
  remoteId: IAggregateString
  sourceId: IAggregateString
  tagName: IAggregateString
  text: IAggregateString
  classNames: IAggregateString
}
