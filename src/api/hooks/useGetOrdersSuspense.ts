// @ts-nocheck
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
  UseSuspenseQueryOptions,
  UseSuspenseQueryResult,
} from "@tanstack/react-query";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

export const getOrdersSuspenseQueryKey = () => [{ url: "/orders/" }] as const;

export type GetOrdersSuspenseQueryKey = ReturnType<
  typeof getOrdersSuspenseQueryKey
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

export function getOrdersSuspenseQueryOptions(
  headers: GetOrdersHeaderParams,
  config: Partial<RequestConfig> = {},
) {
  const queryKey = getOrdersSuspenseQueryKey();
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
export function useGetOrdersSuspense<
  TData = ResponseConfig<GetOrdersQueryResponse>,
  TQueryData = ResponseConfig<GetOrdersQueryResponse>,
  TQueryKey extends QueryKey = GetOrdersSuspenseQueryKey,
>(
  headers: GetOrdersHeaderParams,
  options: {
    query?: Partial<
      UseSuspenseQueryOptions<
        ResponseConfig<GetOrdersQueryResponse>,
        ResponseErrorConfig<Error>,
        TData,
        TQueryKey
      >
    >;
    client?: Partial<RequestConfig>;
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getOrdersSuspenseQueryKey();

  const query = useSuspenseQuery({
    ...(getOrdersSuspenseQueryOptions(
      headers,
      config,
    ) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, "queryKey">),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<Error>> & {
    queryKey: TQueryKey;
  };

  query.queryKey = queryKey as TQueryKey;

  return query;
}
