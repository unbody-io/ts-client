import { AnyObject } from '../../types'
import { IBm25, IHybrid, INearText } from '../filters'
import { QueryBuilder } from './QueryBuilder'

export class SearchQuery<T extends AnyObject, R, Q extends QueryBuilder<T, R>> {
  constructor(private queryBuilder: Q) {}

  about(concept: string | string[], options?: Omit<INearText, 'concepts'>): Q {
    this.queryBuilder.nearText({
      concepts: Array.isArray(concept) ? concept : [concept],
      ...(options || {}),
    })

    return this.queryBuilder
  }

  find(query: string, properties?: IBm25<T>['properties']): Q {
    this.queryBuilder.bm25(query, properties)

    return this.queryBuilder
  }

  hybrid(query: string, options?: Omit<IHybrid<T>, 'query'>): Q {
    this.queryBuilder.hybrid({
      query,
      ...(options || {}),
    })

    return this.queryBuilder
  }
}
