// @ts-nocheck
import client from "../clients/axios";
import type { RequestConfig, ResponseErrorConfig } from "../clients/axios";
import type {
  GetOrdersQueryResponse,
  GetOrdersHeaderParams,
} from "../types/GetOrders.ts";

export function getGetOrdersUrl() {
  return new URL(`/orders/`);
}

/**
 * {@link /orders/}
 */
export async function getOrders(
  headers: GetOrdersHeaderParams,
  config: Partial<RequestConfig> = {},
) {
  const res = await client<
    GetOrdersQueryResponse,
    ResponseErrorConfig<Error>,
    unknown
  >({
    method: "GET",
    url: getGetOrdersUrl().toString(),
    headers: { ...headers, ...config.headers },
    ...config,
  });
  return res.data;
}
