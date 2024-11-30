import { DeepPartial } from 'utility-types'
import { DEFAULT_TRANSFORMERS } from './DefaultTransformers'

export type Transformers = DeepPartial<typeof DEFAULT_TRANSFORMERS>
