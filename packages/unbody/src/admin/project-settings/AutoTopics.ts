export class AutoTopics {
  static OpenAI = {
    GPT3_5Turbo: 'autotopics-openai-gpt-3.5-turbo',
    GPT4o: 'autotopics-openai-gpt-4o',
    GPT4oMini: 'autotopics-openai-gpt-4o-mini',
    GPT4_1Nano: 'autotopics-openai-gpt-4.1-nano',
    GPT4_1Mini: 'autotopics-openai-gpt-4.1-mini',
    GPT4_1: 'autotopics-openai-gpt-4.1',
  }

  constructor(public name: string) {}

  toJSON = () => {
    return {
      name: this.name,
    }
  }

  static fromJSON = (data: any) => {
    if (!data?.name) {
      throw new Error('Invalid AutoTopics model')
    }

    return new AutoTopics(data.name)
  }
}
