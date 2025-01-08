export type PostPaymentsHeaderParams = {
  /**
   * @type string
   */
  'x-auth-user': string
}

export type PostPayments201 = {
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

export type PostPayments402 = string

export type PostPayments500 = string

export type PostPayments503 = string

export type PostPaymentsMutationRequest = {
  /**
   * @type string
   */
  order_id: string
  /**
   * @type number
   */
  amount: number
}

export type PostPaymentsMutationResponse = PostPayments201

export type PostPaymentsMutation = {
  Response: PostPayments201
  Request: PostPaymentsMutationRequest
  HeaderParams: PostPaymentsHeaderParams
  Errors: PostPayments402 | PostPayments500 | PostPayments503
}