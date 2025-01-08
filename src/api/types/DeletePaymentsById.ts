export type DeletePaymentsByIdPathParams = {
  /**
   * @type string
   */
  id: string
}

export type DeletePaymentsByIdHeaderParams = {
  /**
   * @type string
   */
  'x-auth-user': string
}

export type DeletePaymentsById200 = {
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

export type DeletePaymentsById404 = string

export type DeletePaymentsByIdMutationResponse = DeletePaymentsById200

export type DeletePaymentsByIdMutation = {
  Response: DeletePaymentsById200
  PathParams: DeletePaymentsByIdPathParams
  HeaderParams: DeletePaymentsByIdHeaderParams
  Errors: DeletePaymentsById404
}