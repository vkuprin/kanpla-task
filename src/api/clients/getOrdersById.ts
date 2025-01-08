import client from '../clients/axios'
import type { RequestConfig, ResponseErrorConfig } from '../clients/axios'
import type {
  GetOrdersByIdQueryResponse,
  GetOrdersByIdPathParams,
  GetOrdersByIdHeaderParams,
  GetOrdersById403,
  GetOrdersById404,
} from '../types/GetOrdersById.ts'

export function getGetOrdersByIdUrl(id: GetOrdersByIdPathParams['id']) {
  return new URL(`/orders/${id}`)
}

/**
 * {@link /orders/:id}
 */
export async function getOrdersById(id: GetOrdersByIdPathParams['id'], headers: GetOrdersByIdHeaderParams, config: Partial<RequestConfig> = {}) {
  const res = await client<GetOrdersByIdQueryResponse, ResponseErrorConfig<GetOrdersById403 | GetOrdersById404>, unknown>({
    method: 'GET',
    url: getGetOrdersByIdUrl(id).toString(),
    headers: { ...headers, ...config.headers },
    ...config,
  })
  return res.data
}