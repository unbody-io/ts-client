export function excludeProperty(prop: string, target: any) {
  Object.defineProperty(target, prop, { value: undefined })
}
