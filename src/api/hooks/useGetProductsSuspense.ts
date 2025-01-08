import client from '../clients/axios'
import type { RequestConfig, ResponseErrorConfig, ResponseConfig } from '../clients/axios'
import type { GetProductsQueryResponse, GetProductsHeaderParams, GetProducts503 } from '../types/GetProducts.ts'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const getProductsSuspenseQueryKey = () => [{ url: '/products/' }] as const

export type GetProductsSuspenseQueryKey = ReturnType<typeof getProductsSuspenseQueryKey>

/**
 * {@link /products/}
 */
async function getProducts(headers: GetProductsHeaderParams, config: Partial<RequestConfig> = {}) {
  const res = await client<GetProductsQueryResponse, ResponseErrorConfig<GetProducts503>, unknown>({
    method: 'GET',
    url: `/products/`,
    headers: { ...headers, ...config.headers },
    ...config,
  })
  return res
}

export function getProductsSuspenseQueryOptions(headers: GetProductsHeaderParams, config: Partial<RequestConfig> = {}) {
  const queryKey = getProductsSuspenseQueryKey()
  return queryOptions<ResponseConfig<GetProductsQueryResponse>, ResponseErrorConfig<GetProducts503>, ResponseConfig<GetProductsQueryResponse>, typeof queryKey>(
    {
      queryKey,
      queryFn: async ({ signal }) => {
        config.signal = signal
        return getProducts(headers, config)
      },
    },
  )
}

/**
 * {@link /products/}
 */
export function useGetProductsSuspense<
  TData = ResponseConfig<GetProductsQueryResponse>,
  TQueryData = ResponseConfig<GetProductsQueryResponse>,
  TQueryKey extends QueryKey = GetProductsSuspenseQueryKey,
>(
  headers: GetProductsHeaderParams,
  options: {
    query?: Partial<UseSuspenseQueryOptions<ResponseConfig<GetProductsQueryResponse>, ResponseErrorConfig<GetProducts503>, TData, TQueryKey>>
    client?: Partial<RequestConfig>
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getProductsSuspenseQueryKey()

  const query = useSuspenseQuery({
    ...(getProductsSuspenseQueryOptions(headers, config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<GetProducts503>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}