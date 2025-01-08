// @ts-nocheck
export type GetOrdersHeaderParams = {
  /**
   * @type string
   */
  "x-auth-user": string;
};

export type GetOrders200 = {
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
}[];

export type GetOrdersQueryResponse = GetOrders200;

export type GetOrdersQuery = {
  Response: GetOrders200;
  HeaderParams: GetOrdersHeaderParams;
  Errors: any;
};
