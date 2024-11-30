export interface IBm25<TDocumentType> {
  properties?: Array<keyof TDocumentType>
  query: string
}
