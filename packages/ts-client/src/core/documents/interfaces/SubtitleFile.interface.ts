import {
  BooleanField,
  NumberField,
  StringArrayField,
  StringField,
} from '../types'
import { IAudioFile } from './AudioFile.interface'
import { IBeacon } from './Beacon.interface'
import { ISubtitleEntry } from './SubtitleEntry.interface'
import { IVideoFile } from './VideoFile.interface'

export interface ISubtitleFile {
  media?: {
    AudioFile?: IAudioFile
    VideoFile?: IVideoFile
    Beacon?: IBeacon
  }
  originalName?: StringField
  mimeType?: StringField
  language?: StringField
  entries?: {
    SubtitleEntry?: ISubtitleEntry
  }
  autogenerated?: BooleanField
  size?: NumberField
  url?: StringField
  path?: StringField
  pathString?: StringField
  sourceId?: StringField
  remoteId?: StringField

  // auto-generated
  autoSummary?: StringField
  autoKeywords?: StringArrayField
  autoTopics?: StringArrayField
  autoEntities?: StringArrayField
}
