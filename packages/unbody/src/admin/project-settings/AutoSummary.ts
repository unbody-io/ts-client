export class AutoSummary {
  static OpenAI = {
    GPT3_5Turbo: 'autosum-openai-gpt-3.5-turbo',
    GPT4o: 'autosum-openai-gpt-4o',
    GPT4oMini: 'autosum-openai-gpt-4o-mini',
    GPT4_1Nano: 'autosum-openai-gpt-4.1-nano',
    GPT4_1Mini: 'autosum-openai-gpt-4.1-mini',
    GPT4_1: 'autosum-openai-gpt-4.1',
  }

  static Cohere = {
    CommandR: 'autosum-cohere-command-r',
  }

  constructor(public name: string) {}

  toJSON = () => {
    return {
      name: this.name,
    }
  }

  static fromJSON = (data: any) => {
    if (!data?.name) {
      throw new Error('Invalid AutoSummary model')
    }

    return new AutoSummary(data.name)
  }
}
