import { NumberField, StringField } from '../types'
import { IBeacon } from './Beacon.interface'
import { IGoogleCalendarEvent } from './GoogleCalendarEvent.interface'
import { IGoogleDoc } from './GoogleDoc.interface'
import { IMediaFile } from './MediaFile.interface'
import { ISubtitleFile } from './SubtitleFile.interface'

interface ImageUrls {
  png?: StringField
  jpeg?: StringField
  webp?: StringField
}

export interface IVideoFile {
  document?: {
    GoogleDoc?: IGoogleDoc
    GoogleCalendarEvent?: IGoogleCalendarEvent
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
  animatedImageUrl?: ImageUrls
  thumbnailUrl?: ImageUrls
  subtitles?: {
    SubtitleFile?: ISubtitleFile
  }
  width?: NumberField
  height?: NumberField
  size?: NumberField
  path?: StringField
  pathString?: StringField
  remoteId?: StringField
  sourceId?: StringField
}
