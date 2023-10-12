export function excludeProperty(prop: string, target: {}) {
  Object.defineProperty(target, prop, { value: undefined })
}
