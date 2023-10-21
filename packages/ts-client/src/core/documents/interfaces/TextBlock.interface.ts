import { IGoogleDoc } from './GoogleDoc.interface'
import { IFootnote } from './fields'
import { IBeacon } from './Beacon.interface'
import { StringArrayField, StringField, NumberField } from '../types'

export interface ITextBlock {
  document?: { GoogleDoc?: IGoogleDoc; Beacon?: IBeacon }
  footnotes?: StringArrayField<IFootnote>
  html?: StringField
  order?: NumberField
  remoteId?: StringField
  sourceId?: StringField
  tagName?: StringField
  text?: StringField
  classNames?: StringArrayField
}
