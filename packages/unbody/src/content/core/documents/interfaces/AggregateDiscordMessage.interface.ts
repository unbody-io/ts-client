import {
  IAggregateDate,
  IAggregateGroupBy,
  IAggregateMeta,
  IAggregateNumber,
  IAggregateReference,
  IAggregateString,
} from './fields'
import { IAggregateBoolean } from './fields/common/AggregateBoolean.interface'

export interface IAggregateDiscordMessage {
  content?: IAggregateString
  referencedMessageId?: IAggregateString
  mentionEveryone?: IAggregateBoolean
  position?: IAggregateNumber
  authorId?: IAggregateString
  channelId?: IAggregateString
  guildId?: IAggregateString
  createdAt?: IAggregateDate
  modifiedAt?: IAggregateDate
  remoteId?: IAggregateString
  sourceId?: IAggregateString
  attachments?: IAggregateReference
  meta: IAggregateMeta
  groupedBy: IAggregateGroupBy
}
