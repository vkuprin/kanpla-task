import client from '../clients/axios'
import type { RequestConfig, ResponseErrorConfig } from '../clients/axios'
import type {
  DeletePaymentsByIdMutationResponse,
  DeletePaymentsByIdPathParams,
  DeletePaymentsByIdHeaderParams,
  DeletePaymentsById404,
} from '../types/DeletePaymentsById.ts'

export function getDeletePaymentsByIdUrl(id: DeletePaymentsByIdPathParams['id']) {
  return new URL(`/payments/${id}`)
}

/**
 * {@link /payments/:id}
 */
export async function deletePaymentsById(id: DeletePaymentsByIdPathParams['id'], headers: DeletePaymentsByIdHeaderParams, config: Partial<RequestConfig> = {}) {
  const res = await client<DeletePaymentsByIdMutationResponse, ResponseErrorConfig<DeletePaymentsById404>, unknown>({
    method: 'DELETE',
    url: getDeletePaymentsByIdUrl(id).toString(),
    headers: { ...headers, ...config.headers },
    ...config,
  })
  return res.data
}