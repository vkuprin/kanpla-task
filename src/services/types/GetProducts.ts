// @ts-nocheck
export type GetProductsHeaderParams = {
  /**
   * @type string
   */
  "x-auth-user": string;
};

export type GetProducts200 = {
  /**
   * @type string
   */
  id: string;
  /**
   * @type string
   */
  name: string;
  /**
   * @type number
   */
  vat_rate: number;
  /**
   * @type number
   */
  price_unit: number;
}[];

export type GetProducts503 = string;

export type GetProductsQueryResponse = GetProducts200;

export type GetProductsQuery = {
  Response: GetProducts200;
  HeaderParams: GetProductsHeaderParams;
  Errors: GetProducts503;
};
