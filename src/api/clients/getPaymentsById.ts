import client from '../clients/axios'
import type { RequestConfig, ResponseErrorConfig } from '../clients/axios'
import type {
  GetPaymentsByIdQueryResponse,
  GetPaymentsByIdPathParams,
  GetPaymentsByIdHeaderParams,
  GetPaymentsById403,
  GetPaymentsById404,
} from '../types/GetPaymentsById.ts'

export function getGetPaymentsByIdUrl(id: GetPaymentsByIdPathParams['id']) {
  return new URL(`/payments/${id}`)
}

/**
 * {@link /payments/:id}
 */
export async function getPaymentsById(id: GetPaymentsByIdPathParams['id'], headers: GetPaymentsByIdHeaderParams, config: Partial<RequestConfig> = {}) {
  const res = await client<GetPaymentsByIdQueryResponse, ResponseErrorConfig<GetPaymentsById403 | GetPaymentsById404>, unknown>({
    method: 'GET',
    url: getGetPaymentsByIdUrl(id).toString(),
    headers: { ...headers, ...config.headers },
    ...config,
  })
  return res.data
}