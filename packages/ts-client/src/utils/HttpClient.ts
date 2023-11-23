import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { UNBODY_GRAPHQL_ENDPOINT } from '../constants'
import { Transformers } from '../core/transformer'
import { AnyObject } from '../types'

export class HttpClient {
  instance: AxiosInstance | undefined
  transformers: AnyObject

  constructor(
    apiKey: string | undefined,
    projectId: string | undefined,
    transformers: Transformers,
  ) {
    this.instance = axios.create({
      baseURL: UNBODY_GRAPHQL_ENDPOINT,
      headers: {
        Authorization: apiKey,
        'X-Project-id': projectId,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
    this.transformers = transformers
    this.initializeResponseInterceptor()
  }

  private initializeResponseInterceptor = () => {
    this.instance?.interceptors.response.use(
      this.handleResponse,
      this.handleError,
    )
  }

  private handleResponse = (res: AxiosResponse) => {
    if (res?.data?.errors?.length) return Promise.reject(res?.data.errors)
    this.mapTransformers(res.data.data)
    return res
  }

  private handleError = (error: any) => Promise.reject(error)

  private mapTransformers(data: AnyObject) {
    if (!data.Get) return
    Object.entries(data.Get).forEach(([documentKey, documents]) => {
      const documentsArray = documents as []
      documentsArray.forEach((document: AnyObject) => {
        Object.keys(document).forEach((field) => {
          if (!this.transformers[documentKey]?.[field]) return
          document[field] = this.transformers[documentKey][field](
            document[field],
          )
        })
      })
    })
  }
}
