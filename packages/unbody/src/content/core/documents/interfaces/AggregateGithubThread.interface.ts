import {
  IAggregateBoolean,
  IAggregateDate,
  IAggregateGroupBy,
  IAggregateMeta,
  IAggregateNumber,
  IAggregateReference,
  IAggregateString,
} from './fields'

export interface IAggregateGithubThread {
  remoteId: IAggregateString
  sourceId: IAggregateString

  title: IAggregateString
  url: IAggregateString
  number: IAggregateNumber
  state: IAggregateString
  stateReason: IAggregateString
  authorAssociation: IAggregateString
  labels: IAggregateString
  locked: IAggregateBoolean
  activeLockReason: IAggregateString
  pinned: IAggregateBoolean
  merged: IAggregateBoolean
  mergeable: IAggregateString
  totalCommentsCount: IAggregateNumber
  additions: IAggregateNumber
  deletions: IAggregateNumber
  changedFiles: IAggregateNumber

  type: IAggregateString
  diffSide: IAggregateString
  isResolved: IAggregateBoolean
  isOutdated: IAggregateBoolean
  subjectType: IAggregateString
  startLine: IAggregateNumber
  startDiffSide: IAggregateString
  originalLine: IAggregateNumber
  originalStartLine: IAggregateNumber
  refPath: IAggregateString

  text: IAggregateString
  html: IAggregateString

  closedAt: IAggregateDate
  submittedAt: IAggregateDate
  mergedAt: IAggregateDate
  createdAt: IAggregateDate
  modifiedAt: IAggregateDate

  comments: IAggregateReference
  thread: IAggregateReference

  groupedBy: IAggregateGroupBy
  meta: IAggregateMeta

  // auto-generated
  autoSummary: IAggregateString
  autoKeywords: IAggregateString
  autoTopics: IAggregateString
  autoEntities: IAggregateString
}
