import client from '../clients/axios'
import type { RequestConfig, ResponseConfig, ResponseErrorConfig } from '../clients/axios'
import type { PostOrdersMutationRequest, PostOrdersMutationResponse, PostOrdersHeaderParams, PostOrders500, PostOrders503 } from '../types/PostOrders.ts'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const postOrdersMutationKey = () => [{ url: '/orders/' }] as const

export type PostOrdersMutationKey = ReturnType<typeof postOrdersMutationKey>

/**
 * {@link /orders/}
 */
async function postOrders(data: PostOrdersMutationRequest, headers: PostOrdersHeaderParams, config: Partial<RequestConfig<PostOrdersMutationRequest>> = {}) {
  const res = await client<PostOrdersMutationResponse, ResponseErrorConfig<PostOrders500 | PostOrders503>, PostOrdersMutationRequest>({
    method: 'POST',
    url: `/orders/`,
    data,
    headers: { ...headers, ...config.headers },
    ...config,
  })
  return res
}

/**
 * {@link /orders/}
 */
export function usePostOrders(
  options: {
    mutation?: UseMutationOptions<
      ResponseConfig<PostOrdersMutationResponse>,
      ResponseErrorConfig<PostOrders500 | PostOrders503>,
      { data: PostOrdersMutationRequest; headers: PostOrdersHeaderParams }
    >
    client?: Partial<RequestConfig<PostOrdersMutationRequest>>
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? postOrdersMutationKey()

  return useMutation<
    ResponseConfig<PostOrdersMutationResponse>,
    ResponseErrorConfig<PostOrders500 | PostOrders503>,
    { data: PostOrdersMutationRequest; headers: PostOrdersHeaderParams }
  >({
    mutationFn: async ({ data, headers }) => {
      return postOrders(data, headers, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}