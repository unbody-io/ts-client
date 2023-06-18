import {Filters} from "@/lib/new-unbody/types/Filters.types";
export enum QueryType{
    Get='Get',
    Aggregate='Aggregate'
}

export interface GetResponse<T> {
    Get: T;
}

export interface AggregateResponse<T> {
    Aggregate: T;
}

export interface EntityResponse<T> {
    [key: string]: T;
}

export interface UnbodyResponse<T> {
    data: T|null
    error: any;
}

export type QueryGenerator = (args: Filters) => (q: string) => string;

export type QueryResponseType<T, OP extends QueryType, DT extends ClassType> =
    OP extends QueryType.Get
        ? {data: { Get: { [K in DT]: T[] } }}
        : OP extends QueryType.Aggregate
            ? {data: { Aggregate: { [K in DT]: T[] } }}
            : never;

export type ClassType = 'GoogleDoc' | 'GoogleCalEvent' | 'TextBlock' | 'ImageBlock';
