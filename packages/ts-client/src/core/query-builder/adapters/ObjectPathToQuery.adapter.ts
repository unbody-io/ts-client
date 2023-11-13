import { ObjectPath } from '../types'
import { DocumentType } from '../../documents'

const documentTypes = Object.values(DocumentType) as string[]

export function objectPathToQueryAdapter<TDocumentType>(
  args: ObjectPath<TDocumentType>[],
) {
  const query = Object.create({})
  args.forEach((path) => {
    const pathArray = path.split('.')
    if (pathArray.length === 1) query[pathArray[0]] = true
    Object.assign(query, objectPathArrayToQuery(pathArray))
  })
  return query
}

function objectPathArrayToQuery(pathArray: string[]) {
  const subQuery = Object.create({})
  let parentKey: string = null
  pathArray.reduce((subQuery, key, currentIndex) => {
    if (!parentKey) subQuery[key] = true
    else if (documentTypes.includes(key)) {
      subQuery[parentKey] = {
        __on: {
          __typeName: key,
          ...objectPathArrayToQuery(
            pathArray.splice(++currentIndex, pathArray.length),
          ),
        },
      }
    } else subQuery[parentKey] = { [key]: true }
    parentKey = key
    return subQuery
  }, subQuery)
  return subQuery
}
