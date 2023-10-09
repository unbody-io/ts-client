import { Filters, QueryGenerator, QueryType, WhereOperatorEnum } from '../types'

export const operators = Object.values(WhereOperatorEnum)
export const parseFilterArgs = (args: Filters = {}): string => {
  const parse = (obj: any): string | number => {
    switch (typeof obj) {
      case 'number':
        return obj
      case 'string':
        return operators.includes(obj as WhereOperatorEnum)
          ? obj
          : JSON.stringify(obj)
      case 'object':
        if (Array.isArray(obj)) {
          return `[${obj.map(parse).join(',')}]`
        } else {
          return `{${Object.entries(obj)
            .map(([key, val]) => `${key}:${parse(val)}`)
            .join(',')}}`
        }
      default:
        return JSON.stringify(obj)
    }
  }

  // remove the first and last curly braces
  const parsedArgs = parse(args)
  return typeof parsedArgs === 'string'
    ? parsedArgs.slice(1, -1)
    : String(parsedArgs)
}

export const createQuery = (
  typeName: string,
  args: Filters,
  fields: string,
): string => {
  if (Object.keys(args).length === 0) return `${typeName}{ ${fields} }`
  return `${typeName}(${parseFilterArgs(args)}){ ${fields} }`
}

// Now supporting both 'Get' and 'Aggregate' types
export const GetQuery = (q: string) => `query { Get{ ${q} } }`
export const AggregateQuery = (q: string) => `query { Aggregate{ ${q} } }`

// Create a function that takes a type (Get or Aggregate) and generates a function for creating a query
export const createQueryGenerator = (
  typeName: string,
  queryType: QueryType,
): QueryGenerator => {
  return (args: Filters) => (q: string) => {
    const baseQuery = createQuery(typeName, args, q)
    return queryType === 'Get' ? GetQuery(baseQuery) : AggregateQuery(baseQuery)
  }
}

// Now supporting both 'Get' and 'Aggregate' types for each document type
export const GetGoogleDocQuery = createQueryGenerator(
  'GoogleDoc',
  QueryType.Get,
)
export const GetTextBlockQuery = createQueryGenerator(
  'TextBlock',
  QueryType.Get,
)
export const GetImageBlockQuery = createQueryGenerator(
  'ImageBlock',
  QueryType.Get,
)

export const AggregateGoogleDocQuery = createQueryGenerator(
  'GoogleDoc',
  QueryType.Aggregate,
)
export const AggregateTextBlockQuery = createQueryGenerator(
  'TextBlock',
  QueryType.Aggregate,
)
export const AggregateImageBlockQuery = createQueryGenerator(
  'ImageBlock',
  QueryType.Aggregate,
)
