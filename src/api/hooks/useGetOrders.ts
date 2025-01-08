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
  QueryKey,
  QueryObserverOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const getOrdersQueryKey = () => [{ url: "/orders/" }] as const;

export type GetOrdersQueryKey = ReturnType<typeof getOrdersQueryKey>;

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

export function getOrdersQueryOptions(
  headers: GetOrdersHeaderParams,
  config: Partial<RequestConfig> = {},
) {
  const queryKey = getOrdersQueryKey();
  return queryOptions<
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
  });
}

/**
 * {@link /orders/}
 */
export function useGetOrders<
  TData = ResponseConfig<GetOrdersQueryResponse>,
  TQueryData = ResponseConfig<GetOrdersQueryResponse>,
  TQueryKey extends QueryKey = GetOrdersQueryKey,
>(
  headers: GetOrdersHeaderParams,
  options: {
    query?: Partial<
      QueryObserverOptions<
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
  const queryKey = queryOptions?.queryKey ?? getOrdersQueryKey();

  const query = useQuery({
    ...(getOrdersQueryOptions(
      headers,
      config,
    ) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & {
    queryKey: TQueryKey;
  };

  query.queryKey = queryKey as TQueryKey;

  return query;
}
