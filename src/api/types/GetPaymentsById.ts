export type GetPaymentsByIdPathParams = {
  /**
   * @type string
   */
  id: string
}

export type GetPaymentsByIdHeaderParams = {
  /**
   * @type string
   */
  'x-auth-user': string
}

export type GetPaymentsById200 = {
  /**
   * @type string
   */
  id: string
  /**
   * @type number
   */
  amount: number
  /**
   * @type string
   */
  user_id: string
  /**
   * @type string
   */
  created_at: string
  status: string | string | string | string
  /**
   * @type string
   */
  type: string
  /**
   * @type string
   */
  order_id: string
}

export type GetPaymentsById403 = string

export type GetPaymentsById404 = string

export type GetPaymentsByIdQueryResponse = GetPaymentsById200

export type GetPaymentsByIdQuery = {
  Response: GetPaymentsById200
  PathParams: GetPaymentsByIdPathParams
  HeaderParams: GetPaymentsByIdHeaderParams
  Errors: GetPaymentsById403 | GetPaymentsById404
}