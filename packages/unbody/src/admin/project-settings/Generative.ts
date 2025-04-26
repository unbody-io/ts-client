export class Generative {
  static OpenAI = {
    GPT3_5Turbo: 'gpt-3.5-turbo',
    GPT4: 'gpt-4',
    GPT4Turbo: 'gpt-4-turbo',
    GPT4o: 'gpt-4o',
    GPT4oMini: 'gpt-4o-mini',
    GPT4_1Nano: 'gpt-4.1-nano',
    GPT4_1Mini: 'gpt-4.1-mini',
    GPT4_1: 'gpt-4.1',
    o1Mini: 'o1-mini',
    o1: 'o1',
    o3Mini: 'o3-mini',
    o3: 'o3',
    o4Mini: 'o4-mini',
  }

  static Cohere = {
    Command: 'command',
    CommandLight: 'command-light',
    CommandR: 'command-r',
    CommandRPlus: 'command-r-plus',
    CommandA: 'command-a',
  }

  static Mistral = {
    OpenMistral7b: 'open-mistral-7b',
    OpenMixtral8x7b: 'open-mixtral-8x7b',
  }

  public name = 'generative-unbody'
  public options: {
    model: string
  } = {} as any

  constructor(model: string) {
    this.options.model = model as any
  }

  toJSON = () => {
    return {
      name: this.name,
      options: {
        model: this.options.model,
      },
    }
  }

  static fromJSON = (data: any) => {
    if (!data?.options?.model) {
      throw new Error('Invalid Generative model')
    }

    return new Generative(data.options.model)
  }
}
