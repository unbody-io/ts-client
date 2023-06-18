import {WhereGeoRangeInpObj, WhereOperandsInpObj, WhereOperatorEnum} from "../types";

export class WhereOperandsClass {
    static EQUAL(path: string[] | string, value: string | number | boolean) {
        return {
            operator: WhereOperatorEnum.Equal,
            path: path,
            ...(typeof value === "string" ? {valueString: value} : {}),
            ...(typeof value === "number" ? {valueNumber: value} : {}),
            ...(typeof value === "boolean" ? {valueBoolean: value} : {}),
        }
    }

    static LESS_THAN(path: string[] | string, value: number) {
        return {
            operator: WhereOperatorEnum.LessThan,
            path: path,
            valueNumber: value,
        }
    }

    static GREATER_THAN(path: string[] | string, value: number) {
        return {
            operator: WhereOperatorEnum.GreaterThan,
            path: path,
            valueNumber: value,
        }
    }

    static LESS_THAN_EQUAL(path: string[] | string, value: number) {
        return {
            operator: WhereOperatorEnum.LessThanEqual,
            path: path,
            valueNumber: value,
        }
    }

    static GREATER_THAN_EQUAL(path: string[] | string, value: number) {
        return {
            operator: WhereOperatorEnum.GreaterThanEqual,
            path: path,
            valueNumber: value,
        }
    }

    static IS_NULL(path: string[] | string) {
        return {
            operator: WhereOperatorEnum.IsNull,
            path: path,
        }
    }

    static NOT(path: string[] | string, value: string | number | boolean) {
        return {
            operator: WhereOperatorEnum.Not,
            path: path,
            ...(typeof value === "string" ? {valueString: value} : {}),
            ...(typeof value === "number" ? {valueNumber: value} : {}),
            ...(typeof value === "boolean" ? {valueBoolean: value} : {}),
        }
    }

    static LIKE(path: string[] | string, value: string) {
        return {
            operator: WhereOperatorEnum.Like,
            path: path,
            valueString: value,
        }
    }

    static NOT_EQUAL(path: string[] | string, value: string | number | boolean) {
        return {
            operator: WhereOperatorEnum.NotEqual,
            path: path,
            ...(typeof value === "string" ? {valueString: value} : {}),
            ...(typeof value === "number" ? {valueNumber: value} : {}),
            ...(typeof value === "boolean" ? {valueBoolean: value} : {}),
        }
    }

    static OR(operands: WhereOperandsInpObj[]) {
        return {
            operator: WhereOperatorEnum.Or,
            operands: operands,
        }
    }

    static AND(operands: WhereOperandsInpObj[]) {
        return {
            operator: WhereOperatorEnum.And,
            operands: operands,
        }
    }
    static WITHIN_GEO_RANGE(path: string[] | string, value: WhereGeoRangeInpObj) {
        return {
            operator: WhereOperatorEnum.WithinGeoRange,
            path: path,
            valueGeoRange: value,
        }
    }
}

