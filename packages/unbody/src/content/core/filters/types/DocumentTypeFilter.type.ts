import { DeepPartial, DeepRequired } from 'utility-types'
import { HasArrayMember } from '../../../types'
import { StringArrayField } from '../../documents'
import { IBeacon } from '../../documents/interfaces/Beacon.interface'
import { WhereCompareOperator } from '../WhereCompareOperator'

type Decrement<N extends number> = [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10][N]
type Ignore<Depth> = Depth extends 0 ? true : false

export type DocumentFieldWhereOperatorType<T extends any> =
  T extends StringArrayField<any>
    ? WhereCompareOperator<string[] | string>
    : T extends { Beacon?: IBeacon[] }
    ? {
        [K in keyof T]: K extends 'Beacon'
          ? never
          : T[K] extends ArrayLike<any>
          ? DocumentFieldWhereOperatorType<T[K][number]>
          : DocumentFieldWhereOperatorType<T[K]>
      }
    : WhereCompareOperator<T>

export type DocumentFieldFilterType<
  T extends any,
  Depth extends number,
> = HasArrayMember<T> extends true
  ? T extends ArrayLike<any>
    ? T extends StringArrayField<any>
      ? string
      : DocumentFilterType<T[number], false, Decrement<Depth>>
    : Extract<T, Array<any>>[number]
  : T extends Record<string, any>
  ? T extends { Beacon?: IBeacon[] }
    ? {
        [K in keyof T]: K extends 'Beacon'
          ? never
          : T[K] extends ArrayLike<any>
          ? DocumentFilterType<T[K][number], true, Decrement<Depth>>
          : DocumentFilterType<T[K], true, Decrement<Depth>>
      }
    : DocumentFilterType<T, false, Decrement<Depth>>
  : T

export type _DocumentFilterType<
  T extends Record<string, any>,
  R extends boolean = false,
  Depth extends number = 5,
> = Ignore<Decrement<Depth>> extends true
  ? never
  : DeepPartial<
      (R extends true
        ? {
            id?: string | DocumentFieldWhereOperatorType<string | string[]>
          }
        : {}) & {
        [K in keyof T]:
          | DocumentFieldFilterType<T[K], Depth>
          | DocumentFieldWhereOperatorType<T[K]>
      }
    >

export type DocumentFilterType<
  T extends Record<string, any>,
  R extends boolean = false,
  Depth extends number = 5,
> = _DocumentFilterType<DeepRequired<T>, R, Depth>
