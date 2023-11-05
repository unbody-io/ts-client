import { IAsk } from './Ask.interface'

export interface IAggregateAsk<TDocumentType> extends IAsk<TDocumentType> {
  objectLimit: number
}
