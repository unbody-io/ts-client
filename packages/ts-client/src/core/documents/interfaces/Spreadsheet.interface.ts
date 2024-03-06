import { NumberField, StringField } from '../types'
import { IBeacon } from './Beacon.interface'
import { ICsvRow } from './CsvRow.interface'
import { ISpreadsheetDocument } from './SpreadsheetDocument.interface'

export interface ISpreadsheet {
  name?: StringField
  order?: NumberField
  remoteId?: StringField
  sourceId?: StringField

  header?: {
    CsvRow?: ICsvRow
    Beacon?: IBeacon
  }

  rows?: {
    CsvRow?: ICsvRow
    Beacon?: IBeacon
  }

  document?: {
    SpreadsheetDocument?: ISpreadsheetDocument
    Beacon?: IBeacon
  }
}
