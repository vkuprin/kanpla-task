// @ts-nocheck
import client from "../clients/axios";
import type {
  RequestConfig,
  ResponseErrorConfig,
  ResponseConfig,
} from "../clients/axios";
import type {
  GetPaymentsByIdQueryResponse,
  GetPaymentsByIdPathParams,
  GetPaymentsByIdHeaderParams,
  GetPaymentsById403,
  GetPaymentsById404,
} from "../types/GetPaymentsById.ts";
import type {
  QueryKey,
  QueryObserverOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const getPaymentsByIdQueryKey = (id: GetPaymentsByIdPathParams["id"]) =>
  [{ url: "/payments/:id", params: { id: id } }] as const;

export type GetPaymentsByIdQueryKey = ReturnType<
  typeof getPaymentsByIdQueryKey
>;

/**
 * {@link /payments/:id}
 */
async function getPaymentsById(
  id: GetPaymentsByIdPathParams["id"],
  headers: GetPaymentsByIdHeaderParams,
  config: Partial<RequestConfig> = {},
) {
  const res = await client<
    GetPaymentsByIdQueryResponse,
    ResponseErrorConfig<GetPaymentsById403 | GetPaymentsById404>,
    unknown
  >({
    method: "GET",
    url: `/payments/${id}`,
    headers: { ...headers, ...config.headers },
    ...config,
  });
  return res;
}

export function getPaymentsByIdQueryOptions(
  id: GetPaymentsByIdPathParams["id"],
  headers: GetPaymentsByIdHeaderParams,
  config: Partial<RequestConfig> = {},
) {
  const queryKey = getPaymentsByIdQueryKey(id);
  return queryOptions<
    ResponseConfig<GetPaymentsByIdQueryResponse>,
    ResponseErrorConfig<GetPaymentsById403 | GetPaymentsById404>,
    ResponseConfig<GetPaymentsByIdQueryResponse>,
    typeof queryKey
  >({
    enabled: !!id,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal;
      return getPaymentsById(id, headers, config);
    },
  });
}

/**
 * {@link /payments/:id}
 */
export function useGetPaymentsById<
  TData = ResponseConfig<GetPaymentsByIdQueryResponse>,
  TQueryData = ResponseConfig<GetPaymentsByIdQueryResponse>,
  TQueryKey extends QueryKey = GetPaymentsByIdQueryKey,
>(
  id: GetPaymentsByIdPathParams["id"],
  headers: GetPaymentsByIdHeaderParams,
  options: {
    query?: Partial<
      QueryObserverOptions<
        ResponseConfig<GetPaymentsByIdQueryResponse>,
        ResponseErrorConfig<GetPaymentsById403 | GetPaymentsById404>,
        TData,
        TQueryData,
        TQueryKey
      >
    >;
    client?: Partial<RequestConfig>;
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getPaymentsByIdQueryKey(id);

  const query = useQuery({
    ...(getPaymentsByIdQueryOptions(
      id,
      headers,
      config,
    ) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">),
  }) as UseQueryResult<
    TData,
    ResponseErrorConfig<GetPaymentsById403 | GetPaymentsById404>
  > & { queryKey: TQueryKey };

  query.queryKey = queryKey as TQueryKey;

  return query;
}
