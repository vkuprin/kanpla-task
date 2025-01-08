export type PatchOrdersByIdPathParams = {
  /**
   * @type string
   */
  id: string
}

export type PatchOrdersByIdHeaderParams = {
  /**
   * @type string
   */
  'x-auth-user': string
}

export type PatchOrdersById200 = {
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

export type PatchOrdersById404 = string

export type PatchOrdersByIdMutationRequest = {
  status: string | string | string
}

export type PatchOrdersByIdMutationResponse = PatchOrdersById200

export type PatchOrdersByIdMutation = {
  Response: PatchOrdersById200
  Request: PatchOrdersByIdMutationRequest
  PathParams: PatchOrdersByIdPathParams
  HeaderParams: PatchOrdersByIdHeaderParams
  Errors: PatchOrdersById404
}