import { BooleanField, DateField, NumberField, StringField } from '../types'
import { IAudioFile } from './AudioFile.interface'
import { IBeacon } from './Beacon.interface'
import { IImageBlock } from './ImageBlock.interface'
import { IVideoFile } from './VideoFile.interface'

export interface IDiscordUser {
  id?: StringField
  avatar?: StringField
  username?: StringField
  globalName?: StringField
}

export interface IDiscordMessage {
  content?: StringField
  referencedMessageId?: StringField
  mentionEveryone?: BooleanField
  position?: NumberField
  mentions?: IDiscordUser[]
  author?: IDiscordUser
  authorId?: StringField
  channelId?: StringField
  guildId?: StringField
  createdAt?: DateField
  modifiedAt?: DateField
  remoteId?: StringField
  sourceId?: StringField

  attachments?: {
    ImageBlock?: IImageBlock[]
    AudioFile?: IAudioFile[]
    VideoFile?: IVideoFile[]

    Beacon?: IBeacon
  }

  __typename?: 'DiscordMessage'
}
