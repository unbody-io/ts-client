export type IGenerateOptions = {
  model?: string
  topP?: number
  maxTokens?: number
  temperature?: number
  presencePenalty?: number
  frequencyPenalty?: number

  vars?: {
    name: string
    expression: string
    formatter: string
  }[]
}

export type IGenerateMessage = {
  content: string

  name?: string
  type?: 'text' | 'image'
  role?: 'user' | 'system' | 'assistant'
}

export type IGenerateSingleResultPrompt = {
  prompt: string
  options?: Omit<IGenerateOptions, 'vars'>
}

export type IGenerateSingleResultMessages = {
  messages: IGenerateMessage[]
  options?: IGenerateOptions
}

export type IGenerateGroupedResultTask<TDocumentType> = {
  task: string
  properties: Array<keyof TDocumentType>
  options?: Omit<IGenerateOptions, 'vars'>
}

export type IGenerateGroupedResultMessages = {
  messages: IGenerateMessage[]
  options?: IGenerateOptions
}

export interface IGenerate<TDocumentType> {
  singleResult?: IGenerateSingleResultPrompt
  groupedResult?: IGenerateGroupedResultTask<TDocumentType>
}
