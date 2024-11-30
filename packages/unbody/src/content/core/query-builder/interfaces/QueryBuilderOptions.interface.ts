import { AxiosInstance } from 'axios'
import { QueryType } from '../enums'
import { DocumentType } from '../../documents'

export interface QueryBuilderOptions {
  httpClient: AxiosInstance
  queryType: QueryType
  documentType: DocumentType
}
