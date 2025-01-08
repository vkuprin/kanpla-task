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
  UseSuspenseQueryOptions,
  UseSuspenseQueryResult,
} from "@tanstack/react-query";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

export const getPaymentsByIdSuspenseQueryKey = (
  id: GetPaymentsByIdPathParams["id"],
) => [{ url: "/payments/:id", params: { id: id } }] as const;

export type GetPaymentsByIdSuspenseQueryKey = ReturnType<
  typeof getPaymentsByIdSuspenseQueryKey
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

export function getPaymentsByIdSuspenseQueryOptions(
  id: GetPaymentsByIdPathParams["id"],
  headers: GetPaymentsByIdHeaderParams,
  config: Partial<RequestConfig> = {},
) {
  const queryKey = getPaymentsByIdSuspenseQueryKey(id);
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
export function useGetPaymentsByIdSuspense<
  TData = ResponseConfig<GetPaymentsByIdQueryResponse>,
  TQueryData = ResponseConfig<GetPaymentsByIdQueryResponse>,
  TQueryKey extends QueryKey = GetPaymentsByIdSuspenseQueryKey,
>(
  id: GetPaymentsByIdPathParams["id"],
  headers: GetPaymentsByIdHeaderParams,
  options: {
    query?: Partial<
      UseSuspenseQueryOptions<
        ResponseConfig<GetPaymentsByIdQueryResponse>,
        ResponseErrorConfig<GetPaymentsById403 | GetPaymentsById404>,
        TData,
        TQueryKey
      >
    >;
    client?: Partial<RequestConfig>;
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {};
  const queryKey =
    queryOptions?.queryKey ?? getPaymentsByIdSuspenseQueryKey(id);

  const query = useSuspenseQuery({
    ...(getPaymentsByIdSuspenseQueryOptions(
      id,
      headers,
      config,
    ) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, "queryKey">),
  }) as UseSuspenseQueryResult<
    TData,
    ResponseErrorConfig<GetPaymentsById403 | GetPaymentsById404>
  > & { queryKey: TQueryKey };

  query.queryKey = queryKey as TQueryKey;

  return query;
}
