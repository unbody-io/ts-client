import get from 'lodash/get'
import set from 'lodash/set'
import { DocumentType } from '../../documents'
import { ObjectPath } from '../types'

const documentTypes = Object.values(DocumentType) as string[]

export function objectPathToQueryAdapter<TDocumentType>(
  args: ObjectPath<TDocumentType>[],
) {
  const query = Object.create({})

  {
    const crefPaths: string[] = []

    args.forEach((path) => {
      const targetPath: string[] = []
      const pathArray = path.split('.')
      for (const field of pathArray) {
        if (documentTypes.includes(field)) {
          targetPath.push('__on')

          const crefPath = targetPath.join('.')
          if (!crefPaths.includes(crefPath)) crefPaths.push(crefPath)
        }

        targetPath.push(field)
      }

      set(query, targetPath, true)
    })
    ;[...crefPaths]
      .sort((a, b) => (a.length > b.length ? -1 : 1))
      .forEach((crefPath) => {
        set(
          query,
          crefPath,
          Object.entries(get(query, crefPath)).map(([key, value]) => ({
            __typeName: key,
            ...(value as object),
          })),
        )
      })
  }

  return query
}
