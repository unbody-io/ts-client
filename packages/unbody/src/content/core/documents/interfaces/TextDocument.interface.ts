import { DateField, StringArrayField, StringField } from '../types'
import { IBeacon } from './Beacon.interface'
import { IDiscordMessage } from './DiscordMessage.interface'
import { IMention, IToc } from './fields'
import { IGithubComment } from './GithubComment.interface'
import { IGithubThread } from './GithubThread.interface'
import { IGoogleCalendarEvent } from './GoogleCalendarEvent.interface'
import { IImageBlock } from './ImageBlock.interface'
import { ITextBlock } from './TextBlock.interface'

export interface ITextDocument {
  blocks?: {
    ImageBlock?: IImageBlock[]
    TextBlock?: ITextBlock[]

    Beacon?: IBeacon[]
  }

  createdAt?: DateField
  html?: StringField
  mimeType?: StringField
  modifiedAt?: DateField
  originalName?: StringField
  path?: StringArrayField
  pathString?: StringField
  remoteId?: StringField
  sourceId?: StringField
  subtitle?: StringField
  description?: StringField
  tags?: StringArrayField
  text?: StringField
  title?: StringField
  properties?: StringField
  toc?: StringArrayField<IToc>
  authors?: StringArrayField<IMention>

  document?: {
    GoogleCalendarEvent?: IGoogleCalendarEvent[]
    DiscordMessage?: IDiscordMessage[]
    GithubComment?: IGithubComment[]
    GithubThread?: IGithubThread[]

    Beacon?: IBeacon[]
  }

  // auto-generated
  autoSummary?: StringField
  autoKeywords?: StringArrayField
  autoTopics?: StringArrayField
  autoEntities?: StringArrayField

  __typename?: 'TextDocument'
}
