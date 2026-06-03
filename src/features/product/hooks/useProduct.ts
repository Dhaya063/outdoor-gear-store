import { useEffect, useState } from "react";
import type { Product } from "../types/product.types";
import { getProduct } from "../api/productApi";

export const useProduct = (id: number) => {
  const [product, setProduct] = useState<Product | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getProduct(id);

        setProduct(data);
      } catch {
        setError("Unable to load product");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  return {
    product,
    loading,
    error,
  };
};