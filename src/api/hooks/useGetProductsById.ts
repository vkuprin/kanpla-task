import client from '../clients/axios'
import type { RequestConfig, ResponseErrorConfig, ResponseConfig } from '../clients/axios'
import type { GetProductsByIdQueryResponse, GetProductsByIdPathParams, GetProductsByIdHeaderParams, GetProductsById404 } from '../types/GetProductsById.ts'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const getProductsByIdQueryKey = (id: GetProductsByIdPathParams['id']) => [{ url: '/products/:id', params: { id: id } }] as const

export type GetProductsByIdQueryKey = ReturnType<typeof getProductsByIdQueryKey>

/**
 * {@link /products/:id}
 */
async function getProductsById(id: GetProductsByIdPathParams['id'], headers: GetProductsByIdHeaderParams, config: Partial<RequestConfig> = {}) {
  const res = await client<GetProductsByIdQueryResponse, ResponseErrorConfig<GetProductsById404>, unknown>({
    method: 'GET',
    url: `/products/${id}`,
    headers: { ...headers, ...config.headers },
    ...config,
  })
  return res
}

export function getProductsByIdQueryOptions(id: GetProductsByIdPathParams['id'], headers: GetProductsByIdHeaderParams, config: Partial<RequestConfig> = {}) {
  const queryKey = getProductsByIdQueryKey(id)
  return queryOptions<
    ResponseConfig<GetProductsByIdQueryResponse>,
    ResponseErrorConfig<GetProductsById404>,
    ResponseConfig<GetProductsByIdQueryResponse>,
    typeof queryKey
  >({
    enabled: !!id,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getProductsById(id, headers, config)
    },
  })
}

/**
 * {@link /products/:id}
 */
export function useGetProductsById<
  TData = ResponseConfig<GetProductsByIdQueryResponse>,
  TQueryData = ResponseConfig<GetProductsByIdQueryResponse>,
  TQueryKey extends QueryKey = GetProductsByIdQueryKey,
>(
  id: GetProductsByIdPathParams['id'],
  headers: GetProductsByIdHeaderParams,
  options: {
    query?: Partial<QueryObserverOptions<ResponseConfig<GetProductsByIdQueryResponse>, ResponseErrorConfig<GetProductsById404>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig>
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getProductsByIdQueryKey(id)

  const query = useQuery({
    ...(getProductsByIdQueryOptions(id, headers, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<GetProductsById404>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}