import client from "../clients/axios";
import type {
  RequestConfig,
  ResponseErrorConfig,
  ResponseConfig,
} from "../clients/axios";
import type {
  GetOrdersQueryResponse,
  GetOrdersHeaderParams,
} from "../types/GetOrders.ts";
import type {
  InfiniteData,
  QueryKey,
  InfiniteQueryObserverOptions,
  UseInfiniteQueryResult,
} from "@tanstack/react-query";
import { infiniteQueryOptions, useInfiniteQuery } from "@tanstack/react-query";

export const getOrdersInfiniteQueryKey = () => [{ url: "/orders/" }] as const;

export type GetOrdersInfiniteQueryKey = ReturnType<
  typeof getOrdersInfiniteQueryKey
>;

/**
 * {@link /orders/}
 */
async function getOrders(
  headers: GetOrdersHeaderParams,
  config: Partial<RequestConfig> = {},
) {
  const res = await client<
    GetOrdersQueryResponse,
    ResponseErrorConfig<Error>,
    unknown
  >({
    method: "GET",
    url: `/orders/`,
    headers: { ...headers, ...config.headers },
    ...config,
  });
  return res;
}

export function getOrdersInfiniteQueryOptions(
  headers: GetOrdersHeaderParams,
  config: Partial<RequestConfig> = {},
) {
  const queryKey = getOrdersInfiniteQueryKey();
  return infiniteQueryOptions<
    ResponseConfig<GetOrdersQueryResponse>,
    ResponseErrorConfig<Error>,
    ResponseConfig<GetOrdersQueryResponse>,
    typeof queryKey
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal;
      return getOrders(headers, config);
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage["nextCursor"],
    getPreviousPageParam: (firstPage) => firstPage["nextCursor"],
  });
}

/**
 * {@link /orders/}
 */
export function useGetOrdersInfinite<
  TData = InfiniteData<ResponseConfig<GetOrdersQueryResponse>>,
  TQueryData = ResponseConfig<GetOrdersQueryResponse>,
  TQueryKey extends QueryKey = GetOrdersInfiniteQueryKey,
>(
  headers: GetOrdersHeaderParams,
  options: {
    query?: Partial<
      InfiniteQueryObserverOptions<
        ResponseConfig<GetOrdersQueryResponse>,
        ResponseErrorConfig<Error>,
        TData,
        TQueryData,
        TQueryKey
      >
    >;
    client?: Partial<RequestConfig>;
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getOrdersInfiniteQueryKey();

  const query = useInfiniteQuery({
    ...(getOrdersInfiniteQueryOptions(
      headers,
      config,
    ) as unknown as InfiniteQueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<
      InfiniteQueryObserverOptions,
      "queryKey"
    >),
  }) as UseInfiniteQueryResult<TData, ResponseErrorConfig<Error>> & {
    queryKey: TQueryKey;
  };

  query.queryKey = queryKey as TQueryKey;

  return query;
}
