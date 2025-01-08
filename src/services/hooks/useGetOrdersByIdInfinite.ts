// @ts-nocheck
import client from "../clients/axios";
import type {
  RequestConfig,
  ResponseErrorConfig,
  ResponseConfig,
} from "../clients/axios";
import type {
  GetOrdersByIdQueryResponse,
  GetOrdersByIdPathParams,
  GetOrdersByIdHeaderParams,
  GetOrdersById403,
  GetOrdersById404,
} from "../types/GetOrdersById.ts";
import type {
  InfiniteData,
  QueryKey,
  InfiniteQueryObserverOptions,
  UseInfiniteQueryResult,
} from "@tanstack/react-query";
import { infiniteQueryOptions, useInfiniteQuery } from "@tanstack/react-query";

export const getOrdersByIdInfiniteQueryKey = (
  id: GetOrdersByIdPathParams["id"],
) => [{ url: "/orders/:id", params: { id: id } }] as const;

export type GetOrdersByIdInfiniteQueryKey = ReturnType<
  typeof getOrdersByIdInfiniteQueryKey
>;

/**
 * {@link /orders/:id}
 */
async function getOrdersById(
  id: GetOrdersByIdPathParams["id"],
  headers: GetOrdersByIdHeaderParams,
  config: Partial<RequestConfig> = {},
) {
  const res = await client<
    GetOrdersByIdQueryResponse,
    ResponseErrorConfig<GetOrdersById403 | GetOrdersById404>,
    unknown
  >({
    method: "GET",
    url: `/orders/${id}`,
    headers: { ...headers, ...config.headers },
    ...config,
  });
  return res;
}

export function getOrdersByIdInfiniteQueryOptions(
  id: GetOrdersByIdPathParams["id"],
  headers: GetOrdersByIdHeaderParams,
  config: Partial<RequestConfig> = {},
) {
  const queryKey = getOrdersByIdInfiniteQueryKey(id);
  return infiniteQueryOptions<
    ResponseConfig<GetOrdersByIdQueryResponse>,
    ResponseErrorConfig<GetOrdersById403 | GetOrdersById404>,
    ResponseConfig<GetOrdersByIdQueryResponse>,
    typeof queryKey
  >({
    enabled: !!id,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal;
      return getOrdersById(id, headers, config);
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage["nextCursor"],
    getPreviousPageParam: (firstPage) => firstPage["nextCursor"],
  });
}

/**
 * {@link /orders/:id}
 */
export function useGetOrdersByIdInfinite<
  TData = InfiniteData<ResponseConfig<GetOrdersByIdQueryResponse>>,
  TQueryData = ResponseConfig<GetOrdersByIdQueryResponse>,
  TQueryKey extends QueryKey = GetOrdersByIdInfiniteQueryKey,
>(
  id: GetOrdersByIdPathParams["id"],
  headers: GetOrdersByIdHeaderParams,
  options: {
    query?: Partial<
      InfiniteQueryObserverOptions<
        ResponseConfig<GetOrdersByIdQueryResponse>,
        ResponseErrorConfig<GetOrdersById403 | GetOrdersById404>,
        TData,
        TQueryData,
        TQueryKey
      >
    >;
    client?: Partial<RequestConfig>;
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getOrdersByIdInfiniteQueryKey(id);

  const query = useInfiniteQuery({
    ...(getOrdersByIdInfiniteQueryOptions(
      id,
      headers,
      config,
    ) as unknown as InfiniteQueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<
      InfiniteQueryObserverOptions,
      "queryKey"
    >),
  }) as UseInfiniteQueryResult<
    TData,
    ResponseErrorConfig<GetOrdersById403 | GetOrdersById404>
  > & { queryKey: TQueryKey };

  query.queryKey = queryKey as TQueryKey;

  return query;
}
