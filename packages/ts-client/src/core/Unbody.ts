import { HttpClient } from '../utils'
import { AxiosInstance } from 'axios'
import { IUnbodyOptions } from './query-builder/interfaces'
import {
  AggregateQueryBuilder,
  GetQueryBuilder,
  QueryBuilder,
} from './query-builder'
import { QueryType } from './query-builder/enums'
import {
  DocumentType,
  IAggregateAudioFile,
  IAggregateGoogleCalendarEvent,
  IAggregateGoogleDoc,
  IAggregateImageBlock,
  IAggregateTextBlock,
  IAudioFile,
  IGoogleCalendarEvent,
  IGoogleDoc,
  IImageBlock,
  ITextBlock,
} from './documents'
import { DEFAULT_TRANSFORMERS } from './transformer'
import { deepMerge } from '../utils'
import { jsonToGraphQLQuery } from 'json-to-graphql-query'

export class Unbody {
  public httpClient: AxiosInstance

  constructor({ apiKey, projectId, transformers }: IUnbodyOptions) {
    if (!apiKey) throw new Error('Unbody client: apiKey is required')
    if (!projectId) throw new Error('Unbody client: projectId is required')
    const httpClient = new HttpClient(
      apiKey,
      projectId,
      deepMerge(
        {},
        DEFAULT_TRANSFORMERS,
        transformers,
      ) as IUnbodyOptions['transformers'],
    )
    this.httpClient = httpClient.instance
  }

  exec(...documents: QueryBuilder<any>[]) {
    const queryJson = documents.reduce((result, currentValue, currentIndex) => {
      const query = currentValue.getJsonQuery()
      const queryName = Object.keys(query)[0]
      result[`q${currentIndex}`] = {
        __aliasFor: queryName,
        ...query[queryName],
      }
      return result
    }, Object.create({}))
    return this.httpClient.post('', {
      query: jsonToGraphQLQuery({ query: queryJson }),
    })
  }

  get get() {
    const { httpClient } = this
    return {
      get googleDoc(): GetQueryBuilder<IGoogleDoc> {
        return new GetQueryBuilder<IGoogleDoc>({
          httpClient: httpClient,
          queryType: QueryType.Get,
          documentType: DocumentType.GoogleDoc,
        })
      },
      get imageBlock(): GetQueryBuilder<IImageBlock> {
        return new GetQueryBuilder<IImageBlock>({
          httpClient: httpClient,
          queryType: QueryType.Get,
          documentType: DocumentType.ImageBlock,
        })
      },
      get audioFile(): GetQueryBuilder<IAudioFile> {
        return new GetQueryBuilder<IAudioFile>({
          httpClient: httpClient,
          queryType: QueryType.Get,
          documentType: DocumentType.AudioFile,
        })
      },
      get textBlock(): GetQueryBuilder<ITextBlock> {
        return new GetQueryBuilder<ITextBlock>({
          httpClient: httpClient,
          queryType: QueryType.Get,
          documentType: DocumentType.TextBlock,
        })
      },
      get googleCalendarEvent(): GetQueryBuilder<IGoogleCalendarEvent> {
        return new GetQueryBuilder<IGoogleCalendarEvent>({
          httpClient: httpClient,
          queryType: QueryType.Get,
          documentType: DocumentType.GoogleCalendarEvent,
        })
      },
    }
  }

  get aggregate() {
    const { httpClient } = this
    return {
      get googleDoc(): AggregateQueryBuilder<IGoogleDoc, IAggregateGoogleDoc> {
        return new AggregateQueryBuilder<IGoogleDoc, IAggregateGoogleDoc>({
          httpClient: httpClient,
          queryType: QueryType.Aggregate,
          documentType: DocumentType.GoogleDoc,
        })
      },
      get imageBlock(): AggregateQueryBuilder<
        IImageBlock,
        IAggregateImageBlock
      > {
        return new AggregateQueryBuilder<IImageBlock, IAggregateImageBlock>({
          httpClient: httpClient,
          queryType: QueryType.Aggregate,
          documentType: DocumentType.ImageBlock,
        })
      },
      get audioFile(): AggregateQueryBuilder<IAudioFile, IAggregateAudioFile> {
        return new AggregateQueryBuilder<IAudioFile, IAggregateAudioFile>({
          httpClient: httpClient,
          queryType: QueryType.Aggregate,
          documentType: DocumentType.AudioFile,
        })
      },
      get textBlock(): AggregateQueryBuilder<ITextBlock, IAggregateTextBlock> {
        return new AggregateQueryBuilder<ITextBlock, IAggregateTextBlock>({
          httpClient: httpClient,
          queryType: QueryType.Aggregate,
          documentType: DocumentType.TextBlock,
        })
      },
      get googleCalendarEvent(): AggregateQueryBuilder<
        IGoogleCalendarEvent,
        IAggregateGoogleCalendarEvent
      > {
        return new AggregateQueryBuilder<
          IGoogleCalendarEvent,
          IAggregateGoogleCalendarEvent
        >({
          httpClient: httpClient,
          queryType: QueryType.Aggregate,
          documentType: DocumentType.GoogleCalendarEvent,
        })
      },
    }
  }
}
