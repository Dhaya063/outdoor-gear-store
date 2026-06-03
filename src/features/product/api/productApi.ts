import { api } from "../../../shared/utils/api";
import type { Product } from "../types/product.types";

export const getProduct = async (
  id: number
): Promise<Product> => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};