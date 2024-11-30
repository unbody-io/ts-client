import { IGoogleDoc } from './GoogleDoc.interface'
import { IFootnote } from './fields'
import { IBeacon } from './Beacon.interface'
import { StringArrayField, StringField, NumberField } from '../types'
import { ITextDocument } from './TextDocument.interface'

export interface ITextBlock {
  document?: {
    GoogleDoc?: IGoogleDoc[]
    TextDocument?: ITextDocument[]

    Beacon?: IBeacon[]
  }
  footnotes?: StringArrayField<IFootnote>
  html?: StringField
  order?: NumberField
  remoteId?: StringField
  sourceId?: StringField
  tagName?: StringField
  text?: StringField
  classNames?: StringArrayField

  __typename?: 'TextBlock'
}
