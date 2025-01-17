import { AxiosInstance, AxiosResponse } from 'axios'
import { jsonToGraphQLQuery } from 'json-to-graphql-query'
import { UNBODY_API_BASE_URL, UNBODY_GRAPHQL_API_ENDPOINT } from '../constants'
import { deepMerge, HttpClient } from '../utils'
import {
  DocumentType,
  IAggregateAudioFile,
  IAggregateDiscordMessage,
  IAggregateGithubComment,
  IAggregateGithubThread,
  IAggregateGoogleCalendarEvent,
  IAggregateGoogleDoc,
  IAggregateImageBlock,
  IAggregateSpreadsheet,
  IAggregateSpreadsheetDocument,
  IAggregateSubtitleEntry,
  IAggregateSubtitleFile,
  IAggregateTextBlock,
  IAggregateTextDocument,
  IAudioFile,
  ICsvRow,
  IDiscordMessage,
  IGithubComment,
  IGithubThread,
  IGoogleCalendarEvent,
  IGoogleDoc,
  IImageBlock,
  ISpreadsheet,
  ISpreadsheetDocument,
  ISubtitleEntry,
  ISubtitleFile,
  ITextBlock,
  ITextDocument,
  IVideoFile,
} from './documents'
import { Generative } from './Generative'
import {
  AggregateQueryBuilder,
  GetQueryBuilder,
  QueryBuilder,
} from './query-builder'
import { QueryType } from './query-builder/enums'
import { IUnbodyOptions } from './query-builder/interfaces'
import { DEFAULT_TRANSFORMERS } from './transformer'

export * from './documents/interfaces'
export * from './documents/types'
export type {
  IGenerateImageMessage,
  IGenerateMessage,
  IGenerateMessageCommon,
  IGenerateTextMessage,
  IGenerateTextOptions,
  IGenerateTextRes,
  IGenerateTextResPayload,
} from './Generative'
export * from './query-builder/types/QueryResult.type'

export class Unbody {
  public httpClient: AxiosInstance
  public generate: Generative

  constructor({ apiKey, projectId, transformers, baseUrl }: IUnbodyOptions) {
    if (!apiKey) throw new Error('Unbody client: apiKey is required')
    if (!projectId) throw new Error('Unbody client: projectId is required')
    const httpClient = new HttpClient(
      baseUrl || UNBODY_API_BASE_URL,
      apiKey,
      projectId,
      deepMerge({}, DEFAULT_TRANSFORMERS, transformers || {}),
    )
    this.httpClient = httpClient.instance!
    this.generate = new Generative(httpClient)
  }

  async exec(
    ...documents: Partial<QueryBuilder<any, any>>[]
  ): Promise<AxiosResponse<Array<any>>> {
    const queries: {
      name: string
      __aliasFor: string
      query: any
    }[] = documents.reduce((result: any, currentValue, currentIndex) => {
      const query = currentValue.getJsonQuery!()
      const queryName = Object.keys(query)[0]

      return [
        ...result,
        {
          name: `q${currentIndex}`,
          __aliasFor: queryName,
          query: query[queryName],
        },
      ]
    }, [])

    const res = await this.httpClient.post(UNBODY_GRAPHQL_API_ENDPOINT, {
      query: jsonToGraphQLQuery({
        query: Object.fromEntries(
          queries.map((query) => [
            query.name,
            {
              __aliasFor: query.__aliasFor,
              ...query.query,
            },
          ]),
        ),
      }),
    })

    return {
      ...res,
      data: queries.map(({ name, __aliasFor, query }, index) => {
        const fakeRes = {
          ...res,
          data: {
            ...res.data,
            data: {
              [__aliasFor]: res.data.data[name],
            },
          },
        }

        const { data } = (documents[index] as any)._resolveResData(fakeRes)

        return data
      }),
    } as AxiosResponse<Array<unknown>>
  }

  get get() {
    const { httpClient } = this
    return {
      collection<T extends {} = any>(collection: string): GetQueryBuilder<T> {
        return new GetQueryBuilder<T>({
          httpClient: httpClient,
          queryType: QueryType.Get,
          documentType: collection as DocumentType,
        })
      },
      schema<T extends {} = any>(collection: string): GetQueryBuilder<T> {
        return new GetQueryBuilder<T>({
          httpClient: httpClient,
          queryType: QueryType.Get,
          documentType: collection as DocumentType,
        })
      },
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
      get discordMessage(): GetQueryBuilder<IDiscordMessage> {
        return new GetQueryBuilder<IDiscordMessage>({
          httpClient: httpClient,
          queryType: QueryType.Get,
          documentType: DocumentType.DiscordMessage,
        })
      },
      get csvRow(): GetQueryBuilder<ICsvRow> {
        return new GetQueryBuilder<ICsvRow>({
          httpClient: httpClient,
          queryType: QueryType.Get,
          documentType: DocumentType.CsvRow,
        })
      },
      get spreadsheet(): GetQueryBuilder<ISpreadsheet> {
        return new GetQueryBuilder<ISpreadsheet>({
          httpClient: httpClient,
          queryType: QueryType.Get,
          documentType: DocumentType.Spreadsheet,
        })
      },
      get spreadsheetDocument(): GetQueryBuilder<ISpreadsheetDocument> {
        return new GetQueryBuilder<ISpreadsheetDocument>({
          httpClient: httpClient,
          queryType: QueryType.Get,
          documentType: DocumentType.SpreadsheetDocument,
        })
      },
      get githubThread(): GetQueryBuilder<IGithubThread> {
        return new GetQueryBuilder<IGithubThread>({
          httpClient: httpClient,
          queryType: QueryType.Get,
          documentType: DocumentType.GithubThread,
        })
      },
      get githubComment(): GetQueryBuilder<IGithubComment> {
        return new GetQueryBuilder<IGithubComment>({
          httpClient: httpClient,
          queryType: QueryType.Get,
          documentType: DocumentType.GithubComment,
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
      get disocrdMessage(): AggregateQueryBuilder<
        IDiscordMessage,
        IAggregateDiscordMessage
      > {
        return new AggregateQueryBuilder<
          IDiscordMessage,
          IAggregateDiscordMessage
        >({
          httpClient: httpClient,
          queryType: QueryType.Aggregate,
          documentType: DocumentType.DiscordMessage,
        })
      },
      get csvRow(): AggregateQueryBuilder<ICsvRow, IAggregateDiscordMessage> {
        return new AggregateQueryBuilder<ICsvRow, IAggregateDiscordMessage>({
          httpClient: httpClient,
          queryType: QueryType.Aggregate,
          documentType: DocumentType.CsvRow,
        })
      },
      get spreadsheet(): AggregateQueryBuilder<
        ISpreadsheet,
        IAggregateSpreadsheet
      > {
        return new AggregateQueryBuilder<ISpreadsheet, IAggregateSpreadsheet>({
          httpClient: httpClient,
          queryType: QueryType.Aggregate,
          documentType: DocumentType.Spreadsheet,
        })
      },
      get spreadsheetDocument(): AggregateQueryBuilder<
        ISpreadsheetDocument,
        IAggregateSpreadsheetDocument
      > {
        return new AggregateQueryBuilder<
          ISpreadsheetDocument,
          IAggregateSpreadsheetDocument
        >({
          httpClient: httpClient,
          queryType: QueryType.Aggregate,
          documentType: DocumentType.SpreadsheetDocument,
        })
      },
      get githubComment(): AggregateQueryBuilder<
        IGithubComment,
        IAggregateGithubComment
      > {
        return new AggregateQueryBuilder<
          IGithubComment,
          IAggregateGithubComment
        >({
          httpClient: httpClient,
          queryType: QueryType.Aggregate,
          documentType: DocumentType.GithubComment,
        })
      },
      get githubThread(): AggregateQueryBuilder<
        IGithubThread,
        IAggregateGithubThread
      > {
        return new AggregateQueryBuilder<IGithubThread, IAggregateGithubThread>(
          {
            httpClient: httpClient,
            queryType: QueryType.Aggregate,
            documentType: DocumentType.GithubThread,
          },
        )
      },
    }
  }
}
