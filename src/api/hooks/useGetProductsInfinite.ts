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
  InfiniteData,
  QueryKey,
  InfiniteQueryObserverOptions,
  UseInfiniteQueryResult,
} from "@tanstack/react-query";
import { infiniteQueryOptions, useInfiniteQuery } from "@tanstack/react-query";

export const getProductsInfiniteQueryKey = () =>
  [{ url: "/products/" }] as const;

export type GetProductsInfiniteQueryKey = ReturnType<
  typeof getProductsInfiniteQueryKey
>;

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

export function getProductsInfiniteQueryOptions(
  headers: GetProductsHeaderParams,
  config: Partial<RequestConfig> = {},
) {
  const queryKey = getProductsInfiniteQueryKey();
  return infiniteQueryOptions<
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
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage["nextCursor"],
    getPreviousPageParam: (firstPage) => firstPage["nextCursor"],
  });
}

/**
 * {@link /products/}
 */
export function useGetProductsInfinite<
  TData = InfiniteData<ResponseConfig<GetProductsQueryResponse>>,
  TQueryData = ResponseConfig<GetProductsQueryResponse>,
  TQueryKey extends QueryKey = GetProductsInfiniteQueryKey,
>(
  headers: GetProductsHeaderParams,
  options: {
    query?: Partial<
      InfiniteQueryObserverOptions<
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
  const queryKey = queryOptions?.queryKey ?? getProductsInfiniteQueryKey();

  const query = useInfiniteQuery({
    ...(getProductsInfiniteQueryOptions(
      headers,
      config,
    ) as unknown as InfiniteQueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<
      InfiniteQueryObserverOptions,
      "queryKey"
    >),
  }) as UseInfiniteQueryResult<TData, ResponseErrorConfig<GetProducts503>> & {
    queryKey: TQueryKey;
  };

  query.queryKey = queryKey as TQueryKey;

  return query;
}
