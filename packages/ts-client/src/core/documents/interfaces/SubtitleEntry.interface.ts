import { NumberField, StringField } from '../types'
import { IBeacon } from './Beacon.interface'
import { ISubtitleFile } from './SubtitleFile.interface'

export interface ISubtitleEntry {
  document?: {
    SubtitleFile?: ISubtitleFile[]

    Beacon?: IBeacon[]
  }

  text?: StringField
  start?: NumberField
  end?: NumberField
  order?: NumberField
  sourceId?: StringField
  remoteId?: StringField

  __typename?: 'SubtitleEntry'
}
