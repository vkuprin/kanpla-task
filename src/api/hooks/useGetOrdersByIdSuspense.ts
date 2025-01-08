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
  QueryKey,
  UseSuspenseQueryOptions,
  UseSuspenseQueryResult,
} from "@tanstack/react-query";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

export const getOrdersByIdSuspenseQueryKey = (
  id: GetOrdersByIdPathParams["id"],
) => [{ url: "/orders/:id", params: { id: id } }] as const;

export type GetOrdersByIdSuspenseQueryKey = ReturnType<
  typeof getOrdersByIdSuspenseQueryKey
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

export function getOrdersByIdSuspenseQueryOptions(
  id: GetOrdersByIdPathParams["id"],
  headers: GetOrdersByIdHeaderParams,
  config: Partial<RequestConfig> = {},
) {
  const queryKey = getOrdersByIdSuspenseQueryKey(id);
  return queryOptions<
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
  });
}

/**
 * {@link /orders/:id}
 */
export function useGetOrdersByIdSuspense<
  TData = ResponseConfig<GetOrdersByIdQueryResponse>,
  TQueryData = ResponseConfig<GetOrdersByIdQueryResponse>,
  TQueryKey extends QueryKey = GetOrdersByIdSuspenseQueryKey,
>(
  id: GetOrdersByIdPathParams["id"],
  headers: GetOrdersByIdHeaderParams,
  options: {
    query?: Partial<
      UseSuspenseQueryOptions<
        ResponseConfig<GetOrdersByIdQueryResponse>,
        ResponseErrorConfig<GetOrdersById403 | GetOrdersById404>,
        TData,
        TQueryKey
      >
    >;
    client?: Partial<RequestConfig>;
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getOrdersByIdSuspenseQueryKey(id);

  const query = useSuspenseQuery({
    ...(getOrdersByIdSuspenseQueryOptions(
      id,
      headers,
      config,
    ) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, "queryKey">),
  }) as UseSuspenseQueryResult<
    TData,
    ResponseErrorConfig<GetOrdersById403 | GetOrdersById404>
  > & { queryKey: TQueryKey };

  query.queryKey = queryKey as TQueryKey;

  return query;
}
