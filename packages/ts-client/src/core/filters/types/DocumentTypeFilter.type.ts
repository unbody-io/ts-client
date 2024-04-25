import { StringArrayField } from 'src/core/documents'
import { DeepPartial, HasArrayMember } from 'src/types'
import { WhereCompareOperator } from '../WhereCompareOperator'
import { IBeacon } from 'src/core/documents/interfaces/Beacon.interface'

export type DocumentFieldWhereOperatorType<T extends any> =
  T extends StringArrayField<any>
    ? WhereCompareOperator<string[] | string>
    : T extends { Beacon?: IBeacon }
    ? {
        [K in keyof T]: K extends 'Beacon'
          ? never
          : T[K] extends ArrayLike<any>
          ? DocumentFieldWhereOperatorType<T[K][number]>
          : DocumentFieldWhereOperatorType<T[K]>
      }
    : WhereCompareOperator<T>

export type DocumentFieldFilterType<T extends any> =
  HasArrayMember<T> extends true
    ? T extends ArrayLike<any>
      ? T extends StringArrayField<any>
        ? string
        : DocumentFilterType<T[number]>
      : Extract<T, Array<any>>[number]
    : T extends Record<string, any>
    ? T extends { Beacon?: IBeacon }
      ? {
          [K in keyof T]: K extends 'Beacon'
            ? never
            : T[K] extends ArrayLike<any>
            ? DocumentFilterType<T[K][number], true>
            : DocumentFilterType<T[K], true>
        }
      : DocumentFilterType<T>
    : T

export type DocumentFilterType<
  T extends Record<string, any>,
  R extends boolean = false,
> = DeepPartial<
  (R extends true
    ? {
        id?: string | DocumentFieldWhereOperatorType<string | string[]>
      }
    : {}) & {
    [K in keyof T]:
      | DocumentFieldFilterType<T[K]>
      | DocumentFieldWhereOperatorType<T[K]>
  }
>
