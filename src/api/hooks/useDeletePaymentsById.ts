// @ts-nocheck
import client from "../clients/axios";
import type {
  RequestConfig,
  ResponseConfig,
  ResponseErrorConfig,
} from "../clients/axios";
import type {
  DeletePaymentsByIdMutationResponse,
  DeletePaymentsByIdPathParams,
  DeletePaymentsByIdHeaderParams,
  DeletePaymentsById404,
} from "../types/DeletePaymentsById.ts";
import type { UseMutationOptions } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

export const deletePaymentsByIdMutationKey = () =>
  [{ url: "/payments/{id}" }] as const;

export type DeletePaymentsByIdMutationKey = ReturnType<
  typeof deletePaymentsByIdMutationKey
>;

/**
 * {@link /payments/:id}
 */
async function deletePaymentsById(
  id: DeletePaymentsByIdPathParams["id"],
  headers: DeletePaymentsByIdHeaderParams,
  config: Partial<RequestConfig> = {},
) {
  const res = await client<
    DeletePaymentsByIdMutationResponse,
    ResponseErrorConfig<DeletePaymentsById404>,
    unknown
  >({
    method: "DELETE",
    url: `/payments/${id}`,
    headers: { ...headers, ...config.headers },
    ...config,
  });
  return res;
}

/**
 * {@link /payments/:id}
 */
export function useDeletePaymentsById(
  options: {
    mutation?: UseMutationOptions<
      ResponseConfig<DeletePaymentsByIdMutationResponse>,
      ResponseErrorConfig<DeletePaymentsById404>,
      {
        id: DeletePaymentsByIdPathParams["id"];
        headers: DeletePaymentsByIdHeaderParams;
      }
    >;
    client?: Partial<RequestConfig>;
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {};
  const mutationKey =
    mutationOptions?.mutationKey ?? deletePaymentsByIdMutationKey();

  return useMutation<
    ResponseConfig<DeletePaymentsByIdMutationResponse>,
    ResponseErrorConfig<DeletePaymentsById404>,
    {
      id: DeletePaymentsByIdPathParams["id"];
      headers: DeletePaymentsByIdHeaderParams;
    }
  >({
    mutationFn: async ({ id, headers }) => {
      return deletePaymentsById(id, headers, config);
    },
    mutationKey,
    ...mutationOptions,
  });
}
