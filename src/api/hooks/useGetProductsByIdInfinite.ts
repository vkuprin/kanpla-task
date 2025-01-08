import client from "../clients/axios";
import type {
  RequestConfig,
  ResponseErrorConfig,
  ResponseConfig,
} from "../clients/axios";
import type {
  GetProductsByIdQueryResponse,
  GetProductsByIdPathParams,
  GetProductsByIdHeaderParams,
  GetProductsById404,
} from "../types/GetProductsById.ts";
import type {
  InfiniteData,
  QueryKey,
  InfiniteQueryObserverOptions,
  UseInfiniteQueryResult,
} from "@tanstack/react-query";
import { infiniteQueryOptions, useInfiniteQuery } from "@tanstack/react-query";

export const getProductsByIdInfiniteQueryKey = (
  id: GetProductsByIdPathParams["id"],
) => [{ url: "/products/:id", params: { id: id } }] as const;

export type GetProductsByIdInfiniteQueryKey = ReturnType<
  typeof getProductsByIdInfiniteQueryKey
>;

/**
 * {@link /products/:id}
 */
async function getProductsById(
  id: GetProductsByIdPathParams["id"],
  headers: GetProductsByIdHeaderParams,
  config: Partial<RequestConfig> = {},
) {
  const res = await client<
    GetProductsByIdQueryResponse,
    ResponseErrorConfig<GetProductsById404>,
    unknown
  >({
    method: "GET",
    url: `/products/${id}`,
    headers: { ...headers, ...config.headers },
    ...config,
  });
  return res;
}

export function getProductsByIdInfiniteQueryOptions(
  id: GetProductsByIdPathParams["id"],
  headers: GetProductsByIdHeaderParams,
  config: Partial<RequestConfig> = {},
) {
  const queryKey = getProductsByIdInfiniteQueryKey(id);
  return infiniteQueryOptions<
    ResponseConfig<GetProductsByIdQueryResponse>,
    ResponseErrorConfig<GetProductsById404>,
    ResponseConfig<GetProductsByIdQueryResponse>,
    typeof queryKey
  >({
    enabled: !!id,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal;
      return getProductsById(id, headers, config);
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage["nextCursor"],
    getPreviousPageParam: (firstPage) => firstPage["nextCursor"],
  });
}

/**
 * {@link /products/:id}
 */
export function useGetProductsByIdInfinite<
  TData = InfiniteData<ResponseConfig<GetProductsByIdQueryResponse>>,
  TQueryData = ResponseConfig<GetProductsByIdQueryResponse>,
  TQueryKey extends QueryKey = GetProductsByIdInfiniteQueryKey,
>(
  id: GetProductsByIdPathParams["id"],
  headers: GetProductsByIdHeaderParams,
  options: {
    query?: Partial<
      InfiniteQueryObserverOptions<
        ResponseConfig<GetProductsByIdQueryResponse>,
        ResponseErrorConfig<GetProductsById404>,
        TData,
        TQueryData,
        TQueryKey
      >
    >;
    client?: Partial<RequestConfig>;
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {};
  const queryKey =
    queryOptions?.queryKey ?? getProductsByIdInfiniteQueryKey(id);

  const query = useInfiniteQuery({
    ...(getProductsByIdInfiniteQueryOptions(
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
    ResponseErrorConfig<GetProductsById404>
  > & { queryKey: TQueryKey };

  query.queryKey = queryKey as TQueryKey;

  return query;
}
