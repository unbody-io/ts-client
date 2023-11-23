export interface IGenerate {
  singleResult?: {
    prompt: string
  }
  groupedResult?: {
    task: string
    properties: string[]
  }
}
