import { AxiosResponse } from 'axios'
import omit from 'lodash/omit'
import { UNBODY_GENERATIVE_API_ENDPOINT } from '../constants'
import { HttpClient } from '../utils'

export type IGenerateTextOptions = {
  model?: string
  topP?: number
  maxTokens?: number
  temperature?: number
  presencePenalty?: number
  frequencyPenalty?: number
}

export type IGenerateJsonOptions = IGenerateTextOptions & {
  schema?: any
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

export type IGenerateTextRes = AxiosResponse<{
  data: ChatCompletionApiRes
  payload: IGenerateTextResPayload
}>

export type IGenerateJsonRes<T = Record<string, any>> = AxiosResponse<{
  data: ChatCompletionApiRes<T>
  payload: IGenerateTextResPayload<T>
}>

export class Generative {
  constructor(public httpClient: HttpClient) {}

  public async text(
    prompt: string,
    options?: IGenerateTextOptions,
  ): Promise<IGenerateTextRes>
  public async text(
    messages: IGenerateMessage[],
    options?: IGenerateTextOptions,
  ): Promise<IGenerateTextRes>
  public async text(
    prompt: string | IGenerateMessage[],
    options?: IGenerateTextOptions,
  ): Promise<IGenerateTextRes> {
    const messages = typeof prompt === 'string' ? [{ content: prompt }] : prompt
    const res = await this.httpClient.instance!.request<ChatCompletionApiRes>({
      method: 'POST',
      url: `${UNBODY_GENERATIVE_API_ENDPOINT}chat/completions`,
      data: {
        ...(options?.model ? { model: options.model } : {}),
        messages,
        data: [],
        vars: [],
        params: omit(options || {}, 'model'),
      },
    })

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
  }

  public async json<T = Record<string, any>>(
    prompt: string,
    options?: IGenerateJsonOptions,
  ): Promise<IGenerateJsonRes<T>>
  public async json<T = Record<string, any>>(
    messages: IGenerateMessage[],
    options?: IGenerateJsonOptions,
  ): Promise<IGenerateJsonRes<T>>
  public async json<T = Record<string, any>>(
    prompt: string | IGenerateMessage[],
    options?: IGenerateJsonOptions,
  ): Promise<IGenerateJsonRes<T>> {
    const messages = typeof prompt === 'string' ? [{ content: prompt }] : prompt

    const res = await this.httpClient.instance!.request<
      ChatCompletionApiRes<T>
    >({
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
          ...(options?.schema
            ? {
                schema: options.schema,
              }
            : {}),
        },
      },
    })

    const {
      data: { content, finishReason, usageMetadata },
    } = res.data

    return {
      ...res,
      data: {
        data: res.data,
        payload: {
          content: content,
          metadata: {
            finishReason,
            usage: usageMetadata,
          },
        },
      },
    }
  }
}
