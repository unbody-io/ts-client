import { NumberField, StringArrayField, StringField } from '../types'
import { IBeacon } from './Beacon.interface'
import { IDiscordMessage } from './DiscordMessage.interface'
import { IGoogleCalendarEvent } from './GoogleCalendarEvent.interface'
import { IGoogleDoc } from './GoogleDoc.interface'
import { IMediaFile } from './MediaFile.interface'
import { ISubtitleFile } from './SubtitleFile.interface'

export interface IVideoFile {
  document?: {
    GoogleDoc?: IGoogleDoc[]
    DiscordMessage?: IDiscordMessage[]
    GoogleCalendarEvent?: IGoogleCalendarEvent[]

    Beacon?: IBeacon
  }
  assetId?: StringField
  blob?: StringField
  duration?: NumberField
  ext?: StringField
  url?: StringField
  hlsUrl?: StringField
  mimeType?: StringField
  order?: NumberField
  originalName?: StringField
  playbackId?: StringField
  files?: IMediaFile
  animatedImageUrl?: {
    gif?: StringField
    webp?: StringField
  }
  thumbnailUrl?: {
    png?: StringField
    jpeg?: StringField
    webp?: StringField
  }
  subtitles?: {
    SubtitleFile?: ISubtitleFile[]

    Beacon?: IBeacon
  }
  width?: NumberField
  height?: NumberField
  size?: NumberField
  path?: StringField
  pathString?: StringField
  remoteId?: StringField
  sourceId?: StringField

  // auto-generated
  autoSummary?: StringField
  autoKeywords?: StringArrayField
  autoTopics?: StringArrayField
  autoEntities?: StringArrayField

  __typename?: 'VideoFile'
}
