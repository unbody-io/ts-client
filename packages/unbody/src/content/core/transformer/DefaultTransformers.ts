import { AnyObject } from '../../types'

export const DEFAULT_TRANSFORMERS = {
  GoogleDoc: {
    mentions(data: string): AnyObject {
      return JSON.parse(data)
    },
    toc(data: string): AnyObject {
      return JSON.parse(data)
    },
  },
  TextBlock: {
    footnotes(data: string): AnyObject {
      return JSON.parse(data)
    },
  },
  TextDocument: {
    authors(data: string): AnyObject {
      return JSON.parse(data)
    },
    toc(data: string): AnyObject {
      return JSON.parse(data)
    },
  },
}
