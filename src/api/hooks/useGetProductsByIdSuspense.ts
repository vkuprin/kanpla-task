import client from '../clients/axios'
import type { RequestConfig, ResponseErrorConfig, ResponseConfig } from '../clients/axios'
import type { GetProductsByIdQueryResponse, GetProductsByIdPathParams, GetProductsByIdHeaderParams, GetProductsById404 } from '../types/GetProductsById.ts'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const getProductsByIdSuspenseQueryKey = (id: GetProductsByIdPathParams['id']) => [{ url: '/products/:id', params: { id: id } }] as const

export type GetProductsByIdSuspenseQueryKey = ReturnType<typeof getProductsByIdSuspenseQueryKey>

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

export function getProductsByIdSuspenseQueryOptions(
  id: GetProductsByIdPathParams['id'],
  headers: GetProductsByIdHeaderParams,
  config: Partial<RequestConfig> = {},
) {
  const queryKey = getProductsByIdSuspenseQueryKey(id)
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
export function useGetProductsByIdSuspense<
  TData = ResponseConfig<GetProductsByIdQueryResponse>,
  TQueryData = ResponseConfig<GetProductsByIdQueryResponse>,
  TQueryKey extends QueryKey = GetProductsByIdSuspenseQueryKey,
>(
  id: GetProductsByIdPathParams['id'],
  headers: GetProductsByIdHeaderParams,
  options: {
    query?: Partial<UseSuspenseQueryOptions<ResponseConfig<GetProductsByIdQueryResponse>, ResponseErrorConfig<GetProductsById404>, TData, TQueryKey>>
    client?: Partial<RequestConfig>
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getProductsByIdSuspenseQueryKey(id)

  const query = useSuspenseQuery({
    ...(getProductsByIdSuspenseQueryOptions(id, headers, config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<GetProductsById404>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}