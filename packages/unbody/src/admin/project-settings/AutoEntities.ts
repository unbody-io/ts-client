export class AutoEntities {
  static OpenAI = {
    GPT3_5Turbo: 'autoentities-openai-gpt-3.5-turbo',
    GPT4o: 'autoentities-openai-gpt-4o',
    GPT4oMini: 'autoentities-openai-gpt-4o-mini',
    GPT4_1Nano: 'autoentities-openai-gpt-4.1-nano',
    GPT4_1Mini: 'autoentities-openai-gpt-4.1-mini',
    GPT4_1: 'autoentities-openai-gpt-4.1',
  }

  constructor(public name: string) {}

  toJSON = () => {
    return {
      name: this.name,
    }
  }

  static fromJSON = (data: any) => {
    if (!data?.name) {
      throw new Error('Invalid AutoEntities model')
    }

    return new AutoEntities(data.name)
  }
}
