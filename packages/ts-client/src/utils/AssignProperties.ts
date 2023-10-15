export function assignProperties(
  props: { [s: string]: any } | ArrayLike<unknown>,
  target: any,
) {
  const descriptors = Object.fromEntries(
    Object.entries(props).map(([key, value]) => [
      key,
      {
        value,
        enumerable: true,
      },
    ]),
  )
  Object.defineProperties(target, descriptors)
}
