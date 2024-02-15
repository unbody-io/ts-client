export interface IGenerate<TDocumentType> {
  singleResult?: {
    prompt: string
  }
  groupedResult?: {
    task: string
    properties: Array<keyof TDocumentType>
  }
}
