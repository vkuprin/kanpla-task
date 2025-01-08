// @ts-nocheck
import client from "../clients/axios";
import type {
  RequestConfig,
  ResponseErrorConfig,
  ResponseConfig,
} from "../clients/axios";
import type {
  GetProductsQueryResponse,
  GetProductsHeaderParams,
  GetProducts503,
} from "../types/GetProducts.ts";
import type {
  QueryKey,
  QueryObserverOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const getProductsQueryKey = () => [{ url: "/products/" }] as const;

export type GetProductsQueryKey = ReturnType<typeof getProductsQueryKey>;

/**
 * {@link /products/}
 */
async function getProducts(
  headers: GetProductsHeaderParams,
  config: Partial<RequestConfig> = {},
) {
  const res = await client<
    GetProductsQueryResponse,
    ResponseErrorConfig<GetProducts503>,
    unknown
  >({
    method: "GET",
    url: `/products/`,
    headers: { ...headers, ...config.headers },
    ...config,
  });
  return res;
}

export function getProductsQueryOptions(
  headers: GetProductsHeaderParams,
  config: Partial<RequestConfig> = {},
) {
  const queryKey = getProductsQueryKey();
  return queryOptions<
    ResponseConfig<GetProductsQueryResponse>,
    ResponseErrorConfig<GetProducts503>,
    ResponseConfig<GetProductsQueryResponse>,
    typeof queryKey
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal;
      return getProducts(headers, config);
    },
  });
}

/**
 * {@link /products/}
 */
export function useGetProducts<
  TData = ResponseConfig<GetProductsQueryResponse>,
  TQueryData = ResponseConfig<GetProductsQueryResponse>,
  TQueryKey extends QueryKey = GetProductsQueryKey,
>(
  headers: GetProductsHeaderParams,
  options: {
    query?: Partial<
      QueryObserverOptions<
        ResponseConfig<GetProductsQueryResponse>,
        ResponseErrorConfig<GetProducts503>,
        TData,
        TQueryData,
        TQueryKey
      >
    >;
    client?: Partial<RequestConfig>;
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getProductsQueryKey();

  const query = useQuery({
    ...(getProductsQueryOptions(
      headers,
      config,
    ) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">),
  }) as UseQueryResult<TData, ResponseErrorConfig<GetProducts503>> & {
    queryKey: TQueryKey;
  };

  query.queryKey = queryKey as TQueryKey;

  return query;
}
