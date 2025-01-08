import client from '../clients/axios'
import type { RequestConfig, ResponseErrorConfig } from '../clients/axios'
import type {
  PatchOrdersByIdMutationRequest,
  PatchOrdersByIdMutationResponse,
  PatchOrdersByIdPathParams,
  PatchOrdersByIdHeaderParams,
  PatchOrdersById404,
} from '../types/PatchOrdersById.ts'

export function getPatchOrdersByIdUrl(id: PatchOrdersByIdPathParams['id']) {
  return new URL(`/orders/${id}`)
}

/**
 * {@link /orders/:id}
 */
export async function patchOrdersById(
  id: PatchOrdersByIdPathParams['id'],
  data: PatchOrdersByIdMutationRequest,
  headers: PatchOrdersByIdHeaderParams,
  config: Partial<RequestConfig<PatchOrdersByIdMutationRequest>> = {},
) {
  const res = await client<PatchOrdersByIdMutationResponse, ResponseErrorConfig<PatchOrdersById404>, PatchOrdersByIdMutationRequest>({
    method: 'PATCH',
    url: getPatchOrdersByIdUrl(id).toString(),
    data,
    headers: { ...headers, ...config.headers },
    ...config,
  })
  return res.data
}