export const isCollectionType = (name: string) =>
  /\b([A-Z][a-z]+)+\b/.test(name)
