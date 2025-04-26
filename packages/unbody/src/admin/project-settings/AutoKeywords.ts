export class AutoKeywords {
  static OpenAI = {
    GPT3_5Turbo: 'autokeywords-openai-gpt-3.5-turbo',
    GPT4o: 'autokeywords-openai-gpt-4o',
    GPT4oMini: 'autokeywords-openai-gpt-4o-mini',
    GPT4_1Nano: 'autokeywords-openai-gpt-4.1-nano',
    GPT4_1Mini: 'autokeywords-openai-gpt-4.1-mini',
    GPT4_1: 'autokeywords-openai-gpt-4.1',
  }

  constructor(public name: string) {}

  toJSON = () => {
    return {
      name: this.name,
    }
  }

  static fromJSON = (data: any) => {
    if (!data?.name) {
      throw new Error('Invalid AutoKeywords model')
    }

    return new AutoKeywords(data.name)
  }
}
