import { HttpClient } from '../utils'
import { AxiosInstance } from 'axios'
import { IUnbodyOptions } from './UnbodyOptions.interface'

export class Unbody {
  public httpClient: AxiosInstance

  constructor({ apiKey, projectId }: IUnbodyOptions) {
    if (!apiKey) throw new Error('Unbody client: apiKey is required')
    if (!projectId) throw new Error('Unbody client: projectId is required')
    const httpClient = new HttpClient(apiKey, projectId)
    this.httpClient = httpClient.instance
  }
}
