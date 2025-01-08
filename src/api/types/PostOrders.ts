export type PostOrdersHeaderParams = {
  /**
   * @type string
   */
  'x-auth-user': string
}

export type PostOrders201 = {
  /**
   * @type string
   */
  id: string
  /**
   * @type number
   */
  amount_total: number
  basket_id: string | null
  /**
   * @type string
   */
  user_id: string
  /**
   * @type string
   */
  created_at: string
  status: string | string | string
}

export type PostOrders500 = string

export type PostOrders503 = string

export type PostOrdersMutationRequest = {
  /**
   * @type number
   */
  total: number
  /**
   * @type string | undefined
   */
  order_id?: string
  /**
   * @type string | undefined
   */
  basket_id?: string
}

export type PostOrdersMutationResponse = PostOrders201

export type PostOrdersMutation = {
  Response: PostOrders201
  Request: PostOrdersMutationRequest
  HeaderParams: PostOrdersHeaderParams
  Errors: PostOrders500 | PostOrders503
}