import { DateField, StringArrayField, StringField } from '../types'
import { IBeacon } from './Beacon.interface'
import { IDiscordMessage } from './DiscordMessage.interface'
import { IGithubComment } from './GithubComment.interface'
import { IGithubThread } from './GithubThread.interface'
import { IGoogleCalendarEvent } from './GoogleCalendarEvent.interface'
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

  // auto-generated
  autoSummary?: StringField
  autoKeywords?: StringArrayField
  autoTopics?: StringArrayField
  autoEntities?: StringArrayField

  sheets?: {
    Spreadsheet?: ISpreadsheet[]

    Beacon?: IBeacon[]
  }

  document?: {
    GoogleCalendarEvent?: IGoogleCalendarEvent[]
    DiscordMessage?: IDiscordMessage[]
    GithubComment?: IGithubComment[]
    GithubThread?: IGithubThread[]

    Beacon?: IBeacon[]
  }

  __typename?: 'SpreadsheetDocument'
}
