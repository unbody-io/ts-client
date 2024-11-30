export type HasArrayMember<T> = (
  T extends any ? ([T] extends [any[]] ? true : never) : never
) extends never
  ? false
  : true
