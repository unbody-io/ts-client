import { DeepPartial } from '../../../types'
import { AdditionalProps } from '../../documents'
import { IBeacon } from '../../documents/interfaces/Beacon.interface'

export type ResponseError = {
  locations: {
    column: string
    line: string
  }[]
  message: string
  path: any
}

type ExcludeBeacon<T extends { Beacon?: IBeacon }> = {
  [K in keyof T]: K extends 'Beacon' ? never : T[K]
}

export type GetQueryDocumentPayload<T> = {
  [K in keyof T]: T[K] extends Record<string, any>
    ? T[K] extends { Beacon?: IBeacon }
      ? {
          [P in keyof ExcludeBeacon<T[K]>]: ExcludeBeacon<
            T[K]
          >[P] extends ArrayLike<any>
            ? GetQueryDocumentPayload<ExcludeBeacon<T[K]>[P][number]>
            : ExcludeBeacon<T[K]>[P]
        }[keyof T[K]][]
      : T[K]
    : T[K]
}

export type GetQueryResult<TDocumentType> = {
  data: any
  payload: (GetQueryDocumentPayload<TDocumentType> & {
    _additional?: DeepPartial<AdditionalProps>
  })[]
  errors?: ResponseError[]
}

export type GetQueryGenerativeSingleResult<Q extends GetQueryResult<any>> =
  Q & {
    generate: {
      result: string
      from: Q['payload'][number]
    }[]
  }

export type GetQueryGenerativeGroupedResult<Q extends GetQueryResult<any>> =
  Q & {
    generate: {
      result: string
      from: Q['payload']
    }
  }
