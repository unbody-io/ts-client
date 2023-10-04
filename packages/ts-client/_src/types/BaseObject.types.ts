import { AdditionalProps } from './AdditionalProps.types'
import { UnbodyDocumentTypeNames } from './UnbodyDocumentTypeNames.types'

export interface BaseObject {
  _additional: AdditionalProps
  __typename: UnbodyDocumentTypeNames
}

export interface BaseObjectWithRef<T> extends BaseObject {
  document: Array<T>
}
