import type {
  CartItem,
} from "../../product/types/product.types";

const STORAGE_KEY = "cart";

export const saveCart = (
  items: CartItem[]
): void => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(items)
  );
};

export const loadCart =
  (): CartItem[] => {
    const stored =
      localStorage.getItem(
        STORAGE_KEY
      );

    return stored
      ? JSON.parse(stored)
      : [];
  };

export const clearCartStorage =
  (): void => {
    localStorage.removeItem(
      STORAGE_KEY
    );
  };