export interface IAsk<TDocumentType> {
  question: string
  properties?: Array<keyof TDocumentType>
}
