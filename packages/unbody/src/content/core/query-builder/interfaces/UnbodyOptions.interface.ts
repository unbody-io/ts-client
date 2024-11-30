import { Transformers } from '../../transformer'

export interface IUnbodyOptions {
  apiKey: string
  projectId: string
  baseUrl?: string
  transformers?: Transformers
}
