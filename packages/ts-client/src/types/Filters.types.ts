interface NearObjectInpObj {
    beacon?: string
    certainty?: number
    distance?: number
    id?: string
}

interface Txt2VecC11yMoveToMovementObjectsInpObj {
    id?: string
    beacon?: string
}

interface Txt2VecC11yMoveTo {
    concepts?: string[]
    objects?: Txt2VecC11yMoveToMovementObjectsInpObj[]
    force?: number
}

interface Txt2VecC11yMoveAwayFromMovementObjectsInpObj {
    id?: string
    beacon?: string
}

interface Txt2VecC11yMoveAwayFrom {
    concepts?: string[]
    objects?: Txt2VecC11yMoveAwayFromMovementObjectsInpObj[]
    force?: number
}

export interface Txt2VecC11yNearTextInpObj {
    moveTo?: Txt2VecC11yMoveTo
    certainty?: number
    distance?: number
    moveAwayFrom?: Txt2VecC11yMoveAwayFrom
    concepts?: string[]
}

interface NearVectorInpObj {
    distance?: number
    vector?: number[]
    certainty?: number
}

interface QnATransformersAskInpObj {
    question: string
    properties?: string[]
}

export interface Args {
    nearObject?: NearObjectInpObj
    nearText?: Txt2VecC11yNearTextInpObj
    ask?: QnATransformersAskInpObj
    offset?: number
    limit?: number
    nearVector?: NearVectorInpObj
}

enum GroupInpObjTypeEnum {
    closest = 'closest',
    merge = 'merge',
}

export interface GroupInpObj {
    force: number
    type: GroupInpObjTypeEnum
}

export interface HybridInpObj {
    query: string
    alpha: number
    vector: number[]
}

interface WhereGeoRangeGeoCoordinatesInpObj {
    latitude: number
    longitude: number
}

interface WhereGeoRangeDistanceInpObj {
    max: number
}

export interface WhereGeoRangeInpObj {
    geoCoordinates: WhereGeoRangeGeoCoordinatesInpObj
    distance: WhereGeoRangeDistanceInpObj
}

export enum WhereOperatorEnum {
    GreaterThanEqual = 'GreaterThanEqual',
    WithinGeoRange = 'WithinGeoRange',
    IsNull = 'IsNull',
    And = 'And',
    Like = 'Like',
    Not = 'Not',
    NotEqual = 'NotEqual',
    GreaterThan = 'GreaterThan',
    LessThan = 'LessThan',
    LessThanEqual = 'LessThanEqual',
    Or = 'Or',
    Equal = 'Equal',
}

export interface WhereOperandsInpObj {
    operator?: WhereOperatorEnum
    path: string[] | string
    operands?: WhereOperandsInpObj[]
    nearObject?: NearObjectInpObj
    valueGeoRange?: WhereGeoRangeInpObj
    valueNumber?: number
    valueBoolean?: boolean
    valueString?: string
    valueText?: string
    valueDate?: string
    valueInt?: number
}

export enum ObjTypeEnum {
    asc = 'asc',
    desc = 'desc',
}

export interface Bm25InpObj {
    properties?: string[]
    query: string
}

export interface AskInpObj {
    question: string
    properties?: string[]
}

export interface SortInpObj {
    path: string[]
    order: string
}

export interface WhereInpObj {
    path?: string[] | string
    valueInt?: number
    valueNumber?: number
    valueGeoRange?: WhereGeoRangeInpObj
    operator?: WhereOperatorEnum
    operands?: WhereOperandsInpObj[]
    valueBoolean?: boolean
    valuestring?: string
    valueDate?: string
    valueText?: string
    valueString?: string
}
export interface Filters {
    where?: WhereInpObj
    bm25?: Bm25InpObj
    ask?: AskInpObj
    sort?: ObjTypeEnum[]

    nearText?: Txt2VecC11yNearTextInpObj
    nearVector?: NearVectorInpObj
    nearObject?: NearObjectInpObj

    offset?: number
    limit?: number

    group?: GroupInpObj
    hybrid?: HybridInpObj
}
