import { DEFAULT_TRANSFORMERS } from './DefaultTransformers'
import { DeepPartial } from '../../types'

export type Transformers = DeepPartial<typeof DEFAULT_TRANSFORMERS>
