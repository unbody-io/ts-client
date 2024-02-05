import { AxiosInstance } from 'axios'
import { jsonToGraphQLQuery } from 'json-to-graphql-query'
import { HttpClient, deepMerge } from '../utils'
import {
  DocumentType,
  IAggregateAudioFile,
  IAggregateGoogleCalendarEvent,
  IAggregateGoogleDoc,
  IAggregateImageBlock,
  IAggregateSubtitleEntry,
  IAggregateSubtitleFile,
  IAggregateTextBlock,
  IAggregateTextDocument,
  IAudioFile,
  IGoogleCalendarEvent,
  IGoogleDoc,
  IImageBlock,
  ISubtitleEntry,
  ISubtitleFile,
  ITextBlock,
  ITextDocument,
  IVideoFile,
} from './documents'
import {
  AggregateQueryBuilder,
  GetQueryBuilder,
  QueryBuilder,
} from './query-builder'
import { QueryType } from './query-builder/enums'
import { IUnbodyOptions } from './query-builder/interfaces'
import { DEFAULT_TRANSFORMERS } from './transformer'

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
      get textDocument(): GetQueryBuilder<ITextDocument> {
        return new GetQueryBuilder<ITextDocument>({
          httpClient: httpClient,
          queryType: QueryType.Get,
          documentType: DocumentType.TextDocument,
        })
      },
      get imageBlock(): GetQueryBuilder<IImageBlock> {
        return new GetQueryBuilder<IImageBlock>({
          httpClient: httpClient,
          queryType: QueryType.Get,
          documentType: DocumentType.ImageBlock,
        })
      },
      get videoFile(): GetQueryBuilder<IVideoFile> {
        return new GetQueryBuilder<IVideoFile>({
          httpClient: httpClient,
          queryType: QueryType.Get,
          documentType: DocumentType.VideoFile,
        })
      },
      get audioFile(): GetQueryBuilder<IAudioFile> {
        return new GetQueryBuilder<IAudioFile>({
          httpClient: httpClient,
          queryType: QueryType.Get,
          documentType: DocumentType.AudioFile,
        })
      },
      get subtitleFile(): GetQueryBuilder<ISubtitleFile> {
        return new GetQueryBuilder<ISubtitleFile>({
          httpClient: httpClient,
          queryType: QueryType.Get,
          documentType: DocumentType.SubtitleFile,
        })
      },
      get subtitleEntry(): GetQueryBuilder<ISubtitleEntry> {
        return new GetQueryBuilder<ISubtitleEntry>({
          httpClient: httpClient,
          queryType: QueryType.Get,
          documentType: DocumentType.SubtitleEntry,
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
      get textDocument(): AggregateQueryBuilder<
        ITextDocument,
        IAggregateTextDocument
      > {
        return new AggregateQueryBuilder<ITextDocument, IAggregateTextDocument>(
          {
            httpClient: httpClient,
            queryType: QueryType.Aggregate,
            documentType: DocumentType.TextDocument,
          },
        )
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
      get subtitleFile(): AggregateQueryBuilder<
        ISubtitleFile,
        IAggregateSubtitleFile
      > {
        return new AggregateQueryBuilder<ISubtitleFile, IAggregateSubtitleFile>(
          {
            httpClient: httpClient,
            queryType: QueryType.Aggregate,
            documentType: DocumentType.SubtitleFile,
          },
        )
      },
      get subtitleEntry(): AggregateQueryBuilder<
        ISubtitleEntry,
        IAggregateSubtitleEntry
      > {
        return new AggregateQueryBuilder<
          ISubtitleEntry,
          IAggregateSubtitleEntry
        >({
          httpClient: httpClient,
          queryType: QueryType.Aggregate,
          documentType: DocumentType.SubtitleEntry,
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
