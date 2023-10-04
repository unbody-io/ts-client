import axios, { AxiosInstance } from 'axios'
import {
  ClassType,
  QueryResponseType,
  QueryType,
  UnbodyResponse,
} from '../types'
import { WhereOperandsClass } from '../utils'
import { Operation } from './Operation.class'
export class Unbody {
  public client: AxiosInstance
  public get: Operation
  public aggregate: Operation
  public Where = WhereOperandsClass

  static UNBODY_GRAPHQL_ENDPOINT = 'https://graphql.unbody.io'

  constructor(apiKey: string | undefined, projectId: string | undefined) {
    if (!apiKey) throw new Error('Unbody client: apiKey is required')
    if (!projectId) throw new Error('Unbody client: projectId is required')

    this.client = axios.create({
      baseURL: Unbody.UNBODY_GRAPHQL_ENDPOINT,
      headers: {
        Authorization: apiKey,
        'X-Project-id': projectId,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })

    this.get = new Operation(QueryType.Get, this)
    this.aggregate = new Operation(QueryType.Aggregate, this)
  }
  async request<T, OP extends QueryType, DT extends ClassType>(
    query: string,
    operation: OP,
    classType: DT,
  ): Promise<UnbodyResponse<T>> {
    try {
      const response = await this.client.post<QueryResponseType<T, OP, DT>>(
        '',
        { query },
      )
      const data = (response.data.data as Record<OP, Record<DT, T>>)[operation][
        classType
      ]
      return { data, error: null }
    } catch (error) {
      return { data: null, error: this.handleError(error) }
    }
  }
  handleError(error: any) {
    return error
  }
}
