import { NumberField, StringArrayField, StringField } from '../types'
import { IBeacon } from './Beacon.interface'
import { ISpreadsheet } from './Spreadsheet.interface'

export interface ICsvRow {
  csv?: StringField
  columns?: StringArrayField
  order?: NumberField
  remoteId?: StringField
  sourceId?: StringField

  document?: {
    Spreadsheet?: ISpreadsheet
    Beacon?: IBeacon
  }
}
