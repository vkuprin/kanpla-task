export type GetOrdersByIdPathParams = {
  /**
   * @type string
   */
  id: string;
};

export type GetOrdersByIdHeaderParams = {
  /**
   * @type string
   */
  "x-auth-user": string;
};

export type GetOrdersById200 = {
  /**
   * @type string
   */
  id: string;
  /**
   * @type number
   */
  amount_total: number;
  basket_id: string | null;
  /**
   * @type string
   */
  user_id: string;
  /**
   * @type string
   */
  created_at: string;
  status: string | string | string;
};

export type GetOrdersById403 = string;

export type GetOrdersById404 = string;

export type GetOrdersByIdQueryResponse = GetOrdersById200;

export type GetOrdersByIdQuery = {
  Response: GetOrdersById200;
  PathParams: GetOrdersByIdPathParams;
  HeaderParams: GetOrdersByIdHeaderParams;
  Errors: GetOrdersById403 | GetOrdersById404;
};
