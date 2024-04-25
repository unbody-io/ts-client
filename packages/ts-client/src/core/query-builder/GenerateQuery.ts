import { AxiosResponse } from 'axios'
import {
  GetQueryGenerativeGroupedResult,
  GetQueryGenerativeSingleResult,
  GetQueryResult,
} from '../Unbody'
import { IGenerate } from '../filters/interfaces/Generate.interface'
import { QueryBuilder } from './QueryBuilder'

export interface GenerateQuery<
  T,
  Q extends QueryBuilder<T, GetQueryResult<T>>,
> {
  (type: 'singleResult', prompt: IGenerate<T>['singleResult']['prompt']): Omit<
    Q,
    'generate' | 'exec'
  > & {
    exec: <R = GetQueryGenerativeSingleResult<GetQueryResult<T>>>() => Promise<
      AxiosResponse<R>
    >
  }
  (
    type: 'groupedResult',
    prompt: IGenerate<T>['groupedResult']['task'],
    properties?: IGenerate<T>['groupedResult']['properties'],
  ): Omit<Q, 'generate' | 'exec'> & {
    exec: <R = GetQueryGenerativeGroupedResult<GetQueryResult<T>>>() => Promise<
      AxiosResponse<R>
    >
  }
  (
    type: 'groupedResult' | 'singleResult',
    prompt:
      | IGenerate<T>['groupedResult']['task']
      | IGenerate<T>['singleResult']['prompt'],
    properties?: IGenerate<T>['groupedResult']['properties'],
  ): Omit<Q, 'generate' | 'exec'> & {
    exec: <
      R =
        | GetQueryGenerativeSingleResult<GetQueryResult<T>>
        | GetQueryGenerativeGroupedResult<GetQueryResult<T>>,
    >() => Promise<AxiosResponse<R>>
  }

  fromOne(prompt: string): Omit<Q, 'generate' | 'exec'> & {
    exec: <R = GetQueryGenerativeSingleResult<GetQueryResult<T>>>() => Promise<
      AxiosResponse<R>
    >
  }

  fromMany(
    task: string,
    properties?: IGenerate<T>['groupedResult']['properties'],
  ): Omit<Q, 'generate' | 'exec'> & {
    exec: <R = GetQueryGenerativeGroupedResult<GetQueryResult<T>>>() => Promise<
      AxiosResponse<R>
    >
  }
}

export const createGenerateQuery = <T, Q extends QueryBuilder<T, any>>(
  queryBuilder: Q,
): GenerateQuery<T, Q> => {
  const generate = (
    type: 'groupedResult' | 'singleResult',
    prompt: string,
    properties?: IGenerate<T>['groupedResult']['properties'],
  ) => {
    // @ts-ignore
    const { query } = queryBuilder

    if (type === 'singleResult') {
      query._additional.generate = {
        __args: {
          singleResult: {
            prompt,
          },
        },
        singleResult: true,
      }
    } else {
      query._additional.generate = {
        __args: {
          groupedResult: {
            properties,
            task: prompt,
          },
        },
        groupedResult: true,
      }
    }

    return queryBuilder
  }

  return Object.assign(generate, {
    fromOne: (prompt: string) => generate('singleResult', prompt),
    fromMany: (
      task: string,
      properties?: IGenerate<T>['groupedResult']['properties'],
    ) => generate('groupedResult', task, properties),
  }) as any as GenerateQuery<T, Q>
}
