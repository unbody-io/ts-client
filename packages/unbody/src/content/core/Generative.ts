import { AxiosRequestConfig, AxiosResponse, isAxiosError } from 'axios'
import { EventIterator } from 'event-iterator'
import omit from 'lodash/omit'
import type { ReadableStream } from 'node:stream/web'
import type { infer as ZodInfer, ZodObject } from 'zod'
import { zodToJsonSchema } from 'zod-to-json-schema'
import { UNBODY_GENERATIVE_API_ENDPOINT } from '../constants'
import { HttpClient } from '../utils'
import { isBrowserEnvironment } from '../utils/Environment'

export type IGenerateTextOptions = {
  model?: string
  topP?: number
  maxTokens?: number
  temperature?: number
  presencePenalty?: number
  frequencyPenalty?: number
  stream?: false
}

export type IGenerateTextOptionsStream = Omit<
  IGenerateTextOptions,
  'stream'
> & {
  stream: true
}

export type IGenerateJsonOptions<T = any> = IGenerateTextOptions & {
  schema?: T
  stream?: false
}

export type IGenerateJsonOptionsStream<T = any> = Omit<
  IGenerateJsonOptions<T>,
  'stream'
> & {
  stream: true
}

export type IGenerateMessageCommon = {
  name?: string
  role?: 'user' | 'system' | 'assistant'
}

export type IGenerateTextMessage = {
  type?: 'text'
  content: string
} & IGenerateMessageCommon

export type IGenerateImageMessage = {
  type: 'image'
  content: {
    url: string
  }
}

export type IGenerateMessage = IGenerateTextMessage | IGenerateImageMessage

export type IGenerateTextResPayload<T = string> = {
  content: T
  metadata: {
    finishReason: string
    usage: {
      inputTokens: number
      outputTokens: number
      totalTokens: number
    }
  }
}

type ChatCompletionApiRes<T = string> = {
  statusCode: number
  message: string
  data: {
    content: T
    usageMetadata: {
      inputTokens: number
      outputTokens: number
      totalTokens: number
    }
    finishReason: string
  }
}

type ChatCompletionApiResStream<T = string> =
  | {
      content: T
    }
  | {
      content: T
      finished: true
      usageMetadata: {
        inputTokens: number
        outputTokens: number
        totalTokens: number
      }
      finishReason: string
    }

export type IGenerateTextRes = AxiosResponse<{
  data: ChatCompletionApiRes
  payload: IGenerateTextResPayload
}>

export type IGenerateJsonRes<T = Record<string, any>> = AxiosResponse<{
  data: ChatCompletionApiRes<T>
  payload: IGenerateTextResPayload<T>
}>

export type IGenerateResStreamPayload<T> =
  | {
      content: T
      finished: false
    }
  | {
      content: T
      finished: true
      metadata: {
        finishReason: string
        usage: {
          inputTokens: number
          outputTokens: number
          totalTokens: number
        }
      }
    }

export type IGenerateTextResStreamPayload<T = string> =
  IGenerateResStreamPayload<T>
export type IGenerateJsonResStreamPayload<T = Record<string, any>> =
  IGenerateResStreamPayload<T>

export type GenerativeResStream<T> = EventIterator<T>

export class Generative {
  constructor(public httpClient: HttpClient) {}

  public async text(
    prompt: string,
    options?: IGenerateTextOptions,
  ): Promise<IGenerateTextRes>
  public async text(
    prompt: string,
    options?: IGenerateTextOptionsStream,
  ): Promise<GenerativeResStream<IGenerateTextResStreamPayload>>
  public async text(
    messages: IGenerateMessage[],
    options?: IGenerateTextOptions,
  ): Promise<IGenerateTextRes>
  public async text(
    messages: IGenerateMessage[],
    options?: IGenerateTextOptionsStream,
  ): Promise<GenerativeResStream<IGenerateTextResStreamPayload>>
  public async text(
    prompt: string | IGenerateMessage[],
    options?: IGenerateTextOptions | IGenerateTextOptionsStream,
  ): Promise<
    IGenerateTextRes | GenerativeResStream<IGenerateTextResStreamPayload>
  > {
    const messages = typeof prompt === 'string' ? [{ content: prompt }] : prompt
    const requestConfig = {
      method: 'POST',
      url: `${UNBODY_GENERATIVE_API_ENDPOINT}chat/completions`,
      data: {
        ...(options?.model ? { model: options.model } : {}),
        messages,
        data: [],
        vars: [],
        params: omit(options || {}, 'model'),
      },
    } satisfies AxiosRequestConfig

    const text = () => {
      return this.httpClient
        .instance!.request<ChatCompletionApiRes>(requestConfig)
        .then((res) => {
          const {
            data: { content, finishReason, usageMetadata },
          } = res.data

          return {
            ...res,
            data: {
              data: res.data,
              payload: {
                content,
                metadata: {
                  finishReason,
                  usage: usageMetadata,
                },
              },
            },
          }
        })
    }

    if (options?.stream) {
      return this._stream<string>(requestConfig)
    }

    return text()
  }

  public async json<T extends ZodObject<any> = ZodObject<any>>(
    prompt: string,
    options?: IGenerateJsonOptions<T>,
  ): Promise<IGenerateJsonRes<ZodInfer<T>>>
  public async json<T extends ZodObject<any> = ZodObject<any>>(
    prompt: string,
    options?: IGenerateJsonOptionsStream<T>,
  ): Promise<GenerativeResStream<IGenerateJsonResStreamPayload<ZodInfer<T>>>>
  public async json<T = Record<string, any>>(
    prompt: string,
    options?: IGenerateJsonOptions,
  ): Promise<IGenerateJsonRes<T>>
  public async json<T = Record<string, any>>(
    prompt: string,
    options?: IGenerateJsonOptionsStream,
  ): Promise<GenerativeResStream<IGenerateJsonResStreamPayload<T>>>
  public async json<T extends ZodObject<any> = ZodObject<any>>(
    messages: IGenerateMessage[],
    options?: IGenerateJsonOptions<T>,
  ): Promise<IGenerateJsonRes<ZodInfer<T>>>
  public async json<T extends ZodObject<any> = ZodObject<any>>(
    messages: IGenerateMessage[],
    options?: IGenerateJsonOptionsStream<T>,
  ): Promise<GenerativeResStream<IGenerateJsonResStreamPayload<ZodInfer<T>>>>
  public async json<T = Record<string, any>>(
    messages: IGenerateMessage[],
    options?: IGenerateJsonOptions,
  ): Promise<IGenerateJsonRes<T>>
  public async json<T = Record<string, any>>(
    messages: IGenerateMessage[],
    options?: IGenerateJsonOptionsStream,
  ): Promise<GenerativeResStream<IGenerateJsonResStreamPayload<T>>>
  public async json<T>(
    prompt: string | IGenerateMessage[],
    options?:
      | IGenerateJsonOptions<T extends ZodObject<any> ? T : Record<string, any>>
      | IGenerateJsonOptionsStream<
          T extends ZodObject<any> ? T : Record<string, any>
        >,
  ): Promise<
    | IGenerateJsonRes<T extends ZodObject<any> ? ZodInfer<T> : T>
    | GenerativeResStream<
        IGenerateJsonResStreamPayload<
          T extends ZodObject<any> ? ZodInfer<T> : T
        >
      >
  > {
    const messages = typeof prompt === 'string' ? [{ content: prompt }] : prompt

    const schema = options?.schema
      ? options?.schema?._def?.typeName === 'ZodObject'
        ? zodToJsonSchema(options.schema as ZodObject<any>)
        : options.schema
      : undefined

    const requestConfig = {
      method: 'POST',
      url: `${UNBODY_GENERATIVE_API_ENDPOINT}chat/completions`,
      data: {
        ...(options?.model ? { model: options.model } : {}),
        messages,
        data: [],
        vars: [],
        params: omit(options || {}, 'model'),
        responseFormat: {
          type: options?.schema ? 'json_schema' : 'json_object',
          ...(schema
            ? {
                schema: schema,
              }
            : {}),
        },
      },
    } satisfies AxiosRequestConfig

    const json = async () => {
      const res = await this.httpClient.instance!.request<
        ChatCompletionApiRes<T>
      >(requestConfig)

      const {
        data: { content, finishReason, usageMetadata },
      } = res.data

      return {
        ...res,
        data: {
          data: res.data as any,
          payload: {
            content: content as any,
            metadata: {
              finishReason,
              usage: usageMetadata,
            },
          },
        },
      }
    }

    const stream = () =>
      this._stream<T extends ZodObject<any> ? ZodInfer<T> : T>(requestConfig)

    if (options?.stream) return stream()

    return json()
  }

  private _stream<T>(requestConfig: AxiosRequestConfig) {
    const isBrowser = isBrowserEnvironment()

    return this.httpClient
      .instance!.request({
        ...requestConfig,
        data: {
          ...requestConfig.data,
          stream: true,
        },
        responseType: 'stream',
        headers: {
          ...(requestConfig.headers || {}),
          Accept: 'text/event-stream',
        },
        ...(isBrowser
          ? {
              adapter: 'fetch',
            }
          : {}),
      })
      .then((res) => {
        const parser = this._jsonStreamParser()
        const stream = res.data

        if (isBrowser) {
          const reader = (stream as ReadableStream<Uint8Array>).getReader()
          return new EventIterator<IGenerateResStreamPayload<T>>(
            ({ push, stop, fail }) => {
              const read = async () => {
                try {
                  while (true) {
                    const { done, value } = await reader.read()
                    if (done) {
                      stop()
                      break
                    }
                    parser
                      .parse<ChatCompletionApiResStream<T>>(value.buffer)
                      .map(this._transformStreamData<T>)
                      .forEach(push)
                  }
                } catch (error) {
                  const err =
                    error instanceof Error
                      ? error
                      : new Error('Unknown error', { cause: error })
                  fail(err)
                }
              }

              read()
            },
          )
        }

        return new EventIterator<IGenerateResStreamPayload<T>>(
          ({ push, stop, fail }) => {
            stream
              .on('end', stop)
              .on('close', stop)
              .on('error', fail)
              .on('data', (chunk: any) =>
                parser
                  .parse<ChatCompletionApiResStream<T>>(chunk)
                  .map(this._transformStreamData<T>)
                  .forEach(push),
              )
          },
        )
      })
      .catch(async (err: any) => {
        const error = await new Promise((resolve) => {
          let data: string = ''
          if (isAxiosError(err) && err.response) {
            err.response.data.setEncoding('utf-8')
            err.response.data.on('data', (chunk: string) => {
              data += chunk
            })
            err.response.data.on('end', () => {
              if (data) {
                try {
                  const parsed = JSON.parse(data)
                  err.response!.data = parsed
                } catch (e) {
                  throw e
                }
              }
              resolve(err)
            })

            return
          }

          return resolve(err)
        })

        throw error
      })
  }

  private _transformStreamData<T = string>(
    data: ChatCompletionApiResStream<T>,
  ): IGenerateResStreamPayload<T> {
    if ('finished' in data && data.finished) {
      return {
        content: data.content,
        finished: true,
        metadata: {
          finishReason: data.finishReason,
          usage: {
            inputTokens: data.usageMetadata.inputTokens,
            outputTokens: data.usageMetadata.outputTokens,
            totalTokens: data.usageMetadata.totalTokens,
          },
        },
      }
    }

    return { content: data.content, finished: false }
  }

  private _jsonStreamParser() {
    const decoder = new TextDecoder('utf-8')

    let chunks: string[] = []

    return {
      parse: <T>(chunk: any) => {
        const value = decoder.decode(chunk, { stream: true })
        chunks.push(...value.split('\n'))

        const result: T[] = []
        let buffer: string = ''
        let lastIndex = 0

        for (let i = 0; i < chunks.length; i++) {
          const chunk = chunks[i]
          buffer += chunk

          try {
            const json = JSON.parse(buffer)
            result.push(json)
            buffer = ''
            lastIndex = i
          } catch (error) {
            if (!(error instanceof SyntaxError)) throw error
          }
        }

        if (lastIndex > 0) chunks = chunks.slice(lastIndex + 1)

        return result
      },
    }
  }
}
