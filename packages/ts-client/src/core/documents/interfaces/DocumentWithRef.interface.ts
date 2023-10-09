import { IDocument } from './Document.interface'

export interface IDocumentWithRef<Type> extends IDocument {
  document: Array<Type>
}
