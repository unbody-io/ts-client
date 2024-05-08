import {
  BooleanField,
  DateField,
  NumberField,
  StringArrayField,
  StringField,
} from '../types'
import { IBeacon } from './Beacon.interface'
import { IGithubComment } from './GithubComment.interface'
import {
  IGithubLabel,
  IGithubReaction,
  IGithubUser,
} from './GithubCommon.interface'

export interface IGithubThread {
  remoteId?: StringField
  sourceId?: StringField

  title?: StringField
  url?: StringField
  number?: NumberField
  state?: StringField
  stateReason?: StringField
  author?: IGithubUser
  authorAssociation?: StringField
  assignees?: IGithubUser[]
  mergedBy?: IGithubUser
  labels?: StringArrayField
  labelsData?: IGithubLabel[]
  reactions?: IGithubReaction[]
  locked?: BooleanField
  activeLockReason?: StringField
  pinned?: BooleanField
  merged?: BooleanField
  mergeable?: StringField
  totalCommentsCount?: NumberField
  additions?: NumberField
  deletions?: NumberField
  changedFiles?: NumberField

  type?: StringField
  diffSide?: StringField
  isResolved?: BooleanField
  isOutdated?: BooleanField
  subjectType?: StringField
  startLine?: NumberField
  startDiffSide?: StringField
  originalLine?: NumberField
  originalStartLine?: NumberField
  refPath?: StringField

  text?: StringField
  html?: StringField

  closedAt?: DateField
  submittedAt?: DateField
  mergedAt?: DateField
  createdAt?: DateField
  modifiedAt?: DateField

  comments?: {
    GithubComment?: IGithubComment[]

    Beacon?: IBeacon[]
  }

  thread?: {
    GithubThread?: IGithubThread[]

    Beacon?: IBeacon[]
  }

  // auto-generated
  autoSummary?: StringField
  autoKeywords?: StringArrayField
  autoTopics?: StringArrayField
  autoEntities?: StringArrayField

  __typename?: 'GithubThread'
}
