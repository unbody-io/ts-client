import { INearObject, INearText } from '../filters'
import { INearImage } from '../filters/interfaces/NearImage.interface'
import { QueryBuilder } from './QueryBuilder'
import { SearchOperatorMethods } from './types/QueryMethods.type'

export class SimilarQuery<T, R, Q extends QueryBuilder<T, R>> {
  constructor(private queryBuilder: Q) {}

  text(
    concept: string | string[],
    options?: Omit<INearText, 'concepts'>,
  ): Omit<Q, SearchOperatorMethods> {
    this.queryBuilder.nearText({
      concepts: Array.isArray(concept) ? concept : [concept],
      ...(options || {}),
    })

    return this.queryBuilder
  }

  image(
    image: string,
    options?: Omit<INearImage, 'image'>,
  ): Omit<Q, SearchOperatorMethods> {
    this.queryBuilder.nearImage({
      image,
      ...(options || {}),
    })

    return this.queryBuilder
  }

  record(
    id: INearObject['id'],
    options?: Omit<INearObject, 'id'>,
  ): Omit<Q, SearchOperatorMethods> {
    this.queryBuilder.nearObject({
      id,
      ...(options || {}),
    })

    return this.queryBuilder
  }
}
