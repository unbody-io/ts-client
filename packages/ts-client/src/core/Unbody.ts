import { HttpClient } from '../utils'
import { AxiosInstance } from 'axios'
import { IUnbodyOptions } from './UnbodyOptions.interface'
import { QueryBuilder } from './query-builder'
import { QueryType } from './query-builder/enums'
import {
  DocumentType,
  IAudioFile,
  IGoogleCalendarEvent,
  IGoogleDoc,
  IImageBlock,
  ITextBlock,
} from './documents'

export class Unbody {
  public httpClient: AxiosInstance

  constructor({ apiKey, projectId }: IUnbodyOptions) {
    if (!apiKey) throw new Error('Unbody client: apiKey is required')
    if (!projectId) throw new Error('Unbody client: projectId is required')
    const httpClient = new HttpClient(apiKey, projectId)
    this.httpClient = httpClient.instance
  }

  get get() {
    const { httpClient } = this
    return {
      get googleDoc(): QueryBuilder<IGoogleDoc> {
        return new QueryBuilder<IGoogleDoc>({
          httpClient: httpClient,
          queryType: QueryType.Get,
          documentType: DocumentType.GoogleDoc,
        })
      },
      get imageBlock(): QueryBuilder<IImageBlock> {
        return new QueryBuilder<IImageBlock>({
          httpClient: httpClient,
          queryType: QueryType.Get,
          documentType: DocumentType.ImageBlock,
        })
      },
      get audioFile(): QueryBuilder<IAudioFile> {
        return new QueryBuilder<IAudioFile>({
          httpClient: httpClient,
          queryType: QueryType.Get,
          documentType: DocumentType.AudioFile,
        })
      },
      get textBlock(): QueryBuilder<ITextBlock> {
        return new QueryBuilder<ITextBlock>({
          httpClient: httpClient,
          queryType: QueryType.Get,
          documentType: DocumentType.TextBlock,
        })
      },
      get googleCalendarEvent(): QueryBuilder<IGoogleCalendarEvent> {
        return new QueryBuilder<IGoogleCalendarEvent>({
          httpClient: httpClient,
          queryType: QueryType.Get,
          documentType: DocumentType.GoogleCalendarEvent,
        })
      },
    }
  }
}
