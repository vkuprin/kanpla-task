import client from '../clients/axios'
import type { RequestConfig, ResponseConfig, ResponseErrorConfig } from '../clients/axios'
import type {
  PostPaymentsMutationRequest,
  PostPaymentsMutationResponse,
  PostPaymentsHeaderParams,
  PostPayments402,
  PostPayments500,
  PostPayments503,
} from '../types/PostPayments.ts'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const postPaymentsMutationKey = () => [{ url: '/payments/' }] as const

export type PostPaymentsMutationKey = ReturnType<typeof postPaymentsMutationKey>

/**
 * {@link /payments/}
 */
async function postPayments(
  data: PostPaymentsMutationRequest,
  headers: PostPaymentsHeaderParams,
  config: Partial<RequestConfig<PostPaymentsMutationRequest>> = {},
) {
  const res = await client<PostPaymentsMutationResponse, ResponseErrorConfig<PostPayments402 | PostPayments500 | PostPayments503>, PostPaymentsMutationRequest>(
    { method: 'POST', url: `/payments/`, data, headers: { ...headers, ...config.headers }, ...config },
  )
  return res
}

/**
 * {@link /payments/}
 */
export function usePostPayments(
  options: {
    mutation?: UseMutationOptions<
      ResponseConfig<PostPaymentsMutationResponse>,
      ResponseErrorConfig<PostPayments402 | PostPayments500 | PostPayments503>,
      { data: PostPaymentsMutationRequest; headers: PostPaymentsHeaderParams }
    >
    client?: Partial<RequestConfig<PostPaymentsMutationRequest>>
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? postPaymentsMutationKey()

  return useMutation<
    ResponseConfig<PostPaymentsMutationResponse>,
    ResponseErrorConfig<PostPayments402 | PostPayments500 | PostPayments503>,
    { data: PostPaymentsMutationRequest; headers: PostPaymentsHeaderParams }
  >({
    mutationFn: async ({ data, headers }) => {
      return postPayments(data, headers, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}