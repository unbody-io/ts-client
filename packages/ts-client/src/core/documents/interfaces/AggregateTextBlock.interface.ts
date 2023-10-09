import { DocumentType } from '../enums'
import {
  IAggregateDocument,
  IAggregateGroupBy,
  IAggregateMeta,
  IAggregateNumber,
  IAggregateString,
  IFootnote,
} from './fields'

export interface IAggregateTextBlock {
  __typename: DocumentType.TextBlock
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
