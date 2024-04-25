import {
  BooleanField,
  DateField,
  StringArrayField,
  StringField,
} from '../types'
import { IBeacon } from './Beacon.interface'
import { IGithubReaction, IGithubUser } from './GithubCommon.interface'
import { IGithubThread } from './GithubThread.interface'

export interface IGithubComment {
  remoteId?: StringField
  sourceId?: StringField

  url?: StringField
  author?: IGithubUser
  authorAssociation?: StringField
  reactions?: IGithubReaction[]
  diffHunk?: StringField
  refPath?: StringField
  inReplyToId?: StringField
  inReplyToUrl?: StringField
  subjectType?: StringField
  outdated?: BooleanField
  text?: StringField
  html?: StringField
  type?: StringField

  createdAt?: DateField
  modifiedAt?: DateField

  thread?: {
    GithubThread?: IGithubThread[]

    Beacon?: IBeacon
  }

  // auto-generated
  autoSummary?: StringField
  autoKeywords?: StringArrayField
  autoTopics?: StringArrayField
  autoEntities?: StringArrayField
}
