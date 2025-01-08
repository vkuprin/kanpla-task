// @ts-nocheck
import client from "../clients/axios";
import type { RequestConfig, ResponseErrorConfig } from "../clients/axios";
import type {
  GetProductsQueryResponse,
  GetProductsHeaderParams,
  GetProducts503,
} from "../types/GetProducts.ts";

export function getGetProductsUrl() {
  return new URL(`/products/`);
}

/**
 * {@link /products/}
 */
export async function getProducts(
  headers: GetProductsHeaderParams,
  config: Partial<RequestConfig> = {},
) {
  const res = await client<
    GetProductsQueryResponse,
    ResponseErrorConfig<GetProducts503>,
    unknown
  >({
    method: "GET",
    url: getGetProductsUrl().toString(),
    headers: { ...headers, ...config.headers },
    ...config,
  });
  return res.data;
}
