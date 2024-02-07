import { IBm25, IHybrid, INearText } from '../filters'
import { QueryBuilder } from './QueryBuilder'
import { SearchOperatorMethods } from './types/QueryMethods.type'

export class SearchQuery<T, Q extends QueryBuilder<T>> {
  constructor(private queryBuilder: Q) {}

  about(
    concept: string | string[],
    options?: Omit<INearText, 'concepts'>,
  ): Omit<Q, SearchOperatorMethods> {
    this.queryBuilder.nearText({
      concepts: Array.isArray(concept) ? concept : [concept],
      ...(options || {}),
    })

    return this.queryBuilder
  }

  find(
    query: string,
    properties?: IBm25<T>['properties'],
  ): Omit<Q, SearchOperatorMethods> {
    this.queryBuilder.bm25(query, properties)

    return this.queryBuilder
  }

  hybrid(
    query: string,
    options?: Omit<IHybrid<T>, 'query'>,
  ): Omit<Q, SearchOperatorMethods> {
    this.queryBuilder.hybrid({
      query,
      ...(options || {}),
    })

    return this.queryBuilder
  }
}
