import {
  createContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type {
  CartItem,
} from "../../product/types/product.types";

import {
  loadCart,
  saveCart,
} from "../services/cartStorage";

interface CartContextType {
  items: CartItem[];

  cartCount: number;

  addItem: (
    item: CartItem
  ) => void;

  removeItem: (
    productId: number,
    color: string,
    size: string
  ) => void;

  updateQuantity: (
    productId: number,
    color: string,
    size: string,
    quantity: number
  ) => void;

  clearCart: () => void;
}

export const CartContext =
  createContext<CartContextType>(
    {} as CartContextType
  );

interface Props {
  children: ReactNode;
}

export const CartProvider = ({
  children,
}: Props) => {
  const [items, setItems] =
    useState<CartItem[]>([]);

  // Rehydrate cart on app load
  useEffect(() => {
    const storedCart = loadCart();

    setItems(storedCart);
  }, []);

  // Persist cart whenever it changes
  useEffect(() => {
    saveCart(items);
  }, [items]);

 const addItem = (
  item: CartItem
) => {
  setItems((prevItems) => {
    const existingItem =
      prevItems.find(
        (cartItem) =>
          cartItem.productId === item.productId &&
          cartItem.color === item.color &&
          cartItem.size === item.size
      );

    if (existingItem) {
      return prevItems.map((cartItem) => {
        if (
          cartItem.productId === item.productId &&
          cartItem.color === item.color &&
          cartItem.size === item.size
        ) {
          return {
            ...cartItem,

            quantity: Math.min(
              cartItem.quantity + item.quantity,
              item.stock
            ),
          };
        }

        return cartItem;
      });
    }

    return [
      ...prevItems,
      {
        ...item,
        quantity: Math.min(
          item.quantity,
          item.stock
        ),
      },
    ];
  });
};
  const removeItem = (
    productId: number,
    color: string,
    size: string
  ) => {
    setItems((prevItems) =>
      prevItems.filter(
        (item) =>
          !(
            item.productId ===
              productId &&
            item.color === color &&
            item.size === size
          )
      )
    );
  };

  const updateQuantity = (
    productId: number,
    color: string,
    size: string,
    quantity: number
  ) => {
    if (quantity < 1) return;

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.productId ===
          productId &&
        item.color === color &&
        item.size === size
          ? {
              ...item,
              quantity,
            }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const cartCount =
    items.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );

  return (
    <CartContext.Provider
      value={{
        items,
        cartCount,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};