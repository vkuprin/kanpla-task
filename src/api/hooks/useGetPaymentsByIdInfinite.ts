import client from '../clients/axios'
import type { RequestConfig, ResponseErrorConfig, ResponseConfig } from '../clients/axios'
import type {
  GetPaymentsByIdQueryResponse,
  GetPaymentsByIdPathParams,
  GetPaymentsByIdHeaderParams,
  GetPaymentsById403,
  GetPaymentsById404,
} from '../types/GetPaymentsById.ts'
import type { InfiniteData, QueryKey, InfiniteQueryObserverOptions, UseInfiniteQueryResult } from '@tanstack/react-query'
import { infiniteQueryOptions, useInfiniteQuery } from '@tanstack/react-query'

export const getPaymentsByIdInfiniteQueryKey = (id: GetPaymentsByIdPathParams['id']) => [{ url: '/payments/:id', params: { id: id } }] as const

export type GetPaymentsByIdInfiniteQueryKey = ReturnType<typeof getPaymentsByIdInfiniteQueryKey>

/**
 * {@link /payments/:id}
 */
async function getPaymentsById(id: GetPaymentsByIdPathParams['id'], headers: GetPaymentsByIdHeaderParams, config: Partial<RequestConfig> = {}) {
  const res = await client<GetPaymentsByIdQueryResponse, ResponseErrorConfig<GetPaymentsById403 | GetPaymentsById404>, unknown>({
    method: 'GET',
    url: `/payments/${id}`,
    headers: { ...headers, ...config.headers },
    ...config,
  })
  return res
}

export function getPaymentsByIdInfiniteQueryOptions(
  id: GetPaymentsByIdPathParams['id'],
  headers: GetPaymentsByIdHeaderParams,
  config: Partial<RequestConfig> = {},
) {
  const queryKey = getPaymentsByIdInfiniteQueryKey(id)
  return infiniteQueryOptions<
    ResponseConfig<GetPaymentsByIdQueryResponse>,
    ResponseErrorConfig<GetPaymentsById403 | GetPaymentsById404>,
    ResponseConfig<GetPaymentsByIdQueryResponse>,
    typeof queryKey
  >({
    enabled: !!id,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getPaymentsById(id, headers, config)
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage['nextCursor'],
    getPreviousPageParam: (firstPage) => firstPage['nextCursor'],
  })
}

/**
 * {@link /payments/:id}
 */
export function useGetPaymentsByIdInfinite<
  TData = InfiniteData<ResponseConfig<GetPaymentsByIdQueryResponse>>,
  TQueryData = ResponseConfig<GetPaymentsByIdQueryResponse>,
  TQueryKey extends QueryKey = GetPaymentsByIdInfiniteQueryKey,
>(
  id: GetPaymentsByIdPathParams['id'],
  headers: GetPaymentsByIdHeaderParams,
  options: {
    query?: Partial<
      InfiniteQueryObserverOptions<
        ResponseConfig<GetPaymentsByIdQueryResponse>,
        ResponseErrorConfig<GetPaymentsById403 | GetPaymentsById404>,
        TData,
        TQueryData,
        TQueryKey
      >
    >
    client?: Partial<RequestConfig>
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getPaymentsByIdInfiniteQueryKey(id)

  const query = useInfiniteQuery({
    ...(getPaymentsByIdInfiniteQueryOptions(id, headers, config) as unknown as InfiniteQueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<InfiniteQueryObserverOptions, 'queryKey'>),
  }) as UseInfiniteQueryResult<TData, ResponseErrorConfig<GetPaymentsById403 | GetPaymentsById404>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}