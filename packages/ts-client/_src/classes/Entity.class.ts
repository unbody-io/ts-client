import {
  ClassType,
  Filters,
  QueryType,
  Txt2VecC11yNearTextInpObj,
  WhereInpObj,
} from '../types'
import { createQueryGenerator } from '../utils'
import { UnbodyClient } from './Client.class'

export class Entity<T> {
  protected args: Filters = {}
  protected fields: string[] = []
  constructor(
    private classType: ClassType,
    private operation: QueryType,
    private client: UnbodyClient,
  ) {}

  where(args: WhereInpObj) {
    this.args.where = args
    return this
  }

  nearText(args: Txt2VecC11yNearTextInpObj) {
    this.args.nearText = args
    return this
  }

  select(...args: string[]) {
    this.fields = args
    return this
  }

  limit(limit: number) {
    this.args.limit = limit
    return this
  }

  async exec() {
    const queryFn = createQueryGenerator(this.classType, this.operation)
    const query = queryFn(this.args)(this.fields.join(','))
    return this.client.request<T, QueryType, ClassType>(
      query,
      this.operation,
      this.classType,
    )
  }
}
