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
  QueryObserverOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const getOrdersByIdQueryKey = (id: GetOrdersByIdPathParams["id"]) =>
  [{ url: "/orders/:id", params: { id: id } }] as const;

export type GetOrdersByIdQueryKey = ReturnType<typeof getOrdersByIdQueryKey>;

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

export function getOrdersByIdQueryOptions(
  id: GetOrdersByIdPathParams["id"],
  headers: GetOrdersByIdHeaderParams,
  config: Partial<RequestConfig> = {},
) {
  const queryKey = getOrdersByIdQueryKey(id);
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
export function useGetOrdersById<
  TData = ResponseConfig<GetOrdersByIdQueryResponse>,
  TQueryData = ResponseConfig<GetOrdersByIdQueryResponse>,
  TQueryKey extends QueryKey = GetOrdersByIdQueryKey,
>(
  id: GetOrdersByIdPathParams["id"],
  headers: GetOrdersByIdHeaderParams,
  options: {
    query?: Partial<
      QueryObserverOptions<
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
  const queryKey = queryOptions?.queryKey ?? getOrdersByIdQueryKey(id);

  const query = useQuery({
    ...(getOrdersByIdQueryOptions(
      id,
      headers,
      config,
    ) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">),
  }) as UseQueryResult<
    TData,
    ResponseErrorConfig<GetOrdersById403 | GetOrdersById404>
  > & { queryKey: TQueryKey };

  query.queryKey = queryKey as TQueryKey;

  return query;
}
