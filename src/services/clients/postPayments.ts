// @ts-nocheck
import client from "../clients/axios";
import type { RequestConfig, ResponseErrorConfig } from "../clients/axios";
import type {
  PostPaymentsMutationRequest,
  PostPaymentsMutationResponse,
  PostPaymentsHeaderParams,
  PostPayments402,
  PostPayments500,
  PostPayments503,
} from "../types/PostPayments.ts";

export function getPostPaymentsUrl() {
  return new URL(`/payments/`);
}

/**
 * {@link /payments/}
 */
export async function postPayments(
  data: PostPaymentsMutationRequest,
  headers: PostPaymentsHeaderParams,
  config: Partial<RequestConfig<PostPaymentsMutationRequest>> = {},
) {
  const res = await client<
    PostPaymentsMutationResponse,
    ResponseErrorConfig<PostPayments402 | PostPayments500 | PostPayments503>,
    PostPaymentsMutationRequest
  >({
    method: "POST",
    url: getPostPaymentsUrl().toString(),
    data,
    headers: { ...headers, ...config.headers },
    ...config,
  });
  return res.data;
}
