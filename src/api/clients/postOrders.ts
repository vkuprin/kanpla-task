// @ts-nocheck
import client from "../clients/axios";
import type { RequestConfig, ResponseErrorConfig } from "../clients/axios";
import type {
  PostOrdersMutationRequest,
  PostOrdersMutationResponse,
  PostOrdersHeaderParams,
  PostOrders500,
  PostOrders503,
} from "../types/PostOrders.ts";

export function getPostOrdersUrl() {
  return new URL(`/orders/`);
}

/**
 * {@link /orders/}
 */
export async function postOrders(
  data: PostOrdersMutationRequest,
  headers: PostOrdersHeaderParams,
  config: Partial<RequestConfig<PostOrdersMutationRequest>> = {},
) {
  const res = await client<
    PostOrdersMutationResponse,
    ResponseErrorConfig<PostOrders500 | PostOrders503>,
    PostOrdersMutationRequest
  >({
    method: "POST",
    url: getPostOrdersUrl().toString(),
    data,
    headers: { ...headers, ...config.headers },
    ...config,
  });
  return res.data;
}
