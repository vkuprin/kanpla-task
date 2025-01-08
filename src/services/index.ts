// @ts-nocheck
export type { DeletePaymentsByIdMutationKey } from "./hooks/useDeletePaymentsById.ts";
export type { GetOrdersQueryKey } from "./hooks/useGetOrders.ts";
export type { GetOrdersByIdQueryKey } from "./hooks/useGetOrdersById.ts";
export type { GetOrdersByIdInfiniteQueryKey } from "./hooks/useGetOrdersByIdInfinite.ts";
export type { GetOrdersByIdSuspenseQueryKey } from "./hooks/useGetOrdersByIdSuspense.ts";
export type { GetOrdersInfiniteQueryKey } from "./hooks/useGetOrdersInfinite.ts";
export type { GetOrdersSuspenseQueryKey } from "./hooks/useGetOrdersSuspense.ts";
export type { GetPaymentsByIdQueryKey } from "./hooks/useGetPaymentsById.ts";
export type { GetPaymentsByIdInfiniteQueryKey } from "./hooks/useGetPaymentsByIdInfinite.ts";
export type { GetPaymentsByIdSuspenseQueryKey } from "./hooks/useGetPaymentsByIdSuspense.ts";
export type { GetProductsQueryKey } from "./hooks/useGetProducts.ts";
export type { GetProductsByIdQueryKey } from "./hooks/useGetProductsById.ts";
export type { GetProductsByIdInfiniteQueryKey } from "./hooks/useGetProductsByIdInfinite.ts";
export type { GetProductsByIdSuspenseQueryKey } from "./hooks/useGetProductsByIdSuspense.ts";
export type { GetProductsInfiniteQueryKey } from "./hooks/useGetProductsInfinite.ts";
export type { GetProductsSuspenseQueryKey } from "./hooks/useGetProductsSuspense.ts";
export type { PostOrdersMutationKey } from "./hooks/usePostOrders.ts";
export type { PostPaymentsMutationKey } from "./hooks/usePostPayments.ts";
export type {
  DeletePaymentsByIdPathParams,
  DeletePaymentsByIdHeaderParams,
  DeletePaymentsById200,
  DeletePaymentsById404,
  DeletePaymentsByIdMutationResponse,
  DeletePaymentsByIdMutation,
} from "./types/DeletePaymentsById.ts";
export type {
  GetOrdersHeaderParams,
  GetOrders200,
  GetOrdersQueryResponse,
  GetOrdersQuery,
} from "./types/GetOrders.ts";
export type {
  GetOrdersByIdPathParams,
  GetOrdersByIdHeaderParams,
  GetOrdersById200,
  GetOrdersById403,
  GetOrdersById404,
  GetOrdersByIdQueryResponse,
  GetOrdersByIdQuery,
} from "./types/GetOrdersById.ts";
export type {
  GetPaymentsByIdPathParams,
  GetPaymentsByIdHeaderParams,
  GetPaymentsById200,
  GetPaymentsById403,
  GetPaymentsById404,
  GetPaymentsByIdQueryResponse,
  GetPaymentsByIdQuery,
} from "./types/GetPaymentsById.ts";
export type {
  GetProductsHeaderParams,
  GetProducts200,
  GetProducts503,
  GetProductsQueryResponse,
  GetProductsQuery,
} from "./types/GetProducts.ts";
export type {
  GetProductsByIdPathParams,
  GetProductsByIdHeaderParams,
  GetProductsById200,
  GetProductsById404,
  GetProductsByIdQueryResponse,
  GetProductsByIdQuery,
} from "./types/GetProductsById.ts";
export type {
  PatchOrdersByIdPathParams,
  PatchOrdersByIdHeaderParams,
  PatchOrdersById200,
  PatchOrdersById404,
  PatchOrdersByIdMutationRequest,
  PatchOrdersByIdMutationResponse,
  PatchOrdersByIdMutation,
} from "./types/PatchOrdersById.ts";
export type {
  PostOrdersHeaderParams,
  PostOrders201,
  PostOrders500,
  PostOrders503,
  PostOrdersMutationRequest,
  PostOrdersMutationResponse,
  PostOrdersMutation,
} from "./types/PostOrders.ts";
export type {
  PostPaymentsHeaderParams,
  PostPayments201,
  PostPayments402,
  PostPayments500,
  PostPayments503,
  PostPaymentsMutationRequest,
  PostPaymentsMutationResponse,
  PostPaymentsMutation,
} from "./types/PostPayments.ts";
export {
  getDeletePaymentsByIdUrl,
  deletePaymentsById,
} from "./clients/deletePaymentsById.ts";
export { getGetOrdersUrl, getOrders } from "./clients/getOrders.ts";
export { getGetOrdersByIdUrl, getOrdersById } from "./clients/getOrdersById.ts";
export {
  getGetPaymentsByIdUrl,
  getPaymentsById,
} from "./clients/getPaymentsById.ts";
export { getGetProductsUrl, getProducts } from "./clients/getProducts.ts";
export {
  getGetProductsByIdUrl,
  getProductsById,
} from "./clients/getProductsById.ts";
export {
  getPatchOrdersByIdUrl,
  patchOrdersById,
} from "./clients/patchOrdersById.ts";
export { getPostOrdersUrl, postOrders } from "./clients/postOrders.ts";
export { getPostPaymentsUrl, postPayments } from "./clients/postPayments.ts";
export {
  deletePaymentsByIdMutationKey,
  useDeletePaymentsById,
} from "./hooks/useDeletePaymentsById.ts";
export {
  getOrdersQueryKey,
  getOrdersQueryOptions,
  useGetOrders,
} from "./hooks/useGetOrders.ts";
export {
  getOrdersByIdQueryKey,
  getOrdersByIdQueryOptions,
  useGetOrdersById,
} from "./hooks/useGetOrdersById.ts";
export {
  getOrdersByIdInfiniteQueryKey,
  getOrdersByIdInfiniteQueryOptions,
  useGetOrdersByIdInfinite,
} from "./hooks/useGetOrdersByIdInfinite.ts";
export {
  getOrdersByIdSuspenseQueryKey,
  getOrdersByIdSuspenseQueryOptions,
  useGetOrdersByIdSuspense,
} from "./hooks/useGetOrdersByIdSuspense.ts";
export {
  getOrdersInfiniteQueryKey,
  getOrdersInfiniteQueryOptions,
  useGetOrdersInfinite,
} from "./hooks/useGetOrdersInfinite.ts";
export {
  getOrdersSuspenseQueryKey,
  getOrdersSuspenseQueryOptions,
  useGetOrdersSuspense,
} from "./hooks/useGetOrdersSuspense.ts";
export {
  getPaymentsByIdQueryKey,
  getPaymentsByIdQueryOptions,
  useGetPaymentsById,
} from "./hooks/useGetPaymentsById.ts";
export {
  getPaymentsByIdInfiniteQueryKey,
  getPaymentsByIdInfiniteQueryOptions,
  useGetPaymentsByIdInfinite,
} from "./hooks/useGetPaymentsByIdInfinite.ts";
export {
  getPaymentsByIdSuspenseQueryKey,
  getPaymentsByIdSuspenseQueryOptions,
  useGetPaymentsByIdSuspense,
} from "./hooks/useGetPaymentsByIdSuspense.ts";
export {
  getProductsQueryKey,
  getProductsQueryOptions,
  useGetProducts,
} from "./hooks/useGetProducts.ts";
export {
  getProductsByIdQueryKey,
  getProductsByIdQueryOptions,
  useGetProductsById,
} from "./hooks/useGetProductsById.ts";
export {
  getProductsByIdInfiniteQueryKey,
  getProductsByIdInfiniteQueryOptions,
  useGetProductsByIdInfinite,
} from "./hooks/useGetProductsByIdInfinite.ts";
export {
  getProductsByIdSuspenseQueryKey,
  getProductsByIdSuspenseQueryOptions,
  useGetProductsByIdSuspense,
} from "./hooks/useGetProductsByIdSuspense.ts";
export {
  getProductsInfiniteQueryKey,
  getProductsInfiniteQueryOptions,
  useGetProductsInfinite,
} from "./hooks/useGetProductsInfinite.ts";
export {
  getProductsSuspenseQueryKey,
  getProductsSuspenseQueryOptions,
  useGetProductsSuspense,
} from "./hooks/useGetProductsSuspense.ts";
export { postOrdersMutationKey, usePostOrders } from "./hooks/usePostOrders.ts";
export {
  postPaymentsMutationKey,
  usePostPayments,
} from "./hooks/usePostPayments.ts";
