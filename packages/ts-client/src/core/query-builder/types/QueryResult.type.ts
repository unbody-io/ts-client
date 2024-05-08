import { DeepPartial } from 'utility-types'
import { HasArrayMember } from '../../../types'
import { AdditionalProps, StringArrayField } from '../../documents'
import { IBeacon } from '../../documents/interfaces/Beacon.interface'

export type ResponseError = {
  locations: {
    column: string
    line: string
  }[]
  message: string
  path: any
}

type ExcludeBeacon<T extends { Beacon: IBeacon[] }> = {
  [P in keyof T]: P extends 'Beacon' ? never : T[P]
}

export type GetQueryDocumentPayload<T> = {
  [K in keyof T]: HasArrayMember<Required<T[K]>> extends true
    ? Required<T[K]> extends ArrayLike<any>
      ? Partial<T[K]>
      : Required<T[K]> extends StringArrayField<infer U>
      ? Array<U extends ArrayLike<infer UN> ? Partial<UN> : Partial<U>>
      : Required<T[K]>
    : Required<T[K]> extends Record<string, any>
    ? Required<T[K]> extends { Beacon: IBeacon[] }
      ? {
          [P in keyof ExcludeBeacon<Required<T[K]>>]: ExcludeBeacon<
            Required<T[K]>
          >[P] extends ArrayLike<any>
            ? GetQueryDocumentPayload<
                Required<ExcludeBeacon<Required<T[K]>>[P][number]>
              >
            : GetQueryDocumentPayload<
                Required<ExcludeBeacon<Required<T[K]>>[P]>
              >
        }[keyof ExcludeBeacon<Required<T[K]>>][]
      : Partial<T[K]>
    : Partial<T[K]>
}

export type GetQueryResult<TDocumentType> = {
  data: any
  payload: (Partial<GetQueryDocumentPayload<Required<TDocumentType>>> & {
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
