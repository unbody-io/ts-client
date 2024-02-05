import { NumberField, StringField } from '../types'

export interface IMediaFile {
  url?: StringField
  name?: StringField
  ext?: StringField
  size?: NumberField
  width?: NumberField
  height?: NumberField
  bitrate?: NumberField
}
