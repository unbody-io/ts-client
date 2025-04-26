import { EnhancerArgs } from '../Enhancement.types'
import { Enhancer } from '../Enhancer'

export type TextGeneratorEnhancerArgs = {
  model:
    | 'gpt-4o'
    | 'gpt-4o-mini'
    | 'gpt-4'
    | 'gpt-4-turbo'
    | 'gpt-4.1-nano'
    | 'gpt-4.1-mini'
    | 'gpt-4.1'
    | 'openai-gpt-4o'
    | 'openai-gpt-4o-mini'
    | 'openai-gpt-4'
    | 'openai-gpt-4-turbo'
    | 'openai-gpt-4.1-nano'
    | 'openai-gpt-4.1-mini'
    | 'openai-gpt-4.1'
    | 'cohere-command'
    | 'cohere-command-r'
    | 'cohere-command-r-plus'
    | 'command'
    | 'command-r'
    | 'command-r-plus'
    | 'open-mistral-7b'
    | 'open-mixtral-8x7b'

  prompt: string

  temperature?: number
  maxTokens?: number
  topP?: number
  frequencyPenalty?: number
  presencePenalty?: number
}

export type TextGeneratorEnhancerResult = {
  content: string
}

export class TextGeneratorEnhancer extends Enhancer<
  TextGeneratorEnhancerArgs,
  TextGeneratorEnhancerResult,
  {}
> {
  name = 'enh-actions/text-generator'

  constructor(args: EnhancerArgs<TextGeneratorEnhancerArgs>) {
    super(args)
  }
}
