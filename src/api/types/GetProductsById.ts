// @ts-nocheck
export type GetProductsByIdPathParams = {
  /**
   * @type number
   */
  id: number;
};

export type GetProductsByIdHeaderParams = {
  /**
   * @type string
   */
  "x-auth-user": string;
};

export type GetProductsById200 = {
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
};

export type GetProductsById404 = string;

export type GetProductsByIdQueryResponse = GetProductsById200;

export type GetProductsByIdQuery = {
  Response: GetProductsById200;
  PathParams: GetProductsByIdPathParams;
  HeaderParams: GetProductsByIdHeaderParams;
  Errors: GetProductsById404;
};
