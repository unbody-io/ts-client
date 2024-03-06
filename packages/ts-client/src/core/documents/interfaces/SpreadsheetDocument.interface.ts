import { DateField, StringArrayField, StringField } from '../types'
import { IBeacon } from './Beacon.interface'
import { ISpreadsheet } from './Spreadsheet.interface'

export interface ISpreadsheetDocument {
  originalName?: StringField
  mimeType?: StringField
  createdAt?: DateField
  modifiedAt?: DateField
  slug?: StringField
  path?: StringArrayField
  pathString?: StringField
  remoteId?: StringField
  sourceId?: StringField
  sheets?: {
    Spreadsheet?: ISpreadsheet
    Beacon?: IBeacon
  }
}
