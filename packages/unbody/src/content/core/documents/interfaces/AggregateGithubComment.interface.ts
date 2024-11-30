import {
  IAggregateBoolean,
  IAggregateDate,
  IAggregateGroupBy,
  IAggregateMeta,
  IAggregateReference,
  IAggregateString,
} from './fields'

export interface IAggregateGithubComment {
  remoteId: IAggregateString
  sourceId: IAggregateString

  url: IAggregateString
  authorAssociation: IAggregateString
  diffHunk: IAggregateString
  refPath: IAggregateString
  inReplyToId: IAggregateString
  inReplyToUrl: IAggregateString
  subjectType: IAggregateString
  outdated: IAggregateBoolean
  text: IAggregateString
  html: IAggregateString
  type: IAggregateString

  createdAt: IAggregateDate
  modifiedAt: IAggregateDate

  thread: IAggregateReference

  groupedBy: IAggregateGroupBy
  meta: IAggregateMeta

  // auto-generated
  autoSummary: IAggregateString
  autoKeywords: IAggregateString
  autoTopics: IAggregateString
  autoEntities: IAggregateString
}
