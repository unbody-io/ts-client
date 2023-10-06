import { DocumentType } from '../enums'
import { AdditionalProps } from './AdditionalProps.interface'

export interface IDocument {
  _additional: AdditionalProps
  __typename: DocumentType
}
