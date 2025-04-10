const SERIALIZED = Symbol()

export const serializeComputedArg = (value: string | Function) => {
  if (typeof value === 'function' && (value as any)[SERIALIZED] === true) {
    return value()
  }

  const serialized = typeof value === 'string' ? value : value.toString()
  const matches = serialized.match(/^(\s|\n)*function[\s]*\(/)
  if (matches?.[0]) {
    return serialized.replace(matches[0], 'function evalArg(')
  }
  return serialized
}

export const deserializeComputedArg = (value: string | Function) => {
  if (typeof value === 'function') {
    return value
  }

  const func: Function & {
    [SERIALIZED]: boolean
  } = (() => {
    return value
  }) as any

  func[SERIALIZED] = true

  return func
}
