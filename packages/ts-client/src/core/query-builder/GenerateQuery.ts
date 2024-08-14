import { AxiosResponse } from 'axios'
import { AnyObject } from '../../types'
import {
  IGenerate,
  IGenerateGroupedResultMessages,
  IGenerateGroupedResultTask,
  IGenerateSingleResultMessages,
  IGenerateSingleResultPrompt,
} from '../filters/interfaces/Generate.interface'
import {
  GetQueryGenerativeGroupedResult,
  GetQueryGenerativeSingleResult,
  GetQueryResult,
} from '../Unbody'
import { QueryBuilder } from './QueryBuilder'

export interface GenerateQuery<
  T extends AnyObject,
  Q extends QueryBuilder<T, GetQueryResult<T>>,
> {
  (
    type: 'singleResult',
    prompt: Required<IGenerate<T>>['singleResult']['prompt'],
  ): Omit<Q, 'generate' | 'exec'> & {
    exec: <R = GetQueryGenerativeSingleResult<GetQueryResult<T>>>() => Promise<
      AxiosResponse<R>
    >
  }
  (type: 'singleResult', args: IGenerateSingleResultPrompt): Omit<
    Q,
    'generate' | 'exec'
  > & {
    exec: <R = GetQueryGenerativeSingleResult<GetQueryResult<T>>>() => Promise<
      AxiosResponse<R>
    >
  }
  (type: 'singleResult', args: IGenerateSingleResultMessages): Omit<
    Q,
    'generate' | 'exec'
  > & {
    exec: <R = GetQueryGenerativeSingleResult<GetQueryResult<T>>>() => Promise<
      AxiosResponse<R>
    >
  }
  (type: 'groupedResult', prompt: IGenerateGroupedResultTask<T>): Omit<
    Q,
    'generate' | 'exec'
  > & {
    exec: <R = GetQueryGenerativeGroupedResult<GetQueryResult<T>>>() => Promise<
      AxiosResponse<R>
    >
  }
  (type: 'groupedResult', prompt: IGenerateGroupedResultMessages): Omit<
    Q,
    'generate' | 'exec'
  > & {
    exec: <R = GetQueryGenerativeGroupedResult<GetQueryResult<T>>>() => Promise<
      AxiosResponse<R>
    >
  }
  (
    type: 'groupedResult',
    prompt: Required<IGenerate<T>>['groupedResult']['task'],
    properties?: Required<IGenerate<T>>['groupedResult']['properties'],
  ): Omit<Q, 'generate' | 'exec'> & {
    exec: <R = GetQueryGenerativeGroupedResult<GetQueryResult<T>>>() => Promise<
      AxiosResponse<R>
    >
  }
  (
    type: 'groupedResult' | 'singleResult',
    prompt:
      | Required<IGenerate<T>>['groupedResult']['task']
      | Required<IGenerate<T>>['singleResult']['prompt']
      | IGenerateSingleResultPrompt
      | IGenerateSingleResultMessages
      | IGenerateGroupedResultTask<T>
      | IGenerateGroupedResultMessages,
    properties?: Required<IGenerate<T>>['groupedResult']['properties'],
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
  fromOne(prompt: IGenerateSingleResultPrompt): Omit<Q, 'generate' | 'exec'> & {
    exec: <R = GetQueryGenerativeSingleResult<GetQueryResult<T>>>() => Promise<
      AxiosResponse<R>
    >
  }
  fromOne(prompt: IGenerateSingleResultMessages): Omit<
    Q,
    'generate' | 'exec'
  > & {
    exec: <R = GetQueryGenerativeSingleResult<GetQueryResult<T>>>() => Promise<
      AxiosResponse<R>
    >
  }
  fromOne(
    prompt:
      | string
      | IGenerateSingleResultPrompt
      | IGenerateSingleResultMessages,
  ): Omit<Q, 'generate' | 'exec'> & {
    exec: <R = GetQueryGenerativeSingleResult<GetQueryResult<T>>>() => Promise<
      AxiosResponse<R>
    >
  }

  fromMany(task: IGenerateGroupedResultTask<T>): Omit<
    Q,
    'generate' | 'exec'
  > & {
    exec: <R = GetQueryGenerativeGroupedResult<GetQueryResult<T>>>() => Promise<
      AxiosResponse<R>
    >
  }
  fromMany(task: IGenerateGroupedResultMessages): Omit<
    Q,
    'generate' | 'exec'
  > & {
    exec: <R = GetQueryGenerativeGroupedResult<GetQueryResult<T>>>() => Promise<
      AxiosResponse<R>
    >
  }
  fromMany(
    task: string,
    properties?: Required<IGenerate<T>>['groupedResult']['properties'],
  ): Omit<Q, 'generate' | 'exec'> & {
    exec: <R = GetQueryGenerativeGroupedResult<GetQueryResult<T>>>() => Promise<
      AxiosResponse<R>
    >
  }
}

export const createGenerateQuery = <
  T extends AnyObject,
  Q extends QueryBuilder<T, any>,
>(
  queryBuilder: Q,
): GenerateQuery<T, Q> => {
  const generate = (
    type: 'groupedResult' | 'singleResult',
    prompt:
      | string
      | IGenerateSingleResultPrompt
      | IGenerateSingleResultMessages
      | IGenerateGroupedResultTask<T>
      | IGenerateGroupedResultMessages,
    properties?: Required<IGenerate<T>>['groupedResult']['properties'],
  ) => {
    // @ts-ignore
    const { query } = queryBuilder

    if (type === 'singleResult') {
      query._additional.generate = {
        __args: {
          singleResult:
            typeof prompt === 'string'
              ? {
                  prompt,
                }
              : 'prompt' in prompt && typeof prompt.prompt !== 'undefined'
              ? {
                  prompt: prompt.prompt,
                  options: prompt.options || {},
                }
              : {
                  messages: (prompt as IGenerateSingleResultMessages).messages,
                  options: prompt.options || {},
                },
        },
        error: true,
        singleResult: true,
        metadata: {
          finishReason: true,
          usage: {
            inputTokens: true,
            outputTokens: true,
            totalTokens: true,
          },
        },
      }
    } else {
      query._additional.generate = {
        __args: {
          groupedResult:
            typeof prompt === 'string'
              ? {
                  task: prompt,
                  properties: properties || [],
                }
              : 'task' in prompt && typeof prompt.task !== 'undefined'
              ? {
                  task: prompt.task,
                  properties: prompt.properties || [],
                  options: prompt.options || {},
                }
              : {
                  messages: (prompt as IGenerateGroupedResultMessages).messages,
                  options:
                    (prompt as IGenerateGroupedResultMessages).options || {},
                },
        },
        error: true,
        groupedResult: true,
        metadata: {
          finishReason: true,
          usage: {
            inputTokens: true,
            outputTokens: true,
            totalTokens: true,
          },
        },
      }
    }

    return queryBuilder
  }

  return Object.assign(generate, {
    fromOne: (
      prompt:
        | string
        | IGenerateSingleResultPrompt
        | IGenerateSingleResultMessages,
    ) => generate('singleResult', prompt as any),
    fromMany: (
      task:
        | string
        | IGenerateGroupedResultTask<T>
        | IGenerateGroupedResultMessages,
      properties?: Required<IGenerate<T>>['groupedResult']['properties'],
    ) => generate('groupedResult', task as any, properties),
  }) as any as GenerateQuery<T, Q>
}
