import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { UNBODY_GRAPHQL_ENDPOINT } from '../constants'

export class HttpClient {
  instance: AxiosInstance | undefined

  constructor(apiKey: string | undefined, projectId: string | undefined) {
    this.instance = axios.create({
      baseURL: UNBODY_GRAPHQL_ENDPOINT,
      headers: {
        Authorization: apiKey,
        'X-Project-id': projectId,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
    this.initializeResponseInterceptor()
  }

  private initializeResponseInterceptor = () => {
    this.instance?.interceptors.response.use(
      this.handleResponse,
      this.handleError,
    )
  }

  private handleResponse = ({ data }: AxiosResponse) => {
    if (data.errors.length) return Promise.reject(data.errors)
    return data.data
  }

  private handleError = (error: any) => Promise.reject(error)
}
