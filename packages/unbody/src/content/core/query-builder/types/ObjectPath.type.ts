import { HasArrayMember } from '../../../types'

type Decrement<N extends number> = [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10][N]
type Ignore<K, Depth> = Depth extends 0 ? true : false
type Includes<T, U> = Extract<T, U> extends never ? false : true

type PathImplArray<
  T,
  K extends keyof T,
  Depth extends number,
> = K extends string
  ? T[K] extends ArrayLike<any>
    ? T[K][number] extends Record<string, any>
      ? `${K}${Ignore<K, Decrement<Depth>> extends true
          ? ''
          : `.${PathImpl<T[K][number], keyof T[K][number], Decrement<Depth>>}`}`
      : K
    : K
  : never

type PathImpl<T, K extends keyof T, Depth extends number> = K extends string
  ? T[K] extends string
    ? K
    : HasArrayMember<T[K]> extends true
    ? PathImplArray<T, K, Depth>
    : T[K] extends Record<string, any>
    ? Includes<T[K], Date> extends true
      ? K
      : `${K}${Ignore<K, Decrement<Depth>> extends true
          ? ''
          : `.${PathImpl<T[K], keyof T[K], Decrement<Depth>>}`}`
    : K
  : never

export type ObjectPath<T> = PathImpl<T, keyof T, 5>
