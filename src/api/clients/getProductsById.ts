import client from "../clients/axios";
import type { RequestConfig, ResponseErrorConfig } from "../clients/axios";
import type {
  GetProductsByIdQueryResponse,
  GetProductsByIdPathParams,
  GetProductsByIdHeaderParams,
  GetProductsById404,
} from "../types/GetProductsById.ts";

export function getGetProductsByIdUrl(id: GetProductsByIdPathParams["id"]) {
  return new URL(`/products/${id}`);
}

/**
 * {@link /products/:id}
 */
export async function getProductsById(
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
    url: getGetProductsByIdUrl(id).toString(),
    headers: { ...headers, ...config.headers },
    ...config,
  });
  return res.data;
}
