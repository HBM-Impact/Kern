import { commerceClient } from "../commerce-client";
import type { Product } from "../commerce-types";

type Args = {
  signal?: AbortSignal;
  id: string;
};

// Null when the product doesn't exist; any other HTTP error still throws.
export async function getProductById({ id, signal }: Args) {
  const response = await commerceClient.get(`products/${id}`, {
    signal,
    throwHttpErrors: (status) => status !== 404,
  });
  return response.status === 404 ? null : response.json<Product>();
}
