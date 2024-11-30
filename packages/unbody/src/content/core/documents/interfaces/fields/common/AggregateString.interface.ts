export interface IAggregateString {
  count: string
  topOccurrences: {
    occurs: number
    value: string
  }
  type: string
}
