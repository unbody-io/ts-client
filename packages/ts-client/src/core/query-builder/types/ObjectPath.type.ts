type Decrement<N extends number> = [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10][N]
type Ignore<K, Depth> = Depth extends 0 ? true : false
type PathImpl<T, K extends keyof T, Depth extends number> = K extends string
  ? T[K] extends Record<string, any>
    ? T[K] extends ArrayLike<any>
      ? K | `${K}.${PathImpl<T[K], number & keyof T[K], Decrement<Depth>>}`
      :
          | K
          | `${K}${Ignore<K, Decrement<Depth>> extends true
              ? ''
              : `.${PathImpl<T[K], keyof T[K], Decrement<Depth>>}`}`
    : K
  : never

export type ObjectPath<T> = PathImpl<T, keyof T, 5>
